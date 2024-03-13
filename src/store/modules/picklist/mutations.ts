import { MutationTree } from 'vuex'
import PicklistState from './PicklistState'
import * as types from './mutation-types'

const mutations: MutationTree <PicklistState> = {
  [types.PICKLISTS_UPDATED] (state, payload) {
    state.picklist.list = payload.list;
    state.picklist.total = payload.total;
  },
  [types.PICKLISTS_COMPLETED_UPDATED] (state, payload) {
    state.completed.list = payload.list;
    state.completed.total = payload.total;    
  },
  [types.PICKLIST_CURRENT_UPDATED] (state, payload) {
    state.current = payload;
  },
  [types.PICKLIST_FILTERS_UPDATED] (state, payload) {
    state.filters = { ...state.filters, ...payload };
  },
  [types.PICKLIST_LAST_SCANNED_ID_UPDATED] (state, payload) {
    state.lastScannedId = payload
  }
}
export default mutations;
