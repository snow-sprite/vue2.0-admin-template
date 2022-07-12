import request from "@/utils/request";

// 用户管理——外包成员下拉列表
export const customerComList = () => {
  return request({
    url: `/user/userCustomerInfo/comList`,
    method: "get",
  });
};
