// pages/mypart/mypart.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: ["拍卖中", "已拍卖"],
    goodsList:[],
    shangpinList: [],
    shangpinList1: [],
    shangpinList2: [],
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
     url: app.globalData.apiurl+'/orders/sellerorders/1',//+app.globalData.userId,
     success:(result)=>{
     // console.log(result.data.obj)
       thispage.setData({
         goodsList:result.data.obj
       })
       console.log(thispage.data.goodsList)
       var x=0
       for(let i=0,len=thispage.data.goodsList.length;i<len;i++)
       {
        // console.log(thispage.data.goodsList[i].dealPrice)
         if(thispage.data.goodsList[i].status==1)
         {     
           var name ="inList["+x+"].name"
          
           var price ="inList["+x+"].price"
           var imageUrl ="inList["+x+"].imageUrl"
           var people = "inList["+x+"].people"
           this.setData({
           [name]:thispage.data.goodsList[i].itemInfo,
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
 get_shangpinList(){
  var thispage=this
 wx.request({
   url: app.globalData.apiurl+'/orders/getItemListBySellerId/1',//+app.globalData.userId,
   success:(result)=>{
   // console.log(result.data.obj)
     thispage.setData({
       goodsList:result.data.obj
     })
     //console.log(thispage.data.goodsList)
     var x=0
     var y=0
     for(let i=0,len=thispage.data.goodsList.length;i<len;i++)
     {
      // console.log(thispage.data.goodsList[i].dealPrice)
      if(thispage.data.goodsList[i].status==0)
      { 
        var status ="shangpinList1["+x+"].status"
        var name ="shangpinList1["+x+"].name"
        var times ="shangpinList1["+x+"].times"
        var price ="shangpinList1["+x+"].price"
        var imageUrl ="shangpinList1["+x+"].imageUrl"

        this.setData({
        [times]:thispage.data.goodsList[i].endTime,
        [name]:thispage.data.goodsList[i].itemInfo,
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
        var times ="shangpinList2["+y+"].times"
        var price ="shangpinList2["+y+"].price"
        var imageUrl ="shangpinList2["+y+"].imageUrl"

        this.setData({
        [times]:"已卖出",
        [name]:thispage.data.goodsList[i].itemInfo,
        [price]:thispage.data.goodsList[i].finalPrice,
        [imageUrl]:thispage.data.goodsList[i].itemImg1,
        [status]:thispage.data.goodsList[i].status
        })
          y++ 
     }

     thispage.setData({
      shangpinList: thispage.data.shangpinList1.concat(thispage.data.shangpinList2)
    })

   }
  }
 })

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