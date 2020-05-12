<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="55px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register">我要注册</router-link>
    </div>

    <el-button @click="login" class="login-btn">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
import axios from 'axios'
const qs = require('qs')
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;'
      axios({
        method: 'post',
        url: 'http://20q024h9635.qicp.vip/uaa/auth/form',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }

      }).then(data => {
        if (data.data.code === 0) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
          sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
          this.getUser(data.data.data.access_token)
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    },
    getUser (token) {
      axios({
        method: 'post',
        url: 'http://20q024h9635.qicp.vip/app/userInformation/getUser',
        data: qs.stringify({ access_token: token }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        if (data.data.code === 0) {
          sessionStorage.setItem('roleInfo', JSON.stringify(data.data.data))
          console.log('data.data.data', data.data.data)
          if (data.data.data.role === '1') {
            this.$router.push({ path: '/shop-order-list' })
          } else if (data.data.data.role === '2') {
            this.$router.push({ path: '/driver-shop' })
          } else {
            this.$router.push({ path: '/home' })
          }
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
}

.login-btn {
  display: block;
  margin: 9px auto;
  width: 80%;
  height: 40px;
  color: #fff;
  background: rgb(198, 156, 95);
}

</style>
