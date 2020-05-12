<template>
  <div>
    <div v-if="List.length === 0" class="tips">
      <svg t="1588758775921" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6610" width="50" height="100"><path d="M 691.18 592.92 l -2.4 -1.38 c 0.78 0.46 1.58 0.94 2.4 1.38 Z M 727.62 521.59 l 3.82 2.17 a 40.88 40.88 0 0 0 -3.82 -2.17 Z" fill="#C39862" p-id="6611"></path><path d="M 732.13 523.76 l -3.82 -2.17 A 446 446 0 0 0 509 464.34 c -247.42 0 -448 200.58 -448 448 v 7.58 c 0 1.06 0.06 2.1 0.14 3.13 a 40 40 0 0 0 80 -2.85 v -0.28 v -2.11 c 0 -1.82 -0.05 -3.65 -0.05 -5.48 c 0 -203.24 164.76 -368 368 -368 a 366.34 366.34 0 0 1 180.43 47.2 l 2.4 1.38 a 40 40 0 0 0 40.26 -69.16 Z" fill="#C39862" p-id="6612"></path><path d="M 104.08 879.88 a 40 40 0 0 0 -40 38.94 c 0 1.29 0 2.59 0.07 3.88 a 40 40 0 0 0 80 -2.11 c 0 -1 -0.05 -2.08 -0.07 -3.12 a 40 40 0 0 0 -40 -37.59 Z" fill="#C39862" p-id="6613"></path><path d="M 512 64 c -132.55 0 -240 107.45 -240 240 s 107.45 240 240 240 s 240 -107.45 240 -240 S 644.55 64 512 64 Z m 0 400 a 160 160 0 1 1 160 -160 a 160 160 0 0 1 -160 160 Z" fill="#C39862" p-id="6614"></path><path d="M 538.91 475.68 a 40 40 0 0 0 -56.56 0 l -138 138 l -46.73 -46.73 a 40 40 0 0 0 -56.57 0 a 40 40 0 0 0 0 56.57 l 75 75 a 40 40 0 0 0 56.57 0 l 166.29 -166.27 a 40 40 0 0 0 0 -56.57 Z" fill="#C39862" p-id="6615"></path><path d="M 780.23 566.91 a 40 40 0 0 0 -56.56 0 l -46.73 46.73 l -138 -138 a 40 40 0 0 0 -56.57 0 a 40 40 0 0 0 0 56.57 l 166.27 166.28 a 40 40 0 0 0 56.57 0 l 75 -75 a 40 40 0 0 0 0.02 -56.58 Z" fill="#C39862" p-id="6616"></path><path d="M 512 464 C 264.58 464 64 664.58 64 912 q 0 3.42 0.06 6.82 c 0 1.29 0 2.59 0.07 3.88 a 40 40 0 0 0 80 -2.11 c 0 -1 -0.05 -2.08 -0.07 -3.12 V 912 c 0 -203.24 164.76 -368 368 -368 S 880 708.76 880 912 v 5.87 c 0 0.72 0 1.45 -0.05 2.17 a 40 40 0 0 0 80 3.15 c 0 -1.65 0.07 -3.31 0.1 -5 v -6.21 C 960 664.58 759.42 464 512 464 Z" fill="#C39862" p-id="6617"></path></svg>
      暂没有负责此地区的司机</div>
    <div class="driver" v-for="(item, index) in List"
      :key="index">
      <div>
        <img src="~@/assets/u1210.png" alt="">
        <span>{{item.userName}}</span>
      </div>
      <br>
      <div>
        <img src="~@/assets/u1151.png" alt="">
        <span>{{item.phone}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tips {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: rgb(141, 141, 141);
  }
div {
  width: 100%;
  .driver {
     box-sizing: border-box;
     border-bottom: rgb(201, 201, 201) 1px solid;
     height: 90px;
     margin-bottom: 10px;
     div:first-child {
       margin-top: 20px;
     }
     div {
       display: flex;
       align-content: center;
       font-size: 17px;
       margin-left: 20px;
       span {
         margin-left: 20px;
       }
     }
   }
}

</style>

<script>
import req from '@/api/shop-driver.js'
export default {
  data () {
    return {
      formData: {
        userName: '',
        phone: ''
      },
      List: []
    }
  },
  mounted () {
    this.listManagerDrivers()
  },
  methods: {
    listManagerDrivers () {
      req('listManagerDrivers', {
      }).then(data => {
        console.log(data.data)
        this.List = data.data
      })
    }
  }
}
</script>
