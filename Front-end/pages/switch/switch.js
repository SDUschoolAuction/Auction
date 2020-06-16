// pages/switch/switch.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    endTime: '2020-6-23 10:43:50',//2018/11/22 10:40:30这种格式也行
    showView: true,
    goodsList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    var that=this;
    that.countDown()
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      data: this.Queryparams,
      success: (result) => {
        console.log(result)
        this.setData({
          goodsList:result.data.message.goods
        })
      },
    })
  },

  // 倒计时
  countDown:function(){
    var that=this;
    var nowTime = new Date().getTime();//现在时间（时间戳）
    var endTime = new Date(that.data.endTime).getTime();//结束时间（时间戳）
    var time = (endTime-nowTime)/1000;//距离结束的毫秒数
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    // console.log(day + "," + hou + "," + min + "," + sec)
    day = that.timeFormin(day),
    hou = that.timeFormin(hou),
    min = that.timeFormin(min),
    sec = that.timeFormin(sec)
    that.setData({
      day: that.timeFormat(day),
      hou: that.timeFormat(hou),
      min: that.timeFormat(min),
      sec: that.timeFormat(sec)
    })


    // 每1000ms刷新一次
    if (time>0){
      that.setData({
        countDown: true
      })
      setTimeout(this.countDown, 1000);
    }else{
      that.setData({
        countDown:false,
        showView: (!that.data.showView)
      })
    }
  },
  //小于10的格式化函数（2变成02）
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  //小于0的格式化函数（不会出现负数）
  timeFormin(param) {
    return param < 0 ? 0: param;
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