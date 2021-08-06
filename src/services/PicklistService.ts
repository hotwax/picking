import api from "@/api";

const getPicklist = async (): Promise<any> => {
  return api({
    url: "picklists", 
    method: "get",
  });
}

export const PicklistService = {
  getPicklist
}