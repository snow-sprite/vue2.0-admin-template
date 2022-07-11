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
        <el-form-item label="用户名：" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input
            v-model.number="ruleForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="memo">
          <el-input
            type="textarea"
            v-model="ruleForm.memo"
            :rows="4"
            clearable
            placeholder="请输入备注"
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
import { validMobile } from '@/utils/validate'
export default {
  name: 'UserOperateDialog',
  props: {
    propsData: {
      type: Object
    }
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6) {
          callback(new Error('密码不能少于六个字符'))
        } else {
          callback()
        }
      }
    }
    const validateMobile = (rule, value, callback) => {
      if (validMobile(value, true)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      ruleForm: {
        name: '',
        password: '',
        mobile: '',
        memo: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        mobile: [{ trigger: 'blur', validator: validateMobile }]
      },
      userId: ''
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
