
const app = getApp();
Page({
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
    region: ["省","市","区"],
    imgList: [],
    modalName: null,
    textareaValue: '',
    TabCur: 0,
    scrollLeft:0,
    dateMinute: '',
    dateSecond: '',
    tel_length:0,
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

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
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
    var itemId = that.data.itemId;
    var nickName = that.data.nickName;
    wx.getStorage({
      key: 'itemId',
      success: function(res) {
        that.setData({
          itemId: res.data
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
    var thingPrice;
    
    if(e.detail.value.indexOf(".")< 0 && e.detail.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      thingPrice= parseFloat(e.detail.value);
    }
    this.setData({
      thingPrice: thingPrice,
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
    var COS = require('./cos-wx-sdk-v5');  
    var Bucket = 'auction-1300038466';
    var Region = 'ap-nanjing';
    // 初始化实例
    var cos = new COS({
        SecretId: 'AKIDNK6bsgu5ZkjS9bKAPQHsDI7j7QUMw1aM',
        SecretKey: '77qshKj5A4h38xa8PgjT0UiV3LQDoBTS'
    });

    const that = this;
    wx.chooseImage({      
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        var filePath = res.tempFiles[0].path;
        var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
        
        cos.postObject({
            Bucket: Bucket,
            Region: Region,
            Key: filename,
            FilePath: filePath,
            onProgress: function (info) {
                console.log(JSON.stringify(info));
            }            
        }, function (err, data) {
            console.log(err || data);   
            console.log(data.Location);
            
            if(data.Location!=0){
                that.setData({
                  imgList:that.data.imgList.concat("http://"+data.Location)
                })  
            }
         });
      
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

  bindSubmitThingA: function() {
    var that = this;
    var tel_length = that.data.thingPhoneNumber.length;
    if (tel_length==11) { 
      wx.showModal({
        title: '系统提示',
        content: '确定发布',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../myproducts/myproducts',
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
            var dateSecond = that.data.dateSecond
            var dateMinute = that.data.dateMinute
            var region = that.data.region
            var itemId = that.data.itemId;
            var nickNmae = that.data.nickName;
            var url = app.globalData.apiurl + '/addItemType/1'        
            wx.request({
              url,
              data: {                
                itemHead: thingName,                
                markupRange: thingCampus,                
                startPrice: thingPrice,
                startTime:dateSecond,
                endTime:dateMinute,  
                itemTag: thingConditions,
                itemInfo: textareaValue,
                telephoneNumber: thingPhoneNumber,
                itemLocation:region,  
                itemImg:imgList,
                itemId: itemId, //用户的学号
                nickName: nickNmae, //用户昵称
              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res);
                
              },
              fail: function(res) {
                console.log(JSON.stringify(res));
                wx.showToast({
                  title: '发布失败',
                  icon: 'loading',
                  duration: 2000
                })
                that.setData({
                  buttonLoadingThingA: false
                })
              },
            })

          


          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '系统提示',
        content: '联系方式请输入11位手机号码',
        cancelText: '取消',
        confirmText: '确定',
        
      })
    }
   
     

     
    
  },
  bindSubmitThingB: function() {
    var that = this;
    var tel_length = that.data.thingPhoneNumber.length;
    if (tel_length==11) {    
      wx.showModal({
        title: '系统提示',
        content: '确定发布',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../myproducts/myproducts',
            })

            var imgList = that.data.imgList; //图片
            var thingName = that.data.thingName; //名字
            var thingConditionIndex = that.data.thingConditionIndex; //成色索引值
            var thingConditions = that.data.thingConditions[thingConditionIndex]; //成色
            var textareaValue = that.data.textareaValue || '无备注或描述'; //备注
            var thingPhoneNumber = that.data.thingPhoneNumber; //电话
            var thingPrice = that.data.thingPrice; //价格
            var region = that.data.region
            var itemId = that.data.itemId;
            var nickNmae = that.data.nickName;
            var url = app.globalData.apiurl + '/addItemType/2'         
            wx.request({
              url,
              data: {                
                itemHead: thingName,                               
                startPrice: thingPrice,
                itemTag: thingConditions,
                itemInfo: textareaValue,
                telephoneNumber: thingPhoneNumber,
                itemLocation:region,  
                itemImg:imgList,
                itemId: itemId, //用户的学号
                nickName: nickNmae, //用户昵称

              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res);
                
              },
              fail: function(res) {
                console.log(JSON.stringify(res));
                wx.showToast({
                  title: '发布失败',
                  icon: 'loading',
                  duration: 2000
                })
                that.setData({
                  buttonLoadingThingB: false
                })
              },
            })
            
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '系统提示',
        content: '联系方式请输入11位手机号码',
        cancelText: '取消',
        confirmText: '确定',
        
      })
    }
     
    
  },
  
})