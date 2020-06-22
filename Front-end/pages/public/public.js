const app = getApp();
Page({

  data: {
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
    textareaValue: ''
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

  bindSubmitThing: function() {
    var that = this;
    var studentId = that.data.studentId;
    if (!studentId) {
      wx.showModal({
        title: '系统提示',
        content: '确定发布',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../detail/detail',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.setData({
        buttonLoadingThing: true
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
      var studentId = that.data.studentId;
      var nickName = that.data.nickName;
    
     
      wx.request({
        url:'https://localhost/addType/1',
        data: {
          itemImg1: imgList,
          itemId: thingName,
          thingConditions: thingConditions,
          markupRange: thingCampus,
          itemInfo: textareaValue,
          telephoneNumber: thingPhoneNumber,
          startPrice: thingPrice,
          startTime:dateSecond,
          endTime:dateMinute,
          itemLocation:region,
          studentId: studentId,
          nickName: nickName,
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res);
          var currenttime = util.formatTime(new Date());
          var currentdate = util.formatDate(new Date());
          var thingId = res.data;
          const uploadTask = wx.uploadFile({
            url,
            filePath: imgList[0],
            name: 'file',
            formData: {
              'date': currentdate,
              'datetime': currenttime,
              'thingId': thingId,
            },
            success: function(res) {
              console.log(res.data);
              wx.showToast({
                title: '发布成功',
                icon: 'succes',
                duration: 2500,
                mask: true
              })
              that.setData({
                buttonLoadingThing: false,
                imgList: '',
                thingName: '',
                thingDescribe: '',
                textareaValue: '',
                thingPhoneNumber: '',//电话号码
              })
            },
            fail: function(res) {
              console.log(JSON.stringify(res));
              wx.showToast({
                title: '发布失败',
                icon: 'loading',
                duration: 2000
              })
              that.setData({
                buttonLoadingThing: false
              })
            },
          })
        },
        fail: function(res) {
          console.log(JSON.stringify(res));
          wx.showToast({
            title: '发布失败',
            icon: 'loading',
            duration: 2000
          })
          that.setData({
            buttonLoadingThing: false
          })
        },
      })
    }
  },









  
})