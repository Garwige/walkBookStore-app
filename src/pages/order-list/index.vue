<template>
  <div>
    <div class="leader">
        <ul>
            <li :class="{active:isActive === 0 ? 1 : 0}" @click="allOrder">全部订单</li>
            <li :class="{active:isActive === 1 ? 1 : 0}" @click="ordered">已下单</li>
            <li :class="{active:isActive === 2 ? 1 : 0}" @click="waitPickUpOrder">待取货</li>
            <li :class="{active:isActive === 3 ? 1 : 0}" @click="finishOrder">已完成</li>
        </ul>
    </div>
    <div v-if="list.length === 0" class="tips">
      <svg t="1588748765897" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3982" width="100" height="100"><path d="M831.7 369.4H193.6L64 602v290.3h897.2V602L831.7 369.4zM626.6 604.6c0 62.9-51 113.9-114 113.9s-114-51-114-113.9H117.5l103.8-198h582.5l103.8 198h-281zM502.2 131h39.1v140.6h-39.1zM236.855 200.802l27.647-27.647 99.419 99.418-27.648 27.648zM667.547 272.637l99.418-99.419 27.648 27.648-99.418 99.418z" p-id="3983" fill="#C39862"></path></svg>
      您还没有相关的订单</div>
    <div class="order-item" v-for="(item, index) of list" :key="index" @click="toPage(item.orderId)">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderId}}</span>
            <span>{{item.orderStateId === '0' ? '已下单' : item.orderStateId === '1' ? '已到货' :
              item.orderStateId === '2' ? '已取货' : item.orderStateId === '3' ? '已完成未评价' :
              item.orderStateId === '4' ? '已完成已评价' : '已取消'}}</span>
        </div>
        <div class="item-center" v-for="(item, index) of item.goodsList" :key="index">
            <div class="img-con">
                <img :src="item.goodsImagePath" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{item.goodsName}}
                </div>
                <div class="props-con">
                    {{item.goodsDescribe}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{item.goodsPrice}} &nbsp;</span>
                    <span>x{{item.cartGoodsCount}}</span>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共{{item.orderAllGoodsCount}}件商品，合计￥</span>
            <span>{{item.orderAllCost}}</span>
        </div>
        <div class="item-more" v-show="item.orderStateId == '3'">
            <div class="btn" @click.stop="evaluate(item.orderId, item.version)">
                <span>评价</span>
            </div>
        </div>
        <div class="item-more" v-show="item.orderStateId == '2'">
            <div class="btn" @click="updateOrderState(item.orderId, '3', item.version)">
                <span>确认收货</span>
            </div>
        </div>
        <div class="item-more" v-show="item.orderStateId == '0' || item.orderStateId == '1' ">
            <div class="btn" @click="updateOrderState(item.orderId, '5', item.version)">
                <span>取消订单</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-list.js'
export default {
  name: 'order-list',
  data () {
    return {
      orderStateIdPass: '',
      versionPass: '',
      isActive: 0,
      statePass: '',
      goodsList: [],
      orderIdPass: '',
      list: []
    }
  },
  mounted () {
    this.allOrder()
  },
  methods: {
    // 修改订单
    updateOrderState (id, state, version) {
      this.orderIdPass = id
      this.orderStateIdPass = state
      this.versionPass = version
      req('updateOrderState', {
        orderId: this.orderIdPass,
        orderStateId: this.orderStateIdPass,
        version: this.versionPass
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 查询订单
    listOrder (value) {
      req('listOrder', {
        orderStateId: value
      }).then(data => {
        if (data.code === 0) {
          this.list = data.data.list
          console.log('this.list', this.list.length)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 全部订单
    allOrder () {
      this.listOrder()
      this.isActive = 0
    },
    // 已下单
    ordered () {
      this.statePass = '0'
      this.listOrder(this.statePass)
      this.isActive = 1
    },
    // 待取货
    waitPickUpOrder () {
      this.statePass = '1'
      this.listOrder(this.statePass)
      this.isActive = 2
    },
    // 已完成
    finishOrder () {
      this.statePass = '3'
      this.listOrder(this.statePass)
      this.isActive = 3
    },
    toPage (value) {
      this.orderIdPass = value
      this.$router.push({
        name: 'order-detail',
        params: {
          receiveOrderId: this.orderIdPass
        }
      })
    },
    // 评价订单
    evaluate (data, version) {
      this.$router.push({path: '/order-evaluate'})
      sessionStorage.setItem('evaluateData', data)
      console.log('version', version)
      console.log('传送的版本号', version)
      sessionStorage.setItem('evaluateVersion', version)
    }
  }
}
</script>

<style lang="scss" scoped>
  .leader {
      height: 64px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .tips {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: rgb(141, 141, 141);
  }
  .order-item {
      width: 95%;
      margin: 0 auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          padding-top: 5px;
          .img-con {
              flex: 1;
              text-align: center;
              img {
                  width: 84px;
              }
          }
          .text {
              flex: 2.2;
              .text-con {
                  font-size: 15px;
                  line-height: 22px;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                width: 250px;
                height: 50px;
                font-size: 13.5px;
                line-height: 26px;
                color: rgb(168,168,168);
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: keep-all;
                overflow: hidden;
              }
              .price-con {
                  text-align: right;
                  line-height: 26px;
                  span:nth-child(1) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(2) {
                      font-size: 16px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
                      font-size: 11px;
                      color: rgb(168,168,168);
                  }
              }
          }
      }
      .item-bottom {
          width: 100%;
          line-height: 40px;
          text-align: right;
          padding-top: 5px;
          span:nth-child(1) {
              font-size: 15px;
          }
          span:nth-child(2) {
              font-size: 20px;
          }
      }
      .item-more {
          width: 100%;
          display: flex;
          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                width: 90px;
                font-size: 15px;
                position: absolute;
                top: 50%;
                left: 50%;
                text-align: center;
                margin-top: -10.4px;
                margin-left: -45px;
                color: #c39862;
              }
          }
      }
  }
</style>
