import { MutationTree } from 'vuex'
import UserState from './UserState'
import * as types from './mutation-types'

const mutations: MutationTree <UserState> = {
    [types.USER_TOKEN_CHANGED] (state, payload) {
        state.token = payload.newToken
    },
    [types.USER_END_SESSION] (state) {
      state.token = ''
      state.current = null
      state.currentFacility = {}
    },
    [types.USER_INFO_UPDATED] (state, payload) {
        state.current = payload
    },
    [types.USER_CURRENT_FACILITY_UPDATED] (state, payload) {
        state.currentFacility = payload;
    },
    [types.USER_INSTANCE_URL_UPDATED] (state, payload) {
        state.instanceUrl = payload;
    },
    [types.USER_SORTBY_UPDATED] (state, payload) {
        state.picklistItemSortBy = payload
    },
    [types.USER_PWA_STATE_UPDATED](state, payload) {
        state.pwaState.registration = payload.registration;
        state.pwaState.updateExists = payload.updateExists;
    },
    [types.USER_CURRENT_ECOM_STORE_UPDATED] (state, payload) {
        state.currentEComStore = payload
    },
    [types.USER_PERMISSIONS_UPDATED](state, payload) {
        state.permissions = payload
    },
}
export default mutations;