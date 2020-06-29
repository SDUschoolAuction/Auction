//index.js
//获取应用实例
const app = getApp()
import { get, wxPromise } from "../../utils/util";
Page({
  data: {
    motto: 'Hello World',
    userInfo:{},
    needauth:true,
   
  },
  jumpPage:function(){
    wx.redirectTo({
      url: '/pages/school/school',
    })
  },
  myopenid:function(){
  },
  //获取用户授权信息
  auth:function(e){
    var userInfo = JSON.stringify(e.detail.userInfo);
    //console.log(userInfo);
    this.setData({
      userInfo:e.detail.userInfo,
      needauth:false
      });
  },
  getOpenID:function(){
    //console.log(app.globalData)
    wx.showLoading({
      title: '正在登录',
      });
      wxPromise(wx.login)()
      .then(res => get("/openid", { code: res.code }))
      .then(e =>{
          //console.log(e)
          wx.hideLoading();
          if(e.statusCode=="200"){
            app.globalData.openid=e.data.openid;
            if(e.data.login==1){
              app.globalData.userId=e.data.userId;
              wx.request({
                url: 'https://yyzcowtodd.cn/Auction/userInfo/'+app.globalData.userId,
                success:function(e){
                  //console.log(e)
                  
                  app.globalData.schoolName = e.data.obj.schoolName
                  //console.log(app.globalData.schoolName)
                  app.globalData.schoolId = e.data.obj.schoolId
                }
              })
              wx.switchTab({
                url: '/pages/switch/switch',
              })
            }
          }else{
            console.log("dlsb")
          }
          //console.log(app.globalData)
          wx.setStorageSync("openID", e.data.openid)
          wx.setStorageSync("userID", e.data.userId)
      })
  },
  onLoad:function(){
    var that=this;  
    this.getOpenID();
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
