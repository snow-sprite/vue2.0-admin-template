<template>
  <div class="wrapper">
    <div id="review-top-height">
      <div class="search-wrap flex-start">
        <ul class="clearfix" style="flex: 1">
          <li class="search-list fl flex-start">
            <p>用户昵称：</p>
            <el-input
              class="search-list-content"
              size="mini"
              v-model="search.nickname"
              placeholder="请输入用户昵称"
              prefix-icon="el-icon-search"
            ></el-input>
          </li>
          <li class="search-list fl flex-start">
            <p>审核状态：</p>
            <el-select
              class="search-list-content"
              size="mini"
              v-model="search.realNameType"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in realNameEarnestTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li class="search-list fl flex-start">
            <el-button type="primary" size="mini" @click="searchByConditions"
              >搜索</el-button
            >
            <el-button size="mini" @click="tableDataReset">重置</el-button>
          </li>
        </ul>
      </div>
    </div>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      :height="`${tableHeight}px`"
      :header-cell-style="{ background: '#eef1f6', color: '#94969A' }"
    >
      <el-table-column align="center" type="index" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{ (cp - 1) * rows + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="id"
        show-overflow-tooltip
        label="用户ID"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        show-overflow-tooltip
        label="用户昵称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="threepart"
        label="认证身份"
      ></el-table-column>
      <el-table-column align="center" prop="realNameEarnest" label="审核状态">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameEarnest || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="提交审核时间">
        <template slot-scope="scope">
          <span>{{ scope.row.date || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="getTableDetail(1, scope.row.id, '个人/企业认证审核/详情')"
            >详情</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="getTableDetail(2, scope.row.id, '个人/企业认证审核/详情')"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination-wrap"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="cp"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 用户详情&审核 -->
    <CertificationAuditDetailDialog
      :props-data="detailData"
      v-if="detailData.dialogVisible"
    ></CertificationAuditDetailDialog>
  </div>
</template>

<script>
// import { getList, delItem, sortItem, publishApi } from '@/api/officeWebsit.js'
import { setLocalStorage, getLocalStorage } from '@/utils/storage.js'
import {
  delEmptyData,
  debounce,
  calcSearchSetTableHeight
} from '@/utils/util.js'
import CertificationAuditDetailDialog from '@/components/User/CertificationAuditDetailDialog.vue'
export default {
  name: 'Partner',
  components: {
    CertificationAuditDetailDialog
  },
  data() {
    return {
      search: {
        nickname: '',
        realNameType: ''
      },
      // 实名认证类型列表
      realNameEarnestTypes: [
        {
          value: 1,
          label: '个人'
        },
        {
          value: 2,
          label: '公司'
        }
      ],
      loading: false,
      cp: 1,
      rows: 10,
      total: 0,
      tableHeight: 0,
      tableData: [
        {
          id: 56,
          nickname: 'Cid',
          threepart: '企业',
          realNameEarnest: '待审核',
          date: '2088-08-08 66:66:66'
        }
      ],
      // 用户详情
      detailData: {
        dialogName: '',
        dialogVisible: false,
        dialogType: ''
      }
    }
  },
  created() {
    // this.getListData(1)
  },
  mounted() {
    let self = this
    this.$nextTick(() => {
      self.windowOnResize()
      window.onresize = debounce(() => {
        self.windowOnResize()
      }, 100)
    })
  },
  methods: {
    // 项目添加/编辑
    getEmitTableData() {
      this.getListData(this.cp)
    },
    searchByConditions() {
      this.getListData(1)
    },
    tableDataReset() {
      this.search = this.$options.data().search
      this.getListData(1)
    },
    // 获取列表
    getListData(cp) {
      this.cp = cp
      let postData = {
        cp: this.cp,
        likeName: this.search.nickname
      }
      let getRows = getLocalStorage('CURRENT_ROWS') || ''
      if (getRows) {
        this.rows = Number(getRows)
      }
      postData.rows = this.rows
      this.loading = true
      getList(delEmptyData(postData))
        .then(res => {
          this.loading = false
          // let resData = res.data;
          let dataList = res.data
          this.tableData = dataList
          this.total = res.data.length
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 详情
    getTableDetail(type, id, dialogName) {
      this.detailData.dialogType = type
      this.detailData.dialogVisible = true
      this.detailData.dialogName = dialogName
    },
    // 搜索
    tableDataSearch() {
      this.cp = 1
      this.getListData(this.cp)
    },
    // 分页
    handleSizeChange(val) {
      this.rows = val
      setLocalStorage('CURRENT_ROWS', this.rows)
      this.getListData(1)
    },
    handleCurrentChange(val) {
      this.cp = val
      this.getListData(this.cp)
    },
    windowOnResize() {
      this.$nextTick(() => {
        this.tableHeight = calcSearchSetTableHeight('review-top-height', 170)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/wrapper.scss';
</style>
