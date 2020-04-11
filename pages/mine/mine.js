// pages/mine/mine.js
const App = getApp()
const {
  _Post,
  _Get
} = require('../../common/request')

const API = require('../../common/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    identity: "",
    no: "",
    room: "",
    arriveDate: "",
    sourceProvince: "",
    sourceCity: "",
    sourceDistrict: "",
    province: "",
    city: "",
    district: "",
    identityClass: "",
    gender: "",
    realEstateName: "",
    imageUrl: "",
    index: "",
    gender: "1", //性别 默认男
    normal: "/images/normal.png", //体温状态默认图标
    n1: "/images/normal.png", //状态默认图标
    type: "",
    state: [{
        name: '男',
        value: '1',
        checked: 'true'
      },
      {
        name: '女',
        value: '0'
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let info = options.result
    console.log(options.result)
    let res = await _Post(API.findById + info)
    let {
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
      imageUrl,
      realEstateName,
      type,
    } = res.data
    if (res.code === 200) {
      if (gender === 1) {
        this.setData({
          gender: "男"
        })
      } else if (gender === 2) {
        this.setData({
          gender: "女"
        })
      }
      if (type === 0) {
        this.setData({
          type: "居民身份证"
        })
      } else if (type === 1) {
        this.setData({
          type: "护照"
        })
      }
      this.setData({
        name: name,
        phone: phone,
        identity: identity,
        no: no,
        room: room,
        arriveDate: arriveDate,
        sourceProvince: sourceProvince,
        sourceCity: sourceCity,
        sourceDistrict: sourceDistrict,
        province: province,
        city: city,
        imageUrl,
        district: district,
        identityClass: identityClass,
        realEstateName: realEstateName
      })
    }
  },

  gobackChange: function() {
    wx.navigateBack({
      delta: 1
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  normalChange: function() {
    this.setData({
      normal: "/images/normal.png",
      state: "0",
      unnormal: "/images/unselected.png"
    })
  },
  unnormalChange: function() {
    this.setData({
      normal: "/images/unselected.png",
      unnormal: "/images/unnormal.png",
      state: "1"
    })
  },

  n1Change: function() {
    this.setData({
      n2: "/images/unselected.png",
      n3: "/images/unselected.png",
      n4: "/images/unselected.png",
      n1: "/images/normal.png",
      sta: "1"
    })
  },
  n2Change: function() {
    this.setData({
      n1: "/images/unselected.png",
      n3: "/images/unselected.png",
      n4: "/images/unselected.png",
      n2: "/images/blue.png",
      sta: "2"
    })
  },
  n3Change: function() {
    this.setData({
      n1: "/images/unselected.png",
      n2: "/images/unselected.png",
      n4: "/images/unselected.png",
      n3: "/images/orange.png",
      sta: "3"
    })
  },
  n4Change: function() {
    this.setData({
      n1: "/images/unselected.png",
      n2: "/images/unselected.png",
      n3: "/images/unselected.png",
      n4: "/images/unnormal.png",
      sta: "4"
    })
  },
})