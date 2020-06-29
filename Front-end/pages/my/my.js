  // pages/mine/mine.js
  var app=getApp()

  Page({
  
    /**
     * 页面的初始数据
     */
    data: {
      userInfo:app.globalData.userInfo,
      personInfo:app.globalData.personInfo,
      openid:app.globalData.openid,
      one_1:5,
      two_1:0
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      app.editTabbar();
     var that=this
      wx.getUserInfo({
        success: function (res) {
          that.setData({ userInfo: res.userInfo })
        }
      }),
  
        that.setData({ personInfo: wx.getStorageSync("personInfo") })
        
      that.get_credit()
    },
  get_credit(){
    wx.request({
      url: app.globalData.apiurl+'/user/'+app.globalData.userId,
      success:(result)=>{
       this.setData({
        one_1:result.data.credit/20,
        two_1:5-result.data.credit/20
      })
      }
    })
  },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      app.hidetabbar()

    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      app.hidetabbar()

     
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
  
  
    //点击我的信息栏
    clickPersonInfo:function(res){
      wx.navigateTo({
        url: '../PersonInfo/PersonInfo',
      })
    },
  
  
    
  
    //点击我的发布
    clickMyproducts:function(res){
     wx.navigateTo({
          url: '../myproducts/myproducts',
        })
    },
  
   
  
  
    //我的参拍
    clickMyparticipation:function(res){
      wx.navigateTo({
        url: '../myparticipation/myparticipation',
      })
    },
  
    //问题反馈
    clickPropose:function(res){
      wx.navigateTo({
        url: '',
      })
    },
  
   
  
    
  })