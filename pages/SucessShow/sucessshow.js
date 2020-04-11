// pages/SucessShow/sucessshow.js
var chinese = require("../../utils/Chinses.js")
var english = require("../../utils/English.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:wx.getStorageSync('img'),
    language: "中文", //语言切换
  },

  goChange:function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  gobackChange: function () {
    wx.navigateTo({
      url: '../owner/owner',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let img = options.img
    let language = options.language
    console.log(language)
    if (language == "中文") {
      this.setData({
        content: chinese.content
      })
    } else if (language == "英文") {
      this.setData({
        content: english.content
      })
    }else{
       this.setData({
        content: chinese.content
      })
    }
    wx.setStorageSync('img', img)
    console.log(img)
    this.setData({
      img: img
    })
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