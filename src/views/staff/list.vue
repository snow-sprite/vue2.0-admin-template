<template>
  <div class="wrapper">
    <div id="list-top-height">
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
            <p>手机号：</p>
            <el-input
              class="search-list-content"
              size="mini"
              v-model.number="search.mobile"
              placeholder="请输入手机号"
              prefix-icon="el-icon-search"
            ></el-input>
          </li>
          <li class="search-list fl flex-start">
            <p>实名认证类型：</p>
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
            <p>创作者认证类型：</p>
            <el-select
              class="search-list-content"
              size="mini"
              v-model="search.creatorType"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in creatorTypes"
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
      <div class="add-wrap">
        <el-button
          type="primary"
          size="mini"
          @click="tableDataOperate(1, '新增用户')"
          >新增用户</el-button
        >
      </div>
    </div>
    <div class="list-wrap">
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
        <el-table-column align="center" label="用户头像" width="80">
          <template slot-scope="scope">
            <el-image
              fit="cover"
              style="width: 23px; height: 23px"
              :src="
                scope.row.avatar +
                '?x-oss-process=image/resize,m_fill,h_23,w_23,limit_0,'
              "
              :preview-src-list="[`${scope.row.img}`]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="nickname"
          show-overflow-tooltip
          label="用户昵称"
        ></el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="threepart"
          label="第三方账号绑定"
        ></el-table-column>
        <el-table-column align="center" prop="realNameEarnest" label="实名认证">
          <template slot-scope="scope">
            <span>{{ scope.row.realNameEarnest || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="creator" label="创作者认证">
          <template slot-scope="scope">
            <span>{{ scope.row.creator || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="source"
          label="用户来源"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createdTime"
          label="注册时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="pubTime"
          label="最后登录时间"
        ></el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="getTableDetail(scope.row.id, '用户详情')"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
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

    <!-- 用户添加/编辑 -->
    <UserOperateDialog
      :props-data="operateData"
      @emitTableList="getEmitTableData"
      v-if="operateData.dialogVisible"
    ></UserOperateDialog>

    <!-- 用户详情 -->
    <UserDetailDialog
      :props-data="detailData"
      v-if="detailData.dialogVisible"
    ></UserDetailDialog>
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
import UserOperateDialog from '@/components/User/UserOperateDialog.vue'
import UserDetailDialog from '@/components/User/UserDetailDialog.vue'
export default {
  name: 'Partner',
  components: {
    UserOperateDialog,
    UserDetailDialog
  },
  data() {
    return {
      search: {
        nickname: '',
        mobile: '',
        realNameType: '',
        creatorType: ''
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
      creatorTypes: [
        {
          value: 'A',
          label: '黄金糕'
        },
        {
          value: 'B',
          label: '双皮奶'
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
          avatar:
            'https://bbs-official-website.oss-cn-beijing.aliyuncs.com/bbs-official-website/20220128/9204e6f9-dc93-4161-874a-8b9e28947059/1643353606698',
          nickname: 'Cid',
          mobile: 18888888888,
          threepart: '微信',
          realNameEarnest: '天行雨',
          creator: '古德',
          source: '想象',
          createdTime: '2020-07-12 20:20:20',
          pubTime: '2020-07-12 20:20:20'
        }
      ],
      // 添加/编辑用户
      operateData: {
        dialogType: 0,
        dialogName: '',
        dialogVisible: false,
        id: ''
      },
      // 用户详情
      detailData: {
        dialogName: '',
        dialogVisible: false
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
    tableDataOperate(dialogType, dialogName, row) {
      this.operateData.dialogType = dialogType
      this.operateData.dialogName = dialogName
      this.operateData.dialogVisible = true
      if (row) {
        this.operateData.id = row.id
      }
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
    getTableDetail(id, dialogName) {
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
        this.tableHeight = calcSearchSetTableHeight('list-top-height', 170)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/wrapper.scss';
</style>
