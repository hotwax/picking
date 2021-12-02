import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import PicklistState from './PicklistState'
import * as types from './mutation-types'
import { PicklistService } from '@/services/PicklistService'
import { hasError, showToast } from '@/utils'
import { translate } from '@/i18n'

const actions: ActionTree<PicklistState, RootState> = {
  /**
   * Find picklist
   */
  async findPickList ({ commit }) {
    let resp;

    try {
      resp = await PicklistService.getPicklists();

      if (resp.status === 200 && resp.data.pickingList && !hasError(resp)) {
        commit(types.PICKLISTS_UPDATED, { list: resp.data.pickingList })
        return resp.data;
      } else {
        showToast(translate('Something went wrong'));
        console.error("error", resp.data._ERROR_MESSAGE_);
        commit(types.PICKLISTS_UPDATED, { list: '' })
        return Promise.reject(new Error(resp.data._ERROR_MESSAGE_));
      }
    } catch (err) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return Promise.reject(new Error(err))
    }
  },
  
  /**
   * Set current picklist data
   */
  async setCurrentPicklist ({ commit }, payload) {
    let resp;

    try {
      resp = await PicklistService.getPicklist(payload);
      resp.data.pickingItemList.map((picklist: any) => {
        picklist.isChecked = false;
      })
      if (resp.status === 200 && resp.data.pickingItemList && !hasError(resp)) {
        commit(types.PICKLIST_CURRENT_UPDATED, { current: resp.data })
        let productIds: any = new Set(
          resp.data.pickingItemList.map((picklist: any) => {
            return picklist.productId
          })
        );
        productIds = [...productIds]
        if (productIds.length) {
          this.dispatch('product/fetchProducts', { productIds })
        }
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
  async completePicklist (payload) {
    let resp;

    try {
      resp = await PicklistService.completePicklists(payload);
      if (resp.status === 200 && resp.pickingItemList && !hasError(resp)) {
        showToast(translate("Picklist Completed"));
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
