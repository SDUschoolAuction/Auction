// pages/switch/switch.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    goodsList:[],
    m:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    console.log(app.globalData)
    var that=this;
    that.get_goodsList()
  },

  get_goodsList(){
    wx.request({
      url: 'https://yyzcowtodd.cn/Auction/itemList',
      success: (result) => {
        //console.log(result)
        this.setData({
          goodsList:result.data
        })
        this.countDown();

        }
    })
    wx.stopPullDownRefresh();
  },
  // 倒计时
  countDown:function(){
    
    for(let i = 0, len = this.data.goodsList.length; i < len; i++){
         
      if(this.data.goodsList[i].startTime==null){
        //一口价
        /* console.log(i+":一口价") */
        var up = "goodsList[" + i + "].stateGoods";
        this.setData({
          [up]:1
        })      
        /* console.log(this.data.goodsList) */
      }
      else{
        //拍卖
        var that = this;
        var nowTime = new Date().getTime();//现在时间（时间戳）
        var endTime = new Date(that.data.goodsList[i].endTime).getTime();//结束时间（时间戳）
        var startTime = new Date(that.data.goodsList[i].startTime).getTime();//开始时间（时间戳）
        var up1 = "goodsList[" + i + "].startTime";
        this.setData({
          [up1]:startTime
        })  
        var up2 = "goodsList[" + i + "].endTime";
        this.setData({
          [up2]:endTime
        })  
        var up3 = "goodsList[" + i + "].nowTime";
        this.setData({
          [up3]:nowTime
        })  

        //判断拍卖是否开始
        if(nowTime<startTime){
          //拍卖未开始             
          var time_notstart = (startTime-nowTime)/1000;//距离结束的毫秒数
          // 获取天、时、分、秒
          let day = parseInt(time_notstart / (60 * 60 * 24));
          let hou = parseInt(time_notstart % (60 * 60 * 24) / 3600);
          let min = parseInt(time_notstart % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(time_notstart % (60 * 60 * 24) % 3600 % 60);
          // console.log(day + "," + hou + "," + min + "," + sec)
          day = that.timeFormin(day);
          hou = that.timeFormin(hou);
          min = that.timeFormin(min);
          sec = that.timeFormin(sec);
          var day1 = "goodsList[" + i + "].day"
          var hou2 = "goodsList[" + i + "].hou"
          var min3 = "goodsList[" + i + "].min"
          var sec4 = "goodsList[" + i + "].sec"
          that.setData({
            [day1]: that.timeFormat(day),
            [hou2]: that.timeFormat(hou),
            [min3]: that.timeFormat(min),
            [sec4]: that.timeFormat(sec),
          })
          

        }
        if(nowTime>startTime){
          //拍卖开始
          var time_start = (endTime-nowTime)/1000;//距离结束的毫秒数
          // 获取天、时、分、秒
          let day = parseInt(time_start / (60 * 60 * 24));
          let hou = parseInt(time_start % (60 * 60 * 24) / 3600);
          let min = parseInt(time_start % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(time_start % (60 * 60 * 24) % 3600 % 60);
          // console.log(day + "," + hou + "," + min + "," + sec)
          day = that.timeFormin(day);
          hou = that.timeFormin(hou);
          min = that.timeFormin(min);
          sec = that.timeFormin(sec);
          var day1 = "goodsList[" + i + "].day"
          var hou2 = "goodsList[" + i + "].hou"
          var min3 = "goodsList[" + i + "].min"
          var sec4 = "goodsList[" + i + "].sec"
          that.setData({
            [day1]: that.timeFormat(day),
            [hou2]: that.timeFormat(hou),
            [min3]: that.timeFormat(min),
            [sec4]: that.timeFormat(sec),
          })
          if(time_start<0){
            var showView = "goodsList[" + i + "].showView"
            this.setData({
              [showView]:false
            })
          }
           
        }
      }
    
    }
    setTimeout(this.countDown, 1000);
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
    //app.hidetabbar()

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

  //滚动条触底事件
  onReachBottom(){
    console.log("触底")
    if (this.data.m>this.data.goodsList.length) {
      //m值不会再增加
    }
    else{
      this.setData({
    
        m:this.data.m+10,
      });
    }

  },
  //下拉刷新事件
  onPullDownRefresh(){
    this.setData({
      m:10,
      goodsList:[],
    })
   
    this.get_goodsList()
  }
})