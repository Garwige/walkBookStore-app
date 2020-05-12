<template>
  <div class="container">
    <ul class="book-classify">
      <li v-for="(item, index) in firstList" :key="index"
      :class="{active:item.classifyId === classifyIdPass}"
      @click="listGetClassGoods(item.classifyId)">
        <b></b>
        <span>{{item.classifyName}}</span>
      </li>
    </ul>

    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in secondList" :key="index">
        <div class="book-classify-item-title">{{item.classifyName}}</div>
        <ul class="book-list">
          <div v-if="item.goodsList.length === 0" class="tips">此分类空空如也~</div>
          <li v-for="(item, index) in item.goodsList" :key="index" @click="getCommDetail(item.goodsCode)">
            <img :src="item.goodsImagePath" alt="">
            <div>{{item.goodsName}}</div>
            <div>
              ￥{{item.goodsPrice}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-classify.js'
export default {
  name: 'comm-classify',
  data () {
    return {
      // 刚进来就获取二级分类信息
      routerIdPass: '',
      classifyIdPass: '',
      firstList: [],
      goodsList: [],
      secondList: [
        // {
        //   classifyId: '',
        //   classifyName: '小说',
        //   goodsList: [
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     }
        //   ]
        // }
      ]
    }
  },
  mounted () {
    this.listOneGoodsClassify()
  },
  methods: {
    // 一级分类
    listOneGoodsClassify () {
      req('listOneGoodsClassify', {
      }).then(data => {
        if (data.code === 0) {
          this.firstList = data.data
          this.classifyIdPass = data.data[0].classifyId
          this.listGetClassGoods(this.classifyIdPass)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 二级分类
    listGetClassGoods (value) {
      this.classifyIdPass = value
      req('listGetClassGoods', {
        classifyId: this.classifyIdPass
      }).then(data => {
        this.secondList = data.data
      })
    },
    getCommDetail (data) {
      console.log('data', data)
      sessionStorage.setItem('goodsCodePass', data)
      this.$router.push({path: 'comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #ddd;

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

    }
    li.active {
      color: rgb(197, 156, 104);
      background: #ddd;

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
        margin-top: -10px;
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 78%;

    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
      }

      .book-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;

        .tips {
          width: 100%;
          font-size: 15px;
          color: rgb(136, 135, 135);
          text-align: center;
        }
        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin-bottom: 10px;

          img {
            width: 70%;
          }

          div:nth-child(2) {
            font-size: 12px;
          }

          div:nth-child(3) {
            color: red;
            font-size: 14px;
            font-weight: bold;

            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
