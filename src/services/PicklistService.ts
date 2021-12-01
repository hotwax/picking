import api from '@/api';

const getPicklists = async (): Promise<any> => {
  return api({
    url: 'picklists', 
    method: 'get',
    cache: true
  });
}

const getPicklist = async (query: any): Promise<any> => {
  return api({
    url: `picklists/${query.id}`,
    method: 'get'
  });
}

const completePicklists = async (payload: any): Promise <any>  => {
  return api({
    url: `convertAndUploadCsv`,
    method: 'post',
    data: payload.data,
    headers: payload.headers
  });
}

export const PicklistService = {
  getPicklist,
  getPicklists,
  completePicklists
}
