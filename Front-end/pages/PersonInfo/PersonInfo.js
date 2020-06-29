// pages/PersonalInfo/PersonalInfo.js
var app=getApp()
var that
Page({
  data: {
    userInfo:app.globalData.userInfo,
    phoneNumber:app.globalData.phoneNumber,
    
  },
  /**
   * 页面的初始数据
   */
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.schoolName)
    app.editTabbar();
    that=this
    wx.request({
      url: 'https://yyzcowtodd.cn/Auction/userInfo/'+app.globalData.userId,
      success:function(e){
        //console.log(e)
        
        that.setData({ schoolName: e.data.obj.schoolName })
        
      }
    })
    wx.getUserInfo({
      success: function (res) {
        that.setData({ userInfo: res.userInfo })
      }
    })

     

  },


  changecity:function(e){
    
    app.globalData.userInfo.city =e.detail.value
    
  },
  changephonenumber:function(e){
    var that = this
     app.globalData.phoneNumber = e.detail.value
     that.setData({phoneNumber:e.detail.value})
  },
  saveinformation:function(){
    wx.request({
      url: 'https://yyzcowtodd.cn/Auction/updateUser',
      method: 'post',
      data: {
         userId:app.globalData.userId,
         location:app.globalData.userInfo.city,
         telephoneNumber:app.globalData.phoneNumber
        
      },

    })
   console.log(app.globalData.phoneNumber)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})