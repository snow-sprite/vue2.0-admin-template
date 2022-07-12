import request from "@/utils/request";

// 需求列表——需求列表
export const demandInfoList = (data) => {
  return request({
    url: "/demand/demandInfo/list",
    method: "post",
    data,
  });
};
// 需求列表——需求新增
export const demandInfoAdd = (data) => {
  return request({
    url: "/demand/demandInfo/add",
    method: "post",
    data,
  });
};
// 需求列表——需求编辑
export const demandInfoUpdate = (data) => {
  return request({
    url: "/demand/demandInfo/update",
    method: "post",
    data,
  });
};
// 需求列表——需求编辑
export const demandInfoDelete = (data) => {
  return request({
    url: "demand/demandInfo/deleted",
    method: "post",
    data,
  });
};
// 需求列表——需求详情
export const demandInfoDetail = (data) => {
  return request({
    url: `/demand/demandInfo/detail/${data.id}`,
    method: "get",
  });
};
// 需求列表——需求状态
export const demandStatus = () => {
  return request({
    url: `/demand/demandInfo/demandStatus`,
    method: "get",
  });
};

// 需求列表——需求状态修改
export const demandUpdateStatus = (data) => {
  return request({
    url: `demand/demandInfo/updateStatus`,
    method: "post",
    data,
  });
};

// 需求详情——需求报名信息
export const demandEnlist = (id) => {
  return request({
    url: `/demand/demandInfo/enlist/${id}`,
    method: "get",
  });
};

// 需求详情——需求任务列表
export const demandTaskList = (demandId) => {
  return request({
    url: `/demand/demandInfo/getTask/${demandId}`,
    method: "get",
  });
};

// 需求详情——需求添加任务
export const demandTaskAdd = (data) => {
  return request({
    url: `/demand/demandInfo/addTask`,
    method: "post",
    data,
  });
};

// 需求详情——任务列表
export const taskList = (data) => {
  return request({
    url: `/task/taskInfo/getList`,
    method: "post",
    data,
  });
};

// 需求详情——需求任务移除
export const demandRemoveTask = (data) => {
  return request({
    url: `demand/demandInfo/removeTask`,
    method: "post",
    data,
  });
};

// 结算——列表
export const paymentList = (data) => {
  return request({
    url: `/demand/payment/list`,
    method: "post",
    data,
  });
};

// 结算——申请结算
export const paymenAdd = (data) => {
  return request({
    url: `/demand/payment/add`,
    method: "post",
    data,
  });
};

// 结算——结算单详情
export const taskSettlement = (data) => {
  return request({
    url: `/demand/payment/settlement`,
    method: "post",
    data,
  });
};

// 结算——结算单详情
export const customerTaskList = (data) => {
  return request({
    url: `/task/taskInfo/customerTaskList`,
    method: "post",
    data,
  });
};

// 结算——申请任务结算
export const paymenDetail = (id) => {
  return request({
    url: `/demand/payment/detail/${id}`,
    method: "get",
  });
};

// 环节下拉列表【无权限】
export const getTypeComList = (data) => {
  return request({
    url: `/project/projectTaskType/getTypeComList`,
    method: "post",
    data,
  });
};

// 获取状态下拉列表【无权限】
export const comTaskStatus = (module, data) => {
  return request({
    url: `project/projectStatus/${module}/comTaskStatus`,
    method: "post",
    data,
  });
};

// 获取某个需求的制作方
export const demandBidCu = (demandId) => {
  return request({
    url: `/demand/demandInfo/bidCu/${demandId}`,
    method: "get",
  });
};

// 需求详情——需求制作方新增
export const demandBidCuAdd = (data) => {
  return request({
    url: `/demand/demandBidCu/add`,
    method: "post",
    data,
  });
};

// 需求详情——需求制作方新增
export const demandBidCuDelete = (data) => {
  return request({
    url: `/demand/demandBidCu/deleted`,
    method: "post",
    data,
  });
};

// 结算记录——审核详情
export const verifyDetail = (id) => {
  return request({
    url: `/demand/payment/verify/detail/${id}`,
    method: "get",
  });
};

// 结算记录——审核详情
export const paymentCancel = (data) => {
  return request({
    url: `/demand/payment/cancel`,
    method: "post",
    data,
  });
};

// 需求任务列表—筛选
export const demandTaskComList = (data) => {
  return request({
    url: `/demand/demandInfo/getTask`,
    method: "post",
    data,
  });
};

// 审批状态
export const workflowStatus = () => {
  return request({
    url: `/demand/payment/workflowStatus`,
    method: "get",
  });
};

// 审批状态
export const workflowDetailType = (type) => {
  return request({
    url: `/demand/payment/workflowDetail/${type}`,
    method: "get",
  });
};

// 结算明细
export const demandBillingDetails = (type) => {
  return request({
    url: `/demand/123456789098765432`,
    method: "get",
  });
};
