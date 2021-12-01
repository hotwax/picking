import api from '@/api';

const getPicklists = async (): Promise<any> => {
  return api({
    url: 'picklists', 
    method: 'get',
    cache: true
  });
}

// Fetch products 
const fetchProducts = async (query: any): Promise <any>  => {
  return api({
          url: "searchProducts", 
          method: "post",
          data: query,
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
    data: payload
  });
}

export const PicklistService = {
  getPicklist,
  fetchProducts,
  getPicklists,
  completePicklists
}
