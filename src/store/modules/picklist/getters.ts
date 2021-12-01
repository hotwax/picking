import { GetterTree } from 'vuex'
import PicklistState from './PicklistState';
import RootState from '@/store/RootState'

const getters: GetterTree <PicklistState, RootState> = {
  getPicklists (state) {
    return state.list;
  },
  getCurrent (state) {
    return state.current;
  },
  getCached (state) {
    return state.cached
  },
  getList (state) {
    return state.products
  },
  getProduct: (state) => (productId: string) => {
    return state.cached[productId] ? state.cached[productId] : {};
  },
  getSelectedProducts (state) {
    return state.selectedProducts;
  },
  getCompletePicklist: (state) => (toFacilityId: string) => {
    return state.selectedProducts.map((list) => {
      return {
        picklistId: list.picklistId,
        picklistItemSeqId: list.picklistItemSeqId,
        toFacilityId
      }
    });
  },
}
export default getters;
