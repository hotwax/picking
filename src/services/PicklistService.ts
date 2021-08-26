import api from '@/api';

const getPickingList = async (): Promise<any> => {
  return api({
    url: 'picklists', 
    method: 'get',
    cache: true
  });
}

const getPickingDetailList = async (): Promise<any> => {
  return api({
    url: 'picklist-detail', 
    method: 'get',
    cache: true
  });
}

const getPickingItemList = async (query: any): Promise<any> => {
  return api({
    url: `picklists/${query.id}`,
    method: 'get'
  })
}

const getPickingDetailItemList = async (query: any): Promise<any> => {
  return api({
    url: `picklist-detail/${query.id}`,
    method: 'get'
  })
}

export const PicklistService = {
  getPickingList,
  getPickingDetailList,
  getPickingItemList,
  getPickingDetailItemList
}
