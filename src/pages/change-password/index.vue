<template>
  <div>
    <div class="pwd-con">
        <div class="pwd-item">
            <div class="item-left">原密码</div>
            <input type="password"  placeholder="请输入原密码" v-model="formData.password">
        </div>
        <div class="pwd-item">
            <div class="item-left">新密码</div>
            <input type="password" placeholder="请输入新密码" v-model="formData.newPassword">
        </div>
        <div class="pwd-item">
            <div class="item-left">确认新密码</div>
            <input type="password" placeholder="请再次输入新密码" v-model="formData.confirmPassword">
        </div>
    </div>
    <div class="btn" @click="checkPassword">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/change-password.js'
export default {
  name: 'change-password',
  data () {
    return {
      formData: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    checkPassword () {
      if (this.formData.password === '') {
        this.$message.error('原密码不能为空')
      } else if (this.formData.newPassword === '') {
        this.$message.error('新密码不能为空')
      } else if (this.formData.confirmPassword === '') {
        this.$message.error('确认新密码不能为空')
      } else if (this.formData.newPassword !== this.formData.confirmPassword) {
        this.$message.error('两次输入的密码不一致')
      } else {
        this.updatePassword()
      }
    },
    updatePassword () {
      req('updatePassword', {
        ...this.formData
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.$router.push({path: '/login'})
        } else if (data.code === 500) {
          this.$message.error(data.msg)
          this.$refs.form.resetFields()
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(168,168,168);
              &::placeholder {
                  color: rgb(168,168,168);
              }
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 80px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
