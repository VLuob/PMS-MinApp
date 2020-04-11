// pages/PropertyInformation/propertyinformation.js
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
    region1: "",
    street: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  gobackChange: function() {
    wx.navigateBack({
      delta: 2
    })
  },
  getScancode: function() {
    var _this = this;
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log(result)
        _this.setData({
          result: result,
        })

        wx.navigateTo({
          url: '../mine/mine?result=' + this.data.result,

        })
        console.log(result)
      }
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