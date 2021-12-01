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
