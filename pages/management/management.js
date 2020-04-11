// pages/management/management.js
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
    floors: [],
    floorval: "",
    roomval: "",
  },
  gobackChange: function() {
    wx.redirectTo({
      url: "../floor/floor"
    })
  },
  lastChange: function() {
    wx.navigateTo({
      url: '../floor/floor',
    })
  },

  floorChange(e) {
    let floorval = e.detail.value;
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`floors[${index}].floor`]: floorval,
      floorval: floorval
    })
    console.log(e.detail.value)
  },

  roomChange(e) {
    let roomval = e.detail.value;
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`floors[${index}].room`]: roomval,
      roomval: roomval
    })
  },
  clickChange: async function(e) {
    var floorval = this.data.floorval;
    var roomval = this.data.roomval;
    console.log(floorval, roomval)
    let floor = this.data.floors
    let param = {
      floor
    }
    if (floorval !== "" && roomval !== "") {
      let res = await _Post(API.buildupdate, floor)
      let {
        code
      } = res
      if (code === 200) {
        wx.navigateTo({
          url: '../success/success',
        })
      } else {
        wx.showToast({
          title: "设置失败",
          icon: "none",
          duration: 1000
        })
      }
    } else {
      wx.showToast({
        title: "设置层数户数不能为空",
        icon: "none",
        duration: 1000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      num,
      id
    } = options
    let floors = this.data.floors

    for (var i = 0; i < num; i++) {
      let room = {
        id: "",
        floor: "",
        room: ""
      }
      room.id = i + 1
      floors.push(room)
    }
    this.setData({
      floors: floors,
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

  }
})