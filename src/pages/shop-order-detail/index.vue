<template>
  <div>
    <div class="content">
      <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{orderList.orderId}}</li>
            <li>{{orderList.createTime}}</li>
            <li class="active">{{orderList.orderStateId === '0' ? '已下单' : orderList.orderStateId === '1' ? '已到货' :
              orderList.orderStateId === '2' ? '已取货' : orderList.orderStateId === '3' ? '已完成未评价' :
              orderList.orderStateId === '4' ? '已完成已评价' : '已取消'}}</li>
        </ul>
    </div>
    <div class="line"></div>
    <div class="userInfo">
      <div class="userName">
        <img src="../../assets/u1157.png" alt="">
        <span>{{orderList.userName}}</span>
      </div>
      <div class="userPhone">
        <img src="../../assets/u1151.png" alt="">
        <span>{{orderList.phone}}</span>
      </div>
    </div>
    <div class="line"></div>
        <div class="con-top">
            <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/u919.png" style="width: 18px">
                </div>
                <span>取货门店：{{orderList.storeName}}</span>
            </div>
            <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/u1157.png" style="width: 13px">
                </div>
                <span>{{orderList.address}}</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-item" v-for="(item, index) of goodsList"
        :key="index">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.goodsImagePath">
                </div>
                <div class="text">
                    <div class="text-con">{{item.goodsName}}</div>
                    <div class="props-con">{{item.goodsDescribe}}</div>
                    <div class="price-con">
                        <span>￥{{item.goodsPrice}}</span>
                        <span> </span>
                        <span>x{{item.cartGoodsCount}}</span>
                    </div>
                </div>
            </div>
            <div class="item-bottom">
                <span>共{{orderList.orderAllGoodsCount}}件商品，合计￥{{orderList.orderAllCost}}</span>
                <span></span>
            </div>
        </div>
    </div>
    <div class="feeter">
      <el-button type="danger" v-show="orderList.orderStateId === '0'" @click="updateManagerOrderState('5')">订单取消</el-button>
      <el-button type="danger" v-show="orderList.orderStateId === '0'" @click="updateManagerOrderState('1')">确认到货</el-button>
      <el-button type="danger" v-show="orderList.orderStateId === '1'" @click="updateManagerOrderState('0')">取消到货</el-button>
      <el-button type="danger" v-show="orderList.orderStateId === '1'" @click="updateManagerOrderState('2')">确认取货</el-button>
      <el-button type="danger" v-show="orderList.orderStateId === '2'" @click="updateManagerOrderState('1')">取消取货</el-button>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-order-detail.js'
export default {
  name: 'shop-order-detail',
  data () {
    return {
      statePass: '',
      receiveOrderId: '',
      orderList: [],
      goodsList: []
    }
  },
  mounted () {
    this.listManagerOrderDeepen()
  },
  methods: {
    listManagerOrderDeepen () {
      req('listManagerOrderDeepen', {
        orderId: this.$route.params.receiveOrderId
      }).then(data => {
        if (data.code === 0) {
          this.orderList = data.data
          this.goodsList = data.data.goodsList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    updateManagerOrderState (value) {
      this.statePass = value
      req('updateManagerOrderState', {
        orderId: this.$route.params.receiveOrderId,
        orderStateId: this.statePass,
        version: this.orderList.version
      }).then(data => {
        this.$confirm('此操作将改变订单状态，是否继续？').then(() => {
          if (data.code === 0) {
            this.listManagerOrderDeepen()
            this.$message.success(data.msg)
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 12px auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 13px 13px 0;
      box-sizing: border-box;
      .userInfo {
        .userName {
          margin: 10px 10px;
          img {
            height: 16px;
          }
          span {
            margin-left: 10px;
          }
        }
        .userPhone {
          margin: 10px 6px;
          img {
            height: 24px;
          }
          span {
            margin-left: 5px;
          }
        }
        div {
          height: 30px;
          display: flex;
          align-content: center;
        }
      }
      .order-msg {
        width: 95%;
        background-color: white;
        box-sizing: border-box;
        padding: 8px 0 12px;
        margin: 0 auto;
        display: flex;
        border-radius: 8px;
        ul:nth-child(1) {
            margin: 0;
            padding: 0;
            flex: 1;
            li:nth-child(1) {
                margin: 0;
                padding: 0 0 0 25%;
                box-sizing: border-box;
                list-style: none;
                font-size: 16.5px;
                font-weight: bold;
                line-height: 42px;
            }
            li:nth-child(2) {
                margin: 0;
                padding: 0 0 0 25%;
                box-sizing: border-box;
                list-style: none;
                font-size: 14.5px;
                line-height: 30px;
            }
            li:nth-child(3) {
                margin: 0;
                padding: 0 0 0 25%;
                box-sizing: border-box;
                list-style: none;
                font-size: 14.5px;
                line-height: 30px;
            }
            li:nth-child(4) {
                margin: 0;
                padding: 0 0 0 25%;
                box-sizing: border-box;
                list-style: none;
                font-size: 14.5px;
                line-height: 30px;
            }
        }
        ul:nth-child(2) {
            margin: 0;
            padding: 0;
            flex: 2;
            li:nth-child(1) {
                margin: 0;
                padding: 0;
                list-style: none;
                height: 42px;
            }
            li:nth-child(2) {
                margin: 0;
                padding: 0;
                list-style: none;
                font-size: 14.5px;
                line-height: 30px;
            }
            li:nth-child(3) {
                margin: 0;
                padding: 0;
                list-style: none;
                font-size: 14.5px;
                line-height: 30px;
            }
            li:nth-child(4) {
                margin: 0;
                padding: 0;
                list-style: none;
                font-size: 14.5px;
                line-height: 30px;
            }
            .active {
                color: rgb(195,152,98);
            }
        }
    }
      .con-top {
          width: 100%;
          .top-item {
              display: flex;
              padding: 5px 0 22px;
              .top-img-con {
                  width: 30px;
                  text-align: center;
              }
              span {
                  font-size: 15px;
              }
          }
      }
      .line {
          width: 100%;
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
      .order-item {
          width: 95%;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          padding: 10px 15px;
          box-sizing: border-box;
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
                      font-size: 13.5px;
                      line-height: 26px;
                      color: rgb(168,168,168);
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      word-break: keep-all;
                      overflow: hidden;
                      width: 250px;
                      height: 50px;
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
      }
  }
  .feeter {
    background: rgb(242, 242, 242);
    position: fixed;
    bottom: 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 10px;
    line-height: 50px;
    width: 100%;
    .el-button {
      border-radius: 25px;
    }
  }
</style>
