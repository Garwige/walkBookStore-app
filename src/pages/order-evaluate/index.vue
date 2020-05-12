<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.goodsImagePath" alt="">

        <div class="star">
          <el-rate v-model="item.evaluateScore"></el-rate>
        </div>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

          <el-input v-model="item.evaluateContent" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
      </div>
    </div>

    <el-button class="submit-btn" type="primary" @click="Evaluate">提交</el-button>
  </div>
</template>

<script>
import req from '@/api/order-evaluate.js'
import axios from 'axios'
export default {
  name: 'order-evaluate',
  data () {
    return {
      evaluateList: [],
      // 用于判断评价多个时的星级是否为空
      count: 0
    }
  },
  mounted () {
    this.listGoodsForEvaluate()
  },
  methods: {
    // 查询订单评价
    listGoodsForEvaluate () {
      req('listGoodsForEvaluate', {
        orderId: sessionStorage.getItem('evaluateData')
      }).then(data => {
        if (data.code === 0) {
          this.evaluateList = data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 评价星级是否为空判断
    Evaluate () {
      if (this.evaluateList.length === 1) {
        console.log('评价一个')
        if (this.evaluateList[0].evaluateScore === 0) {
          this.$message.error('星级不能为空')
        } else {
          this.addGoodsEvaluate()
        }
      } else {
        console.log('评价多个')
        for (let i = 0; i < this.evaluateList.length; i++) {
          if (this.evaluateList[i].evaluateScore === 0) {
            this.count++
          }
        }
        console.log('count', this.count)
        if (this.count === 0) {
          this.addGoodsEvaluate()
        } else {
          this.$message.error('星级不能为空')
          this.count = 0
        }
      }
    },
    // 新增订单评价
    addGoodsEvaluate () {
      axios({
        method: 'post',
        url: 'http://20q024h9635.qicp.vip/app/clientOrder/addGoodsEvaluate',
        data: JSON.stringify({
          orderEvaluate: JSON.stringify({
            orderId: sessionStorage.getItem('evaluateData'),
            evaluateList: this.evaluateList.map(item => {
              return Object.assign({}, {goodsCode: item.goodsCode, evaluateContent: item.evaluateContent, evaluateScore: item.evaluateScore})
            })
          })
        }),
        headers: {
          'Content-Type': 'application/json;',
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
        }
      }).then(data => {
        if (data.data.code === 0) {
          this.$message.success(data.data.msg)
          this.$router.push({path: '/order-list'})
        } else {
          this.$message.error(data.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;

  .comm {
    width: 100%;
    // height: 200px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background: #fff;

    .pic-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 150px;
        height: 150px;
      }

      .star {
        width: 180px;
        height: 36px;
        position: relative;
        left: -20px;

        /deep/ .el-rate__item {
          .el-rate__icon {
            font-size: 25px;
          }
        }
      }
    }

    .eva-box {
      width: 100%;
      .title {
        padding-left: 10px;
        line-height: 40px;
      }
    }
  }

  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
