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
  async findPickList ({ commit, state }, payload) {
    let resp;
    const params = {
      "inputFields": {
        "statusId": ["PICKLIST_CANCELLED", "PICKLIST_COMPLETED", "PICKLIST_PICKED"],
        "statusId_op": "not-in",
        "facilityId": this.state.user.currentFacility.facilityId
      },
      viewSize: payload.viewSize,
      viewIndex: payload.viewIndex,
      "fieldList": ["picklistId", "picklistDate"],
      "entityName": "PicklistAndRole",
      "noConditionFind": "Y"
    }
    try {
      resp = await PicklistService.getPicklists(params);
      if (resp.status === 200 && !hasError(resp) && resp.data.docs?.length > 0) {
        let list = resp.data.docs;
        if (payload.viewIndex) list = state.picklist.list.concat(list)
        commit(types.PICKLISTS_UPDATED, { list, total: resp.data.count })
        return resp.data;
      } else {
        showToast(translate('No picklist found'));
        console.error("error", resp.data._ERROR_MESSAGE_);
        return Promise.reject(new Error(resp.data._ERROR_MESSAGE_));
      }
    } catch (err: any) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return Promise.reject(new Error(err))
    }
  },
  
  /**
   * Set current picklist data
   */
  async setCurrentPicklist ({ commit, state }, payload) {
    let resp;

    const current = state.current as any

    if (current.picklist && current.pickingItemList && current.picklist.picklistId === payload.id) {
      return {
        'pickingItemList': current.pickingItemList
      }
    }

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

    } catch (err: any) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return Promise.reject(new Error(err))
    }
  },

  /**
   * Complete Picklist
   */
  async completePicklist ({ commit }, payload) {
    let resp;

    try {
      resp = await PicklistService.completePicklist(payload);
      if (resp.status === 200 && !hasError(resp)) {
        showToast(translate("Picklist Completed"));
        return resp;
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch (error) {
      console.error(error);
      showToast(translate("Something went wrong"));
    } 
  },

  /*
  clearing the picklist before the user is logged out, because if some other user log in
  having zero picklist then it shows the previous picklist entries
  */
  clearPicklist ({ commit }) {
    commit(types.PICKLISTS_UPDATED, { list: [], total: 0 })
  }
}
export default actions;
