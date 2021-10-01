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

  /**
   * Complete Picklist
   */
   async completePicklists ( payload: any ) {
    const resp = await PicklistService.completePicklists({'id': payload.id});
    if (resp.status === 200 && !hasError(resp)) {
      this.dispatch("picklist/selectedProducts");
      showToast(translate("Picklist Completed"));
    } else {
      showToast(translate("Something went wrong"));
    }
    return resp;
  },

  /**
   * Add product to selected products
   */
   addToSelectedProducts  ( { commit, state } , { list }) {
    state.selectedProducts.push(list);
    commit(types.PICKLIST_SELECTED_PRODUCTS_UPDATED, { selectedProducts: state.selectedProducts } );
  },
  /**
   * Remove products from list
   */
   removeFromSelectedProducts  ( { commit, state } , { index }) {
    state.selectedProducts.splice(index, 1);
    commit(types.PICKLIST_SELECTED_PRODUCTS_UPDATED, { selectedProducts: state.selectedProducts } );
  },
   /**
   * Add all products
   */
    addAllSelectedProducts  ( { commit, state } ) {
      state.selectedProducts.forEach((list: any) => {
        list.isChecked = false;
    })
      commit(types.PICKLIST_SELECTED_PRODUCTS_UPDATED, { selectedProducts: [] } );
    }
}
export default actions;
