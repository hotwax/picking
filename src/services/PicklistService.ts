import api from "@/api";

const getPicklistDetail = async () => {
  return api({
    url: "picklist-details",
    method: "get",
  });
};

export const PicklistService = {
  getPicklistDetail,
};
