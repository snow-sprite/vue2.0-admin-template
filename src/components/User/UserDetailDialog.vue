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
        <ul class="clearfix">
          <li class="info-list fl clearfix">
            <span class="info-list-title">用户ID：</span>
            <p class="info-list-content bold">
              {{ detailData.a || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">用户昵称：</span>
            <p class="info-list-content bold">
              {{ detailData.b || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">用户头像：</span>
            <p class="info-list-content bold">
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
          <li class="info-list fl clearfix">
            <span class="info-list-title">手机号：</span>
            <p class="info-list-content bold">
              {{ detailData.d || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">性别：</span>
            <p class="info-list-content bold">
              {{ detailData.e || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">年龄：</span>
            <p class="info-list-content bold">
              {{ detailData.f || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">星座：</span>
            <p class="info-list-content bold">
              {{ detailData.g || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">所在地：</span>
            <p class="info-list-content bold">
              {{ detailData.h || '--' }}
            </p>
          </li>
        </ul>
        <div class="info-list clearfix intro-box">
          <span class="info-list-title">个人简介：</span>
          <p class="fl bold intro">
            {{ detailData.i || '--' }}
          </p>
        </div>
        <ul class="clearfix">
          <li class="info-list fl clearfix">
            <span class="info-list-title">用户来源：</span>
            <p class="info-list-content bold">
              {{ detailData.j || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">第三方账号绑定：</span>
            <p class="info-list-content bold">
              {{ detailData.k || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">实名认证：</span>
            <!-- 实名认证 已认证class: real-name-auth -->
            <p class="info-list-content bold real-name-auth">
              {{ detailData.l || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">创作者认证状态：</span>
            <!-- 创作者认证 已认证class: attestation 认证中class: attestating -->
            <p class="info-list-content bold attestation">
              {{ detailData.m || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">注册时间：</span>
            <p class="info-list-content bold">
              {{ detailData.n || '--' }}
            </p>
          </li>
          <li class="info-list fl clearfix">
            <span class="info-list-title">最后登录时间：</span>
            <p class="info-list-content bold">
              {{ detailData.o || '--' }}
            </p>
          </li>
        </ul>
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span>报名的需求</span>
          </p>
          <p class="demand-total">需求总数：<span class="bold">20</span></p>
          <el-table
            :data="tableData"
            border
            :header-cell-style="{
              background: '#F5F5F5',
              color: '#94969A'
            }"
          >
            <el-table-column align="center" prop="id" label="需求ID" width="60">
            </el-table-column>
            <el-table-column prop="address" label="需求标题"> </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="需求状态"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="需求金额"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="期限"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="报名环节"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="报名时间"
              width="120"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span>接到的需求</span>
          </p>
          <p class="demand-total">需求总数：<span class="bold">20</span></p>
          <el-table
            :data="tableData"
            border
            :header-cell-style="{
              background: '#F5F5F5',
              color: '#94969A'
            }"
          >
            <el-table-column align="center" prop="id" label="需求ID" width="60">
            </el-table-column>
            <el-table-column align="center" prop="address" label="需求标题">
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="需求状态"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="需求金额"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="期限"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="任务数量"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="已结算金额"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="80"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="getSettlementTableDetail(scope.row.id, '结算明细')"
                  >结算明细</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span>实名认证信息</span>
          </p>
          <ul class="clearfix">
            <li class="info-list fl clearfix">
              <span class="info-list-title">真实姓名：</span>
              <p class="info-list-content bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list fl clearfix">
              <span class="info-list-title">身份证号：</span>
              <p class="info-list-content bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
            <li class="info-list fl clearfix">
              <span class="info-list-title">实名认证时间：</span>
              <p class="info-list-content bold">
                {{ detailData.a || '--' }}
              </p>
            </li>
          </ul>
        </div>
        <div class="table-wrapper">
          <p class="list-title flex-between">
            <span>创作者认证审核记录</span>
          </p>
          <el-table
            :data="tableData"
            border
            :header-cell-style="{
              background: '#F5F5F5',
              color: '#94969A'
            }"
          >
            <el-table-column
              align="center"
              prop="id"
              label="审核结果"
              width="120"
            >
              <template slot-scope="scope">
                <span class="audit-pass">审核通过</span>
                <!-- <span class="audit-unpass">审核不通过</span> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="审核意见">
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="提交审核时间"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="审核人"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="审核时间"
              width="120"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="formDataCancel"
          >关闭
        </el-button>
      </div>
    </el-dialog>

    <!-- 结算明细弹窗 -->
    <DemandBillingDialog
      :props-data="settlementDetailData"
      v-if="settlementDetailData.dialogVisible"
    >
    </DemandBillingDialog>
  </div>
</template>

<script>
import DemandBillingDialog from '@/components/Demand/DemandBillingDialog.vue'
export default {
  name: 'UserDetailDialog',
  props: {
    propsData: Object
  },
  components: {
    DemandBillingDialog
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
      tableData: [
        {
          id: 66,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 66,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 66,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 66,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 66,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      // 用户详情
      settlementDetailData: {
        dialogName: '',
        dialogVisible: false
      },

      demandBillingData: {
        dialogName: '',
        dialogVisible: false
      }
    }
  },
  mounted() {
    this.getDetailData()
  },
  methods: {
    formDataCancel() {
      this.propsData.dialogVisible = false
    },
    getDetailData() {},
    getSettlementTableDetail(id, title) {
      this.settlementDetailData.dialogName = title
      this.settlementDetailData.dialogVisible = true
    }
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
    float: left;
    height: 20px;
    line-height: 20px;
  }
  .info-list-content {
    width: calc(100% - 120px);
    line-height: 20px;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
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
.intro-box {
  width: 100%;
  padding: 0;
  .intro {
    width: calc(100% - 120px);
    line-height: 22px;
  }
}
.info-list2 {
  width: 100%;
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
  .demand-total {
    margin-bottom: 5px;
  }
  .audit-pass {
    color: #4b7902;
  }
  .audit-unpass {
    color: #d9001b;
  }
}
</style>
<style lang="scss"></style>
