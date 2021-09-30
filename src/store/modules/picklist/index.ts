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
    list: [],
    selectedProducts:[]
  },
  getters,
  mutations,
  actions
}

export default picklistModule;
