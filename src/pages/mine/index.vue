<template>
  <div>
    <div class="user">
        <div class="img-con">
            <img v-show="role.userImage" :src="role.userImage" alt="">
            <img v-show="!role.userImage" src= "../../assets/head_pic.png" alt="">
        </div>
        <div class="text-con">{{role.userName}}</div>
    </div>
    <div class="content" v-show="role.role === '3'">
        <div
          class="con-item"
          v-for="(item,index) in userColumnList"
          :key="index"
          @click="toPage(item)">
            <div>
                <img :src="item.img1" alt="">
            </div>
            <div><span>{{item.label}}</span></div>
            <div>
                <img :src="item.img2" alt="">
            </div>
        </div>
    </div>

    <div class="driverContent" v-show="role.role === '2'">
      <div class="driver">
      <div>
        <img src="~@/assets/u1210.png" alt="">
        <span>{{role.driverName}}</span>
      </div>
      <div>
        <img src="~@/assets/u1151.png" alt="">
        <span>{{role.phone}}</span>
      </div>
    </div>
    <div
      class="con-item"
      v-for="(item,index) in driverColumnList"
      :key="index"
      @click="toPage(item)">
        <div>
            <img :src="item.img1" alt="">
        </div>
        <div><span>{{item.label}}</span></div>
        <div>
            <img :src="item.img2" alt="">
        </div>
    </div>
    </div>

    <div class="showContent" v-show="role.role === '1'">
      <div class="info">
        <div>
          <img src="~@/assets/u919.png" alt="">
          <span>门店：{{role.storeName}}</span>
        </div>
        <div>
          <img src="~@/assets/u1265.png" alt="">
          <span>邀请码：{{role.inviteCode}}</span>
        </div>
        <div>
          <img src="~@/assets/u295.png" alt="">
          <span>{{role.address}}</span>
        </div>
    </div>
      <div
        class="con-item"
        v-for="(item,index) in shopColumnList"
        :key="index"
        @click="toPage(item)">
          <div>
              <img :src="item.img1" alt="">
          </div>
          <div><span>{{item.label}}</span></div>
          <div>
              <img :src="item.img2" alt="">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      userColumnList: [
        {
          img1: require('../../assets/订单.png'),
          label: '我的订单',
          img2: require('../../assets/右.png'),
          toPath: '/order-list'
        }, {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        }, {
          img1: require('../../assets/邀请码.png'),
          label: '修改店铺邀请码',
          img2: require('../../assets/右.png'),
          toPath: '/change-store-code'
        }, {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ],
      driverColumnList: [
        {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        },
        {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ],
      shopColumnList: [
        {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        },
        {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ]
    }
  },
  computed: {
    // 引入roleInfo
    role () {
      return JSON.parse(sessionStorage.getItem('roleInfo'))
    }
  },
  methods: {
    toPage (data) {
      this.$router.push({path: data.toPath})
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
      width: 100%;
      display: flex;
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          img {
              width: 65px;
              height: 65px;
              position: relative;
              left: 38%;
          }
      }
      .text-con {
          flex: 2;
          line-height: 105px;
          font-size: 22px;
      }
  }
  .driverContent {
    width: 95%;
      height: 120px;
      padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .driver {
        box-sizing: border-box;
        background: rgb(242, 242, 242);
        height: 100px;
        margin-bottom: 10px;
        div {
          padding: 10px 0;
          display: flex;
          align-content: center;
          font-size: 17px;
          margin-left: 20px;
          span {
            margin-left: 20px;
          }
        }
      }
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .showContent {
      width: 95%;
      height: 120px;
      padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .info {
        box-sizing: border-box;
        background: rgb(242, 242, 242);
        height: 100px;
        margin-bottom: 10px;
        div {
          display: flex;
          align-content: center;
          font-size: 16px;
          margin-left: 20px;
          height: 25px;
          img {
            height: 20px;
            width: 20px;
          }
          span {
            margin-left: 20px;
            width: 340px;
          }
        }
        div:nth-child(2) {
          margin-left: 22px;
          img {
            height: 16px;
            width: 16px;
          }
          span {
            margin-left: 22px;
            width: 340px;
          }
        }
      }
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .content {
      width: 95%;
      height: 206px;
      padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
