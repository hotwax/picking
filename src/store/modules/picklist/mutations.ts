import { MutationTree } from 'vuex'
import PicklistState from './PicklistState'
import * as types from './mutation-types'

const mutations: MutationTree <PicklistState> = {
  [types.PICKLISTS_UPDATED] (state, payload) {
    state.list = payload.list;
  },
  [types.PICKLIST_CURRENT_UPDATED] (state, payload) {
    state.current = payload.current;
  }
}
export default mutations;
