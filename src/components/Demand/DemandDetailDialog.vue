<template>
  <div>
    <el-dialog
      :visible.sync="propsData.dialogVisible2"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="80%"
      @close="formDataCancel"
    >
      <div slot="title"><i class="el-icon-document"></i>需求详情</div>
      <div class="content-wrap">
        <el-steps
          :active="statusActive == 3 ? 1 : 2"
          finish-status="success"
          simple
        >
          <el-step title="进行中"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="1">
            <div class="info-wrap">
              <ul class="clearfix">
                <li class="info-list info-list2 fl clearfix">
                  <span class="info-list-title">需求标题：</span>
                  <p class="info-list-content bold" :title="detailData.title">
                    {{ detailData.title }}
                  </p>
                </li>
                <li class="info-list fl clearfix">
                  <span class="info-list-title">项目名称：</span>
                  <p class="info-list-content bold">
                    {{ detailData.projectName }}
                  </p>
                </li>
                <li class="info-list fl clearfix">
                  <span class="info-list-title">项目编号：</span>
                  <p class="info-list-content bold">
                    {{ detailData.projectCode }}
                  </p>
                </li>
                <li class="info-list fl clearfix">
                  <span class="info-list-title">项目类型：</span>
                  <p class="info-list-content bold">
                    {{ detailData.projectTypeName }}
                  </p>
                </li>
                <li class="info-list info-list2 fl clearfix">
                  <span class="info-list-title">环节：</span>
                  <p class="info-list-content2 bold" style="font-size: 14px">
                    <span
                      v-for="(item, index) in detailData.linkInfo"
                      :key="index"
                      >{{ item.link_name }}
                      <span v-if="index != detailData.linkInfo.length - 1"
                        >、</span
                      >
                    </span>
                  </p>
                </li>
                <li class="info-list fl clearfix">
                  <span class="info-list-title">需求金额：</span>
                  <p class="info-list-content bold">
                    <span v-if="detailData.amountType == '1'">{{
                      detailData.enumAmountType
                    }}</span>
                    <span
                      v-if="detailData.amountType == '2' && detailData.amount"
                      >{{ detailData.amount[0] }}~{{
                        detailData.amount[1]
                      }}元</span
                    >
                  </p>
                </li>
                <li class="info-list fl clearfix">
                  <span class="info-list-title">需求期限：</span>
                  <p class="info-list-content bold">
                    <span v-if="detailData.termType == '1'">{{
                      detailData.enumTermType
                    }}</span>
                    <span
                      v-if="detailData.termType == '2' && detailData.termDate"
                      >{{ detailData.termDate[0] }}~{{
                        detailData.termDate[1] || '--'
                      }}</span
                    >
                  </p>
                </li>
                <li class="info-list fl clearfix">
                  <span class="info-list-title">发布人：</span>
                  <p class="info-list-content bold">
                    {{ detailData.createdUserName }}
                  </p>
                </li>
                <li class="info-list fl clearfix">
                  <span class="info-list-title">发布时间：</span>
                  <p class="info-list-content bold">
                    {{ detailData.publishTime }}
                  </p>
                </li>

                <li class="info-list info-list2 fl clearfix">
                  <span class="info-list-title">需求描述：</span>
                  <div class="info-list-content2 bold">
                    <div v-html="detailData.describe"></div>
                  </div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="报名信息" name="2">
            <div>报名人数：共 {{ demandEnlistData.length }} 名</div>
            <el-table
              v-loading="loading"
              v-if="activeName == 2"
              :height="tableHeight"
              ref="multipleTable1"
              :data="demandEnlistData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 10px"
              highlight-current-row
              :header-cell-style="{
                background: 'var(--element-head-bg)',
                color: 'var(--default-primary-text-color)'
              }"
            >
              <el-table-column
                align="center"
                min-width="100"
                prop="realName"
                show-overflow-tooltip
                label="报名用户"
              ></el-table-column>
              <el-table-column
                align="center"
                min-width="100"
                prop="mobile"
                show-overflow-tooltip
                label="手机号"
              >
                <template slot-scope="scope">
                  {{ scope.row.mobile || '--' }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                min-width="100"
                prop="createdTime"
                show-overflow-tooltip
                label="报名时间"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="制作方信息" name="3">
            <el-table
              :data="workerData"
              :height="tableHeight"
              style="width: 100%"
              tooltip-effect="dark"
              highlight-current-row
              :header-cell-style="{
                background: 'var(--element-head-bg)',
                color: 'var(--default-primary-text-color)'
              }"
            >
              <el-table-column
                align="center"
                label="用户账号"
                prop="workerName"
              ></el-table-column>
              <el-table-column align="center" label="手机号" prop="mobile">
                <template slot-scope="scope">
                  {{ scope.row.mobile || '--' }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="公司" prop="customerName">
                <template slot-scope="scope">
                  {{ scope.row.customerName || '--' }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <!-- <el-button
                    type="text"
                    size="mini"
                    @click="workerDeleteClick(scope.row)"
                    >删除</el-button
                  > -->
                  <el-button
                    type="text"
                    size="mini"
                    @click="workerDetailClick(scope.row, '结算明细')"
                    >结算明细</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="任务信息" name="4">
            <el-table
              v-loading="loading"
              v-if="activeName == 4"
              :height="tableHeight"
              ref="multipleTable3"
              :data="demandTaskData"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 10px"
              highlight-current-row
              :header-cell-style="{
                background: 'var(--element-head-bg)',
                color: 'var(--default-primary-text-color)'
              }"
            >
              <el-table-column
                align="center"
                min-width="70"
                prop="taskId"
                show-overflow-tooltip
                label="任务ID"
              ></el-table-column>
              <el-table-column
                align="center"
                min-width="100"
                prop="projectName"
                show-overflow-tooltip
                label="项目"
              ></el-table-column>
              <el-table-column
                align="center"
                min-width="100"
                prop="linkName"
                show-overflow-tooltip
                label="环节"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.linkName || '--' }}</span>
                  <span v-if="scope.row.subLinkName">
                    / {{ scope.row.subLinkName }}</span
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" min-width="100" prop="demandTaskStatusName" show-overflow-tooltip label="需求任务状态"></el-table-column> -->
              <el-table-column
                align="center"
                min-width="100"
                prop="taskStatusName"
                show-overflow-tooltip
                label="任务状态"
              ></el-table-column>
              <el-table-column
                align="center"
                min-width="120"
                prop="targetName"
                show-overflow-tooltip
                label="资产名称/镜头号"
              ></el-table-column>
              <el-table-column
                align="center"
                min-width="80"
                prop="workerName"
                show-overflow-tooltip
                label="制作人"
              ></el-table-column>
              <!-- <el-table-column align="center" min-width="110" prop="companyTypeName" show-overflow-tooltip label="计划开始日期"></el-table-column> -->
              <!-- <el-table-column align="center" min-width="110" prop="companyTypeName" show-overflow-tooltip label="计划结束日期"></el-table-column> -->
              <!-- <el-table-column align="center" min-width="80" prop="companyTypeName" show-overflow-tooltip label="任务日志"></el-table-column> -->
              <el-table-column
                align="center"
                min-width="130"
                prop="createdTime"
                show-overflow-tooltip
                label="创建时间"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <DemandBillingDialog
      :props-data="demandBillingData"
      v-if="demandBillingData.dialogVisible"
    >
    </DemandBillingDialog>
  </div>
</template>

<script>
import {
  demandInfoDetail,
  demandStatus,
  demandTaskList,
  demandEnlist,
  demandBidCu,
  demandBillingDetails
} from '@/api/demand.js'
import DemandBillingDialog from '@/components/Demand/DemandBillingDialog.vue'
export default {
  name: 'DemandDetailDialog',
  props: {
    propsData: {
      dialogVisible2: false
    }
  },
  components: {
    DemandBillingDialog
  },
  data() {
    return {
      statusActive: 3,
      activeName: '1',
      demandStatusData: [],
      detailData: {},
      loading: false,
      tableHeight: 550,
      demandId: '',
      demandEnlistData: [],
      demandTaskData: [],
      workerData: [],
      workerMobile: '',
      workerCompany: '',
      demandBillingData: {
        dialogName: '',
        dialogVisible: false
      }
    }
  },
  created() {
    this.getDemandStatus()
  },
  mounted() {
    this.demandId = this.propsData.row.id
    this.getDetailData()
  },
  methods: {
    getEmitTableDataTask() {
      this.getDemandTaskList()
      this.$emit('emitTableList')
    },
    demandWorkersList() {
      demandBidCu(this.demandId).then(res => {
        if (res.status == 100) {
          this.workerData = res.data
        }
      })
    },
    getEmitTableData() {
      this.demandWorkersList()
      this.$emit('emitTableList')
    },
    workerDetailClick(row, title) {
      this.demandBillingData.dialogName = title
      // let postData = {
      //   id: row.id
      // }
      // demandBillingDetails(postData).then(res => {
      //   if (res.status == 100) {
      this.demandBillingData.dialogVisible = true
      //   }
      // })
    },
    handleClick() {
      if (this.activeName == 1) {
        this.getDetailData()
      } else if (this.activeName == 2) {
        this.getDemandEnlistInfo()
      } else if (this.activeName == 3) {
        this.demandWorkersList()
      } else if (this.activeName == 4) {
        this.getDemandTaskList()
      }
    },
    // 报名信息
    getDemandEnlistInfo() {
      demandEnlist(this.demandId).then(res => {
        if (res.status == 100) {
          this.demandEnlistData = res.data
        }
      })
    },
    // 详情
    getDetailData() {
      let postData = {
        id: this.demandId
      }
      demandInfoDetail(postData).then(res => {
        let resData = res.data
        this.detailData = resData
        this.statusActive = resData.demandStatus
      })
    },
    // 需求任务
    getDemandTaskList() {
      demandTaskList(this.demandId).then(res => {
        if (res.status == 100) {
          this.demandTaskData = res.data
        }
      })
    },
    getDemandStatus() {
      this.demandStatusData = []
      demandStatus().then(res => {
        if (res.status == 100) {
          let resData = res.data
          this.demandStatusData = resData
        }
      })
    },
    formDataCancel() {
      this.activeName == 1
      this.propsData.dialogVisible2 = false
    }
  }
}
</script>
<style lang="scss" scoped>
.content-wrap {
  height: calc(100vh - 380px);
}
.info-list {
  padding: 8px 0;
  width: 270px;
  margin-right: 30px;
  .info-list-title {
    width: 110px;
    text-align: right;
    float: left;
    height: 20px;
    line-height: 20px;
  }
  .info-list-content {
    width: calc(100% - 110px);
    line-height: 20px;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
  .info-list-content2 {
    width: calc(100% - 110px);
    line-height: 20px;
    float: left;
  }
}
.info-list2 {
  width: 100%;
}
.worker {
  & > li {
    margin-right: 40px;
  }
}
</style>
<style lang="scss"></style>
