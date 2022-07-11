<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="擅长领域" name="goodAt"></el-tab-pane>
    </el-tabs>
    <div class="add-wrap">
      <el-button
        type="primary"
        size="mini"
        @click="handleTableRow(1, {}, '新增擅长领域')"
        >新增</el-button
      >
    </div>
    <el-table
      v-if="activeName == 'goodAt'"
      :data="tableData"
      border
      :header-cell-style="{
        background: '#F5F5F5',
        color: '#94969A'
      }"
    >
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="名称">
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleTableRow(2, scope.row, '编辑擅长领域')"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="deleteTableRow(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑擅长领域dialog -->
    <AddEditGoodAtDialog
      v-if="gootAtData.dialogVisible"
      :props-data="gootAtData"
      @emitTableList="getEmitTableData"
    ></AddEditGoodAtDialog>
  </div>
</template>
<script>
import AddEditGoodAtDialog from '@/components/Sys/AddEditGoodAtDialog'
export default {
  name: 'Dict',
  components: {
    AddEditGoodAtDialog
  },
  data() {
    return {
      activeName: 'goodAt',
      tableData: [
        {
          id: 66,
          name: '蓝银皇'
        },
        {
          id: 66,
          name: '昊天锤'
        }
      ],
      gootAtData: {
        dialogName: '',
        dialogType: '',
        dialogVisible: false,
        row: null
      }
    }
  },
  methods: {
    handleClick() {},
    handleTableRow(type, row, title) {
      this.gootAtData.dialogName = title
      this.gootAtData.dialogType = type
      this.gootAtData.dialogVisible = true
      this.gootAtData.row = row
    },
    deleteTableRow(id) {
      this.$confirm(`确认删除吗？`, '提示', {
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
    getEmitTableData() {
      // get list
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/wrapper.scss';
</style>
