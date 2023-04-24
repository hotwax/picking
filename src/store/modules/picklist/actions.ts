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
  async findPickList({ commit, state, dispatch }, payload) {
    let resp;
    const params = {
      "inputFields": {
        "statusId": "PICKLIST_PRINTED",
        "facilityId": this.state.user.currentFacility.facilityId,
      },
      "orderBy": "picklistDate DESC",
      "viewSize": payload.viewSize,
      "viewIndex": payload.viewIndex,
      "fieldList": ["picklistId", "picklistDate", "statusId", "partyId"],
      "entityName": "PicklistAndRole",
      "noConditionFind": "Y"
    } as any

    if (state.filters.showMyPicklists) params.inputFields.partyId = this.state.user.current.partyId;
    
    let list = [] as any;
    try {
      resp = await PicklistService.getPicklists(params);
      if (resp.status === 200 && !hasError(resp) && resp.data.docs?.length > 0) {
        list = resp.data.docs;
        const pickersPartyIds = [...new Set(list.map((item: any) => item.partyId))]
        const pickersDetails = await dispatch('party/getPickersDetails', pickersPartyIds, { root: true });
        
        list = list.map((item: any) => ({ ...item, pickersFullName: pickersDetails[item.partyId].fullName }))
        if (payload.viewIndex > 0) list = state.picklist.list.concat(list);
      }
    } catch (err: any) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return Promise.reject(new Error(err))
    } finally {
      commit(types.PICKLISTS_UPDATED, { list: list, total: resp.data.count ? resp.data.count : 0 });
    }
  },
  
  /**
   * Get completed picklists
   */
  async findCompletedPickLists({ commit, dispatch, state }) {
    let resp;
    const params = {
      "inputFields": {
        "statusId": "PICKLIST_COMPLETED",
        "facilityId": this.state.user.currentFacility.facilityId,
      },
      "orderBy": "picklistDate DESC",
      "viewSize": 10,
      "fieldList": ["picklistId", "picklistDate", "statusId", "partyId"],
      "entityName": "PicklistAndRole",
      "noConditionFind": "Y"
    } as any

    if (state.filters.showMyPicklists) params.inputFields.partyId = this.state.user.current.partyId

    let list = [] as any
    try {
      resp = await PicklistService.getPicklists(params);
      if (resp.status === 200 && !hasError(resp) && resp.data.docs?.length > 0) {
        list = resp.data.docs;
        const pickersPartyIds = [...new Set(list.map((item: any) => item.partyId))]
        const pickersDetails = await dispatch('party/getPickersDetails', pickersPartyIds, { root: true });

        list = list.map((item: any) => ({ ...item, pickersFullName: pickersDetails[item.partyId].fullName }))
      }
    } catch (err: any) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return Promise.reject(new Error(err))
    } finally {
      commit(types.PICKLISTS_COMPLETED_UPDATED, { list: list, total: resp.data.count ? resp.data.count : 0 });
    }
  },

  /**
   * Set current picklist data
   */
  async setCurrentPicklist({ commit, state }, payload) {
    let current = state.current as any
    if (current.pickingItemList && current.picklistId === payload.id) {
      return current.pickingItemList
    }

    let resp;
    const params = {
      "inputFields": {
        "picklistId": payload.id,
      },
      "fieldList": ["productId", "productName", "picklistId", "locationSeqId", "picklistBinId", "statusId"],
      "entityName": "PicklistItemsView",
      "noConditionFind": "Y"
    }

    try {
      resp = await PicklistService.getPicklist(params);
      if (!hasError(resp) && resp.data.count) {
        const pickingItemList = resp.data.docs.map((picklist: any) => ({ ...picklist, isChecked: false }))

        current = { picklistId: pickingItemList[0].picklistId, pickingItemList }
        commit(types.PICKLIST_CURRENT_UPDATED, current)

        let productIds: any = new Set(
          pickingItemList.map((picklist: any) => {
            return picklist.productId
          })
        );

        productIds = [...productIds]
        if (productIds.length) {
          this.dispatch('product/fetchProducts', { productIds })
        }

        return pickingItemList;
      } else {
        showToast(translate('Something went wrong'));
        console.error("error", resp.data);
        return Promise.reject(new Error(resp.data));
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
  apply filters
  */
  setFilters ({ commit }, payload) {
    commit(types.PICKLIST_FILTERS_UPDATED, payload)
  },

  /*
  clearing the picklist before the user is logged out, because if some other user log in
  having zero picklist then it shows the previous picklist entries
  */
  clearPicklist ({ commit }) {
    commit(types.PICKLISTS_UPDATED, { list: [], total: 0 })
    commit(types.PICKLISTS_COMPLETED_UPDATED, { list: [], total: 0 })
  }
}
export default actions;
