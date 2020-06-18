// pages/mypart/mypart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: ["参拍中的", "已中标的"],
    shangpinList: [{ //参拍数据json
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      },
      {
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      },
      {
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      },
      {
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      },
      {
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      },
      {
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      },
      {
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      },
      
      

    ],
    inList: [{  //已中标数据json
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      },
      {
        times: "10时59分",
        name: "商品名称",
        price: 128,
        people: 11,
        imageUrl: ""
      }


    ]
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