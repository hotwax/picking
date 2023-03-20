import { api } from '@/adapter';

const getPickersDetails = async (payload: any): Promise<any> => {
  return api({
    url: "performFind",
    method: "post",
    data: payload
  });
}

export const PartyService = {
  getPickersDetails
}