<template>
  <div @tap="toDetail" class='tmpContainer'>
    <div class="avatar_date">
      <img :src="item.avatar" alt="">
      <span>{{item.date}}</span>
    </div>
    <p class="company">{{item.title}}</p>
    <img class="detail_img" :src="item.datail_img" alt="">
    <p class="content">{{item.detail_content}}</p>
    <div class="view_star_container">
      <div class="star_info">
        <span class="fa fa-star-o eyeIcon"></span>
        <span class="starTxt">{{item.love_count}}</span>
      </div>
      <div class="eye_info">
        <span class="fa fa-eye eyeIcon"></span>
        <span class="eyeTxt">{{item.attention_count}}</span>
      </div>
    
    </div>
  </div>
</template>

<script>

export default {
  props:[
    "item","index"
  ],
  methods:{
    toDetail(){
      //跳转详情页
      wx.navigateTo({
        url:`/pages/detail/main?index=${this.index}`
      })
    }
  }
}
</script>

<style lang='css' scoped>
  .tmpContainer{
    display: flex;
    flex-direction: column;
    border-bottom: 1rpx solid #eee
  }
  .avatar_date{
    padding: 10rpx;
  }
  .avatar_date img{
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    vertical-align: middle;
    margin-right: 10rpx;
  }
  .avatar_date span{
    font-size: 28rpx;
    color:#333
  }
  .company{
    font-size: 40rpx;
    font-weight: bold;
    padding: 10rpx;
  }
  .detail_img{
    width: 100%;
    height: 360rpx;
  }
  .content{
    font-size: 32rpx;
    text-indent:32rpx;
    line-height: 50rpx;
    letter-spacing: 3rpx;
  }
  .view_star_container{
    display: flex;
  }
  .view_star_container .star_info{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20rpx;
  }
  .view_star_container .star_info .starTxt{
    margin-left: 10rpx;
    font-size: 28rpx;
    color: #333;
  }
  .view_star_container .star_info .eyeIcon{
    color: yellow;
  }
  .view_star_container .eye_info{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .view_star_container .eye_info .eyeTxt{
    margin-left: 10rpx;
     font-size: 28rpx;
    color: #333;
  }
  .view_star_container .eye_info .eyeIcon{
    color: #666;
  }

</style>