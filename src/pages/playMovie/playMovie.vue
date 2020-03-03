<template>
  <div class='playMovieContainer' v-if='videoInfo'>
    <!-- 视频详情 -->
    <div class="video_info">
      <!-- 视频标签 -->
      <video :src="videoInfo.videoSrc" controls ></video>
      <!-- 视频标题 -->
      <div class="video_title">
        <span>{{videoInfo.videoTitle}}</span>
        <span class="fa fa-angle-down"></span>
      </div>
      <!--视频信息详情 -->
      <div class="video_detail">
        <!-- 作者 -->
        <span class="author">{{videoInfo.author}}</span>
        <!-- 播放量 -->
        <span class="play_count">{{videoInfo.playCount}}</span>
        <!-- 评论量 -->
        <span class="comment_count">{{videoInfo.commentCount}}弹幕</span>
        <!-- 时间 -->
        <span class="date">{{videoInfo.date}}</span>
      </div>
    </div>
    <!-- 推荐视频 -->
    <div class="other_list">
      <navigator class="item_other" v-for="(item,index) in recommendVideoInfo" :key="index">
        <!-- 图片容器 -->
        <div class="other_img_wrap">
          <image :src="item.imgSrc" mode="widthFix"></image>
        </div>
        <!-- 视频详情 -->
        <div class="other_info">
          <!-- 标题 -->
          <div class="other_title">{{item.title}}</div>
          <!-- 播放详情 -->
          <div class="other_detail">
            <!-- 播放量 -->
            <span class="play_count">{{item.playMsg}}次观看</span>
            <!-- 评论 -->
            <span class="comment_count">{{item.commentCount}}评论</span>
          </div>
        </div>
      </navigator>
    </div>
    <!-- 评论模块 -->
  <div class="comment_wrap" v-if='commentListData'>
    <div class="comment_title">
      评论（{{commentListData.commentTotalCount}}）
    </div>
    <div  class="comment_list">
      <div class="comment_item" v-for="(item,index) in commentListData.commentList" :key="index">
        <!-- 左侧 -->
        <div class="comment_user">
          <image :src="item.userIconSrc" mode="widthFix"></image>
        </div>
        <!-- 右侧 -->
        <div class="comment_info">
          <div class="comment_detail">
            <span class="author">{{item.userName}}</span>
            <span class="date">{{item.commentDate}}</span>
          </div>
          <div class="comment_content">
            {{item.comment}}
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      index:""
    }
  },
   computed:{
    ...mapState(["videoInfo",'recommendVideoInfo','commentListData'])
  },
  beforeMount(){
    this.index = this.$mp.query.pageIndex
     wx.showLoading('加载中...')
  },
  mounted(){
     setTimeout(()=>{
      wx.hideLoading()
    },800)
  }
}
</script>

<style lang='css' scoped>
.playMovieContainer{
  padding: 10rpx;
  color: #666;
}
/* 视频 */
.video_info{
  margin-top: 10rpx;
}
.video_info video{
  width: 100%;
}
.video_title{
  display: flex;
  justify-content: space-between;
  font-size: 35rpx;
}

.video_detail{
  margin-top: 5rpx;
  font-size: 28rpx;
}
.video_detail span{
  margin-left: 15rpx;
}
.video_detail .author{
  color: #000;
  font-size: 30rpx;
}
/* 推荐视频 */
.other_list{
  margin-top: 10rpx;
}
.item_other{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}
.other_img_wrap{
  width: 38%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.other_img_wrap image{
  width: 90%;
  border-radius: 15rpx;
}
.other_info{
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.other_title{
  font-size: 30rpx;
  color: #e06f93;
}
.other_detail{
  font-size: 26rpx;
  color: #666;
}
.other_detail >span{
  display: inline-block;
  margin-right: 10rpx;

}

/* 评论列表 */
.comment_wrap{
  margin-top: 10rpx;
}
.comment_title{
  padding: 10rpx;
  font-size: 28rpx;
}
.comment_item{
  margin-bottom: 10rpx;
  padding: 10rpx;
  display: flex;
  justify-content: space-around;
  border-bottom: 1rpx solid #ccc;
}
.comment_user{
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.comment_user image{
  width: 60%;
  border-radius: 50%;
  align-self: flex-start;
}
.comment_info{
  flex:5;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.comment_detail{
  display: flex;
  justify-content: space-between;
}
.comment_detail .author{
  font-size: 28rpx;
  color:#666;
}
.comment_detail .date{
  font-size: 24rpx;
  color:#666;
}
.comment_content{
  font-size: 28rpx;
  color:#000000;
}
</style>