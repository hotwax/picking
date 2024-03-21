import { api, client, hasError } from '@/adapter'
import store from '@/store';

const login = async (username: string, password: string): Promise <any> => {
  return api({
    url: "login", 
    method: "post",
    data: {
      'USERNAME': username, 
      'PASSWORD': password
    }
  });
}

const checkPermission = async (payload: any): Promise <any>  => {
  const baseURL = store.getters['user/getBaseUrl'];
  return client({
    url: "checkPermission",
    method: "post",
    baseURL: baseURL,
    ...payload
  });
}

const getCurrentEComStore = async (token: any, facilityId: any): Promise<any> => {

  // If the facilityId is not provided, it may be case of user not associated with any facility or the logout
  if (!facilityId) {
    return Promise.resolve({});
  }

  const baseURL = store.getters['user/getBaseUrl'];
  try {
    const data = {
      "inputFields": {
        "facilityId": facilityId,
      },
      "fieldList": ["defaultCurrencyUomId", "productStoreId"],
      "entityName": "ProductStoreFacilityDetail",
      "noConditionFind": "Y",
      "filterByDate": 'Y',
      "viewSize": 1
    }
    const resp = await client({
      url: "performFind",
      method: "post",
      data,
      baseURL,
      headers: {
        Authorization:  'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    if (hasError(resp)) {
      throw resp.data;
    }

    return Promise.resolve(resp.data.docs?.length ? resp.data.docs[0] : {});
  } catch(error: any) {
    console.error(error)
    return Promise.resolve({})
  }
}

const getProfile = async (): Promise <any>  => {
    return api({
      url: "user-profile", 
      method: "get",
    });
}
const getAvailableTimeZones = async (): Promise <any>  => {
  return api({
    url: "getAvailableTimeZones",
    method: "get",
    cache: true
  });
}
const setUserTimeZone = async (payload: any): Promise <any>  => {
  return api({
    url: "setUserTimeZone",
    method: "post",
    data: payload
  });
}

export const UserService = {
    login,
    getAvailableTimeZones,
    getProfile,
    setUserTimeZone,
    checkPermission,
    getCurrentEComStore
}