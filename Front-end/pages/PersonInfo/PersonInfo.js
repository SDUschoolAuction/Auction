// pages/PersonalInfo/PersonalInfo.js
var app=getApp()
var items = require('../../data/schoolData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isDisabled:true,
      id:'',
      wxid:'',
      name: "",
      number:'',
      schoolid:'',
      location:[],
      text:"编辑",
      schooldata:items.schools,
      region: ["","",""],
      imageUrl:"",
      nownumber:'',
      locationchange: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.get_data();
    //console.log(app.globalData.schoolId[1])
  },
  get_data(){
    var thispage =this
    console.log(app.globalData.userId)
    wx.request({
      url: app.globalData.apiurl+'/user/'+app.globalData.userId,
      success: (result) => {
        var d;
       if(result.data.location.length==3){
          thispage.setData({
            region: result.data.location
          })
        }
        if(result.data.location.length>3){
         d=result.data.location.split("\"")
         var x="region["+0+"]"
         var y="region["+1+"]"
         var z="region["+2+"]" 
         thispage.setData({
          [x]:d[1],
          [y]:d[3],
          [z]:d[5],
         })
        }
        
       // var newnumber =result.data.telephoneNumber.split("\"")
       if(result.data.telephoneNumber){
        if(result.data.telephoneNumber[0]=="\"")
        {
        var newnumber =result.data.telephoneNumber.split("\"")
        console.log(newnumber)
        thispage.setData({
          number:newnumber[1]
        })
     }
    
    else{
      thispage.setData({
        number:result.data.telephoneNumber
      })
    }
      }
        thispage.setData({  
          id:result.data.userId,
          name:result.data.name,
          wxid:result.data.weChatId,
        //  number:result.data.telephoneNumber,
          schoolid:thispage.data.schooldata[result.data.schoolId-1].schoolName,
          imageUrl:result.data.userIcon,
          
          //number:result.data.telephoneNumber
          
        })
       
        }
        
    })
   
  },

  numberInput:function(e)
  {
      this.setData({
        nownumber:e.detail.value
      })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

  change:function(e)
  {
    if (!this.data.isDisabled) { 
      this.setData({  
        isDisabled: true,  
        text: "编辑"   
      })
      var newlocation=this.data.region
      var newtelephoneNumber=this.data.nownumber
      var myuserId=app.globalData.userId
      console.log(newlocation)
      console.log(newtelephoneNumber)
      console.log(myuserId)
      wx.request({
        url: app.globalData.apiurl+'/updateUser',
        data: {     
          userId:JSON.stringify(app.globalData.userId),
          location:JSON.stringify(newlocation),
          telephoneNumber:JSON.stringify(newtelephoneNumber)

         },
         method: "POST",
         header: {
           'content-type': 'application/json'
         },
         success: function(res) {
           
           wx.showToast({
            title: '修改成功'
            

          })
          console.log(newtelephoneNumber)
         },
         fail: function(res) {
           console.log(JSON.stringify(res));
           wx.showToast({
             title: '修改失败',
             icon: 'loading',
             duration: 2000
           })

      }
    })
    console.log(this.data.region)
    console.log(this.data.nownumber)
  }
    else {    
      this.setData({  
        isDisabled: false,    
        text: "保存"  
      })
    }
  }
})