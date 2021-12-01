import { GetterTree } from 'vuex'
import PicklistState from './PicklistState';
import RootState from '@/store/RootState'

const getters: GetterTree <PicklistState, RootState> = {
  getPicklists (state) {
    return state.list;
  },
  getCurrent (state) {
    console.log("Current",state.current)
    return state.current;
  },
  getCached (state) {
    console.log("GetCached", state.cached)
    return state.cached
  },
  getList (state) {
    console.log(state)
    console.log("List", state.products)
    return state.products
  },
  getProduct: (state) => (productId: string) => {
    return state.cached[productId] ? state.cached[productId] : {};
},
  getSelectedProducts (state) {
    return state.selectedProducts;
  },
  getSelectedProductsToCompletePicklist: (state) => (toFacilityId: string) => {
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
