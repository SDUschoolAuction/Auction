// pages/school/school.js
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

  intoSearchFunc: function (e) {
    wx.navigateTo({
      url: '../search_school/search_school'
    })
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
    
    //console.log(e)
    /*
    wx.showToast({
      title: 'orgid : ' + orgid + ' orgname : ' + orgname,
      icon: 'none'
    })
    */
    wx.showModal({
      title: '你选择的是：'+ orgname,
      content: '选择学校后不可更改，是否确定？',
      cancelText: '取消',
      cancelColor:'#56BD5B',
      confirmText: '确定',
      confirmColor: '#56BD5B',
      success: function(res) {
        if(res.cancel){
        //这个跳转是左边按钮“取消”的跳转链接
          // wx.navigateTo({
          //   url: '/pages/school/school'
          // })
        }else{
        //这里是右边按钮“确定”的跳转链接
          wx.switchTab({
            url: '/pages/switch/switch',
          })
          //发送学校信息到后端
          wx.request({
            url: 'https://yyzcowtodd.cn/Auction/addUser',
            method: 'post',
            data:{
                  name:app.globalData.userInfo.nickName,
                  userIcon:app.globalData.userInfo.avatarUrl,
                  schoolId:orgid,
                  weChatId:app.globalData.openid,
                  location:app.globalData.userInfo.city
                },
                success:function(e){
                  console.log(e);}
          })
          //console.log(orgid)

        }
      }
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