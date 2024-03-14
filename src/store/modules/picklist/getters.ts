import { GetterTree } from 'vuex'
import PicklistState from './PicklistState';
import RootState from '@/store/RootState'

const getters: GetterTree <PicklistState, RootState> = {
  getPicklists (state) {
    return state.picklist.list;
  },
  getCompletedPicklists (state) {
    return state.completed.list;
  },
  getCurrent (state) {
    return state.current;
  },
  isScrollable(state) {
    return state.picklist.list.length > 0 && state.picklist.list.length < state.picklist.total;
  },
  hideCompletedPicklists(state) {
    return state.filters.hideCompletedPicklists;
  },
  showMyPicklists(state) {
    return state.filters.showMyPicklists;
  },
  getLastScannedId(state) {
    return state.lastScannedId;
  }
}
export default getters;
