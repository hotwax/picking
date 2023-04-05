import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import PartyState from './PartyState'
import RootState from '../../RootState'

const PartyModule: Module<PartyState, RootState> = {
    namespaced: true,
    state: {
      namesByPartyId: {},
    },
    getters,
    actions,
    mutations,
}

export default PartyModule;