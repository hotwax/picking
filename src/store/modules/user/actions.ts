import { UserService } from '@/services/UserService'
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import UserState from './UserState'
import * as types from './mutation-types'
import { showToast } from '@/utils'
import { translate } from '@/i18n'
import { Settings } from 'luxon';
import { hasError, logout, updateInstanceUrl, updateToken, resetConfig } from '@/adapter'
import { useAuthStore, useProductIdentificationStore, useUserStore } from '@hotwax/dxp-components'
import { getServerPermissionsFromRules, prepareAppPermissions, resetPermissions, setPermissions } from '@/authorization'
import emitter from '@/event-bus'
import router from '@/router';

const actions: ActionTree<UserState, RootState> = {

  /**
 * Login user and return token
 */
  async login ({ commit, dispatch }, payload) {
    try {
      const { token, oms } = payload;
      dispatch("setUserInstanceUrl", oms);
      if (token) {
        const permissionId = process.env.VUE_APP_PERMISSION_ID;
        // Prepare permissions list
        const serverPermissionsFromRules = getServerPermissionsFromRules();
        if (permissionId) serverPermissionsFromRules.push(permissionId);

        const serverPermissions = await UserService.getUserPermissions({
          permissionIds: [...new Set(serverPermissionsFromRules)]
        }, token);
        const appPermissions = prepareAppPermissions(serverPermissions);

        // Checking if the user has permission to access the app
        // If there is no configuration, the permission check is not enabled
        if (permissionId) {
          // As the token is not yet set in the state passing token headers explicitly
          // TODO Abstract this out, how token is handled should be part of the method not the callee
          const hasPermission = appPermissions.some((appPermission: any) => appPermission.action === permissionId);
          // If there are any errors or permission check fails do not allow user to login
          if (!hasPermission) {
            const permissionError = 'You do not have permission to access the app.';
            showToast(translate(permissionError));
            console.error("error", permissionError);
            return Promise.reject(new Error(permissionError));
          }
        }

        updateToken(token)
        setPermissions(appPermissions);
        commit(types.USER_PERMISSIONS_UPDATED, appPermissions);
        commit(types.USER_TOKEN_CHANGED, { newToken: token })
        await dispatch('getProfile', token)

        // accessing picklist ID from router as route cannot be accessed here
        const picklistId = router.currentRoute.value.query.picklistId
        if (picklistId) {
          return `picklist-details/${picklistId}`
        }
      } 
    } catch (err: any) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return Promise.reject(err instanceof Object ? err : new Error(err));
    }
  },

  /**
   * Logout user
   */
  async logout ({ commit }, payload) {
    // store the url on which we need to redirect the user after logout api completes in case of SSO enabled
    let redirectionUrl = ''

    emitter.emit('presentLoader', { message: 'Logging out', backdropDismiss: false })

    // Calling the logout api to flag the user as logged out, only when user is authorised
    // if the user is already unauthorised then not calling the logout api as it returns 401 again that results in a loop, thus there is no need to call logout api if the user is unauthorised
    if(!payload?.isUserUnauthorised) {
      let resp;

      // wrapping the parsing logic in try catch as in some case the logout api makes redirection, and then we are unable to parse the resp and thus the logout process halts
      try {
        resp = await logout();

        // Added logic to remove the `//` from the resp as in case of get request we are having the extra characters and in case of post we are having 403
        resp = JSON.parse(resp.startsWith('//') ? resp.replace('//', '') : resp)
      } catch(err) {
        console.error('Error parsing data', err)
      }

      if(resp?.logoutAuthType == 'SAML2SSO') {
        redirectionUrl = resp.logoutUrl
      }
    }

    const authStore = useAuthStore() 
    // TODO add any other tasks if need
    commit(types.USER_END_SESSION)
    resetPermissions();
    resetConfig();
    this.dispatch('picklist/setFilters', {
      hideCompletedPicklists: true,
      showMyPicklists: true
    });

    // reset plugin state on logout
    authStore.$reset()

    // If we get any url in logout api resp then we will redirect the user to the url
    if(redirectionUrl) {
      window.location.href = redirectionUrl
    }

    emitter.emit('dismissLoader')
    return redirectionUrl;
  },

  /**
   * Get User profile
   */
  async getProfile ( { commit }, token) {
    const resp = await UserService.getProfile()
    if (resp.status === 200) {
      if (resp.data.userTimeZone) {
        Settings.defaultZone = resp.data.userTimeZone;
      }
      commit(types.USER_INFO_UPDATED, resp.data);

      await useUserStore().getUserFacilities(resp.data.partyId, "", false)
      await useUserStore().getFacilityPreference('SELECTED_FACILITY')

      const currentFacility: any = useUserStore().getCurrentFacility
      // get and set current ecom store in state
      const currentEComStore = await UserService.getCurrentEComStore(token, currentFacility?.facilityId);
      commit(types.USER_CURRENT_ECOM_STORE_UPDATED, currentEComStore);

      // Get product identification from api using dxp-component
      await useProductIdentificationStore().getIdentificationPref(currentEComStore?.productStoreId)
        .catch((error) => console.error(error));
    }
  },

  /**
   * Update user timeZone
   */
     async setUserTimeZone ( { state, commit }, payload) {
      const resp = await UserService.setUserTimeZone(payload)
      if (resp.status === 200 && !hasError(resp)) {
        const current: any = state.current;
        current.userTimeZone = payload.timeZoneId;
        commit(types.USER_INFO_UPDATED, current);
        Settings.defaultZone = current.userTimeZone;
        showToast(translate("Time zone updated successfully"));
      }
    },

    async setFacility ({ commit, state }, payload) {
    // get and set current ecom store in state
    const currentEComStore = await UserService.getCurrentEComStore(state.token, payload);
    commit(types.USER_CURRENT_ECOM_STORE_UPDATED, currentEComStore);

    await useProductIdentificationStore().getIdentificationPref(currentEComStore?.productStoreId)
      .catch((error) => console.error(error));
  },

  /**
   * Set User Instance Url
   */
   setUserInstanceUrl ({ commit }, payload){
    commit(types.USER_INSTANCE_URL_UPDATED, payload)
    updateInstanceUrl(payload)
  },

  updateSortBy({ commit }, payload) {
    commit(types.USER_SORTBY_UPDATED, payload)
  },
  
  updatePwaState({ commit }, payload) {
    commit(types.USER_PWA_STATE_UPDATED, payload);
  }
}
export default actions;