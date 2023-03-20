import { MutationTree } from 'vuex'
import PartyState from './PartyState'
import * as types from './mutation-types'

const mutations: MutationTree <PartyState> = {
  [types.PARTY_NAMES_BY_LOGIN_ID_UPDATED] (state, pickersDetails) {
    Object.keys(pickersDetails).map((pickersLoginId: any) => {
      state.namesByLoginId[pickersLoginId] = pickersDetails[pickersLoginId];
    })
  }
}
export default mutations;