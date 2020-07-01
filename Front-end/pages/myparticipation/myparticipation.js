// pages/mypart/mypart.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: ["参拍中的", "已中标的"],
    
    shangpinList: [],
    shangpinList1:[],
    shangpinList2:[],
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
     url: app.globalData.apiurl+'/orders/buyerorders/'+app.globalData.userId,
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
           var itemId ="inList["+x+"].itemId"
           var info = "inList["+x+"].itemInfo"
           var price ="inList["+x+"].price"
           var imageUrl ="inList["+x+"].imageUrl"
           var people = "inList["+x+"].people"
           this.setData({
           [itemId]:thispage.data.goodsList[i].itemId,
           [name]:thispage.data.goodsList[i].itemHead,
           [info]:thispage.data.goodsList[i].itemInfo,
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
   url: app.globalData.apiurl+'/orders/getItemListByCustomerId/'+app.globalData.userId,
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
        var itemId ="shangpinList1["+x+"].itemId"
        var times ="shangpinList1["+x+"].times"
        var price ="shangpinList1["+x+"].price"
        var imageUrl ="shangpinList1["+x+"].imageUrl"
        var info  ="shangpinList1["+x+"].info"
        var myprice="shangpinList1["+x+"].myprice"
        this.setData({
        [times]:thispage.data.goodsList[i].endTime,
        [itemId]:thispage.data.goodsList[i].itemId,
        [name]:thispage.data.goodsList[i].itemHead,
        [info]:thispage.data.goodsList[i].itemInfo,
        [price]:thispage.data.goodsList[i].finalPrice,
        [imageUrl]:thispage.data.goodsList[i].itemImg1,
        [myprice]:thispage.data.goodsList[i].dealPrice,
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
        var myprice="shangpinList2["+y+"].myprice"
        this.setData({
        [times]:"已卖出",
        [itemId]:thispage.data.goodsList[i].itemId,
        [name]:thispage.data.goodsList[i].itemHead,
        [info]:thispage.data.goodsList[i].itemInfo,
        [price]:thispage.data.goodsList[i].finalPrice,
        [imageUrl]:thispage.data.goodsList[i].itemImg1,
        [myprice]:thispage.data.goodsList[i].dealPrice,
        [status]:thispage.data.goodsList[i].status
        })
          y++ 
     }

   }

   thispage.setData({
     shangpinList: thispage.data.shangpinList1.concat(thispage.data.shangpinList2)
   })

  }
 })
 this.count_Down()
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

queren:function(e)
{
  wx.navigateTo({
    url: '../../pages/star/star',
  })
},
mag(){

},
onPullDownRefresh: function() {
  this.get_inList()
  this.get_shangpinList()
  wx.stopPullDownRefresh();
}
})