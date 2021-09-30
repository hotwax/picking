import { GetterTree } from 'vuex'
import PicklistState from './PicklistState';
import RootState from '@/store/RootState'

const getters: GetterTree <PicklistState, RootState> = {
  getPickingList (state) {
    return state.list;
  },
  getCurrent (state) {
    return state.current;
  },
  getSelectedProducts (state) {
    return state.selectedProducts;
},
  getSelectedProductsToCompletePicklist: (state) => (toFacilityId: string) => {
  return state.selectedProducts.map((list) => {
      return {
          orderId: list.orderId,
          orderItemSeqId: list.orderItemSeqId,
          toFacilityId
        }
  });
},
}
export default getters;
