// pages/floormanagement/floormanagement.js
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
    value: "1",
    isDisabled: false
  },
  gobackChange: function () {
    wx.navigateTo({
      url: '../EstateManagement/estatemanagement',
    })
  },
  box: function (e) {
    this.setData({
      value: e.detail.value
    })
    if (e.detail.value < 1) {
      this.setData({
        value: ""
      })
      wx.showToast({
        title: '请正确设置',
        icon: "none",
        duration: 1500
      })
    }
    console.log(e.detail.value)
  },
  upChange: function (e) {
    let value = JSON.parse(this.data.value)
    this.setData({
      value: value + 1
    })
  },
  downChange: function (e) {
    let value = this.data.value
    this.setData({
      value: value - 1
    })
    if (value <= 1) {
      this.setData({
        value: 1
      })
    }
  },

  searchBox: async function (e) {
    var num = e.detail.value['floor']
    let id = wx.getStorageSync("data")
    let param = {
      num,
      id
    }
    if (num !== "") {
      let res = await _Post(API.update,param)
      let {
        code,
        message
      } = res
      if (code === 200) {
        wx.showLoading({
          title: '正在设置',
        })
        wx.navigateTo({
          url: "../management/management?num=" + num + "&id="+id
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '楼层设置失败',
          icon: "none",
          duration: 1500
        })
      }
    } else {
      wx.showToast({
        title: '楼层不能为空',
        icon: "none",
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})