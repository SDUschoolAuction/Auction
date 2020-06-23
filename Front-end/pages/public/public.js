



const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    thingName: '',
    thingPhoneNumber:'',
    thingPrice: '',
    thingConditions: ["全新", "几乎全新", "九成新", "八成新", "七成新", "六成新", "五成新", "五成新以下"],
    thingConditionIndex: 0,
    thingCampus: ["1", "2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
    thingCampusIndex: 0,
    region: [],
    imgList: [],
    modalName: null,
    textareaValue: '',
    TabCur: 0,
    scrollLeft:0,
    dateMinute: '',
    dateSecond: ''
  },


  /**
   * 年月日时分选择类型的回调函数，可以在该函数得到选择的时间
   */
  selectDateMinuteChange(ev) {
    this.setData({
      dateMinute: ev.detail.value
    })
  },
  /**
   * 年月日时分秒选择类型的回调函数，可以在该函数得到选择的时间
   */
  selectDateSecondChange(ev) {
    this.setData({
      dateSecond: ev.detail.value
    })
  },

 
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    
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





  
  bindThingNameInput: function(e) { //商品名字
    this.setData({
      thingName: e.detail.value
    })
  },
  bindThingPriceInput: function(e) { //商品价格
    this.setData({
      thingPrice: e.detail.value
    })
  },
  bindthingPhoneNumberInput: function(e) { //联系电话
    this.setData({
      thingPhoneNumber: e.detail.value
    })
  },
  thingConditionsChange(e) {//商品成色
    
    this.setData({
      thingConditionsIndex: e.detail.value
    })
  },
  thingCampusChange(e) {//加价幅度
    
    this.setData({
      thingCampusIndex: e.detail.value
    })
  },
 
  RegionChange: function(e) {//发货地区
    this.setData({
      region: e.detail.value
    })
  },

  //图片
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '系统提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaInput(e) {
    this.setData({
      textareaValue: e.detail.value
    })
  },

  bindSubmitThingA: function() {
    var that = this;
        
      wx.showModal({
        title: '系统提示',
        content: '确定发布',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../myproducts/myproducts',
            })

            var imgList = that.data.imgList; //图片
            var thingName = that.data.thingName; //名字
            var thingConditionIndex = that.data.thingConditionIndex; //成色索引值
            var thingConditions = that.data.thingConditions[thingConditionIndex]; //成色
            var thingCampusIndex = that.data.thingCampusIndex; //加价索引值
            var thingCampus = that.data.thingCampus[thingCampusIndex]; //加价
            var textareaValue = that.data.textareaValue || '无备注或描述'; //备注
            var thingPhoneNumber = that.data.thingPhoneNumber; //电话
            var thingPrice = that.data.thingPrice; //价格
            var dateSecond = that.data.dateSecond
            var dateMinute = that.data.dateMinute
            var region = that.data.region
                     
            wx.request({
              url:'https://yyzcowtodd.cn/Auction/addItemType/1',
              data: {                
                itemHead: thingName,                
                markupRange: thingCampus,                
                startPrice: thingPrice,
                startTime:dateSecond,
                endTime:dateMinute,  
                itemTag: thingConditions,
                itemInfo: textareaValue,
                telephoneNumber: thingPhoneNumber,
                itemLocation:region,  
              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res);
                
              },
              fail: function(res) {
                console.log(JSON.stringify(res));
                wx.showToast({
                  title: '发布失败',
                  icon: 'loading',
                  duration: 2000
                })
                that.setData({
                  buttonLoadingThingA: false
                })
              },
            })
            
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

     
    
  },
  bindSubmitThingB: function() {
    var that = this;
        
      wx.showModal({
        title: '系统提示',
        content: '确定发布',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../myproducts/myproducts',
            })

            var imgList = that.data.imgList; //图片
            var thingName = that.data.thingName; //名字
            var thingConditionIndex = that.data.thingConditionIndex; //成色索引值
            var thingConditions = that.data.thingConditions[thingConditionIndex]; //成色
            var textareaValue = that.data.textareaValue || '无备注或描述'; //备注
            var thingPhoneNumber = that.data.thingPhoneNumber; //电话
            var thingPrice = that.data.thingPrice; //价格
            var region = that.data.region
                     
            wx.request({
              url:'https://yyzcowtodd.cn/Auction/addItemType/2',
              data: {                
                itemHead: thingName,                               
                startPrice: thingPrice,
                itemTag: thingConditions,
                itemInfo: textareaValue,
                telephoneNumber: thingPhoneNumber,
                itemLocation:region,  
              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res);
                
              },
              fail: function(res) {
                console.log(JSON.stringify(res));
                wx.showToast({
                  title: '发布失败',
                  icon: 'loading',
                  duration: 2000
                })
                that.setData({
                  buttonLoadingThingB: false
                })
              },
            })
            
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

     
    
  },
  
})