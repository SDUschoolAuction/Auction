//app.js
App({
  onLaunch: function () {
    //隐藏系统tabbar
    this.hidetabbar();
    //获取设备信息
    this.getSystemInfo();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          //发起网络请求
          var that = this
          //console.log(res.code)
          wx.request({
            url:that.globalData.apiurl+"/openid",
            //url:"http://localhost:8083/openid",
            data:{code:res.code},
            success:function(e){
              console.log(e);
              
        
              
              if(e.statusCode=="200"){
                that.globalData.openid=e.data.openid;

                console.log(that.globalData)
               // wx.setStorageSync('openid',this.globalData.openid)
               // typeof cb == "function"&&cb(this.globalData.openid)
               if(e.data.login==1){
                 that.globalData.userId=e.data.userId;
                wx.switchTab({
                  url: '/pages/switch/switch',
                })
              }

              }else{
                console.log("dlsb")
                //that.wx.login(cb)
              }
            }
          });
        }else{
          typeof cb =="function"&& cb("")
          console.log('登陆失败'+res.msg)
        }
      }
    })
    // 获取用户信息
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
    })
  },
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },
  hidetabbar() {
    wx.hideTabBar({
      fail: function() {
        setTimeout(function() { // 做了个延时重试一次，作为保底。
          wx.hideTabBar()
        }, 500)
      }
    });
  },

  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    apiurl:'https://yyzcowtodd.cn/Auction',
    openid:null,
    userId:null,
    systemInfo: null,//客户端设备信息
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [
        {
          "pagePath": "/pages/switch/switch",
          "iconPath": "icon/icon_home.png",
          "selectedIconPath": "icon/icon_home_HL.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/public/public",
          "iconPath": "icon/icon_release.png",
          "isSpecial": true,
          "text": "发布"
        },
        {
          "pagePath": "/pages/my/my",
          "iconPath": "icon/icon_mine.png",
          "selectedIconPath": "icon/icon_mine_HL.png",
          "text": "我的"
        }
      ]
    }
  }
})
