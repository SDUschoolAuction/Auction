//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
var key = ""
Page({
  data: {
    result: [],
    inputValue: "",
    inputShowed: false,
    inputVal: ""
  },
  onLoad: function (option) {
    var that = this
    key = option.key
    var myArray = new Array()
    for (var i = 0; i < app.globalData.school.length; i++) {
      if (app.globalData.school[i].school_type==key) {
        myArray.push(app.globalData.school[i])
      }
    }
 that.setData({
   result: myArray
 })

  },
  searchProd(e) {
    var that = this;
    var myArray = new Array()
   // console.log(this.data.inputVal)
    if (this.data.inputVal != "") {
      for (var i = 0; i < app.globalData.school.length; i++) {
        if (app.globalData.school[i].school_name.indexOf(this.data.inputVal)!=-1){
          myArray.push(app.globalData.school[i])
        }
      }
      wx.showLoading({
        title: '加载中',
      })
          that.setData({
            result: myArray
          })
      wx.hideLoading()
    } else {
      wx.showToast({
        title: '请输入查询条件',
        icon: 'none',
        duration: 2000
      })
    }
  },
  scanBtn() {
    var that = this;
    that.setData({
      inputShowed:false
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },  //分享
  onShareAppMessage: function () {
    return {
      title: '高校查询页面分享',
      // imageUrl: '/images/a.png'
    }
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {

    this.setData({
      inputVal: e.detail.value
    });
  },
  onShareAppMessage: function () {
    return {
      title: '院校信息',
      desc: '高校查询',
      path: '/pages/index/index'
    }
  }
})
