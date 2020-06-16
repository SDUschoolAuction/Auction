// component/letterDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideDialog: function () {
      this.setData({
        isShow: false
      });
    },
    showDialog: function () {
      this.setData({
        isShow: true
      });
    },
    setLetter: function (l){
      this.setData({
        letter: l
      });
    },
    getDialogState: function () {
      return this.data.isShow;
    }
  },
})
