<template>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetailData.goodsImagePath" alt="">
    </div>

    <div class="book-detail">
      <div class="book-price">
        <span>￥{{commDetailData.goodsPrice}}</span>
        <div>销量：{{commDetailData.salesVolume}}</div>
      </div>
      <div class="book-name">{{commDetailData.goodsName}}</div>
      <div class="book-Describe">{{commDetailData.goodsDescribe}}</div>
      <div class="count-box">
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{role.storeName}}</span>
      </div>
    </div>
    <div class="comm-evaluate">
      <el-rate
        v-model="starvalue"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </div>
    <div class="feeter">
      <div class="shopCar" @click="toPage(1)">
        <img src="../../assets/shop_car2.png" alt="">
        <span>购物车</span>
      </div>
      <div class="toShopCar" @click="addShoppingCart">
        <el-button>加入购物车</el-button>
      </div>
      <div class="buy" @click="toPage(0)">
        <el-button>立即购买</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/comm-detail.js'
export default {
  name: 'comm-detail',
  data () {
    return {
      starvalue: 0,
      commDetailData: {
        goodsCode: '',
        goodsName: '',
        isbn: '',
        goodsDescribe: '',
        goodsPrice: '',
        goodsImagePath: '',
        goodsEvaluateScore: '',
        goodsAuthor: '',
        goodsPress: '',
        storeName: ''
      },
      bookCount: 1
    }
  },
  mounted () {
    this.getGoods()
  },
  computed: {
    // 引入roleInfo来获取门店名称
    role () {
      return JSON.parse(sessionStorage.getItem('roleInfo'))
    }
  },
  methods: {
    getGoods () {
      req('getGoods', {
        // 获取全局变量
        goodsCode: sessionStorage.getItem('goodsCodePass')
      }).then(data => {
        if (data.code === 0) {
          this.commDetailData = data.data
          if (data.data.goodsEvaluateScore !== undefined && data.data.goodsEvaluateScore !== '') {
            this.starvalue = parseFloat(data.data.goodsEvaluateScore)
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 路由跳转
    // 新增订单
    toPage (value) {
      if (value === 1) {
        this.$router.push({path: '/shop-car'})
      } else {
        this.addOrder()
      }
    },
    // 立即购买
    addOrder () {
      req('addOrder', {
        goodsCode: this.commDetailData.goodsCode,
        goodsPrice: this.commDetailData.goodsPrice,
        clientGoodsNum: parseFloat(this.bookCount),
        shopCartId: 0,
        storeId: JSON.parse(sessionStorage.getItem('roleInfo')).storeId
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.$router.push({path: '/order-list'})
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 加入购物车
    addShoppingCart () {
      req('addShoppingCart', {
        goodsCode: this.commDetailData.goodsCode,
        cartGoodsCount: this.bookCount
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 减号
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    // 加号
    countAdd () {
      this.bookCount++
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}

.book-banner {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;

  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  margin: 10px auto 0;

  .book-price {
    font-size: 22px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    color: red;
    align-items: center;
    div {
      font-size: 14px;
      color: rgb(114, 114, 114)
    }
  }

  .book-name {
    font-size: 18px;
    line-height: 30px;
  }

  .book-Describe {
    width: 400px;
    height: 25px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
  }

  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .handler-box {
      display: flex;
      height: 30px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }

  .address {
    margin-top: 10px;

    .iconhtmal5icon14 {
      color: #ddd;
    }
  }
}
.feeter {
  display: flex;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  background: rgb(242, 242, 242);
  width: 100%;
  bottom: 0;
  .shopCar {
    height: 40px;
    display: flex;
    flex-direction: column;
    img {
      width: 25px;
      height: 25px;
      margin: 0 auto;
    }
    span {
      color: rgb(138, 138, 138);
    }
  }
  .toShopCar {
    margin: 0 10px;
    .el-button {
      border-radius: 20px;
      background: rgb(204, 204, 51);
      color: #fff;
    }
  }
  .buy {
    margin-right: 15px;
    .el-button {
      border-radius: 20px;
      background: rgb(204, 51, 0);
      color: #fff;
    }
  }
}
</style>
