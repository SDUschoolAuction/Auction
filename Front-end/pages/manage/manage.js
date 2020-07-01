const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    thingName: '',
    thingPhoneNumber:'',
    thingConditions: ["全新", "九新", "磨损", "未登记"],
    thingConditionIndex: null,
    region: ["省","市","区"],
    imgList: [],
    img1:'',
    img2:'',
    img3:'',
    img4:'',
    modalName: null,
    textareaValue: '',
    tel_length:0,
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var that = this;
    that.setData({
      itemID:option.itemId,
      
    })

    wx.request({//获取商品信息
      url: app.globalData.apiurl+'/getItemById/'+this.data.itemID,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var imageList = []
        if(res.data.itemImg1){
          imageList.push(res.data.itemImg1)
        }
        if(res.data.itemImg2){
          imageList.push(res.data.itemImg2)
        }
        if(res.data.itemImg3){
          imageList.push(res.data.itemImg3)
        }
        if(res.data.itemImg4){
          imageList.push(res.data.itemImg4)
        }
        var region = res.data.itemLocation.slice(1,-1).replace(/\"/g,'').split(',');
        console.log(region)
        that.setData({ 
          textdata: res.data,
          img1: res.data.itemImg1,
          img2: res.data.itemImg2,
          img3: res.data.itemImg3,
          img4: res.data.itemImg4,
          thingName: res.data.itemHead,
          textareaValue: res.data.itemInfo,
          thingPhoneNumber:res.data.telephoneNumber,
          finalPrice:res.data.finalPrice,
          imgList: imageList,
          region: region
        })
        if(res.data.itemTag == '全新'){
          //console.log(res.data.itemTag)
          that.setData({ 
            thingConditionIndex:0
          })
        }
        else if(res.data.itemTag == '九新'){
          //console.log(res.data.itemTag)
          that.setData({ 
            thingConditionIndex:1
          })
        }
        else if(res.data.itemTag == '磨損'){
         // console.log(res.data.itemTag)
          that.setData({ 
            thingConditionIndex:2
          })
        }
        else{
          that.setData({ 
            thingConditionIndex:3
          })
        }
      },
    })
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
  var thingName=this.data.thingName
    this.setData({
      thingName: e.detail.value
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

  RegionChange: function(e) {//发货地区
    this.setData({
      region: e.detail.value
    })
  },

  //图片
  ChooseImage() {
    var COS = require('../public/cos-wx-sdk-v5');  
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

     
   
  



  

  bindSubmitThingB: function() {
    var that = this;
    var tel_length = that.data.thingPhoneNumber.length;
    if (tel_length==11) { 
      wx.showModal({
        title: '系统提示',
        content: '确定更改信息',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            var img1 = that.data.imgList[0];
            var img2 = that.data.imgList[1];
            var img3 = that.data.imgList[2];
            var img4 = that.data.imgList[3];
            var thingName = that.data.thingName; //名字
            var thingConditionIndex = that.data.thingConditionIndex; //成色索引值
            var thingConditions = that.data.thingConditions[thingConditionIndex]; //成色
            var textareaValue = that.data.textareaValue || '无备注或描述'; //备注
            var thingPhoneNumber = that.data.thingPhoneNumber; //电话
            var region = that.data.region
            var sellerId = app. globalData. userId
            var url = app.globalData.apiurl + '/updateItem' 
            var itemId = that.data.itemID
            wx.request({
              url,
              data: {       
                itemHead: thingName,       
                itemTag: thingConditions,
                itemInfo: textareaValue,
                telephoneNumber: thingPhoneNumber,
                itemLocation: JSON.stringify(region),  
                itemImg1:img1,
                itemImg2:img2,
                itemImg3:img3,
                itemImg4:img4,
                itemId: itemId, 
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
            });
            var itemId=that.data.itemID
            var finalPrice=that.data.finalPrice
            wx.redirectTo({
              url: '../detail/detail?itemId='+itemId+'&finalPrice='+finalPrice,
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