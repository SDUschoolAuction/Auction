//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo:{},
    needauth:true,
    str_openid:""
  },
  myopenid:function(){
   // console.log("111");
    var that = this;
    
    //获取openid
    app.wxlogin(function (res){
      console.log("1222");
      console.log("获取openid："+res);
      //判断有无openid
      if(res){
        that.setData({
          str_openid:res
        })
        //+++
      }
    });
  },
  //获取用户授权信息
  auth:function(e){

  var userInfo = JSON.stringify(e.detail.userInfo);
   console.log(userInfo);
   this.setData({
     userInfo:e.detail.userInfo,
     needauth:false
     });
  },
  onLoad:function(){
    var that=this;
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.address.userInfo']){
          wx.getUserInfo({
            success:function(res){
              that.setData({
                 userInfo:res.userInfo,
                 needauth:false
              })
            }
            
          })
        }
      }
    })
  }


})
 