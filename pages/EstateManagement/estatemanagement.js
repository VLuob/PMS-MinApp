// pages/EstateManagement/estatemanagement.js
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
    showModal: false,
    region: ['省', '市', '区/县'],
    customItem: '全部',
    show: false,
    img: "",
    name: "",
    region1: "",
    street: "",
    url: "/pages/index/index"
  },

  openChange: function() {
    this.setData({
      showModal: true,
    })
  },
  closeChange: function() {
    this.setData({
      showModal: false,
      del: false,
      show: false
    })
  },

  gobackChange: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  floorChange: function() {
    wx.navigateTo({
      url: "../floor/floor"
    })
  },
  userChange: function() {
    wx.navigateTo({
      url: "../user/user"
    })
  },
  qrcode: async function() {

    let page = this.data.url
    let scene = JSON.stringify(wx.getStorageSync("data"))
    let param = {
      page,
      scene

    }
    let res = await _Post(API.getMiniCode, param)
    if (res.code === 200 && scene !== "") {
      this.setData({
        show: true,
        img: res.body
      })
    } else {
      wx.showToast({
        title: '获取失败，请填写物业名称或稍后再试',
        icon: "none",
        duration: 1500
      })
    }

  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formsubmit: async function(e) {
    var region = this.data.region
    var name = e.detail.value['name']
    var address = e.detail.value['address']
    var street = e.detail.value['street']
    let param = {
      region,
      name,
      address,
      street
    }

    if (region != "" && name != "" && address != "") {
      let that = this
      let res = await _Post(API.staffadd, param)
      let {
        code,
        data
      } = res
      if (code === 200) {
        wx.setStorageSync("name", name)
        wx.setStorageSync("street", street)
        wx.setStorageSync("region1", region)
        wx.setStorageSync("data", data)
        this.setData({
          showModal: false,
        })
        setTimeout(function() {
          that.onShow()
        }, 1)
      } else {

        wx.showToast({
          title: '信息不能为空',
          icon: "none"
        })
      }

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      name: wx.getStorageSync("name"),
      region1: wx.getStorageSync("region1"),
      street: wx.getStorageSync("street")
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