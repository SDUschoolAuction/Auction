// pages/Detail_Page1/Detail_Page1.js
//需要从后端获取的用+++++++++表示
//需要更新后端数据的用----------表示
const util = require('../../utils/util.js')
const Time = require('../../utils/time.js')
const app = getApp();
Page({
  data: {
    refresh_time:60000,//页面自动刷新的时间=秒数*1000
    getRecordsByItemId:[],
    phone:'',
    hiddenmodalput:true,
    userId: app.globalData.userId,
    subsub_comments:[],
    item_id_fromSwitch: '-1',
    comment_length:0,

    buyout_show: false,
    time_now: '',

    subcomment_father: -1,
    subcomment_target: '',
    subcomment_id:0,
    new_subcomment_bool: false,
    subcomment_show: false,
    subCommentcount: 0,
    subcommentInput_list:[
      { father:"",
        text:"",
        target:""
      }
  ],//----------


    sub_holder_text: "",
    holder_text: "请输入评论内容...",
    bid_text: "出价",
    bidCount: 0,
    min_bidAdd: 5,//最小的加价间隔,+++++++++
    newBidlist: [//新的，需要添加的出价记录列表，----------
    //   { 
    //     // item_id: 1, 
    //     // name:'',
    //     // price:''
    // }
    ],
    new_bid_bool:false,

    comment_button_text: "取消",
    new_comment_bool: false,
    commentInput: null,
    commentCount: 0,
    commentInput_list:[
      //{
      // text:"",
      // time:""
    //}
  ],//----------
    commentInput_set: null,

    bid_show: false,
    comment_show: false,
    no_comment_url:'/image/no_comments.png',
    user:{//这个是各个不同身份的用户的全部信息，+++++++++，----------，特别标注可能会更新的数据==========
      seller_name:'',//卖家的名称
      seller_info1:'',//卖家提供的信息1
      seller_info2:'',//卖家提供的信息2
      seller_url:'',//卖家的头像地址

      user_infoinfo:app.globalData.userId,
      user_name:'cxz',
      user_url:'/image/head.png',//此账户用户的头像地址
      user_role:'visitor',//==========
      //此账户用户的身份，包含：“visitor”出价者、“buyer”竞拍者、“seller”拍卖者、“winner”中标者
      //会自动根据用户的身份来显示不同样式的页面
      user_price:0,//此账户用户的当前出价，==========
      user_old_price:0,//此账户用户的原本的出价，==========
      user_new_price:0,//此账户用户的新的出价，==========
      user_phone:''
    },
    item:{//包含了此商品的基本信息，+++++++++，----------
      item_id:'-1',
      current_price:0,//当前此商品的最高出价
      item_title:'',//商品的标题
      item_quality:"",//商品的成色，包含：“brdnew”全新、“ninnew”九成新、“notnew”磨损、“NULL”未登记
      item_description:'',
      //商品的简介
      item_buyout_price:9999,
      item_status: ""//标记当前商品的拍卖状态，有selling正在拍卖和sold已拍卖
    },
    commentList: [//评论的相关信息，seller角色的用户会出现卖家的提示tag，+++++++++

    ],
    bidList: [//出价记录列表，+++++++++，----------
      // { item_id: 1, name:'我是用户1号',price:'100'}, 
      // { item_id: 2, name:'我是用户2号',price:'1000' }, 
      // { item_id: 3, name:'我是用户3号',price:'10000' },
    ],
    selectedFlag: [false],//用来指示出价记录是否展开
    list: [//标签列表，由卖家登陆商品可能涉及的标签，+++++++++
      '标签'],
    //五张实物展示图，可以自动调整尺寸已适应不同设备和不同尺寸的照片，+++++++++
    item_image1: '',
    item_image2: '',
    item_image3: '',
    item_image4: '',
    //item_image5: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3609079631,2329147195&fm=26&gp=0.jpg',

    imagewidth: 0,//缩放后的宽
    imageheight: 0,//缩放后的高,
    datetimeTo: "", //+++++++++
    //需要输入拍卖结束的时间，可自动显示拍卖是否在进行剩余时间
    //如果不输入目标时间则在页面中不显示倒计时，表示此拍卖永久有效？
    timeLeft: "",//预备储存剩余时间用来显示
    bool:true//用来指示目标时间是否大于当前时间，避免产生剩余时间为负的情况
  },
  changeToggle:function(e){//初见记录展开/收起切换函数
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]){
      this.data.selectedFlag[index] = false;
    }else{
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  changeComment:function(e){//出价界面展开/收起切换函数
    this.setData({
      holder_text: "请输入评论内容...",
      comment_show: !this.data.comment_show
    })
  },
  buyoutShow:function(e){//显示/收起一口价的出价界面的函数
    this.setData({
      buyout_show: !this.data.buyout_show
    })
  }
  ,
  openSubcomment:function(e){//出价界面展开/收起切换函数
    var target = e.currentTarget.dataset.text;
    var father = e.currentTarget.dataset.father;
    var id = e.currentTarget.dataset.id;
    // console.log(target);
    // console.log(father); 
    console.log(id);
    this.setData({
      sub_holder_text: "回复@"+target,
      subcomment_father:father,
      subcomment_target:target,
      subcomment_show: true,
      subcomment_id :id,
    })
  },
  deleteComment:function(e){//出价界面展开/收起切换函数
    var id = e.currentTarget.dataset.deleteid;
    var that = this;
    console.log("将要删除的评论的id为:"+id);
    wx.request({
      url: app.globalData.apiurl+'/comments/deleteComment?commentId='+id,
      method: 'DELETE',
      header: {
        'content-type': 'application/json'
      },
      success: function (boolean) {
        if(boolean){
          wx.request({
            url: app.globalData.apiurl+'/comments/getcomments?itemId='+that.data.item.item_id,
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var length = res.data.obj.data.length;
              var list='';
              // console.log("length:"+length);
              var count = 0;
              that.setData({ 
                comments: res.data.obj.data,
              });    
              while(length>0){
                list = 'commentList['+count+']';
                //console.log("list:"+list);
                that.setData({
                  [list]:{ 
                    item_id: that.data.item.item_id, 
                    id:res.data.obj.data[count].commentId,
                    user_id:res.data.obj.data[count].userId,
                    name:res.data.obj.data[count].userName,
                    text:res.data.obj.data[count].content,
                    url:res.data.obj.data[count].userIcon,
                    role:'buyer',
                    time:res.data.obj.data[count].time,
                    sub_comments:[
                    // { name:'我是用户1号',
                    //   target:'我是用户2号',
                    //   text:'你是不是傻，不喜欢评论啥',
                    //   role:'buyer',
                    //   father:'2',
                    //   time:'2010-08-01 10:30:00'}
                    ]
                  }
                });
                count++;
                length--;
              }
                },
                fail: function () {
                  // fail
                  console.log("fffffffff");
                },
                complete: function () {
                  //// console.log("d");
                }
              }) 

          console.log("将要删除的评论的id为:"+id+"删除成功");
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // console.log("d");
      }
    })
  },
  deleteSubComment:function(e){
    var that = this;
    var id = e.currentTarget.dataset.deleteid;
    console.log("将要删除的二级评论的id为:"+id);
    wx.request({
      url: app.globalData.apiurl+'/comments/deleteReviewsForComments?reviewId='+id,
      method: 'DELETE',
      header: {
        'content-type': 'application/json'
      },
      success: function (boolean) {
        if(boolean){  
          var comments = that.data.commentList;
          var comments_length = comments.length;
          for(var i = 0 ; i < comments_length ; i++){
            var sub_length = comments[i].sub_comments.length;
            for(var aa = 0 ; aa < sub_length ; aa++){
              if(comments[i].sub_comments[aa].id == id){
                //comments[i].sub_comments.splice(aa,1);
                var show = 'commentList['+i+'].sub_comments['+aa+'].show';
                that.setData({
                  [show]:false
                });
              }
            }
          }
          console.log("将要删除的评论的id为:"+id+"删除成功");
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // console.log("d");
      }
    })
  },
  openSubcomment_1:function(e){//点击主列表的用户名的出价界面展开/收起切换函数
    var target = e.currentTarget.dataset.text;
    var father = e.currentTarget.dataset.father;
    // console.log(target);
    // console.log(father);
    this.setData({
      sub_holder_text: "回复@"+target,
      subcomment_father:father,
      subcomment_target:target,
      subcomment_show: true
    })
  },
  closeSubcomment:function(e){//关闭sub评论的评论界面的函数
    this.setData({
      subcomment_show: false
    })
  },
  changeShow:function(e){//出价界面展开/收起切换函数
    this.setData({
      bid_show: !this.data.bid_show
    })
  },
  changeShowCancel: function (e) {//取消出价后将new_price置为原始价格
    console.log("恢复前的new_price：" + this.data.user.user_new_price)
    this.setData({
      bid_show: !this.data.bid_show,
      "user.user_new_price": this.data.item.current_price,
    })
    console.log("恢复后的new_price：" + this.data.user.user_new_price)
  },
  priceReduce:function(e){//出价减少按钮函数
    if(this.data.user.user_new_price <= this.data.item.current_price){
      console.log("出价不能比商品当前价格更低");
    }
    else{
      var temp = this.data.user.user_new_price - 1;
      var tempp = "user.user_new_price";
      console.log(temp);
      this.setData({
        [tempp]: temp
      })
    }
  },
  priceAdd:function(e){//出价增加按钮函数
    var temp = this.data.user.user_new_price + 1;
    var tempp = "user.user_new_price";
    console.log(temp);
    this.setData({
      [tempp]: temp
    });
  },
  getComment:function(e){//实时地将用户输入的评论记录在一个变量中
    this.data.commentInput = e.detail.value;
    if(e.detail.value!='' && e.detail.value!=null){
      this.setData({
        comment_button_text:'留言'
        //留言没有内容就给出取消的按钮
        //否则就转换为留言按钮
      });
    }
    else{
      this.setData({
        comment_button_text:'取消'
        //留言没有内容就给出取消的按钮
        //否则就转换为留言按钮
      });
    }
    // console.log("输入的评论是："+this.data.commentInput);
  },
  submitComment:function(e){//用来提交用户输入的评论
    //流程是：将下方的固定界面设置为评论输入界面，然后获得输入的评论内容，当前是第几次评论的计数器count
    //和对应的新评论的列表中的对应位置的元素，然后将数组中此元素的值设置为当前评论的内容，再将input输入
    //框commentInput_set置空，把临时存储评论内容的commentInput置空，准备下一次接受评论，最后将计数
    //器加一，移动到数组的下一个位置
    console.log("输入的评论是："+this.data.commentInput);
    this.changeComment();
    // this.formatTime1();
    var time = Time.formatTime(new Date());
    var input = this.data.commentInput;
    var count = this.data.commentCount;
    var list = "commentInput_list["+count+"].text";//console.log(list);
    var list_time = "commentInput_list["+count+"].time";//console.log(list);
    if(input==null || input==''){//留言没有内容九判定为取消此次留言操作
      console.log("没有留言内容，此次判定为取消");
    }
    else{
      this.setData({
        new_comment_bool: true,
        [list]: input,
        [list_time]: time,
        commentInput_set: "",//把输入内的文字设置成空
        commentInput: "",//把输入的值设置成空
        comment_button_text: "取消"
      });
      console.log("list的是："+this.data.commentInput_list[count].text);
      this.setData({
        commentCount:count + 1
      });
      var that = this;
      console.log(app.globalData.userId);
      wx.request({
        url: app.globalData.apiurl + '/comments/addComments',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          itemId: this.data.item.item_id,
          userId: app.globalData.userId,
          content: input,
          time: time
        },
        success: function (res) {
          console.log(666);
        }
      })
    }
  },
  submitSubcomment:function(e){//用来提交用户输入的sub评论
    console.log("输入的评论是："+this.data.commentInput);
    this.closeSubcomment();
    var fatherid;
    var time = Time.formatTime(new Date());
    var commentId = this.data.subcomment_father;
    var reviewId = this.data.subcomment_id;
    var input = this.data.commentInput;
    var subcount = this.data.subCommentcount;
    var list = "subcommentInput_list["+subcount+"]";//console.log(list);
    if(input==null || input==''){//留言没有内容九判定为取消此次留言操作
      console.log("没有留言内容，此次判定为取消");
    }
    else{
  
      this.setData({
        new_subcomment_bool: true,
        [list]: {
        father: this.data.subcomment_father,
        text: input,
        target: this.data.subcomment_target,
        time: time
      },
        commentInput_set: "",//把输入内的文字设置成空
        commentInput: "",//把输入的值设置成空
        comment_button_text: "取消"
      });
      console.log("sublist的是："+this.data.subcommentInput_list[subcount].text);
      this.setData({
        subCommentcount:subcount + 1
      });
      var that = this;
  //    this.setData({
  //      userId: app.globalData.userId
  //    });
      
      var that = this;
      console.log(fatherid);
      console.log(app.globalData.userId);
      console.log(commentId);
      if (reviewId > 0) {
        var n = 0;
        var len = this.data.subsub_comments_subsub.length;
        while (n < len) {
          if (reviewId == this.data.subsub_comments_subsub[n].reviewId) {
            fatherid = this.data.subsub_comments_subsub[n].fromUser;
            console.log(this.data.subsub_comments_subsub[n].fromUser);
          }
          n++;
        }
      }
      else {
        var n = 0;
        var len = this.data.comments.length;
        while (n < len) {
          if (commentId == this.data.comments[n].commentId) {
            fatherid = this.data.comments[n].userId;
            console.log(this.data.comments[n].userId);
          }
          n++;
        }
      }
      wx.request({
        url: app.globalData.apiurl + '/comments/addReview',
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          commentId: commentId,
          content: input,
          time: time,
          fromUser: app.globalData.userId,
          toUser: fatherid
        },

        success: function (res) {
          console.log("success")
        },
      })
      console.log('commentId是：' + commentId);
      console.log('fromUser是：' + app.globalData.userId,);
      console.log('toUser是：' + fatherid);
      console.log('输入的回复是：' + input);
      console.log('回复时间是：' + time);
    }
  },
  submitBid:function(e){//提交新的出价的函数
    var new_price = this.data.user.user_new_price;
    var old_price = this.data.user.user_old_price;
    var current_price = this.data.item.current_price;
    var user_name = this.data.user.user_name;
    var phone = this.data.user.user_phone;
    if (new_price <= current_price) {
      wx.showToast({
        title: '出价需大于当前价',
        icon: 'none',
        duration: 5000//持续的时间
      })
    }
     else if(new_price - old_price < this.data.min_bidAdd){
      this.setData({
        bid_text: "加价小于最小要求"
      });
    }
    else{
      this.changeShow();//更换底部操作栏回出价-回复的界面
      this.setData({
        bid_text: "出价"
      });
      this.setData({
        hiddenmodalput: false
      }) 
      this.iPhoneNum();
      console.log(this.data.user.user_phone);
    }
  },
  submitBuyout:function(e){//确认一口价购买的函数
    console.log(this.data.user.user_name+"以一口价"+this.data.item.item_buyout_price+"买下了此商品");
    this.buyoutShow();
    this.setData({
      userId: app.globalData.userId
    });
    this.setData({
      hiddenmodalput: false
    }) 
    this.iPhoneNum();
  },
  iPhoneNum: function(e) {
    console.log(e.detail.value);
    this.setData({
     phone : e.detail.value
    })
  },
  showMyPrice: function () {  //防止出现还未输入手机号，页面出价已经改变的情况
    var new_price = this.data.user.user_new_price;
    var old_price = this.data.user.user_old_price;
    var old_price_x = "user.user_old_price";
    var user_price = "user.user_price";
    var current_price = "item.current_price";
    var user_role = "user.user_role";
    var new_role = "buyer";
    var bidCount = this.data.bidCount;
    var bidCount_x = "bidCount";
    var list = "newBidlist[" + bidCount + "]";
    var user_name = this.data.user.user_name;
    this.setData({
      [user_role]: new_role,
      [user_price]: new_price,
      [old_price_x]: new_price,
      [current_price]: new_price,
      [list]: {
        item_id: bidCount + 1,
        name: user_name,
        price: new_price
      },
      "user.user_price": this.data.user.user_new_price,
      new_bid_bool: true,
    })
    console.log("bidlist：" + this.data.newBidlist[bidCount].price);
    console.log("新：" + this.data.user.user_new_price + "旧：" + this.data.user.user_old_price);
    this.setData({
      [bidCount_x]: bidCount + 1,
    });
  },
  cancel: function(){//电话弹窗取消按钮
    console.log("恢复前的new_price：" + this.data.user.user_new_price)
    this.setData({
      hiddenmodalput: true,
      "user.user_new_price": this.data.item.current_price,
    });
    console.log("恢复后的new_price：" + this.data.user.user_new_price)
  },

  confirm: function(){   //电话号码确认
    var bidCount = this.data.bidCount;
    var list = "newBidlist[" + bidCount + "]";
    var user_name = this.data.user.user_name;
    var new_price = this.data.user.user_new_price;
    this.setData({ 
      "user.user_phone":this.data.phone,
      hiddenmodalput: true
    })
    console.log(this.data.user.user_phone);
    if (this.data.user.user_phone.length==11){
      this.setData({
        new_bid_bool:true,
        "item.current_price": new_price,
        "user.user_price": new_price,
        [list]: {
          item_id: bidCount + 1,
          name: user_name,
          price: new_price
        }
      })
      if(this.data.item.item_type == 1){ //出价
        wx.request({
          url: app.globalData.apiurl + '/bid',
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            itemId: this.data.item.item_id,
            userId: app.globalData.userId,
            dealPrice: new_price,
            //dealTime:time,
            telephoneNumber:this.data.user.user_phone,
          },
          success: function (res) {
            console.log(res);
            if(res.data.status == "success"){
              wx.showToast({
                title:'出价成功',
                duration:2000,
                mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                icon:'success', 
              })
            }
            else if(res.data.status == "reload"){
              wx.showModal({
                content:'您的出价低于当前价格，请刷新页面',
                confirmText: '确定',
                confirmColor: '#56BD5B',
              })
              console.log("恢复前的new_price：" + this.data.user.user_new_price)
              this.setData({
                "user.user_new_price": this.data.item.current_price,
              });
              console.log("恢复后的new_price：" + this.data.user.user_new_price)
            }
            console.log(app.globalData.userId); 
          }   
        })
      }
      else if (this.data.item.item_type  == 2){//一口价
        var that = this;
        console.log(this.data.item.item_buyout_price)
        wx.request({
          url: app.globalData.apiurl + '/purchase',
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            userId: app.globalData.userId,
            itemId: this.data.item.item_id,
            dealPrice: this.data.item.item_buyout_price,
            //dealTime:time,
            telephoneNumber: this.data.user.user_phone,
          },
          success: function (res) {
            console.log(res);
            if(res.data.status == "success"){
              wx.showToast({
                title:'购买成功',
                duration:2000,
                mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                icon:'success', 
              })
            }
            console.log(app.globalData.userId);
          }
        })
      }
    }
    else{
      wx.showToast({
        title:'请输入正确的手机号码',
        duration:2000,
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'none', 
        //image: '/images/tan.png',
      })
      console.log("恢复前的new_price：" + this.data.user.user_new_price)
      this.setData({
        "user.user_new_price": this.data.item.current_price,
      });
      console.log("恢复后的new_price：" + this.data.user.user_new_price)
    }
  },
  onShow: function () {//处理倒计时的函数
    if(this.data.bool && this.data.datetimeTo !=""){
      this.data.timer = setInterval(() =>{ 
        this.setData({
          timeLeft: util.getTimeLeft(this.data.datetimeTo)
        });
        if (this.data.timeLeft == "拍卖已结束") {
          clearInterval(this.data.timer);
        }
      }, 1000);
    }
    else if(this.data.datetimeTo ==""){
      this.setData({
        timeLeft: ""
      });
    }
    else{
      this.setData({
        timeLeft: "拍卖已结束"
      });
    }
  },
  imageLoad: function (e) {//图片自动调整大小的函数
    var imageize = util.imageUtil(e);
    this.setData({
    imagewidth: imageize.imageWidth,
    imageheight: imageize.imageHeight
    })
  },

  getInfo: function(itemID){
    console.log(app.globalData)
    var userid = 'user.user_id';
    var username = 'user.user_name';
    var userurl = 'user.user_url';
    this.setData({
      [userid]: app.globalData.userId,
      [username]: app.globalData.userInfo.nickName,
      [userurl]: app.globalData.userInfo.avatarUrl
    })
    
    


    var sellerID=0;
    var that = this;
    var status = 'item.item_status';
    var quality = 'item.item_quality';
    var seller_id = 'user.seller_id';
    var seller_name = 'user.seller_name';
    var seller_info1 = 'user.seller_info1';
    var seller_info2 = 'user.seller_info2';
    var seller_url = 'user.seller_url';

    wx.request({//获取商品信息
      url: app.globalData.apiurl+'/getItemById/'+itemID,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        sellerID = res.data.sellerId;
        var info_tags = res.data.itemInfo.split("#");
        var get_quality = res.data.itemTag; 
        var title = res.data.itemHead;
        var tags = new Array();
        for (var i = 1, len = info_tags.length; i < len; i++) {
          tags[i-1] = info_tags[i];
        }
        //console.log("info"+info);

        if(res.data.itemImg1!=null){
          that.setData({ 
          item_image1:res.data.itemImg1,
          })
        }
        if(res.data.itemImg2!=null){
          that.setData({ 
            item_image2:res.data.itemImg2,
          })
        }
        if(res.data.itemImg3!=null){
          that.setData({ 
            item_image3:res.data.itemImg3,
          })
        }
        if(res.data.itemImg4!=null){
          that.setData({ 
            item_image4:res.data.itemImg4,
          })
        }   
        that.setData({ 
          textdata: res.data,
          list:tags,
          item:{
            item_id:res.data.itemId,
            //current_price:res.data.finalPrice,//当前此商品的最高出价
            item_title:title,//商品的标题
            //item_quality:"ninnew",//商品的色，包含：“brdnew”全新、“ninnew”九成新、“notnew”磨损、“NULL”未登记
            item_description:info_tags[0],
            //item_buyout_price:res.data.finalPrice,
            item_type:res.data.type,
            item_location: res.data.itemLocation,
            telephoneNumber: res.data.telephoneNumber
          }
        });
        if(res.data.status=='-1'){
          that.setData({ 
            [status]: "preparing"//标记当前商品的拍卖状态，有selling正在拍卖和sold已拍卖
          });
        }
        else if(res.data.status == '0'){
          that.setData({ 
            [status]: "selling"//标记当前商品的拍卖状态，有selling正在拍卖和sold已拍卖
          });
        }
        else if(res.data.status=='1'){
          that.setData({ 
            [status]: "sold"//标记当前商品的拍卖状态，有selling正在拍卖和sold已拍卖
          });
        }
        else{
          that.setData({ 
            [status]: "preparing"//如果数据出错则显示准备中
          });
        }
        if(get_quality=='全新'){
          that.setData({ 
            [quality]:'brdnew'//商品的成色，包含：“brdnew”全新、“ninnew”九成新、“notnew”磨损、“NULL”未登记
          })
        }
        else if(get_quality=='九新'){
          that.setData({ 
            [quality]:'ninnew'//商品的成色，包含：“brdnew”全新、“ninnew”九成新、“notnew”磨损、“NULL”未登记
          })
        }
        else if(get_quality=='磨损'){
          that.setData({ 
            [quality]:'notnew'//商品的成色，包含：“brdnew”全新、“ninnew”九成新、“notnew”磨损、“NULL”未登记
          })
        }
        else{
          that.setData({ 
            [quality]:''//商品的成色，包含：“brdnew”全新、“ninnew”九成新、“notnew”磨损、“NULL”未登记
          })
        }
        console.log("项目传来的数据"+res.data);
        wx.request({
          url: app.globalData.apiurl+'/user/'+sellerID,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if(res.data.telephoneNumber==null){
              that.setData({ 
              [seller_info1]:'手机号码未登记',
              })
            }
            else{
              that.setData({ 
              [seller_info1]:res.data.telephoneNumber,
              })
            }
            that.setData({ 
              textdata1: res.data,
              [seller_id]:res.data.userId,
              [seller_name]:res.data.name,
             
              [seller_info2]:res.data.location,
              [seller_url]:res.data.userIcon,
            },function(){
              var sellerid = that.data.user.seller_id;
              var userid =  that.data.userId;
              var role = 'user.user_role';
              // console.log(app.globalData.userId);console.log(app.globalData.userId);console.log(app.globalData.userId);console.log(app.globalData.userId);
              // console.log(sellerID);
              if(sellerID == app.globalData.userId){
                that.setData({
                  [role]:'seller'
                })
              }
            });   
            console.log("项目传来的数据"+res.data);
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // console.log("d");
          }
        })

        wx.request({
          url: app.globalData.apiurl+'/orders/getItemListBySellerId/'+sellerID,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var itemlist_length = res.data.obj.length;
            var itemlist_count = 0;
            var current_price = 'item.current_price';
            var user_new_price = 'user.user_new_price';
            var item_buyout_price = 'item.item_buyout_price';
            
            while(itemlist_length>0){
              if(res.data.obj[itemlist_count].itemId==itemID){
                if(res.data.obj[itemlist_count].markupRange!=null){
                  that.setData({ 
                    min_bidAdd: res.data.obj[itemlist_count].markupRange,
                })
              }
                that.setData({ 
                  datetimeTo: Time.formatTime(new Date(res.data.obj[itemlist_count].endTime)),
                 
                  //[current_price]: res.data.obj[itemlist_count].startPrice
                  
                },function(){
                  if(that.data.bool && that.data.datetimeTo !=""){
                    that.data.timer = setInterval(() =>{ 
                      that.setData({
                        timeLeft: util.getTimeLeft(that.data.datetimeTo)
                      });
                      if (that.data.timeLeft == "拍卖已结束") {
                        clearInterval(that.data.timer);
                      }
                    }, 1000);
                  }
                  else if(that.data.datetimeTo ==""){
                    that.setData({
                      timeLeft: ""
                    });
                  }
                  else{
                    that.setData({
                      timeLeft: "拍卖已结束"
                    });
                  }
                }); 
                if(that.data.item.item_type == 1){//拍卖
                  if(that.data.item.current_price != res.data.obj[itemlist_count].finalPrice){
                    that.setData({ 
                      [current_price]: res.data.obj[itemlist_count].finalPrice,
                      [user_new_price]: res.data.obj[itemlist_count].finalPrice
                    });
                  }
                }
                else if(that.data.item.item_type == 2){//一口价
                  if(res.data.obj[itemlist_count].finalPrice!=null){
                    that.setData({ 
                      [item_buyout_price]: res.data.obj[itemlist_count].finalPrice,
                      [current_price]: res.data.obj[itemlist_count].finalPrice
                    });
                    // if(that.data.item.current_price != res.data.obj[itemlist_count].itemPrice){
                    //   that.setData({ 
                    //     [current_price]: res.data.obj[itemlist_count].itemPrice
                    //   });
                    // }
                  }
                }
              }
              itemlist_length--;
              itemlist_count++;
            }
            that.setData({ 
              getItemListBySellerId: res.data.obj,
            });  
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // console.log("d");
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // console.log("d");
      }
    })



    wx.request({
      url: app.globalData.apiurl+'/comments/getCommentList/'+itemID,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ 
          commentList: res.data.obj,
        }); 
        for(var i = 0 ; i < that.data.commentList.length ; i++){
          var comment_time = 'commentList['+i+'].time';
          var comment_role = 'commentList['+i+'].role';
          that.setData({ 
            [comment_time]: Time.formatTime(new Date(res.data.obj[i].time)) 
          }); 
          if(that.data.commentList[i].user_id == sellerID){
            that.setData({ 
              [comment_role]: 'seller' ,
            }); 
          }
          for(var aa = 0 ; aa < that.data.commentList[i].sub_comments.length; aa++){
            var sub_show = 'commentList['+i+'].sub_comments['+aa+'].show';
            var sub_role = 'commentList['+i+'].sub_comments['+aa+'].role';
            var sub_time = 'commentList['+i+'].sub_comments['+aa+'].time';
            that.setData({ 
              [sub_time]: Time.formatTime(new Date(res.data.obj[i].sub_comments[aa].time)) ,
              [sub_show]: true 
            }); 
          }
        }
        //console.log("项目传来的数据"+res.data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // console.log("d");
      }
    })








    // wx.request({//获取此商品所有的评论
    //   url: app.globalData.apiurl+'/comments/getcomments?itemId='+itemID,
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     var length = res.data.obj.data.length;
    //     var list='';
    //     // console.log("length:"+length);
    //     var count = 0;
    //     that.setData({ 
    //       comments: res.data.obj.data,
    //     });    
    //     while(length>0){
    //       list = 'commentList['+count+']';
    //       //console.log("list:"+list);
    //       that.setData({
    //         [list]:{ 
    //           item_id: that.data.item.item_id, 
    //           id:res.data.obj.data[count].commentId,
    //           user_id:res.data.obj.data[count].userId,
    //           name:res.data.obj.data[count].userName,
    //           text:res.data.obj.data[count].content,
    //           url:res.data.obj.data[count].userIcon,
    //           role:'buyer',
    //           time:res.data.obj.data[count].time,
    //           sub_comments:[
    //           // { name:'我是用户1号',
    //           //   target:'我是用户2号',
    //           //   text:'你是不是傻，不喜欢评论啥',
    //           //   role:'buyer',
    //           //   father:'2',
    //           //   time:'2010-08-01 10:30:00'}
    //           ]}}
    //           ,function() {
                
    //             // var subsub_comments_subsub = 'subsub_comments_subsub['+count+']';
    //             // console.log("subsub_comments_subsub"+subsub_comments_subsub);
    //             // console.log("subsub_comments_subsub_list"+list);
    //             // wx.request({//获取全部的子评论
    //             //     url: app.globalData.apiurl+'/comments/getReviewsForComments?commentId='+count,
    //             //     method: 'GET',
    //             //     header: {
    //             //       'content-type': 'application/json'
    //             //     },
    //             //     success: function (res) {
    //             //       that.setData({
    //             //         [subsub_comments_subsub]:res.data.obj
    //             //       },function(){});
    //             //     },
    //             //     fail: function () {
    //             //       // fail
    //             //       console.log("fffffffff");
    //             //     },
    //             //     complete: function () {
    //             //       // console.log("d");
    //             //     }
    //             //   })

    wx.request({//获取此商品所有的评论
        url: app.globalData.apiurl+'/comments/getcomments?itemId='+itemID,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({ 
            comments: res.data.obj.data,
          }); 
        },
        fail: function () {
          // fail
          console.log("fffffffff");
        },
          complete: function () {
            //// console.log("d");
        }
     })   
    wx.request({//获取全部的子评论
                      url: app.globalData.apiurl+'/comments/getAllReviews',
                      method: 'GET',
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        that.setData({
                          subsub_comments_subsub:res.data.obj
                        })
                      },
                      fail: function () {
                        // fail
                        console.log("fffffffff");
                      },
                        complete: function () {
                          //// console.log("d");
                      }
                   })   
                        


    //               wx.request({//获取全部的子评论
    //                 url: app.globalData.apiurl+'/comments/getAllReviews',
    //                 method: 'GET',
    //                 header: {
    //                   'content-type': 'application/json'
    //                 },
    //                 success: function (res) {
    //                   that.setData({
    //                     subsub_comments_subsub:res.data.obj
    //                   },function(){
    //                    var comments = that.data.commentList;
    //                    var subsub = that.data.subsub_comments_subsub;
    //                    var comments_length = comments.length;
    //                    var subsub_length = subsub.length;
    //                    var comments_count = 0;
    //                    var subsub_count = 0;
    //                   for(var i = 0 ; i < comments_length ; i++){
    //                      // console.log("A");
    //                       var count = 0;
    //                       for(var aa = 0 ; aa < subsub_length ; aa++){
    //                         var subsubsub = 'commentList['+i+'].sub_comments['+count+']';
    //                         // console.log("i"+i);
    //                         // console.log("aa"+aa);
    //                         if(comments[i].id == subsub[aa].commentId){
    //                           var time = Time.formatTime(new Date(subsub[aa].time));
    //                           // console.log("找到了id相等的");
    //                           that.setData({
    //                             [subsubsub]:{
    //                               name:subsub[aa].fromUserName,
    //                               fromUserId:subsub[aa].fromUser,
    //                               target:subsub[aa].toUserName,
    //                               toUserId:subsub[aa].toUser,
    //                               text:subsub[aa].content,
    //                               role:'buyer',
    //                               father:subsub[aa].commentId,
    //                               time:time,
    //                               id:subsub[aa].reviewId,
    //                               show:true
    //                             }
    //                           });
    //                           count = count + 1;
    //                         }
    //                       }
    //                   }
    //                   });
    //                 },
    //                 fail: function () {
    //                   // fail
    //                   console.log("fffffffff");
    //                 },
    //                 complete: function () {
    //                   //// console.log("d");
    //                 }
    //               })   
    //           }
    //           );
    //           length--;
    //           count++;
    //     }
    //         //console.log("项目传来的数据"+res.data);
    //         return count;
    //       },
    //       fail: function () {
    //         // fail
    //       },
    //       complete: function () {
    //         // console.log("d");
    //       }
    //     })

        wx.request({
          url: app.globalData.apiurl+'/records/getRecordsByItemId/'+itemID,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
        //    if(res.data.obj[records_length-1]!=null){
            console.log(res)
            var records_length = res.data.obj.length;
            var records_count = 0;
            var current_price = 'item.current_price';
            var user_new_price = 'user.user_new_price'; 
            var temp_price=0;
            var price = 'user.user_price';
            while(records_length>0){
              var bid_list = 'bidList['+records_count+']';
              var role = 'user.user_role'; 
              if(res.data.obj[records_length-1].userId == app.globalData.userId){
                temp_price = res.data.obj[records_length-1].dealPrice;
                that.setData({
                  [role]:'buyer'
                })
              }
              that.setData({    
                [bid_list]:{
                  item_id: res.data.obj[records_length-1].itemId, 
                  user_id: res.data.obj[records_length-1].userId, 
                  name: res.data.obj[records_length-1].userName, 
                  price: res.data.obj[records_length-1].dealPrice,
                }
              });
              records_count++;
              records_length--;
            }
            that.setData({ 
              [price]:temp_price,
              getRecordsByItemId: res.data
          });  
        //  }
          },
          fail: function () {
            // fail
          },
          complete: function () {
           // // console.log("d");
          }
        })
  },
  onLoad: function (options) {
    var timestamp0 = Date.parse(new Date());
    var timestamp1 = Date.parse(this.data.datetimeTo);
    if(timestamp1<timestamp0){
      this.data.bool=false;
    }
    var itemID = options.finalPrice;
    var itemID = options.itemId;
    var that = this;
    this.getInfo(itemID);
    var interval = setInterval(function () {  
      console.log('刷新页面！');
      //这里放把存在本地的信息提交到后端的函数
      that.setData({
        //把本地的存要提交数据的数据结构清0
      },function(){
        //that.getInfo('3');
        wx.request({//更新商品的价格
          url: app.globalData.apiurl+'/getItemById/'+itemID,
          method: 'GET',
          header: {
          'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            var sellerID = res.data.sellerId;
            wx.request({
              url: app.globalData.apiurl+'/orders/getItemListBySellerId/'+sellerID,
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                var itemlist_length = res.data.obj.length;
                var itemlist_count = 0;
                var current_price = 'item.current_price';
                var user_new_price = 'user.user_new_price';
                var item_buyout_price = 'item.item_buyout_price';
                while(itemlist_length>0){
                  if(res.data.obj[itemlist_count].itemId==itemID){
                    if(that.data.item.item_type == 1){//拍卖
                      if(that.data.item.current_price != res.data.obj[itemlist_count].finalPrice){
                        that.setData({ 
                          [current_price]: res.data.obj[itemlist_count].finalPrice,
                          [user_new_price]: res.data.obj[itemlist_count].finalPrice
                        });
                      }
                    }
                    else if(that.data.item.item_type == 2){//一口价
                      console.log(res)
                      console.log(res.data.obj[itemlist_count].finalPrice)
                      console.log(111111111111111)
                      if(res.data.obj[itemlist_count].finalPrice!=null){
                        that.setData({ 
                          [item_buyout_price]: res.data.obj[itemlist_count].finalPrice,
                          [current_price]: res.data.obj[itemlist_count].finalPrice
                        });
                        // if(that.data.item.current_price != res.data.obj[itemlist_count].finalPrice){
                        //   that.setData({ 
                        //     [current_price]: res.data.obj[itemlist_count].finalPrice
                        //   });
                        // }
                      }
                    }
                  }
                  itemlist_length--;
                  itemlist_count++;
                }
              },
              fail: function () {
                // fail
              },
              complete: function () {
                // // console.log("d");
              }
            })
          },
              fail: function () {
                // fail
              },
              complete: function () {
                // // console.log("d");
              }
            })



            wx.request({//更新出价记录
              url: app.globalData.apiurl+'/records/getRecordsByItemId/'+itemID,
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if(res.data.obj[records_length-1]!=null){
                  var records_length = res.data.obj.length;
                  var records_count = 0;
                  var Userid = res.data.obj[records_length-1].userId;
                  while(records_length>0){
                    var bid_list = 'bidList['+records_count+']';
                    that.setData({
                      [bid_list]:{
                        item_id: res.data.obj[records_length-1].itemId, 
                        user_id: res.data.obj[records_length-1].userId, 
                        name: res.data.obj[records_length-1].userName, 
                        price: res.data.obj[records_length-1].dealPrice,
                      }
                    });
                    records_count++;
                    records_length--;
                  } 
                } 
              },
              fail: function () {
                // fail
              },
              complete: function () {
                // // console.log("d");
              }
            })
            // wx.request({
            //   url: app.globalData.apiurl+'/comments/getcomments?itemId='+itemID,
            //   method: 'GET',
            //   header: {
            //     'content-type': 'application/json'
            //   },
            //   success: function (res) {
            //     var length = res.data.obj.data.length;
            //     var list='';
            //     // console.log("length:"+length);
            //     var count = 0;
            //     that.setData({ 
            //       comments_update: res.data.obj.data,
            //     });    
            //     while(length>0){
            //       list = 'commentList['+count+']';
            //       var item_id = 'commentList['+count+'].item_id';
            //       var id = 'commentList['+count+'].id';
            //       var name = 'commentList['+count+'].name';
            //       var text = 'commentList['+count+'].text';
            //       var url = 'commentList['+count+'].url';
            //       var role = 'commentList['+count+'].role';
            //       var time = 'commentList['+count+'].time';
            //       // console.log("list:"+list);
            //       that.setData({
            //           [item_id]: that.data.item.item_id, 
            //           [id]:res.data.obj.data[count].commentId,
            //           [name]:res.data.obj.data[count].userName,
            //           [text]:res.data.obj.data[count].content,
            //           [url]:res.data.obj.data[count].userIcon,
            //           [role]:'buyer',
            //           [time]:res.data.obj.data[count].time,
            //         });
            //           length--;
            //           count++;
            //     }
            //         //console.log("项目传来的数据"+res.data)
            //       },
            //       fail: function () {
            //         // fail
            //       },
            //       complete: function () {
            //         // // console.log("d");
            //       }
            //     })

                // wx.request({//获取全部的子评论
                //   url: app.globalData.apiurl+'/comments/getAllReviews',
                //   method: 'GET',
                //   header: {
                //     'content-type': 'application/json'
                //   },
                //   success: function (res) {
                //     that.setData({
                //       subsub_comments_subsubsub:res.data.obj
                //     },function(){
                //      var comments = that.data.commentList;
                //      var gettedData = that.data.subsub_comments_subsubsub;
                //      var comments_length = comments.length;
                //      var subsub_length = gettedData.length;
                //      var comments_count = 0;
                //      var subsub_count = 0;
                //      if((
                //        (res.data.obj.length!=null && that.data.subsub_comments_subsub!=null)
                //        && res.data.obj.length != that.data.subsub_comments_subsub.length) ||
                //        (res.data.obj.length==null && that.data.subsub_comments_subsub!=null) || 
                //        (res.data.obj.length!=null && that.data.subsub_comments_subsub==null)
                //        )
                //        {
                //         console.log("发生了变化需要更新数据");
                //         // console.log("新的长度"+that.data.subsub_comments_subsubsub.length);
                //         // console.log("原来的长度"+that.data.subsub_comments_subsub.length);
                //           for(var i = 0 ; i < comments_length ; i++){
                //             // console.log("A");
                //             var count = 0;
                //             for(var aa = 0 ; aa < subsub_length ; aa++){
                //               var targetData = 'commentList['+i+'].sub_comments['+count+']';
                //               if(comments[i].id == gettedData[aa].commentId){
                //                 // console.log("找到了对应id");
                //                 // console.log("comments[i].id"+comments[i].id);
                //                 // console.log("gettedData[aa].commentId"+gettedData[aa].commentId);
                //                 // console.log("gettedData[aa].id"+gettedData[aa].reviewId);
                //                 var time = Time.formatTime(new Date(gettedData[aa].time));
                //                 that.setData({
                //                   [targetData]:{
                //                     name:gettedData[aa].fromUserName,
                //                     target:gettedData[aa].toUserName,
                //                     fromUserId:gettedData[aa].fromUser,
                //                     toUserId:gettedData[aa].toUser,
                //                     text:gettedData[aa].content,
                //                     role:'buyer',
                //                     father:gettedData[aa].commentId,
                //                     time:time,
                //                     id:gettedData[aa].reviewId,
                //                     show:true
                //                   }
                //                 });
                //                 count = count + 1;
                //               }
                //             }
                //         }
                //      }
                //      else{
                //        console.log("没有发生变化不做任何操作");
                //       //  console.log("新的长度"+that.data.subsub_comments_subsubsub.length);
                //       //   console.log("原来的长度"+that.data.subsub_comments_subsub.length);
                //      }
                    
                //     });
                //   },
                //   fail: function () {
                //     // fail
                //     console.log("fffffffff");
                //   },
                //   complete: function () {
                //     // // console.log("d");
                //   }
                // })
          })
    }, this.data.refresh_time) //循环间隔 单位ms
  },
  showDealrole: function(){
    wx.showToast({
      title: '您的出价不能小于当前的出价金额，每次出价不能小于卖家设置的最小出价间隔',
      icon: 'none',
      duration: 5000//持续的时间
    })
  },
  manageShow: function(itemID){
    wx.redirectTo({
      url:'/pages/manage/manage?itemId='+this.data.item.item_id,  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      success:function(){

      },  //成功后的回调；
      fail: function(){

      },//失败后的回调；
      complete: function(){

      }      //结束后的回调(成功，失败都会执行)
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    var timestamp0 = Date.parse(new Date());
    var timestamp1 = Date.parse(this.data.datetimeTo);
    if(timestamp1<timestamp0){
      this.data.bool=false;
    }
    var itemID = options.finalPrice;
    var itemID = options.itemId;
    //var that = this;
    this.getInfo(itemID);
  }
})


