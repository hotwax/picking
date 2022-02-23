import { GetterTree } from 'vuex'
import PicklistState from './PicklistState';
import RootState from '@/store/RootState'

const getters: GetterTree <PicklistState, RootState> = {
  getPicklists (state) {
    return state.picklist.list
  },
  getCurrent (state) {
    return state.current;
  },
  isScrollable(state) {
    console.log("djghj")
    return state.picklist.list.length > 0 && state.picklist.list.length < state.picklist.total;
  }
}
export default getters;
