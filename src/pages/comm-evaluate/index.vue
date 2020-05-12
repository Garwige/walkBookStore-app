<template>
  <div class="container">
    <div class="evaluate-title">
      <span :class="{active:isActive === 0 ? 1 : 0}" @click="all">全部评价</span>
      <span :class="{active:isActive === 1 ? 1 : 0}" @click="good">好评</span>
      <span :class="{active:isActive === 2 ? 1 : 0}" @click="medium">中评</span>
      <span :class="{active:isActive === 3 ? 1 : 0}" @click="low">差评</span>
    </div>
    <ul class="evaluate-list">
      <div v-if="list.length === 0" class="tips">暂无评价</div>
      <li v-for="(item, index) in list" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.userName}}</div>
              <div class="date">{{item.createTime}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.evaluateScore*18}px 0`}">
            </div>
          </div>
          <div class="msg">
            <div v-if="item.evaluateContent == undefined">该用户暂无评价</div>
            {{item.evaluateContent}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'
export default {
  name: 'comm-evaluate',
  data () {
    return {
      isActive: 0,
      evaluateScorePass: '',
      list: [
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '1',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // }
      ]
    }
  },
  mounted () {
    this.all()
  },
  methods: {
    listGoodsEvaluates (value) {
      this.evaluateScorePass = value
      req('listGoodsEvaluates', {
        goodsCode: sessionStorage.getItem('goodsCodePass'),
        pageSize: 100,
        pageNum: 1,
        evaluateScore: this.evaluateScorePass
      }).then(data => {
        this.list = data.data
      })
    },
    all () {
      this.isActive = 0
      this.listGoodsEvaluates()
    },
    good () {
      this.isActive = 1
      this.listGoodsEvaluates('5')
    },
    medium () {
      this.isActive = 2
      this.listGoodsEvaluates('3')
    },
    low () {
      this.isActive = 3
      this.listGoodsEvaluates('1')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
  padding-bottom: 80px;

  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;

    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;

  .tips {
    display: flex;
    align-items: center;
    height: 40px;
    justify-content: center;
  }

    li {
      display: flex;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .user-info {
            .date {
              color: #ddd;
              font-size: 14px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
