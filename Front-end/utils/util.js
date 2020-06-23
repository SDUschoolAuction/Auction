const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  var time1 = ''

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime1() {
  var date=new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTime1: formatTime1
}

//取倒计时（天时分秒）
function getTimeLeft(datetimeTo){
  // 计算目标与现在时间差（毫秒）
  let time1 = new Date(datetimeTo).getTime();
  let time2 = new Date().getTime();
  let mss = time1 - time2;
   
  // 将时间差（毫秒）格式为：天时分秒
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = parseInt((mss % (1000 * 60)) / 1000);
   
  return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
}

function getTimeTime1(){
  // 获取当前时间
  let time1 = new Date().getTime();
  return time1;
}
 
function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽
  var originalHeight = e.detail.height;//图片原始高
  var originalScale = originalHeight/originalWidth;//图片高宽比
  // console.log('originalWidth: ' + originalWidth)
  // console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高
  wx.getSystemInfo({
      success: function (res) {
          var windowWidth = res.windowWidth;
          var windowHeight = res.windowHeight;
          var windowscale = windowHeight/windowWidth;//屏幕高宽比
          // console.log('windowWidth: ' + windowWidth)
          // console.log('windowHeight: ' + windowHeight)
          if(originalScale < windowscale){//图片高宽比小于屏幕高宽比
              //图片缩放后的宽为屏幕宽
              imageSize.imageWidth = windowWidth;
              imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
          }else{//图片高宽比大于屏幕高宽比
              //图片缩放后的高为屏幕高
              imageSize.imageHeight = windowHeight;
              imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
          }
      }
  })
  // console.log('缩放后的宽: ' + imageSize.imageWidth)
  // console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}
var Promise = require('bluebird.js') 
export function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}
export function wxPromise(fn) {
    return function (obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = res => {
          resolve(res)
        };
        obj.fail = res => {
          reject(res)
        };
        fn(obj)
      })
    }
  }
const headerConfig = {
  "Content-Type": "application/json",
}
export function get(url, data = {}) {
    return new Promise((resolve, reject) => {
      //网络请求
      wx.request({
        url: "https://yyzcowtodd.cn/Auction" + url,
        data,
        method: 'GET',
        header: headerConfig,
        success: function (res) {//服务器返回数据
          resolve(res);
        },
        fail: function (error) {
          reject(error);
        }
      })
    });
  }
module.exports = {
  getTimeLeft: getTimeLeft,
  imageUtil: imageUtil,
  // wxPromisify: wxPromisify
  wxPromise: wxPromise,
  get: get
}