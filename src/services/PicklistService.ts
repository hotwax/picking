import api from '@/api';

const getPickingList = async (): Promise<any> => {
  return api({
    url: 'picklists', 
    method: 'get',
    cache: true
  });
}

const getPickingItemList = async (query: any): Promise<any> => {
  return api({
    url: `picklists/${query.id}`,
    method: 'get'
  });
}
const completePicklists = async (payload: any): Promise <any>  => {
  return api({
    url: `picklists/${payload.id}`,
    method: 'post',
    data: payload
  });
}

export const PicklistService = {
  getPickingList,
  getPickingItemList,
  completePicklists
}
