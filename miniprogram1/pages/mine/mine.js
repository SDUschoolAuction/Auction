// pages/mine/mine.js
//获取应用实例
const app = getApp()
var items = require('../../data/schoolData.js');//引入我们的城市列表资源
var that;
var timer;
var touchEndy = 0;//页面增加y坐标属性定义
var rightheight = 0;//索引条高度
Page({

  /**
   * 页面的初始数据
   */
  data: {
    letters: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N',  'P', 'Q',  'S', 'T', 'W', 'X', 'Y', 'Z'],
    toView: '',//用来做定位联动
    buttonDisabled:false,
    modalHidden:true,
    show:false
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this,
    that.setData({
      schools: items.schools
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('#right').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      console.log("height : "+res[0].height);
      rightheight = res[0].height;
    })
  },
  //右侧索引表点击事件
  letterclick: function (e) {
    var letter = e.currentTarget.dataset.letter;
    var isShow = that.dialog.getDialogState();
      this.showOrHideLetterDialog(isShow,letter,true);
      that.setData({//定位到字母
        toView: letter,
      })
    console.log('letterclick letter : ' + letter);
  },
  startTime: function (autodimiss) {
    if (autodimiss){
      timer = setTimeout(function () {
        that.dialog.hideDialog();
      }, 500)
    }
  },  //touch 事件有bug
  touchStart: function (e) {
    console.log('touchStart start ');
    touchEndy = e.touches[0].pageY;
    console.log('touchStart end ');
  },

  showOrHideLetterDialog: function(isShow,letter,autodimss) {
    if (!isShow) {
      that.dialog.setLetter(letter);
      that.dialog.showDialog();
      this.startTime(autodimss);
    } else {
      clearTimeout(timer);
      this.startTime(autodimss);
      that.dialog.setLetter(letter);
    }
  },
  selectschool: function(e) {
    var orgid = e.currentTarget.dataset.orgid
    var orgname = e.currentTarget.dataset.orgname
    wx.showToast({
      title: 'orgid : ' + orgid + ' orgname : ' + orgname,
      icon: 'none'
    })
  },
  showModal:function(){
   this.setData({
    modalHidden:!this.data.modalHidden
   })
  },
  modalBindaconfirm:function(){
    this.setData({
    modalHidden:!this.data.modalHidden,
    show:!this.data.show,
    buttonDisabled:!this.data.buttonDisabled
   })
  },
  modalBindcancel:function(){
    this.setData({
    modalHidden:!this.data.modalHidden,
   })
  }
 })