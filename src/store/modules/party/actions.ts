import { PartyService } from "@/services/PartyService";
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import PartyState from './PartyState'
import * as types from './mutation-types'
import { hasError } from '@/utils'


const actions: ActionTree<PartyState, RootState> = {

  async getPickersDetails({commit, state}, pickersPartyIds) {
    const unavailablePickersPartyIds = pickersPartyIds.filter((pickersPartyId: any) => !state.namesByPartyId[pickersPartyId]);
    if(!unavailablePickersPartyIds.length) return state.namesByPartyId;

    let resp;
    const params = {
      "inputFields": {
        "partyId": unavailablePickersPartyIds,
        "userPartyId_op": 'in'
      },
      "fieldList": ["firstName", "lastName", "partyId"],
      "entityName": "PartyNameView",
      "viewSize": unavailablePickersPartyIds.length,
      "distinct": "Y",
      "noConditionFind": "Y"
    }
    try { 
      resp = await PartyService.getPickersDetails(params);
      if (resp.status == 200 && !hasError(resp) && resp.data.count > 0) {
        const pickersDetails = resp.data.docs;
        const pickersDetailsByPartyId = pickersDetails.reduce((pickersDetailsByPartyId: any, pickerDetails: any) => {
          pickerDetails.fullName = pickerDetails.firstName + ' ' + pickerDetails.lastName;
          pickersDetailsByPartyId[pickerDetails.partyId] = pickerDetails;
          return pickersDetailsByPartyId;
        }, {});
        commit(types.PARTY_NAMES_BY_PARTY_ID_UPDATED, pickersDetailsByPartyId);
      } else {
        console.error(resp);
      }
    } catch(err) {
      console.error(err);
    }
    return state.namesByPartyId;
  }
}

export default actions;