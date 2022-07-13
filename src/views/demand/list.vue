<template>
  <div class="wrapper">
    <div id="demand-top-height">
      <div class="search-wrap flex-start">
        <ul class="clearfix" style="flex: 1">
          <li class="search-list fl flex-start">
            <p>需求标题：</p>
            <el-input
              style="width: 160px; margin-right: 10px"
              size="mini"
              v-model="searchData.title"
              clearable
              placeholder="需求标题"
              prefix-icon="el-icon-search"
            >
            </el-input>
          </li>
          <li class="search-list fl flex-start">
            <p>项目名称：</p>
            <el-select
              style="width: 160px; margin-right: 10px"
              size="mini"
              v-model="searchData.projectId"
              filterable
              default-first-option
              clearable
              placeholder="项目名称"
              @change="projectChange"
              @focus="projectFocus"
            >
              <el-option
                v-for="item in projectDropData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </li>
          <li class="search-list fl flex-start">
            <p>环节：</p>
            <el-select
              style="width: 160px; margin-right: 10px"
              size="mini"
              v-model="searchData.linkId"
              filterable
              default-first-option
              clearable
              placeholder="环节"
              @focus="linkFocus"
            >
              <el-option
                v-for="item in linkDropData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </li>
          <li class="search-list fl flex-start">
            <p>需求状态：</p>
            <el-select
              style="width: 160px; margin-right: 10px"
              size="mini"
              v-model="searchData.demandStatus"
              filterable
              default-first-option
              clearable
              @focus="getDemandStatus()"
              placeholder="需求状态"
            >
              <el-option
                v-for="item in demandStatusData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </li>
          <li class="search-list fl flex-start">
            <p>需求金额区间：</p>
            <div class="flex-start" style="width: 224px; margin-right: 10px">
              <el-input
                v-model.trim="searchData.amountStart"
                style="width: 100px"
                size="mini"
                clearable
                placeholder="元"
              >
              </el-input>
              <span style="padding: 0 5px">至</span>
              <el-input
                v-model.trim="searchData.amountEnd"
                style="width: 100px"
                size="mini"
                clearable
                placeholder="元"
              >
              </el-input>
            </div>
          </li>
          <li class="search-list fl flex-start">
            <p>期限：</p>
            <el-date-picker
              style="width: 220px; margin-right: 10px"
              size="mini"
              v-model="searchData.timeRange"
              :clearable="true"
              type="daterange"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeRangeChange"
            >
            </el-date-picker>
          </li>
          <li class="search-list fl flex-start">
            <el-button type="primary" size="mini" @click="tableDataSearch"
              >搜索</el-button
            >
            <el-button size="mini" @click="tableDataReset">重置</el-button>
          </li>
        </ul>
      </div>
    </div>

    <div class="list-wrap">
      <el-table
        v-loading="loading"
        :height="`${tableHeight}px`"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        :header-cell-style="{ background: '#eef1f6', color: '#94969A' }"
      >
        <el-table-column
          align="center"
          min-width="120"
          prop="title"
          show-overflow-tooltip
          label="需求标题"
        ></el-table-column>
        <el-table-column
          align="center"
          min-width="80"
          prop="enumDemandStatus"
          show-overflow-tooltip
          label="需求状态"
        ></el-table-column>
        <el-table-column
          align="center"
          min-width="80"
          prop="projectName"
          show-overflow-tooltip
          label="项目名称"
        ></el-table-column>
        <el-table-column
          align="center"
          min-width="80"
          prop="projectTypeName"
          show-overflow-tooltip
          label="项目类型"
        ></el-table-column>
        <el-table-column
          align="center"
          min-width="150"
          prop="linkName"
          show-overflow-tooltip
          label="环节"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.linkInfo" :key="index"
              >{{ item.link_name }}
              <span v-if="index != scope.row.linkInfo.length - 1">、</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="120"
          prop="amount"
          show-overflow-tooltip
          label="需求金额"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.amountType == '1'">{{
              scope.row.enumAmountType
            }}</span>
            <span v-else
              >{{ scope.row.amount[0] }}~{{ scope.row.amount[1] }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="140"
          prop="termDate"
          show-overflow-tooltip
          label="期限"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.termType == '1'">{{
              scope.row.enumTermType
            }}</span>
            <span v-else
              >{{ scope.row.termDate[0] }}~{{
                scope.row.termDate[1] || '--'
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="80"
          prop="enlistNum"
          show-overflow-tooltip
          label="报名人数"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.enlistNum || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="80"
          prop="enlistNum"
          show-overflow-tooltip
          label="制作方人数"
        >
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.enlistNum || '--' }}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="80"
          prop="taskNum"
          show-overflow-tooltip
          label="任务数量"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.taskNum || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          prop="publishTime"
          show-overflow-tooltip
          label="发布时间"
        ></el-table-column>
        <el-table-column align="center" fixed="right" width="80" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="tableDataDetail(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-wrap flex-end">
      <el-pagination
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
    </div>

    <!-- 详情 -->
    <DemandDetailDialog
      :propsData="propsData"
      @emitTableList="getEmitTableData"
      v-if="propsData.dialogVisible2 == true"
    ></DemandDetailDialog>
  </div>
</template>

<script>
import { setLocalStorage, getLocalStorage } from '@/utils/storage.js'
import { delEmptyData, calcSearchSetTableHeight } from '@/utils/util.js'
import { projectInfoComList } from '@/api/project.js'
import { customerComList } from '@/api/system.js'
import { demandInfoList, demandStatus, getTypeComList } from '@/api/demand.js'
import DemandDetailDialog from '@/components/Demand/DemandDetailDialog.vue'

export default {
  name: 'DemandManage',
  components: {
    DemandDetailDialog
  },
  data() {
    return {
      loading: false,
      searchData: {
        projectId: '',
        linkId: '',
        title: '',
        amountStart: '',
        amountEnd: '',
        timeRange: [],
        dateStart: '',
        dateEnd: '',
        demandStatus: ''
      },
      projectDropData: [],
      linkDropData: [],
      customerData: [],
      activeName: '0',
      demandStatusData: [],

      cp: 1,
      rows: 10,
      total: 0,
      tableHeight: 0,
      tableData: [],

      // 详情
      propsData: {
        dialogType: 0,
        dialogName: '',
        dialogVisible2: false,
        id: ''
      }
    }
  },
  created() {},
  mounted() {
    this.windowOnResize()
    this.getListData(1)
  },
  methods: {
    timeRangeChange() {
      if (this.searchData.timeRange && this.searchData.timeRange.length > 0) {
        this.searchData.dateStart = this.searchData.timeRange[0]
        this.searchData.dateEnd = this.searchData.timeRange[1]
      } else {
        this.searchData.dateStart = ''
        this.searchData.dateEnd = ''
      }
    },
    tableDataDetail(row) {
      this.propsData.dialogType = 2
      this.propsData.dialogName = '需求详情'
      this.propsData.row = row
      this.propsData.dialogVisible2 = true
    },
    getCustomerComList() {
      customerComList().then(res => {
        if (res.status == 100) {
          this.customerData = res.data
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
    projectFocus() {
      projectInfoComList({ auth: false }).then(res => {
        if (res.status == 100) {
          this.projectDropData = res.data
        }
      })
    },
    projectChange() {
      this.searchData.linkId = ''
      this.linkDropData = []
    },
    linkFocus() {
      if (!this.searchData.projectId) {
        this.$message.error('请先选择项目！')
        return
      }
      let postData = {
        projectId: this.searchData.projectId
      }
      getTypeComList(postData).then(res => {
        this.linkDropData = res.data
      })
    },
    getEmitTableData() {
      this.getListData(this.cp)
    },
    handleClick() {
      this.getListData(1)
    },
    tableDataReset() {
      this.searchData = this.$options.data().searchData
      this.getListData(1)
    },
    // 获取列表
    getListData(cp) {
      this.cp = cp
      let postData = {
        cp: this.cp,
        projectId: this.searchData.projectId,
        linkId: this.searchData.linkId,
        title: this.searchData.title,
        demandStatus: this.searchData.demandStatus,
        amountStart: this.searchData.amountStart,
        amountEnd: this.searchData.amountEnd,
        dateStart: this.searchData.dateStart,
        dateEnd: this.searchData.dateEnd
      }
      let getRows = getLocalStorage('CURRENT_ROWS') || ''
      if (getRows) {
        this.rows = Number(getRows)
      }
      postData.rows = this.rows
      this.loading = true
      demandInfoList(delEmptyData(postData))
        .then(res => {
          this.loading = false
          let resData = res.data
          let dataList = resData.data
          this.tableData = dataList
          this.total = resData.total
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
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
        this.tableHeight = calcSearchSetTableHeight('demand-top-height', 170)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/wrapper.scss';
</style>
