import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import PicklistState from './PicklistState'
import RootState from '@/store/RootState'

const picklistModule: Module<PicklistState, RootState> = {
  namespaced: true,
  state: {
    current: {},
    picklist: {
      list: [],
      total: 0
    },
    completed: {
      list: [],
      total: 0
    },
    filters: {
      // enabling picklist filters by default
      hideCompletedPicklists: true,
      showMyPicklists: true
    }
  },
  getters,
  mutations,
  actions
}

export default picklistModule;
