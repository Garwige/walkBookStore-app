<template>
  <div class="store">
    <div v-if="List.length === 0" class="tips">
      <svg t="1588759152528" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7581" width="50" height="100"><path d="M871.850667 469.333333c-72.618667 0-125.184-38.186667-125.184-85.333333 0 47.146667-52.650667 85.333333-125.141334 85.333333C564.565333 469.333333 512 431.146667 512 384c0 47.189333-52.650667 85.333333-109.482667 85.333333C329.898667 469.333333 277.333333 431.146667 277.333333 384c0 47.104-52.650667 85.333333-109.482666 85.333333-32.512 0-61.013333-7.637333-82.517334-20.309333v489.344A42.624 42.624 0 0 0 127.658667 981.333333H554.666667v-255.872A42.666667 42.666667 0 0 1 597.333333 682.666667h128c23.594667 0 42.666667 18.688 42.666667 42.794666V981.333333h128.384c22.869333 0 42.24-19.242667 42.24-42.965333v-487.68a129.194667 129.194667 0 0 1-66.773333 18.645333M840.533333 74.666667c-5.632-15.744-34.858667-32-62.592-32H246.016c-27.946667 0-57.045333 16.256-62.549333 32L42.666667 298.666667c0 47.189333 52.522667 85.333333 125.141333 85.333333C224.64 384 277.333333 345.770667 277.333333 298.666667c0 47.146667 52.522667 85.333333 125.141334 85.333333C459.306667 384 512 345.856 512 298.666667c0 47.146667 52.522667 85.333333 109.482667 85.333333 72.533333 0 125.184-38.186667 125.184-85.333333 0 47.146667 52.522667 85.333333 125.141333 85.333333C928.64 384 981.333333 345.770667 981.333333 298.666667l-140.8-224z" fill="#C39862" p-id="7582"></path></svg>
      此地区暂没有门店存在</div>
    <div v-for="(item, index) in List"
      :key="index">
      <div class="store-info" >
      <div>
        <img src="~@/assets/u919.png" alt="">
        <span>{{item.storeId}}</span>
      </div>
        <div>门店：{{item.storeName}}</div>
        <div>地址：{{item.address}}</div>
      </div>
      <hr>
      <div class="shop-info">
        <div>店长：{{item.userName}}</div>
        <div>手机：{{item.phone}}</div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import req from '@/api/driver-shop.js'
export default {
  data () {
    return {
      List: [],
      forData: {
        storeId: '',
        storeName: '',
        address: '',
        userName: '',
        phone: ''
      }
    }
  },
  mounted () {
    this.listDriverStores()
  },
  methods: {
    listDriverStores () {
      req('listDriverStores', {
      }).then(data => {
        console.log(data.data)
        this.List = data.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.store {
  .tips {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: rgb(141, 141, 141);
  }
  .el-input {
        width: 80%;
        margin-left: 15px;
    }
  }
  .store-info {
    margin-top: 17px;
    div {
      position: relative;
      margin: 13px;
      img {
        position: absolute;
        top: -2px;
      }
      span {
        margin-left: 30px;
      }
    }
    div:nth-child(2) {
      margin-left: 15px;
    }
    div:nth-child(3) {
      margin-left: 15px;
    }
  }
  .shop-info {
    div {
      margin: 15px 15px;
    }
  }
</style>
