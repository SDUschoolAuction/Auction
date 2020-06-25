// pages/Detail_Page1/Detail_Page1.js
//需要从后端获取的用+++++++++表示
//需要更新后端数据的用----------表示
const util = require('../../utils/util.js')
const Time = require('../../utils/time.js')
const app = getApp();
Page({
  data: {
    
    subsub_comments:[],
    item_id_fromSwitch: '-1',
    comment_length:0,

    buyout_show: false,
    time_now: '',

    subcomment_father: -1,
    subcomment_target: '',
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
    commentInput_list:[{
      text:"",
      time:""
    }],//----------
    commentInput_set: null,

    bid_show: false,
    comment_show: false,
    no_comment_url:'/image/no_comments.png',
    user:{//这个是各个不同身份的用户的全部信息，+++++++++，----------，特别标注可能会更新的数据==========
      seller_name:'',//卖家的名称
      seller_info1:'',//卖家提供的信息1
      seller_info2:'',//卖家提供的信息2
      seller_url:'',//卖家的头像地址

      user_name:'wei',
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
      // { item_id: 1, 
      //   name:'我是用户1号',
      //   text:'我好喜欢这个商品啊！！',
      //   url:'/image/head.png',
      //   role:'buyer',
      //   time:'2010-08-01 10:30:00',
      //   sub_comments:[]
      // }, 
      // { item_id: 2, 
      //   name:'我是用户2号',
      //   text:'我不喜欢但是我我还是要评论',
      //   url:'/image/head.png',
      //   role:'seller',
      //   time:'2010-08-01 10:30:00',
      //   sub_comments:[
      //     { name:'我是用户1号',
      //       target:'我是用户2号',
      //       text:'你是不是傻，不喜欢评论啥',
      //       role:'buyer',
      //       father:'2',
      //       time:'2010-08-01 10:30:00'
      //     },

      //     { name:'我是用户3号',
      //       target:'我是用户2号',
      //       text:'卖家说自己不喜欢可还行',
      //       role:'buyer',
      //       father:'2',
      //       time:'2010-08-01 10:30:00'
      //     },

      //     { name:'我是用户2号',
      //       target:'我是用户1号',
      //       text:'要你寡！要你寡！要你寡！要你寡！要你寡！要你寡！要你寡！要你寡！要你寡！要你寡！要你寡！要你寡！',
      //       role:'seller',
      //       father:'2',
      //       time:'2010-08-01 10:30:00'
      //     }
      //   ]
      // }, 
      // { item_id: 3, 
      //   name:'我是用户3号',
      //   text:'我觉得不行，我也不知道我喜不喜欢',
      //   url:'/image/head.png',
      //   role:'buyer',
      //   time:'2010-08-01 10:30:00',
      //   sub_comments:[]}
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
  onLoad: function (options) {
    var timestamp0 = Date.parse(new Date());
    var timestamp1 = Date.parse(this.data.datetimeTo);
    if(timestamp1<timestamp0){
      this.data.bool=false;
    }
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
    // console.log(target);
    // console.log(father);
    this.setData({
      sub_holder_text: "回复@"+target,
      subcomment_father:father,
      subcomment_target:target,
      subcomment_show: true
    })
  },
  deleteComment:function(e){//出价界面展开/收起切换函数
    var id = e.currentTarget.dataset.deleteid;
    console.log("将要删除的评论的id为:"+id);
    wx.request({
      url: app.globalData.apiurl+'/deleteComments',
      method: 'DELETE',
      data:{
        'commentId': id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (boolean) {
        if(boolean){
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
  deleteSubComment:function(e){//出价界面展开/收起切换函数
    var id = e.currentTarget.dataset.deleteid;
    console.log("将要删除的二级评论的id为:"+id);
    // wx.request({
    //   url: app.globalData.apiurl+'/deleteComments',
    //   method: 'DELETE',
    //   data:{
    //     'commentId': id
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (boolean) {
    //     if(boolean){
    //       console.log("将要删除的评论的id为:"+id+"删除成功");
    //     }
    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // console.log("d");
    //   }
    // })
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
      //console.log("list的是："+this.data.commentInput_list[count].text);
      this.setData({
        commentCount:count + 1
      });
    }
  },
  submitSubcomment:function(e){//用来提交用户输入的sub评论
    console.log("输入的评论是："+this.data.commentInput);
    this.closeSubcomment();
    var time = Time.formatTime(new Date());
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
      // console.log("sublist的是："+this.data.subcommentInput_list[subcount].text);
      this.setData({
        subCommentcount:subcount + 1
      });
    }
  },
  submitBid:function(e){//提交新的出价的函数
    var new_price = this.data.user.user_new_price;
    var old_price = this.data.user.user_old_price;
    var old_price_x = "user.user_old_price";
    var user_price = "user.user_price";
    var current_price ="item.current_price";
    var user_role ="user.user_role";
    var new_role ="buyer";
    var bidCount = this.data.bidCount;
    var bidCount_x = "bidCount";
    var list = "newBidlist["+bidCount+"]";
    // var list_item_id = "newBidlist["+bidCount+"].item_id";
    // var list_name = "newBidlist["+bidCount+"].name";
    // var list_price = "newBidlist["+bidCount+"].price";
    var user_name = this.data.user.user_name;
    if(new_price - old_price < this.data.min_bidAdd){
      this.setData({
        bid_text: "加价小于最小要求"
      });
    }
    else{
      this.changeShow();//更换底部操作栏回出价-回复的界面
      this.setData({
        [user_role]: new_role,
        [user_price]: new_price,
        [old_price_x]: new_price,
        [current_price]: new_price,
        [list]: {
          item_id:bidCount+1,
          name: user_name,
          price: new_price
        },
        // [list_item_id]:bidCount+1,
        // [list_name]: user_name,
        // [list_price]: new_price,
        new_bid_bool:true,
        bid_text: "出价"
      });
      console.log("bidlist："+this.data.newBidlist[bidCount].price);
      console.log("新："+this.data.user.user_new_price+"旧："+this.data.user.user_old_price);
      this.setData({
        [bidCount_x]:bidCount+1,
      });
    }
  },
  submitBuyout:function(e){//确认一口价购买的函数
    console.log(this.data.user.user_name+"以一口价"+this.data.item.item_buyout_price+"买下了此商品");
    this.buyoutShow();
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
    var sellerID=0;
    var that = this;
    var status = 'item.item_status';
    var quality = 'item.item_quality';
    var seller_id = 'user.seller_id';
    var seller_name = 'user.seller_name';
    var seller_info1 = 'user.seller_info1';
    var seller_info2 = 'user.seller_info2';
    var seller_url = 'user.seller_url';
    wx.request({
      url: app.globalData.apiurl+'/getItemById/'+itemID,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        sellerID = res.data.sellerId;
        var info_tags = res.data.itemInfo.split("#");
        var get_quality = res.data.itemTag; 
        var title = res.data.itemHead;
        var tags = new Array();
        for (var i = 1, len = info_tags.length; i < len; i++) {
          tags[i-1] = info_tags[i];
        }
        //console.log("info"+info);
        that.setData({ 
          textdata: res.data,
          list:tags,
          item_image1:res.data.itemImg1,
          item_image2:res.data.itemImg2,
          item_image3:res.data.itemImg3,
          item_image4:res.data.itemImg4,
          item:{
            item_id:res.data.itemId,
            //current_price:res.data.finalPrice,//当前此商品的最高出价
            item_title:title,//商品的标题
            //item_quality:"ninnew",//商品的色，包含：“brdnew”全新、“ninnew”九成新、“notnew”磨损、“NULL”未登记
            item_description:info_tags[0],
            //item_buyout_price:res.data.finalPrice,
            item_type:res.data.type
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
            that.setData({ 
              textdata1: res.data,
              [seller_id]:res.data.userId,
              [seller_name]:res.data.name,
              [seller_info1]:res.data.telephoneNumber,
              [seller_info2]:res.data.location,
              [seller_url]:res.data.userIcon,
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
                that.setData({ 
                  datetimeTo: res.data.obj[itemlist_count].endTime,
                  min_bidAdd: res.data.obj[itemlist_count].markupRange,
                  //[current_price]: res.data.obj[itemlist_count].startPrice
                }); 
                if(that.data.item.current_price != res.data.obj[itemlist_count].startPrice){
                  that.setData({ 
                    [current_price]: res.data.obj[itemlist_count].startPrice
                  });
                }
                if(res.data.obj[itemlist_count].itemPrice!=null){
                  that.setData({ 
                    [item_buyout_price]: res.data.obj[itemlist_count].itemPrice,
                    //[current_price]: res.data.obj[itemlist_count].itemPrice
                  });
                  if(that.data.item.current_price != res.data.obj[itemlist_count].itemPrice){
                    that.setData({ 
                      [current_price]: res.data.obj[itemlist_count].itemPrice
                    });
                  }
                }
                else{
                  that.setData({ 
                    [current_price]: res.data.obj[itemlist_count].startPrice,
                    [user_new_price]: res.data.obj[itemlist_count].startPrice
                  })
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
      url: app.globalData.apiurl+'/comments/getcomments?itemId='+itemID,
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
              ]}}
              ,function() {
                
                // var subsub_comments_subsub = 'subsub_comments_subsub['+count+']';
                // console.log("subsub_comments_subsub"+subsub_comments_subsub);
                // console.log("subsub_comments_subsub_list"+list);
                // wx.request({//获取全部的子评论
                //     url: app.globalData.apiurl+'/comments/getReviewsForComments?commentId='+count,
                //     method: 'GET',
                //     header: {
                //       'content-type': 'application/json'
                //     },
                //     success: function (res) {
                //       that.setData({
                //         [subsub_comments_subsub]:res.data.obj
                //       },function(){});
                //     },
                //     fail: function () {
                //       // fail
                //       console.log("fffffffff");
                //     },
                //     complete: function () {
                //       // console.log("d");
                //     }
                //   })


                  wx.request({//获取全部的子评论
                    url: app.globalData.apiurl+'/comments/getAllReviews',
                    method: 'GET',
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      that.setData({
                        subsub_comments_subsub:res.data.obj
                      },function(){
                       var comments = that.data.commentList;
                       var subsub = that.data.subsub_comments_subsub;
                       var comments_length = comments.length;
                       var subsub_length = subsub.length;
                       var comments_count = 0;
                       var subsub_count = 0;
                      for(var i = 0 ; i < comments_length ; i++){
                         // console.log("A");
                          var count = 0;
                          for(var aa = 0 ; aa < subsub_length ; aa++){
                            var subsubsub = 'commentList['+i+'].sub_comments['+count+']';
                            // console.log("i"+i);
                            // console.log("aa"+aa);
                            if(comments[i].id == subsub[aa].commentId){
                              var time = Time.formatTime(new Date(subsub[aa].time));
                              // console.log("找到了id相等的");
                              that.setData({
                                [subsubsub]:{
                                  name:subsub[aa].fromUserName,
                                  target:subsub[aa].toUserName,
                                  text:subsub[aa].content,
                                  role:'buyer',
                                  father:subsub[aa].commentId,
                                  time:time,
                                  id:subsub[aa].reviewId
                                }
                              });
                              count = count + 1;
                            }
                          }
                      }
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
              }
              );
              length--;
              count++;
        }
            //console.log("项目传来的数据"+res.data);
            return count;
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // console.log("d");
          }
        })

        wx.request({
          url: app.globalData.apiurl+'/records/getRecordsByItemId/'+itemID,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var records_length = res.data.obj.length;
            var records_count = 0;
            var Userid = res.data.obj[records_length-1].userid;
            while(records_length>0){
              var bid_list = 'bidList['+records_count+']';
              that.setData({
                [bid_list]:{
                  item_id: res.data.obj[records_length-1].itemId, 
                  user_id: res.data.obj[records_length-1].userid, 
                  name: res.data.obj[records_length-1].userName, 
                  price: res.data.obj[records_length-1].dealPrice,
                }
              });
              records_count++;
              records_length--;
            }
            that.setData({ 
              getRecordsByItemId: res.data.obj
            });  
          },
          fail: function () {
            // fail
          },
          complete: function () {
           // // console.log("d");
          }
        })
  },
  // subFunction: function(){
  //   var length = this.data.commentList.length;
  //   var count = 0;
  //   // console.log('onShowonShowonShowonShowonShow');
  //   console.log('onShowlength'+length);
  //   while(length>0){
  //     console.log('onShowonShowonShowonShowonShow');
  //     var sub_length = this.data.subsub_comments.length;
  //     var sub_count = 0;
  //     var sub_commentList = 'commentList['+count+'].sub_comments[1]';
  //     while(sub_length>0){
  //       if(this.data.subsub_comments[sub_count].commentId == this.data.commentList[count].id){
  //         this.setData({
  //           // [sub_commentList]:this.data.commentList[count].sub_comments.concat(this.data.subsub_comments[sub_count].content)
  //           texttext:{title:11111111}
  //       });
  //       }
  //       sub_count++;
  //       sub_length--;
  //     }
  //     count++;
  //     length--;
  //   }
  // },
  onLoad: function (options) {
    var itemID = '3';
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
                    if(that.data.item.current_price != res.data.obj[itemlist_count].startPrice){
                      that.setData({ 
                        [current_price]: res.data.obj[itemlist_count].startPrice
                      });
                    }
                    if(res.data.obj[itemlist_count].itemPrice!=null){
                      that.setData({ 
                        [item_buyout_price]: res.data.obj[itemlist_count].itemPrice,
                        //[current_price]: res.data.obj[itemlist_count].itemPrice
                      });
                      if(that.data.item.current_price != res.data.obj[itemlist_count].itemPrice){
                        that.setData({ 
                          [current_price]: res.data.obj[itemlist_count].itemPrice
                        });
                      }
                    }
                    else{
                      that.setData({ 
                        [current_price]: res.data.obj[itemlist_count].startPrice,
                        [user_new_price]: res.data.obj[itemlist_count].startPrice
                      })
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
                var records_length = res.data.obj.length;
                var records_count = 0;
                var Userid = res.data.obj[records_length-1].userid;
                while(records_length>0){
                  var bid_list = 'bidList['+records_count+']';
                  that.setData({
                    [bid_list]:{
                      item_id: res.data.obj[records_length-1].itemId, 
                      user_id: res.data.obj[records_length-1].userid, 
                      name: res.data.obj[records_length-1].userid, 
                      price: res.data.obj[records_length-1].dealPrice,
                    }
                  });
                  records_count++;
                  records_length--;
                } 
              },
              fail: function () {
                // fail
              },
              complete: function () {
                // // console.log("d");
              }
            })
            wx.request({
              url: app.globalData.apiurl+'/comments/getcomments?itemId='+itemID,
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
                  comments_update: res.data.obj.data,
                });    
                while(length>0){
                  list = 'commentList['+count+']';
                  // console.log("list:"+list);
                  that.setData({
                    [list]:{ 
                      item_id: that.data.item.item_id, 
                      id:res.data.obj.data[count].commentId,
                      name:res.data.obj.data[count].userName,
                      text:res.data.obj.data[count].content,
                      url:res.data.obj.data[count].userIcon,
                      role:'buyer',
                      time:res.data.obj.data[count].time,
                      sub_comments:[]
                    }
                    });
                      length--;
                      count++;
                }
                    //console.log("项目传来的数据"+res.data)
                  },
                  fail: function () {
                    // fail
                  },
                  complete: function () {
                    // // console.log("d");
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
                      subsub_comments_subsubsub:res.data.obj
                    },function(){
                     var comments = that.data.commentList;
                     var subsub = that.data.subsub_comments_subsubsub;
                     var comments_length = comments.length;
                     var subsub_length = subsub.length;
                     var comments_count = 0;
                     var subsub_count = 0;
                     if(res.data.obj.length != that.data.subsub_comments_subsub.length){
                        console.log("没有发生了变化需要更新数据");
                        console.log("新的长度"+that.data.subsub_comments_subsubsub.length);
                        console.log("原来的长度"+that.data.subsub_comments_subsub.length);

                        //   for(var i = 0 ; i < comments_length ; i++){
                        //     // console.log("A");
                        //     var count = 0;
                        //     for(var aa = 0 ; aa < subsub_length ; aa++){
                        //       var subsubsub = 'commentList['+i+'].sub_comments['+count+']';
                        //       if(comments[i].id == subsub[aa].commentId)){
                        //         var time = Time.formatTime(new Date(subsub[aa].time));
                        //         that.setData({
                        //           [subsubsub]:{
                        //             name:subsub[aa].fromUserName,
                        //             target:subsub[aa].toUserName,
                        //             text:subsub[aa].content,
                        //             role:'buyer',
                        //             father:subsub[aa].commentId,
                        //             time:time,
                        //             id:subsub[aa].reviewId
                        //           }
                        //         });
                        //         count = count + 1;
                        //       }
                        //     }
                        // }
                     }
                     else{
                       console.log("没有发生变化不做任何操作");
                       console.log("新的长度"+that.data.subsub_comments_subsubsub.length);
                        console.log("原来的长度"+that.data.subsub_comments_subsub.length);
                     }
                    
                    });
                  },
                  fail: function () {
                    // fail
                    console.log("fffffffff");
                  },
                  complete: function () {
                    // // console.log("d");
                  }
                })


          


          })
    }, 99999999) //循环间隔 单位ms
  }
//   function getItems(){
//     wx.request({
//         ... //
//         success:(res)=>{
//             if(num < pageNum) {
//                 getItems(++num);
//             }
//         }
//     })
// }
  // getSubrequset:function(count,that){
  //   var comment_length = that.data.commentList.length;
  //   wx.request({
  //     url: app.globalData.apiurl+'/comments/getReviewsForComments?commentId='+count,
  //     method: 'GET',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       var sub_length = res.data.obj.length;
  //       var sub_count = 0;
  //       while(sub_length>0){
  //         var comment_sub = 'commentList['+count+'].sub_comments['+sub_count+']';
  //         that.setData({
  //           [comment_sub]:res.data.obj[sub_count]
  //         });
  //         sub_length--;
  //         sub_count++
  //       }
        
  //       if(count < comment_length-1) {
  //         getSubrequset(++count,that);
  //       }
  //     },
  //     fail: function () {
  //       // fail
  //       console.log("fffffffff");
  //     },
  //     complete: function () {
  //       // console.log("d");
  //     }
  //   })
  // }
})


