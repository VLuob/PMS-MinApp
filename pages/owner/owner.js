// pages/ovner/owner.js
const App = getApp()
const {
  _Post,
  _Get
} = require('../../common/request')
const API = require('../../common/api')
var chinese = require("../../utils/Chinses.js")
var english = require("../../utils/English.js")
Page({
  data: {
    language: "中文", //语言切换
    realEstateName: "", //物业名称
    region: ['省', '市', '区'], //来源地区选择器
    sourceProvince: "", //来自省
    sourceCity: "", //来自城市
    sourceDistrict: "", //来源区
    region1: ['省', '市', '区'], //户籍地区选择器
    province: "", //户籍省
    city: "", //户籍市
    district: "", //户籍区
    name: "", //用户姓名
    date: "年-月-日", //到达时间默认样式
    arriveDate: "", //到达时间
    imgs: [], //用户上传图片
    show: true, //照片默认图片
    img: "", //用户信息提交成功返回二维码
    customItem: '全部',
    identityClass: '', //用户身份
    identity: ['', '访客', '保安', '物业'], //身份数组
    index: "身份",
    gender: "0", //性别 默认男
    menimg: "/images/normal.png", //性别默认选中男
    typelist: ['身份证', '护照'],
    typeval: "身份证", //证件类型
    type: "0"
    /**
     * 页面的初始数据
     */
  },
  identityChange(e) {
    this.setData({
      index: this.data.identity[e.detail.value],
      identityClass: e.detail.value,
    })
    console.log(this.data.identityClass)
  },
  typeChange(e) {
    this.setData({
      type: e.detail.value,
      typeval: this.data.typelist[e.detail.value]
    })
    console.log(e.detail.value)
    console.log(this.data.typelist[e.detail.value])
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangef: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  menChange: function() {
    this.setData({
      menimg: "/images/normal.png",
      womenimg: "/images/unselected.png",
      gender: 1
    })
  },
  womenChange: function() {
    this.setData({
      menimg: "/images/unselected.png",
      womenimg: "/images/normal.png",
      gender: 2
    })
  },
  emailInput: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  bindRegionChange(e) { //来源地区选择器
    let region = (e.detail.value)
    console.log(region[0])

    this.setData({
      region: region,
      sourceProvince: region[0],
      sourceCity: region[1],
      sourceDistrict: region[2]
    })
  },
  bindRegionChangef(e) { //户籍地区选择器
    let region1 = (e.detail.value)
    console.log(region1[0])
    console.log(region1[1])
    this.setData({
      region1: region1,
      province: region1[0],
      city: region1[1],
      district: region1[2]
    })
  },
  bindDateChange: function(e) { //到达时间选择
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      arriveDate: e.detail.value
    })
  },
  searchBox: async function(e) {
    const that = this;
    var name = e.detail.value['name'] //性名
    var phone = e.detail.value['phone'] //电话
    var identity = e.detail.value['idcard'] //身份证号
    var type = this.data.type //身份证类型
    var realEstateName = e.detail.value['realEstateName'] //物业名称
    var no = e.detail.value['no'] //栋
    var room = e.detail.value['house'] //室
    var arriveDate = this.data.arriveDate //到达时间
    var sourceProvince = this.data.sourceProvince //来自省
    var sourceCity = this.data.sourceCity //来自城市
    var sourceDistrict = this.data.sourceDistrict //来源区
    var province = this.data.province //户籍省
    var city = this.data.city //户籍市
    var district = this.data.district //户籍区
    var identityClass = this.data.identityClass //用户身份
    var gender = this.data.gender //性别 默认男
    var imgs = this.data.imgs //用户上传图片
    let [imageUrl] = imgs //用户上传图片数组解构
    let param = {
      type,
      name,
      phone,
      identity,
      no,
      room,
      arriveDate,
      sourceProvince,
      sourceCity,
      sourceDistrict,
      province,
      city,
      district,
      identityClass,
      gender,
      realEstateName,
      imageUrl
    }
    if (name != "" && phone != "" && identity != "" && realEstateName !== "" && arriveDate != "" && imageUrl != "" &&
      room != '' && sourceProvince != "" && no != '' &&
      sourceCity != "" && sourceDistrict != "" && province !== "" && city != "" && type !== "" &&
      district != "" && identityClass !== "" && gender != ""
    ) {
      let res = await _Post(API.entryadd, param)
      let {
        code,
        msg
      } = res
      console.log(res)
      if (code === 200) {
        this.setData({
          img: msg
        })
        wx.navigateTo({
          url: '../SucessShow/sucessshow?img=' + msg + '&language=' + this.data.language,
        })
      } else {
        wx.showToast({
          title: "信息提交失败",
          icon: "none",
          duration: 1500
        })
      }
    } else(
      wx.showToast({
        title: "个人信息不能为空",
        icon: "none",
        duration: 1500
      })
    )
  },
  gobackChange: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 上传图片
  chooseImg: function(e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 1) {
      this.setData({
        lenMore: 1,
        show: false
      });
      setTimeout(function() {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 1) {
            that.setData({
              imgs: imgs,
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);

            let name = that.data.name
            console.log(name)
            if (name !== "") {
              wx.uploadFile({
                url: API.uploadFiles + "?name=" + name, //此处换上你的接口地址
                filePath: res.tempFilePaths[0],
                name: name,
                header: {
                  "Content-Type": "multipart/form-data",
                },
                formData: {
                  id: name
                },
                //需要传的关于这个图片的信息，比如这个图片属于哪个用户的
                success: function(res) {
                  if (res.code == 200) {
                    wx.showToast({
                      title: '上传成功',
                      icon: "success",
                      duration: 1000
                    })
                  }
                },
                fail: function(res) {
                  wx.showToast({
                    title: '网络异常,请稍后重试',
                    icon: "none",
                    duration: 1000
                  })
                }
              })
            }

          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs,
          show: false
        });
      }
    });
  },
  // 删除图片
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      show: true,
      imgs: imgs
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let realEstateName = options.propertyname
    this.setData({
      realEstateName: realEstateName
    })
    /* 语言切换 start */
    var lastLanuage = this.data.language;
    this.getContent(lastLanuage);
  },
  changeLanuage: function() {
    var version = this.data.language;
    if (version == "中文") {
      this.setData({
        language: "英文",
        index: "Visitor",
        typeval: "Passport",
        region1: ['State', 'City', 'Region'],
        region: ['Country', 'City', 'Region'],
        date: "Y-M-D"
      })
    } else {
      this.setData({
        language: "中文",
        index: "身份",
        typeval: "身份证",
        region: ['省', '市', '区'],
        region1: ['省', '市', '区'],
        date: "年-月-日"
      })
    }

    var lastLanuage = this.data.language;
    this.getContent(lastLanuage);
  },

  getContent: function(lastLanuage) {
    if (lastLanuage == "中文") {
      this.setData({
        content: chinese.content
      })
    } else {
      this.setData({
        content: english.content
      })

    }
    /* 语言切换 end */
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
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo'] === true) { // 成功授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
        } else if (res.authSetting['scope.userInfo'] === false) { // 授权弹窗被拒绝
          wx.openSetting({
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
          wx.navigateTo({
            url: '../index/index',
          })
        } else { // 没有弹出过授权弹窗

          wx.getUserInfo({
            success: res => {
              console.log(res)

            },
            fail: res => {

              console.log(res)
              wx.openSetting({
                success: res => {
                  console.log(res)
                },
                fail: res => {
                  console.log(res)
                }

              })
            }
          })

        }
      }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})