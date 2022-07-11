<template>
  <div>
    <el-dialog
      :visible.sync="propsData.dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1200px"
      @close="formDataCancel"
    >
      <div slot="title">
        <i class="el-icon-document"></i>
        {{ propsData.dialogName }}
      </div>
      <div class="content-wrap">
        <!-- 基本信息 -->
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span>基本信息</span>
          </p>
          <ul class="clearfix">
            <li class="info-list fl clearfix">
              <span class="info-list-title fl">用户ID：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list fl clearfix">
              <span class="info-list-title fl">用户昵称：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list fl clearfix">
              <span class="info-list-title fl">头像：</span>
              <p class="info-list-content fl bold">
                <el-image
                  fit="cover"
                  style="width: 30px; height: 30px"
                  :src="
                    detailData.c +
                    '?x-oss-process=image/resize,m_fill,h_30,w_30,limit_0,'
                  "
                ></el-image>
              </p>
            </li>
          </ul>
        </div>
        <!-- 认证信息 -->
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span>认证信息</span>
          </p>
          <!-- 个人认证信息 -->
          <ul>
            <li class="info-list info-list2">
              <span class="info-list-title fl">申请认证身份：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">擅长领域：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">个人简介：</span>
              <p class="info-list-content2 fl bold">
                {{ detailData.i || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">作品：</span>
              <ul class="info-list-content fl">
                <li v-for="ind in [1, 2, 3, 4, 5]" :key="ind" class="bold">
                  {{ detailData.a || '--' }}<span class="down-link">下载</span>
                </li>
              </ul>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">常用站：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">补充说明：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
          </ul>
          <!-- 企业认证信息 -->
          <ul>
            <li class="info-list info-list2">
              <span class="info-list-title fl">认证身份：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">企业名称：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">企业介绍：</span>
              <p class="info-list-content2 fl bold">
                {{ detailData.i || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">企业官网：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">联系人姓名：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">联系人手机号：</span>
              <p class="info-list-content fl bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list info-list2">
              <span class="info-list-title fl">营业执照：</span>
              <p class="info-list-content fl bold">
                <el-image
                  fit="cover"
                  style="width: 30px; height: 30px"
                  :src="
                    detailData.c +
                    '?x-oss-process=image/resize,m_fill,h_30,w_30,limit_0,'
                  "
                  :preview-src-list="[detailData.c]"
                ></el-image>
              </p>
            </li>
          </ul>
        </div>
        <!-- 审核记录 -->
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span> 审核记录</span>
          </p>
          <el-table
            :data="tableData"
            border
            :header-cell-style="{
              background: '#F5F5F5',
              color: '#94969A'
            }"
          >
            <el-table-column align="center" prop="result" label="审核结果">
            </el-table-column>
            <el-table-column align="center" prop="idea" label="审核意见">
            </el-table-column>
            <el-table-column
              align="center"
              prop="auditDate"
              label="提交审核时间"
            >
            </el-table-column>
            <el-table-column align="center" prop="person" label="审核人">
            </el-table-column>
            <el-table-column align="center" prop="date" label="审核时间">
            </el-table-column>
          </el-table>
        </div>
        <!-- 审核结果 -->
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span>审核结果</span>
          </p>
          <el-radio v-model="personAuditForm.auditResult" :label="1"
            >审核通过</el-radio
          >
          <el-radio v-model="personAuditForm.auditResult" :label="2"
            >审核不通过</el-radio
          >
        </div>
        <!-- 审核意见 -->
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span>审核意见</span>
          </p>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入审核意见"
            v-model="personAuditForm.auditOpinion"
          >
          </el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="formDataCancel">取 消 </el-button>
        <el-button size="mini" type="primary" @click="submitAuditFormData"
          >提 交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CertificationAuditDetailDialog',
  props: {
    propsData: Object
  },
  data() {
    return {
      detailData: {
        a: 123456,
        b: '艺术家123456',
        c: 'https://bbs-official-website.oss-cn-beijing.aliyuncs.com/bbs-official-website/20220225/85cbfdbe-ef91-46be-acb9-4afb47a5df81/1645762231186',
        d: 18888888888,
        e: '男',
        f: 20,
        g: '射手座',
        h: '北京市',
        i: '个程序/PC/后台人简介个人简介个程序程序/PC/后台程序/PC/后台程序/PC/后台程序/PC/后台/PC/后台人简介个人简程序/PC/后台简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介',
        j: '小程序/PC/后台创建',
        k: '微信昵称（微信号）',
        l: '未认证/已认证',
        m: '未认证/个人认证审核中/个人已认证/企业认证审核中/企业已认证',
        n: '2022-05-30 12:00',
        o: '2022-05-30 12:00'
      },
      personAuditForm: {
        auditResult: 1,
        auditOpinion: ''
      },
      tableData: [
        {
          id: 66,
          date: '2016-05-02 08:08:08',
          result: '审核通过',
          idea: '审核意见',
          auditDate: '2016-05-02 08:08:08',
          address: '上海市普陀区金沙江路 1518 弄',
          person: 'Cid'
        },
        {
          id: 66,
          date: '2016-05-02 08:08:08',
          result: '审核不通过',
          idea: '审核意见',
          auditDate: '2016-05-02 08:08:08',
          person: 'Cid'
        }
      ]
    }
  },
  mounted() {
    this.getDetailData()
  },
  methods: {
    formDataCancel() {
      this.propsData.dialogVisible = false
    },
    submitAuditFormData() {
      // 二次确认
      let confirmMsg = ``
      if (this.personAuditForm.auditResult == 1) {
        confirmMsg = `确认要审核通过吗？`
      } else if (this.personAuditForm.auditResult == 2) {
        confirmMsg = `确认要审核不通过吗？`
      }
      this.$confirm(confirmMsg, '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        showClose: false,
        type: 'warning'
      })
        .then(() => {
          // api
        })
        .catch(() => {})
    },
    getDetailData() {}
  }
}
</script>
<style lang="scss" scoped>
.info-list {
  padding: 8px 0;
  width: 320px;
  margin-right: 0px;
  .info-list-title {
    width: 120px;
    text-align: right;
    height: 20px;
    line-height: 20px;
  }
  .info-list-content {
    width: calc(100% - 120px);
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    .down-link {
      cursor: pointer;
      font-weight: normal;
      font-size: 12px;
      color: #169bd5;
      padding-left: 10px;
    }
  }
  .real-name-auth {
    color: #4b7902;
  }
  .attestation {
    color: #57c398;
  }
  .attestating {
    color: #f59a23;
  }
}
.info-list2 {
  width: 100%;
  .info-list-content {
    line-height: 24px;
  }
  .info-list-content2 {
    width: calc(100% - 120px);
    line-height: 24px;
    font-size: 14px;
  }
}
.intro-box {
  width: 100%;
  padding: 0;
  .intro {
    width: calc(100% - 120px);
    line-height: 22px;
  }
}
.list-title {
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  background: #eee;
  font-size: 14px;
  margin-bottom: 5px;
}
.table-wrapper {
  margin-bottom: 10px;
  .audit-pass {
    color: #4b7902;
  }
  .audit-unpass {
    color: #d9001b;
  }
}
</style>
<style lang="scss"></style>
