import { PartyService } from "@/services/PartyService";
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import PartyState from './PartyState'
import * as types from './mutation-types'
import { hasError } from '@/utils'


const actions: ActionTree<PartyState, RootState> = {

  async getPickersDetails({commit, state}, pickersLoginIds) {
    const unavailablePickersLoginIds = pickersLoginIds.filter((pickersLoginId: any) => !state.namesByLoginId[pickersLoginId]);
    if(!unavailablePickersLoginIds.length) return state.namesByLoginId;

    let resp;
    const params = {
      "inputFields": {
        "partyId": unavailablePickersLoginIds,
        "userLoginId_op": 'in'
      },
      "fieldList": ["firstName", "lastName", "partyId"],
      "entityName": "PartyAndUserLoginAndPerson",
      "viewSize": unavailablePickersLoginIds.length,
      "noConditionFind": "Y"
    }
    try { 
      resp = await PartyService.getPickersDetails(params);
      if (resp.status == 200 && !hasError(resp) && resp.data.count > 0) {
        const pickersDetails = resp.data.docs;
        const pickersDetailsByLoginId = pickersDetails.reduce((pickersDetailsByLoginId: any, pickerDetails: any) => {
          pickerDetails.fullName = pickerDetails.firstName + ' ' + pickerDetails.lastName;
          pickersDetailsByLoginId[pickerDetails.partyId] = pickerDetails;
          return pickersDetailsByLoginId;
        }, {});
        commit(types.PARTY_NAMES_BY_LOGIN_ID_UPDATED, pickersDetailsByLoginId);
      } else {
        console.error(resp);
      }
    } catch(err) {
      console.error(err);
    }
    return state.namesByLoginId;
  }
}

export default actions;