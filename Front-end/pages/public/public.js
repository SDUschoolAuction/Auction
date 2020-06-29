
const app = getApp();
import { checkTime, timeGap} from "../../utils/util";
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
    img1:'',
    img2:'',
    img3:'',
    img4:'',
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
    console.log(ev)
    this.setData({
      dateMinute: ev.detail.value
    })
    console.log(this.data.dateMinute)
    if(this.data.dateSecond){
      var time =checkTime(this.data.dateSecond,this.data.dateMinute);
      if (!time){
        this.setData({
          dateMinute: ""
        })
        wx.showModal({
          title: '提示',
          content: '结束时间应晚于起始时间',
          success: function (res) {
          }
        })
      }
    }else{
      this.setData({
        dateMinute: ""
      })
      wx.showModal({
        title: '提示',
        content: '请先选择起始时间',
        success: function (res) {
        }
      })
    }
  },
  /**
   * 年月日时分秒选择类型的回调函数，可以在该函数得到选择的时间
   */
  selectDateSecondChange(ev) {
    this.setData({
      dateSecond: ev.detail.value
    })
    var min=timeGap(this.data.dateSecond)
    if(min<5){
      this.setData({
        dateSecond: ""
      })
      wx.showModal({
        title: '提示',
        content: '发布时间必须晚于当前时间5分钟',
        success: function (res) {
        }
      })
    }
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
            
            var imgList = that.data.imgList; //图片
            var img1 = that.data.img1;
            var img2 = that.data.img2;
            var img3 = that.data.img3;
            var img4 = that.data.img4;
            if(imgList[0]!=null){
              that.setData({
                img1:imgList[0]
              })
            }
            else{
              that.setData({
                img1:null
              })
            } 
            if(imgList[1]!=null){
              that.setData({
                img2:imgList[1]
              })
            }
            else{
              that.setData({
                img2:null
              })
            }
            if(imgList[2]!=null){
              that.setData({
                img3:imgList[2]
              })
            }
            else{
              that.setData({
                img3:null
              })
            }
            if(imgList[3]!=null){
              that.setData({
                img4:imgList[3]
              })
            }
            else{
              that.setData({
                img4:null
              })
            }
            console.log(img1)
            console.log(img2)
            console.log(img3)
            console.log(img4)
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
            var img1 = that.data.img1;
            var img2 = that.data.img2;
            var img3 = that.data.img3;
            var img4 = that.data.img4;
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
            var type = 1
            var sellerId = app. globalData. userId
            var url = app.globalData.apiurl + '/addItemType/1'      
            
            wx.request({
              url,
              data: {       
               item:{          
                itemHead: thingName,       
                itemTag: thingConditions,
                itemInfo: textareaValue,
                telephoneNumber: thingPhoneNumber,
                itemLocation:region,  
                finalPrice:thingPrice,
                itemImg1:img1,
                itemImg2:img2,
                itemImg3:img3,
                itemImg4:img4,
                sellerId: sellerId, 
                type:type
              },
                type:{
                  startPrice: thingPrice,
                  markupRange: thingCampus,                
                  startTime:dateSecond,
                  endTime:dateMinute,
                }
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
            var img1 = that.data.img1;
            var img2 = that.data.img2;
            var img3 = that.data.img3;
            var img4 = that.data.img4;
            var thingName = that.data.thingName; //名字
            var thingConditionIndex = that.data.thingConditionIndex; //成色索引值
            var thingConditions = that.data.thingConditions[thingConditionIndex]; //成色
            var textareaValue = that.data.textareaValue || '无备注或描述'; //备注
            var thingPhoneNumber = that.data.thingPhoneNumber; //电话
            var thingPrice = that.data.thingPrice; //价格
            var region = that.data.region
            var type = 2
            var sellerId = app. globalData. userId
            var url = app.globalData.apiurl + '/addItemType/2'      
            
            wx.request({
              url,
              data: {       
               item:{          
                itemHead: thingName,       
                itemTag: thingConditions,
                itemInfo: textareaValue,
                telephoneNumber: thingPhoneNumber,
                itemLocation:region,  
                finalPrice:thingPrice,
                itemImg1:img1,
                itemImg2:img2,
                itemImg3:img3,
                itemImg4:img4,
                sellerId: sellerId, 
                type:type
              },
                type:{
                  itemPrice: thingPrice,
                }
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
  
})