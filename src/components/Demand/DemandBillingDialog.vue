<template>
  <el-dialog :visible.sync="propsData.dialogVisible" width="1000px">
    <div slot="title">
      <i class="el-icon-document"></i>
      {{ propsData.dialogName }}
    </div>
    <el-table
      :data="settlementDetaiTableData"
      border
      :header-cell-style="{
        background: '#F5F5F5',
        color: '#94969A'
      }"
    >
      <el-table-column align="center" prop="collection" label="收款方">
      </el-table-column>
      <el-table-column
        align="center"
        prop="collectionAmount"
        label="本次付款金额"
        width="100"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="paymentMethod"
        label="支付方式"
        width="100"
      >
      </el-table-column>
      <el-table-column align="center" prop="payment" label="付款公司">
      </el-table-column>
      <el-table-column align="center" prop="date" label="付款时间" width="130">
      </el-table-column>
      <el-table-column align="center" prop="memo" label="备注">
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="closesettlementDetailDialog"
        >关闭
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DemandBillingDialog',
  props: {
    propsData: Object
  },
  data() {
    return {
      settlementDetaiTableData: [
        {
          id: 66,
          date: '2016-05-03 08:08:08',
          collection: '收款方',
          collectionAmount: 123456,
          paymentMethod: '支付方式',
          payment: '付款方',
          memo: '上海市普陀区金沙江路 1516 弄'
        },
        {
          id: 66,
          date: '2016-05-03 08:08:08',
          collection: '收款方',
          collectionAmount: 123456,
          paymentMethod: '支付方式',
          payment: '付款方',
          memo: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    closesettlementDetailDialog() {
      this.propsData.dialogVisible = false
    }
  }
}
</script>
