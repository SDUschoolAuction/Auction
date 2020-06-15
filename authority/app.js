//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
   /* var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
  },
  wxlogin:function(cb){
    
    var that=this;
    if(that.globalData.openid){
      typeof cb=="function"&&cb(that.globalData.openid)
    }else{
    // 调用登录接口
    wx.login({
      success: function(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          //发起网络请求
          wx.request({
            url:that.globalData.apiurl+'c=xcxlogin',
            data:{code:res.code},
            success:function(e){
              console.log(e);
              if(e.data.code=="0"){
                that.globalData.openid=e.data.data.openid;
                
                wx.setStorageSync('openid',that.globalData.openid)
                typeof cb == "function"&&cb(that.globalData.openid)
              }else{
                that.wx.login(cb)
              }
            }
          });
        }else{
          typeof cb =="function"&& cb("")
          console.log('登陆失败'+res.msg)
        }
      }
    })
  }
  },
    /*获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  getUserInfo:function(cb){
    var that=this;
    if(that.globalData.userInfo){
      typeof cb=="function"&&cb(that.globalData.userInfo)
    }else{
      wx.login({
        success:function(){
          wx.getUserInfo({
            success:function(res){
              that.globalData.userInfo=res.userInfo
              typeof cb == "function"&&cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },  

  globalData: {
    apiurl:''+Math.random()+'&',
    openid:null,
    userInfo: null
  }
})