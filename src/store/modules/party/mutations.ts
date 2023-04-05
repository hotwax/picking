import { MutationTree } from 'vuex'
import PartyState from './PartyState'
import * as types from './mutation-types'

const mutations: MutationTree <PartyState> = {
  [types.PARTY_NAMES_BY_PARTY_ID_UPDATED] (state, pickersDetails) {
    Object.keys(pickersDetails).map((pickersPartyId: any) => {
      state.namesByPartyId[pickersPartyId] = pickersDetails[pickersPartyId];
    })
  }
}
export default mutations;