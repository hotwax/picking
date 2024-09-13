import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import PicklistState from './PicklistState'
import * as types from './mutation-types'
import { PicklistService } from '@/services/PicklistService'
import { showToast } from '@/utils'
import { hasError } from '@/adapter'
import { translate } from '@/i18n'
import { useUserStore } from '@hotwax/dxp-components'
 
const getCurrentFacilityId = () => {
  const currentFacility: any = useUserStore().getCurrentFacility;
  return currentFacility?.facilityId
}

const actions: ActionTree<PicklistState, RootState> = {
  /**
   * Find picklist
   */
  async findPickList({ commit, state, dispatch }, payload) {
    let resp;
    const params = {
      "inputFields": {
        "statusId": "PICKLIST_PRINTED",
        "facilityId": getCurrentFacilityId(),
      },
      "orderBy": "picklistDate DESC",
      "viewSize": payload.viewSize,
      "viewIndex": payload.viewIndex,
      "fieldList": ["picklistId", "picklistDate", "statusId", "partyId"],
      "entityName": "PicklistAndRole",
      "noConditionFind": "Y",
      "filterByDate": "Y"
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
        "statusId": ["PICKLIST_COMPLETED", "PICKLIST_PICKED"],
        "statusId_op": "in",
        "facilityId": getCurrentFacilityId(),
      },
      "orderBy": "picklistDate DESC",
      "viewSize": 10,
      "fieldList": ["picklistId", "picklistDate", "statusId", "partyId"],
      "entityName": "PicklistAndRole",
      "noConditionFind": "Y",
      "filterByDate": "Y"
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
    if (current.picklistId && current.picklistId === payload.id) {
      return current
    }

    let resp, isScrollable = true, viewIndex = 0, total = 0;
    let pickingItemList = [] as any;

    try {
      while(isScrollable) {
        resp = await PicklistService.getPicklist({
          "inputFields": {
            "picklistId": payload.id,
            "itemStatusId": "PICKITEM_CANCELLED",
            "itemStatusId_op": "notEqual"
          },
          "fieldList": ["productId", "productName", "picklistId", "locationSeqId", "picklistBinId", "statusId"],
          "entityName": "PicklistItemsView",
          "noConditionFind": "Y",
          "viewSize": 200,
          viewIndex
        });

        if (!hasError(resp) && resp.data.count) {
          pickingItemList = pickingItemList.concat(resp.data.docs)
          viewIndex++;
          total = resp.data.count;

          if(pickingItemList.length >= total) isScrollable = false;
        } else {
          throw resp.data;
        }
      }
    } catch (err: any) {
      showToast(translate('Something went wrong'));
      console.error("error", err);
      return [];
    }

    if(pickingItemList.length) {
      pickingItemList = pickingItemList.map((picklist: any, index: any) => ({ id: index, ...picklist, isChecked: false }))

      current = { picklistId: payload.id, statusId:  pickingItemList[0].statusId, pickingItemList }
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
  },

  updateLastScannedId ({ commit }, id) {
    commit(types.PICKLIST_LAST_SCANNED_ID_UPDATED, id)
  }
}
export default actions;
