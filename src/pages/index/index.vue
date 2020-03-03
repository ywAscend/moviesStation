<template>
   <div class='indexPage' style="">
     <img v-if="isShow" class="index_img" :src="userInfo.avatarUrl" alt="">
     <Button class="btn" v-else open-type = "getUserInfo" @getuserinfo="getUserInfo">
       <span class="clickTxt">点击获取用户信息</span>
     </Button>
     <p v-if="isShow" class="userName">hello {{userInfo.nickName}}</p>
     <p v-else class="userName">^_^ Hi!</p>
     <div v-if="isShow" @tap="toDetail" class="explain">
       <p>开启探索之旅</p>
     </div>
   </div>
</template>

<script>
  export default {
    data(){
      return {
        userInfo:{},
        isShow:false, //用户没有授权,
        bgImg:'https://i.loli.net/2020/03/01/jAEX7dMOupWDCQK.jpg'
      }
    },
    methods:{   
      //获取用户登录信息
      handleGetUserInfo(){
        wx.getUserInfo({
          success: (data) => {
            console.log('userInfo',data);
            //更新用户数据
            this.userInfo = data.userInfo
            this.isShow =true
          },
          fail: () => {
            console.log('获取失败')
          }
        })
      },
      //判断用户是否授权
      getUserInfo(data){
        if(data.mp.detail.rawData){
           this.handleGetUserInfo()
        }
        
      },
      //跳转详情
      toDetail(){
        wx.switchTab({
          url:'/pages/list/main'
        })
      },
      handleChild(){
        console.log('handleChild')
      }
    },
    onLoad(){
      console.log('---onLoad---')
    },
    beforeMount(){
      console.log('---beforeMount---')
     
    },
    mounted(){
      console.log('---mounted---')
      this.handleGetUserInfo()
    }
  }
</script>

<style lang='css' scope>
  page{
    background: url('https://i.loli.net/2020/03/01/jAEX7dMOupWDCQK.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .indexPage{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .index_img{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin-top: 280rpx;
  }
  .userName{
    font-size: 40rpx;
    font-weight: bold;
    margin: 55rpx 0;
  }
  .explain{
    /* width: 220rpx; */
    height: 80rpx;
    border:1px solid #eee;
    font-size:24rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 15rpx;
    padding: 0 5rpx;
  }
  .btn{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin-top: 280rpx;
    text-align: center;
    font-size: 30rpx;
    display: flex;
  }
  .clickTxt{
    justify-content: center;
    align-content: center;
    margin-top: 30rpx;
  }

</style>