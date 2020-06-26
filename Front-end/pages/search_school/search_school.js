// pages/search_school/search_school.js

var items = require('../../data/schoolData.js');//引入学校列表资源
var schoolName = new Array();
for(var i=0;i<items.schools.length;i++){
  schoolName[i] = items.schools[i].schoolName;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewShowed: false, //显示结果view的状态
    inputVal: "", // 搜索框值
    schoolName,
  },

   // 隐藏搜索框样式
   hideInput: function() {
    this.setData({
      inputVal: "",
      viewShowed: false,
    });
  },
  // 键盘抬起事件2
  inputTyping: function(e) {
    console.log("input-----",e)
    var value = e.detail.value
    var that = this;
    var schoolName = that.data.schoolName
    if (value == '') {
      that.setData({
        viewShowed: false,
      });
    } else {
    //“这里需要特别注意，不然在选中下拉框值的时候，下拉框又出现”
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        var arr = [];
        for (var i = 0; i < schoolName.length; i++) {
          if (schoolName[i].indexOf(value) >= 0) {
            arr.push(schoolName[i]);
          }
        }
        console.log(arr)
        that.setData({
          viewShowed: true,
          schoolList: arr
        });
      }
    }
  },
  // 获取选中推荐列表中的值
  name: function(res) {
    console.log(res.currentTarget.dataset.index);
    var index = res.currentTarget.dataset.index
    var that = this;
    wx.showModal({
      title: that.data.schoolList[index],
      content: '选择学校后不可更改，是否确定？',
      cancelText: '取消',
      cancelColor:'#56BD5B',
      confirmText: '确定',
      confirmColor: '#56BD5B',
      success: function(res) {
        if(res.cancel){
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

        }
      }
    })
    
  },
});