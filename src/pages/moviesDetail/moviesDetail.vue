<template>
   <div class='moviesDetailContainer' v-if="currentMoviesData.images">
     <img :src="currentMoviesData.images.large" alt="">
     <p class="movie_name" >{{currentMoviesData.original_title}}</p>
     <div class="detail_content">
       <span>评分：{{currentMoviesData.rating.average}}</span>
       <span>导演：{{currentMoviesData.directors[0].name}}</span>
       <span>主演：{{currentMoviesData.casts[0].name}} {{currentMoviesData.casts[1].name}} {{currentMoviesData.casts[2].name}}</span>
     </div>
     <button @tap='toPlayMovies'>我要观影</button>
   </div>
</template>

<script>
import {mapState} from 'vuex'
import { videoInfoData } from '../../datas/list-datas'
export default {
  data(){
    return{
      pageIndex:""
    }
  },
  computed:{
    ...mapState(["currentMoviesData"])
  },
  methods:{
    toPlayMovies(){
      //将视频数据存到store中
      this.$store.dispatch('getPlayMoviesData',{videoInfoData})
      this.$store.dispatch('getOtherVideoData')
      this.$store.dispatch('getCommentListData')
      wx.navigateTo({
        url:`/pages/playMovie/main?pageIndex=${this.pageIndex}`
      })
    }
  },
  mounted(){
    this.pageIndex = this.$mp.query.index
  }
}
</script>

<style lang='css' scoped>
  .moviesDetailContainer{
    display: flex;
    flex-direction: column;
    padding: 30rpx 80rpx;
  }
  .moviesDetailContainer img{
    height: 700rpx;
    width: 100%;
  }
  .movie_name{
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
    padding:35rpx 0; 
  }
  .detail_content{
    display: flex;
    flex-direction: column;
    padding: 10rpx 0;
  }
  .detail_content span{
    padding-bottom:10rpx;
    font-size: 30rpx;
  }
  .moviesDetailContainer Button {
    width: 70%;
    background: green;
    color:#fff;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
  }
</style>