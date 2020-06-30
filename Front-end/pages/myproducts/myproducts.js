// pages/mypart/mypart.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: ["已发布", "已卖出"],
    goodsList:[],
    shangpinList: [],
    shangpinList1: [],
    shangpinList2: [],
    shangpinList3: [],
    inList: []
  },



  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  var that=this

  that.get_inList()
  that.get_shangpinList()
  },
  get_inList(){
    var thispage=this
   wx.request({
     url: app.globalData.apiurl+'/orders/sellerorders/'+app.globalData.userId,
     success:(result)=>{
     // console.log(result.data.obj)
       thispage.setData({
         goodsList:result.data.obj
       })
       //console.log(thispage.data.goodsList)
       var x=0
       for(let i=0,len=thispage.data.goodsList.length;i<len;i++)
       {
        // console.log(thispage.data.goodsList[i].dealPrice)
         if(thispage.data.goodsList[i].status==1)
         {     
           var name ="inList["+x+"].name"
           var itemId ="inList["+x+"].itemId"
           var info ="inList["+x+"].info"
           var price ="inList["+x+"].price"
           var imageUrl ="inList["+x+"].imageUrl"
           var people = "inList["+x+"].people"
           this.setData({
          [info]:thispage.data.goodsList[i].itemInfo,
           [itemId]:thispage.data.goodsList[i].itemId,
           [name]:thispage.data.goodsList[i].itemHead,
           [price]:thispage.data.goodsList[i].finalPrice,
           [imageUrl]:thispage.data.goodsList[i].itemImg1,
           [people]:thispage.data.goodsList[i].peopleCount,
          
           })
             x++
         }
        
         
       }

     }
     
   })
  
 },
 /* 倒计时 */
count_Down:function(){
  for(let i = 0, len = this.data.shangpinList.length; i < len; i++){
    if(this.data.shangpinList[i].times!='已卖出'){
    var nowTime = new Date().getTime();//现在时间（时间戳）
    var endTime = new Date(this.data.shangpinList[i].times).getTime();//结束时间（时间戳）
    var count_down_time = (endTime-nowTime)/1000;//距离结束的毫秒数
          // 获取天、时、分、秒
          let day = parseInt(count_down_time / (60 * 60 * 24));
          let hou = parseInt(count_down_time % (60 * 60 * 24) / 3600);
          let min = parseInt(count_down_time % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(count_down_time % (60 * 60 * 24) % 3600 % 60);
          // console.log(day + "," + hou + "," + min + "," + sec)
          day = this.timeFormin(day);
          hou = this.timeFormin(hou);
          min = this.timeFormin(min);
          sec = this.timeFormin(sec);
          var day1 = "shangpinList[" + i + "].day"
          var hou2 = "shangpinList[" + i + "].hou"
          var min3 = "shangpinList[" + i + "].min"
          var sec4 = "shangpinList[" + i + "].sec"
          this.setData({
            [day1]: this.timeFormat(day),
            [hou2]: this.timeFormat(hou),
            [min3]: this.timeFormat(min),
            [sec4]: this.timeFormat(sec),
          })
  }
  
  }
  setTimeout(this.count_Down,1000)
},
//小于10的格式化函数（2变成02）
timeFormat(param) {
  return param < 10 ? '0' + param : param;
},
//小于0的格式化函数（不会出现负数）
timeFormin(param) {
  return param < 0 ? 0: param;
},
 get_shangpinList(){
  var thispage=this
 wx.request({
   url: app.globalData.apiurl+'/orders/getItemListBySellerId/'+app.globalData.userId,
   success:(result)=>{
   // console.log(result.data.obj)
     thispage.setData({
       goodsList:result.data.obj
     })
     //console.log(thispage.data.goodsList)
     var x=0
     var y=0
     var z=0
     for(let i=0,len=thispage.data.goodsList.length;i<len;i++)
     {
      // console.log(thispage.data.goodsList[i].dealPrice)
      if(thispage.data.goodsList[i].status==0)
      { 
        var status ="shangpinList1["+x+"].status"
        var name ="shangpinList1["+x+"].name"
        var itemId ="shangpinList1["+x+"].itemId"
        var times ="shangpinList1["+x+"].times"
        var price ="shangpinList1["+x+"].price"
        var imageUrl ="shangpinList1["+x+"].imageUrl"
        var info ="shangpinList1["+x+"].info"
        this.setData({
        [times]:thispage.data.goodsList[i].endTime,
        [itemId]:thispage.data.goodsList[i].itemId,
        [name]:thispage.data.goodsList[i].itemHead,
        [info]:thispage.data.goodsList[i].itemInfo,
        [price]:thispage.data.goodsList[i].finalPrice,
        [imageUrl]:thispage.data.goodsList[i].itemImg1,
        [status]:thispage.data.goodsList[i].status
        })
          x++   
      }
      if(thispage.data.goodsList[i].status==1)
      { 
        var status ="shangpinList2["+y+"].status"
        var name ="shangpinList2["+y+"].name"
        var itemId ="shangpinList2["+y+"].itemId"
        var times ="shangpinList2["+y+"].times"
        var price ="shangpinList2["+y+"].price"
        var imageUrl ="shangpinList2["+y+"].imageUrl"
        var info ="shangpinList2["+y+"].info"
        this.setData({
        [times]:"已卖出",
        [info]:thispage.data.goodsList[i].itemInfo,
        [itemId]:thispage.data.goodsList[i].itemId,
        [name]:thispage.data.goodsList[i].itemHead,
        [price]:thispage.data.goodsList[i].finalPrice,
        [imageUrl]:thispage.data.goodsList[i].itemImg1,
        [status]:thispage.data.goodsList[i].status
        })
          y++ 
     }
     if(thispage.data.goodsList[i].status=='-1')
      { 
        var status ="shangpinList3["+z+"].status"
        var name ="shangpinList3["+z+"].name"
        var itemId ="shangpinList3["+z+"].itemId"
        var times ="shangpinList3["+z+"].times"
        var price ="shangpinList3["+z+"].price"
        var imageUrl ="shangpinList3["+z+"].imageUrl"
        var info ="shangpinList3["+z+"].info"
        this.setData({
        [times]:"未开始",
        [info]:thispage.data.goodsList[i].itemInfo,
        [itemId]:thispage.data.goodsList[i].itemId,
        [name]:thispage.data.goodsList[i].itemHead,
        [price]:thispage.data.goodsList[i].finalPrice,
        [imageUrl]:thispage.data.goodsList[i].itemImg1,
        [status]:thispage.data.goodsList[i].status
        })
          z++ 
     }

     thispage.setData({
      shangpinList: thispage.data.shangpinList1.concat(thispage.data.shangpinList2)
    })
    thispage.setData({
      shangpinList: thispage.data.shangpinList.concat(thispage.data.shangpinList3)
    })
   }
  }
 })
this.count_Down()
},
 


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.get_inList()
    this.get_shangpinList()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
,
queren:function(e)
{
  wx.showToast({
    title: '确认交易',
  })
}
})