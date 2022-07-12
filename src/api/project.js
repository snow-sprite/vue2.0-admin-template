import request from "@/utils/request";


// 项目——项目下拉
export const projectInfoComList = (data) => {
  return request({
    url: "/project/projectInfo/comList",
    method: "post",
    data,
  });
};
