import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import PicklistState from './PicklistState'
import * as types from './mutation-types'
import { PicklistService } from '@/services/PicklistService'
import { hasError, showToast } from '@/utils'
import { translate } from '@/i18n'
import router from '@/router'

const actions: ActionTree<PicklistState, RootState> = {
  async findPickList ({ commit }) {
    let resp;

    try {
      resp = await PicklistService.getPicklists();

      if (resp.status === 200 && resp.data.pickingList && !hasError(resp)) {
        commit(types.PICKLIST_ITEMS, { list: resp.data.pickingList })
        return resp.data;
      } else {
        showToast(translate('Something went wrong'));
        console.error("error", resp.data._ERROR_MESSAGE_);
        return Promise.reject(new Error(resp.data._ERROR_MESSAGE_));
      }
    } catch (err) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return Promise.reject(new Error(err))
    }
  },

  /**
   * Fetch cached products
   */
   async fetchProducts ( { commit, state }, { productIds }) {
    const cachedProductIds = Object.keys(state.cached);
    const productIdFilter= productIds.reduce((filter: string, productId: any) => {
      if (filter !== '') filter += ' OR '
      // If product already exist in cached products skip
      if (cachedProductIds.includes(productId)) {
        console.log("Filter", filter)
        return filter;
      } else {
        return filter += productId;
      }
    }, '');

    // If there are no products skip the API call
    if (productIdFilter === '') return;

    const resp = await PicklistService.fetchProducts({
      "filters": ['productId: (' + productIdFilter + ')']
    })
    if (resp.status === 200 && !hasError(resp)) {
      const products = resp.data.response.docs;
      // Handled empty response in case of failed query
      if (resp.data) commit(types.PRODUCT_ADD_TO_CACHED_MULTIPLE, { products });
    }
    // TODO Handle specific error
    console.log("Response",resp.data)
    return resp;
  },

  async setCurrentPicklist ({ commit }, payload) {
    let resp;

    try {
      resp = await PicklistService.getPicklist(payload);
      resp.data.pickingItemList.map((picklist: any) => {
        picklist.isChecked = false;
      })
      if (resp.status === 200 && resp.data.pickingItemList && !hasError(resp)) {
        commit(types.PICKLIST_CURRENT, { current: resp.data })
      let productIds: any = new Set(
        resp.data.pickingItemList.map((picklist: any) => {
          return picklist.productId
        })
      );
      console.log(productIds)
      productIds = [...productIds]
      if (productIds.length) {
        console.log(productIds)
        this.dispatch('picklist/fetchProducts', { productIds })
      }
        commit(types.PRODUCT_ADD_TO_CACHED_MULTIPLE, { current: resp.data })
        return resp.data;
      } else {
        showToast(translate('Something went wrong'));
        console.error("error", resp.data._ERROR_MESSAGE_);
        return Promise.reject(new Error(resp.data._ERROR_MESSAGE_));
      }

    } catch (err) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return Promise.reject(new Error(err))
    }
  },

  /**
   * Complete Picklist
   */
   async completePicklists ({commit}, payload) {
    let resp;

    try {
      resp = await PicklistService.completePicklists(
        {
          "configId": "IMP_PKLST_ND_ITM"
        }
      );
      if (resp.status === 200 && resp.pickingItemList && !hasError(resp)) {
        commit(types.PICKLIST_SELECTED_PRODUCTS, {configId: payload.configId});
        showToast(translate("Picklist Completed"));
        console.log("CompletePicklist", resp)
        return resp;  
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch (error) {
      console.log(error);
      showToast(translate("Something went wrong"));
    } 
  }
}
export default actions;
