import api from "@/api";

const getPicklist = async () => {
  return api({
    url: "picklists", 
    method: "get",
  });
}

export const PicklistService = {
  getPicklist
}