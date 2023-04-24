import { api } from '@/adapter';

const getPicklists = async (payload: any): Promise<any> => {
  return api({
    url: '/performFind',
    method: 'post',
    data: payload
  })
}

const getPicklist = async (payload: any): Promise<any> => {
  return api({
    url: '/performFind',
    method: 'post',
    data: payload
  })
}

const completePicklist = async (payload: any): Promise <any>  => {
  return api({
    url: 'pickPicklist',
    method: 'post',
    data: payload,
  });
}

export const PicklistService = {
  getPicklist,
  getPicklists,
  completePicklist
}
