<template>
  <el-dialog
    width="600px"
    :visible.sync="propsData.dialogVisible"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
  >
    <div slot="title">
      <i
        :class="{
          'el-icon-plus': propsData.dialogType == 1,
          'el-icon-edit': propsData.dialogType == 2,
          'el-icon-document': propsData.dialogType == 3
        }"
      ></i>
      {{ propsData.dialogName }}
    </div>
    <div class="scroll-box-style form-div">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="110px"
        class="user-ruleForm"
        size="medium"
        label-position="right"
      >
        <el-form-item label="名称：" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入擅长的领域名称"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose()">取 消</el-button>
      <el-button size="mini" type="primary" @click="submitForm('ruleForm')"
        >保 存</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddEditGoodAtDialog',
  props: {
    propsData: {
      type: Object
    }
  },
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入名称' }]
      }
    }
  },
  created() {
    const { name } = this.propsData.row
    if (name) {
      this.ruleForm.name = name
    }
  },
  methods: {
    // 弹框确认
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let postData = {
          //   id: this.userId,
          //   oldPwd: this.ruleForm.name,
          //   newPwd: this.ruleForm.password,
          //   confirmPwd: this.ruleForm.comfirmPassword
          // }
          // updatePwd(postData).then(() => {
          //   this.$message.success('密码修改成功！')
          console.log('ruleForm', this.ruleForm)
          this.$emit('emitTableList')
          this.handleClose()
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 弹框关闭
    handleClose(done) {
      this.propsData.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-div {
  max-height: 60vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
