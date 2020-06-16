// pages/middle/middle.js
var Bmob = require('../../utils/bmob.js');
var util = require('../../utils/util.js')
var app = getApp()
Page({
  mixins: [require('../../mixin/themeChanged')],

  data: {
    /*照片文件
    */
     files: [],
   },
   /*
   *选择照片
   */
   chooseImage:function(e) {
     var that = this;
     wx.chooseImage({
       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       success: function (res) {
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         that.setData({
           files: that.data.files.concat(res.tempFilePaths)
         });
       }
     })
   },
   /**预览照片 */
   previewImage: function (e) {
     wx.previewImage({
       current: e.currentTarget.id, // 当前显示图片的http链接
       urls: this.data.files // 需要预览的图片http链接列表
     })
   },
   /**删除照片 */
   deleteImage: function (e) {
     var that = this;
     var images = that.data.files;
     var index = e.currentTarget.dataset.index; //获取当前长按图片下标
     wx.showModal({
       title: '系统提醒',
       content: '确定要删除此图片吗？',
       success: function (res) {
         if (res.confirm) {
           images.splice(index, 1);
         } else if (res.cancel) {
           return false;
         }
         that.setData({
           files: images
         });
       }
     })
   },




  data: {
    region: "",
    time: "",
    datea: ""
  },
  bindRegionChange(e) {
    let { value } = e.detail;
    console.log("地区改变:", value);
    this.setData({
      region: value
    })
  },
  bindTimeChange(e) {
    let { value } = e.detail;
    console.log("时间改变:", value);
    this.setData({
      time: value
    })
  },
  bindDateChange(e) {
    let { value } = e.detail;
    console.log("日期改变:", value);
    this.setData({
      date: value
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    //导航栏的数据
    
    postThing: true,
    

       //物品发布的数据
    thingImage: '',
    thingName: '',
    thingConditions: ["全新", "几乎全新", "九成新", "八成新", "七成新", "六成新", "五成新", "五成新以下"],
    thingConditionIndex: 0,
    thingPrice: '',
    thingCampus: ["1", "2","3","4","5","6","7","8","9","10"],
    thingCampusIndex: 0,
    thingPhoneNumber: '',
    thingDescribe: '',
    buttonLoadingThing: false,
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
    var that = this;
    var studentId = that.data.studentId;
    var nickName = that.data.nickName;
    wx.getStorage({
      key: 'studentId',
      success: function(res) {
        that.setData({
          studentId: res.data
        })
      },
    })
    wx.getStorage({
      key: 'nickName',
      success: function(res) {
        that.setData({
          nickName: res.data
        })
      },
    })
    
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
    wx.setNavigationBarTitle({
      title: '校园小拍'
    });
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //导航栏的响应事件
  choosePostBook: function(e) {
    var that = this;
    that.setData({
      postBook: true,
      postThing: false,
      postJob: false
    })
  },
  choosePostThing: function(e) {
    var that = this;
    that.setData({
      postBook: false,
      postThing: true,
      postJob: false
    })
  },
  choosePostJob: function(e) {
    var that = this;
    that.setData({
      postBook: false,
      postThing: false,
      postJob: true
    })
  },


  //响应事件
  bindThingImageInput: function() { //商品图片选择
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        var thingImage = res.tempFilePaths;
        that.setData({
          thingImage: thingImage
        })
      },
    })
  },
  bindThingNameInput: function(e) { //商品名字
    this.setData({
      thingName: e.detail.value
    })
  },
                       
  bindThingConditionsInput: function(e) { //商品成色
    this.setData({
      thingConditionIndex: e.detail.value
    })
  },
  bindThingPriceInput: function(e) { //商品价格
    this.setData({
      thingPrice: e.detail.value
    })
  },
  bindThingCampusInput: function(e) { //校区
    this.setData({
      thingCampusIndex: e.detail.value
    })
  },
  bindThingPhoneNumberInput: function(e) { //联系电话
    this.setData({
      thingPhoneNumber: e.detail.value
    })
  },
  bindThingDescribeInput: function(e) { //商品描述
    this.setData({
      thingDescribe: e.detail.value
    })
  },
  
  //发布物品的响应事件
  bindSubmitThing: function() {
    var that = this;
    var studentId = that.data.studentId;
    if (!studentId) {
      wx.showModal({
        title: '提示',
        content: '请验证您的学生身份',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../my/mySetting/mySetting',
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
      var thingImage = that.data.thingImage; //图片
      var thingName = that.data.thingName; //名字
      var thingConditionIndex = that.data.thingConditionIndex; //成色索引值
      var thingConditions = that.data.thingConditions[thingConditionIndex]; //成色
      var thingCampusIndex = that.data.thingCampusIndex; //校区索引值
      var thingCampus = that.data.thingCampus[thingCampusIndex]; //校区
      var thingDescribe = that.data.thingDescribe || '无备注或描述'; //备注
      var thingPhoneNumber = that.data.thingPhoneNumber; //电话
      var thingPrice = that.data.thingPrice; //价格
      var studentId = that.data.studentId;
      var nickName = that.data.nickName;
      var url = app.globalData.huanbaoBase + 'thingpost.php';
      var urlImg = app.globalData.huanbaoBase + 'thingimg.php';
      wx.request({
        url,
        data: {
          thingImage: thingImage,
          thingName: thingName,
          thingConditions: thingConditions,
          thingCampus: thingCampus,
          thingDescribe: thingDescribe,
          thingPhoneNumber: thingPhoneNumber,
          thingPrice: thingPrice,
          studentId: studentId,
          nickName: nickName,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res);
          var currenttime = util.formatTime(new Date());
          var currentdate = util.formatDate(new Date());
          var thingId = res.data;
          const uploadTask = wx.uploadFile({
            url: urlImg,
            filePath: thingImage[0],
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
                thingImage: '',
                thingName: '',
                thingDescribe: '',
                thingPrice: '',
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