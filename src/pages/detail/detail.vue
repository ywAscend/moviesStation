<template>
   <div class='detailContainer'>
     <img :class=" isMusicPlay?'detail_justy':'detail_img'" :src=" isMusicPlay? detailObj.music.coverImgUrl: detailObj.datail_img" alt="">
     <!-- <img class="music_img" :src="detailObj.music.coverImgUrl" alt=""> -->
     <img @tap="handleMusicPlay" :class="isMusicPlay? 'music_img_justy' : 'music_img'" :src=" isMusicPlay ? 'https://i.loli.net/2020/03/01/n4OzHUDQ87a3d5T.jpg':'https://i.loli.net/2020/03/01/vtagrsKNeJUknwC.jpg'" alt="">
     <div class="avatar_date">
       <img :src="detailObj.avatar" alt="">
      <span>{{detailObj.author}}</span>
      <span>发布于</span>
      <span>{{detailObj.date}}</span>
    </div>
   <p class="company">{{detailObj.title}}</p>
   <div class="collection_share_container">
     <div class="collection_share">
       <!-- fa-file-o fa-share-alt -->
        <img @tap="handleCollection" :src="isCollected ? collectShareImgUrl.markedUrl:collectShareImgUrl.markUrl" alt="">
        <div @tap="handShare">
            <img @tap="handShare" :src="isShared ? collectShareImgUrl.shareUrl:collectShareImgUrl.sharedUrl" alt="">
        </div>
     </div>
     <div class="line"></div>
   </div>
   <Button open-type="share">转发此文章</Button>
   <p class="contents">{{detailObj.detail_content}}</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {

  // onLoad(options){
  //   console.log(options)
  // }
  data(){
    return{
      detailObj:{},
      index:0,
      isCollected:false, //标识文章是否被收藏
      isShared:false,
      isMusicPlay:false,
      isPlayObj:{
        pageIndex:'',
        isPlay:false
      },
      collectShareImgUrl:{
        shareUrl: "https://i.loli.net/2020/03/01/tnaIJqPoF5H89cX.png",
        sharedUrl: "https://i.loli.net/2020/03/01/1YROaEFiDo8j6w3.png",
        markUrl: "https://i.loli.net/2020/03/01/7gm8FMUGtIc2zRE.png",
        markedUrl: "https://i.loli.net/2020/03/01/uQV6vxsaPkRql5Y.png",
      }
    }
  },
  computed:{
    ...mapState(["listTmp"])
  },
  methods:{
    handleCollection(){
      this.isCollected = !this.isCollected
      let title = this.isCollected?'收藏成功':'取消收藏'
      wx.showToast({
        title:title,
        icon:'success'
      })

      //读取本地缓存的状态看是否收藏
      let oldStorage = wx.getStorageSync('isCollected')
      oldStorage[this.index]= this.isCollected
      //将本次设置的结果缓存到本地
      wx.setStorage({
        key:'isCollected',
        data:oldStorage
      })

    },
    handShare(){
      console.log('00000')
      wx.showActionSheet({
        itemList:[
          '分享到朋友圈','分享到微博','分享给微信好友'
        ],
        success:(res)=>{
            console.log('分享成功',res)
        },
        fail:(res)=>{
          console.log(res.errMsg)
        }
      })
    },
    beforeCollected(){
      let oldStorage = wx.getStorageSync("isCollected")
      if(!oldStorage) { //为空
        wx.setStorage({
          key:'isCollected',
          data:{}
        })
      }else{
        //用户缓存
        this.isCollected = (oldStorage[this.index] ? true:false )
      }
    },
    beforeShared(){
      let oldShareStorage = wx.getStorageSync("isShared")
      if(!oldShareStorage) { //为空
        wx.setStorage({
          key:'isShared',
          data:{}
        })
      }else{
        //用户分享缓存
        this.isShared = (oldShareStorage[this.index] ? true:false )
      }
    },
    handleMusicPlay(){
      this.isMusicPlay = !this.isMusicPlay
      let {dataUrl,title} = this.detailObj.music
      if(this.isMusicPlay){
        wx.playBackgroundAudio({
          dataUrl,
          title
        })
      }else{
        wx.pauseBackgroundAudio()
      }
    }
  },
  beforeMount(){
    console.log(this)
    //使用this.$mp.query.index 取代onload中的options
    this.index = this.$mp.query.index

    //预处理本地似乎是否收藏的缓存
    this.beforeCollected()
    this.beforeShared()
    //判断当前页面加载的时候音乐是否在播放
    if(this.isPlayObj.pageIndex == this.index && this.isPlayObj.isPlay){
      this.isMusicPlay = true
    }else{
      this.isMusicPlay = false
    }

    //监听音乐的播放和暂停
    wx.onBackgroundAudioPlay(()=>{
      console.log('音乐播放')
      this.isMusicPlay =true

      this.isPlayObj.pageIndex = this.index
      this.isPlayObj.isPlay = true

    })
    wx.onBackgroundAudioPause(()=>{
      console.log('音乐暂停')
      this.isMusicPlay =false
      isPlayObj.isPlay = false
    })
  },
  mounted(){
    console.log("index",this.index)
    this.detailObj = this.listTmp[this.index]
  }
  

}
</script>

<style lang='css' scoped>
  .detailContainer{
    display: flex;
    flex-direction: column;
  }
  .detail_img{
    width: 100%;
    height: 280rpx;
  }
  .detail_justy{
    width: 100%;
    height: 460rpx;
  }
  .avatar_date{
    padding: 10rpx;
  }
  .avatar_date img{
    width:64rpx;
    height:64rpx;
    border-radius: 32rpx;
    vertical-align: middle;
  }
  .avatar_date span{
    font-weight: 28rpx;
    margin-left: 6rpx;
  }
  .collection_share_container{
    position: relative;
  }
  .company{
    font-size: 32rpx;
    font-weight: bold;
    padding: 10rpx;
  }
  .collection_share{
    display: flex;
    float:right;
    margin-right: 30rpx;
    background: #fff;
    justify-content: space-between;
    width: 17%;
  }

  .collection_share img{ 
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
  }
  .line{
    position: absolute;
    top:36rpx;
    left:5%;
    width: 90%;
    height: 1rpx;
    background: #eee;
    z-index: -1;
  }

  .contents{
    font-size: 32rpx;
    text-indent: 32rpx;
    letter-spacing: 3rpx;
    line-height: 50rpx;
  }
  .music_img{
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    border-radius: 30rpx;
    top:140rpx;
    left:50%;
    margin-left:-30rpx;
  }
  .music_img_justy{
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    border-radius: 30rpx;
    top:320rpx;
    left:50%;
    margin-left:-30rpx;
  }

</style>