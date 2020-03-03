<template>
<div>
   <div @tap="toMoviesDetail(index)" v-for="(item,index) in moviesList" :key="index" class='moviesContainer'>
      <img class="movies_img" :src="item.images.large" alt="">
      <div class="movies_info">
        <p class="movies_name">{{item.original_title}}</p>
        <p class="movies_year">年份：{{item.year}}</p>
        <p class="movies_dir">导演：{{item.directors[0].name}}</p>
      </div>
      <div class="movies_rating">{{item.rating.average}}</div>
   </div>
   <div v-if="countNum>=120" class="lineContainer">
     <span class="line">-----  我是有底线的  -----</span>
   </div>
</div>
</template>

<script>
import {  MOVIE_URL,MOVIE_URL2 } from '../../datas/list-datas'
export default {
  data(){
    return{
      moviesList:[],
      countNum:20
    }
  },
  methods:{
    toMoviesDetail(index){
      this.$store.dispatch('getMoviesList',index)
      wx.navigateTo({
        url: `/pages/moviesDetail/main?index=${index}`
      })
    },
    getInitData({
      url=MOVIE_URL2,
      method='post',
      callback={}
      }={}){
      this.$http({url,method})
      .then((res)=>{
        console.log('电影接口',res)
        let moviesArr = res.data.subjects
        this.$store.dispatch('getMoviesListData',moviesArr)
        this.moviesList=moviesArr
        typeof callback ==='function' && callback()
      }).catch((err)=>{
        console.log(err)
        typeof callback ==='function' && callback()
      })
    }
  },
  beforeMount(){
    this.getInitData()
  },
  //下拉刷新
  onPullDownRefresh(){ 
    console.log("下拉刷新")
    this.getInitData({
      callback:()=>{ 
        wx.stopPullDownRefresh()
      }
    })
  },
  //滚动加载
  onReachBottom(){
    console.log("到底了")
    this.countNum+=20
    console.log(this.countNum)
    if(this.countNum>120){
      return
    }
    let url = `${MOVIE_URL2}?start=0&count=${this.countNum}`
    this.getInitData({url})
  }

}
</script>

<style lang='css' scoped>
  .moviesContainer{
    display: flex;
    padding: 10rpx;
    border-bottom: 1px solid #eee;
  }
  .movies_img{
    width: 128rpx;
    height: 128rpx;
    margin-right: 20rpx;
  }
  .movies_info{
    width: 70%;
  }
  .movies_name{
    font-size: 32rpx;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .movies_year{
    font-size: 28rpx;
    color: #999;
    margin: 5rpx 0;
  }
  .movies_dir{
    font-size: 30rpx;
    color: #666;
  }
  .movies_rating{
    font-size: 36rpx;
    font-weight: bold;
    color: red;
  }
  .lineContainer{
    display: flex;
    justify-content: center;
    color: #999;
    font-size:30rpx;
    margin: 20prx 0;
  }
  .lineContainer .line{
    text-align: center;
    height: 110rpx;
    line-height: 110rpx;
  }
</style>