<template>
  <div>
    <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div>

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" :inline="true" label-width="80px" ref="form" :rules="formRules">
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名" prop="userAccount">
            <el-input v-model="formData.userAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="formData.confirmPassword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="formData.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="formData.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="sex">
            <el-radio-group v-model="formData.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="身份证" prop="idCard">
            <el-input v-model="formData.idCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="formData.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="邀请码" prop="inviteCode">
            <el-input v-model="formData.inviteCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="头像" prop="imagePath">
            <i-file
            v-model="formData.imagePath"></i-file>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button class="register-btn" @click="clientRegister">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import IFile from '@/components/common/i-file.vue'
const qs = require('qs')
export default {
  name: 'register',
  components: {
    IFile
  },
  data () {
    return {
      formData: {
        userAccount: '',
        password: '',
        confirmPassword: '',
        phone: '',
        userName: '',
        sex: '',
        idCard: '',
        email: '',
        inviteCode: '',
        imagePath: ''
      },
      formRules: {
        userAccount: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ],
        confirmPassword: [
          { validator: this.valiConfirmPassord, trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { type: 'number', message: '手机号必须为数字值' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: ['blur', 'change'] },
          { validator: this.validateIdCard, trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        imagePath: [
          { required: true, message: '请添加头像' }
        ]
      }
    }
  },
  methods: {
    // 校验身份证
    validateIdCard (rule, value, callback) {
      const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

      if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    },
    // 校验二次密码是否相同
    valiConfirmPassord (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    // 注册信息转给后端
    clientRegister () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://20q024h9635.qicp.vip/app/register/clientRegister',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            console.log(data.data)
            if (data.data.code === 0) {
              this.$message({
                type: 'success',
                message: data.data.msg
              })
              this.$router.push({path: '/login'})
            } else {
              this.$message({
                type: 'error',
                message: data.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: rgb(242, 242, 242);
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 8px auto;
  }
}

.register-btn {
  display: block;
  margin: 20px auto;
  width: 80%;
  height: 40px;
  color: #fff;
  background: #c69c5f;
}
</style>
