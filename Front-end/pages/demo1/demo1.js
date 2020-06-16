// pages/demo1/demo1.js
Page({

  data: {
    num: 0
  },
  handleInput(e){
    this.setData({
      num: e.detail.value
    })
  },
  handletap(e){
    //console.log(e);
    const operation = e.currentTarget.dataset.operation
    this.setData({
      num: this.data.num + operation
    })
  }
})