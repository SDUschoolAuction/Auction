// component/rating/index.js
Component({

  /**
   * 组件的初始数据
   */
  data: {
    imgs: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 4
    }, {
      id: 5
    }],
    starId: 0,
    src1: '/image/yellowstar.png',
    src2: '/image/blackStar.png',



    flag: 0,
    noteMaxLen: 300, // 最多放多少字
    info: "",
    noteNowLen: 0,//备注当前字数
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    select(e) {
      console.log(e)
      this.data.starId = e.currentTarget.dataset.index;
      this.setData({
        starId: this.data.starId
      })
    },
    bindTextAreaChange: function (e) {
      var that = this
      var value = e.detail.value,
        len = parseInt(value.length);
      if (len > that.data.noteMaxLen)
        return;
      that.setData({ info: value, noteNowLen: len })
  
    },
    // 提交清空当前值
    bindSubmit: function () {
     
      wx.navigateTo({
        url: '../../pages/switch/switch',
      })
  
    }
  }

  

})