<template>
   <div class='listContainer'>
    <swiper autoplay circular indicator-dots indicator-active-color="pink" indicator-color="green">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <image :src="item.imgSrc" alt=""></image>
      </swiper-item>
    </swiper>
    <!-- 引入模板组件 -->
    <div>
      <listTmp v-for="(item,index) in listTmp" :key="index" :index="index" :item ="item" />
    </div>   
   </div>
   
</template>

<script>
import {mapState} from 'vuex'
import listTmp from '../component/ListTemplate.vue'
export default {
  components: {
    listTmp
  },
  data(){
    return{}
  },
  beforeMount(){
    //分发action修改状态
    this.$store.dispatch('getList')
    wx.showLoading('加载中...')
  },
  computed:{
    //映射状态到组件
    ...mapState(['listTmp','swiperList'])
  },
  mounted(){
    setTimeout(()=>{
      wx.hideLoading()
    },800)
  }
}
</script>

<style lang='css' scoped>
.listContainer swiper {
  width:100%;
  height:300rpx;
}
.listContainer swiper image{
  width:100%;
  height: 100%;
}

</style>