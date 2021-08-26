import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import PicklistState from './PicklistState'
import * as types from './mutation-types'
import { PicklistService } from '@/services/PicklistService'
import { hasError, showToast } from '@/utils'
import { translate } from '@/i18n'

const actions: ActionTree<PicklistState, RootState> = {
  async findPickingList ({ commit }) {
    let resp;

    try {
      resp = await PicklistService.getPickingList();

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

  async setCurrentPicklist ({ commit }, payload) {
    let resp;

    try {
      resp = await PicklistService.getPickingItemList({'id': payload.id});

      if (resp.status === 200 && resp.data.pickingItemList && !hasError(resp)) {
        commit(types.PICKLIST_CURRENT, { current: resp.data.pickingItemList })
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

  async findPickingDetailList ({ commit }) {
    let resp;

    try {
      resp = await PicklistService.getPickingDetailList();

      if (resp.status === 200 && resp.data.pickingDetailList && !hasError(resp)) {
        commit(types.PICKLIST_DETAIL_ITEMS, { list: resp.data.pickingDetailList })
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

  async setCurrentPicklistDetail ({ commit }, payload) {
    let resp;

    try {
      resp = await PicklistService.getPickingDetailItemList({'id': payload.id});

      if (resp.status === 200 && resp.data.pickingDetailItemList && !hasError(resp)) {
        commit(types.PICKLIST_DETAIL_CURRENT, { current: resp.data.pickingDetailItemList })
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
  }
}
export default actions;
