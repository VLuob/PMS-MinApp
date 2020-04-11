// pages/verification/verification.js
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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    people: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var guard
    that.setData({
      people: options.people
    })

    wx.login({
      success: async (res) => {
        let code = res.code || ''
        if (code) {
          let res = await _Post(API.getOpenId + "?code=" + code)
          this.setData({
            openid: res.data.openid,
            session_key: res.data.session_key
          })
        }
      }
    })
  },
  getPhoneNumber: async function (e) {
    var that = this;
    let people = this.data.people
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      let iv = e.detail.iv
      let key = this.data.session_key
      let phone = e.detail.encryptedData
      let param = {
        iv,
        phone,
        key
      }
      wx.setStorageSync("to", e.detail.errMsg)
      let res = await _Post(API.gethpone, param)
      console.log(res)

      let {
        code,
        message
      } = res
      if (code === 200) {
        wx.setStorageSync("phonenum", res.body)
        let param = {
          phone: res.body
        }
        let getcode = await _Post(API.verify, param)
        let {
          code,
          message
        } = getcode
        console.log(code)
        if (code == 200) {
          wx.showToast({
            title: '未获取到您的身份信息，请联系物业添加',
            icon: "none",
            duration: 1500
          })
          wx.removeStorageSync('code')
        } else if (code === 20001 && people == 0) {
          wx.setStorageSync('code', code)
          wx.navigateTo({
            url: '../PropertyInformation/propertyinformation',
          })
        } else if (code === 20002 && people == 1) {
          wx.setStorageSync('code', code)
          wx.navigateTo({
            url: '../EstateManagement/estatemanagement',
          })
        }
      } else {
        wx.removeStorageSync('phonenum')
        wx.showToast({
          title: '获取权限或手机号失败，请查看是否授权或稍后再试',
          icon: "none",
          duration: 1500
        })
      }
    } else {
      wx.removeStorageSync('to')
      wx.removeStorageSync('phonenum')
      wx.showToast({
        title: '您以取消权限授权，请重新设置授权',
        icon: "none",
        duration: 1500
      })
    }
  },
  test: function () {
    let people = this.data.people
    console.log(people)
    if (people == 1) {
      wx.navigateTo({
        url: '../EstateManagement/estatemanagement',
      })
    }
    if (people == 0) {
      wx.navigateTo({
        url: '../PropertyInformation/propertyinformation',
      })
    }
  },
  gobackChange: function () {
    wx.navigateTo({
      url: '../index/index',
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
  onShow: async function () {
    let to = wx.getStorageSync("to") || []
    let phonenum = wx.getStorageSync('phonenum') || []
    let people = this.data.people
    console.log(to)

    if (phonenum !== "" && to == "getPhoneNumber:ok") {
      let codenum = wx.getStorageSync('code') || []
      let param = {
        phone: phonenum
      }
      let getcode = await _Post(API.verify, param)
      let {
        code,

      } = getcode
      if (code === 200) {
        wx.removeStorageSync('code')
        wx.showToast({
          title: '未获取到您的身份信息，请联系物业添加',
          icon: "none",
          duration: 1500
        })
      } else if (codenum === 20001 && people == 0) {

        wx.navigateTo({
          url: '../PropertyInformation/propertyinformation',
        })
      } else if (codenum === 20002 && people == 1) {
        wx.navigateTo({
          url: '../EstateManagement/estatemanagement',
        })
      } else {
        wx.showToast({
          title: '未获取到您的身份信息，请联系物业添加',
          icon: "none",
          duration: 1500
        })
        wx.removeStorageSync('to')
        wx.removeStorageSync('phonenum')
        wx.removeStorageSync('code')
      }
    } else {
      wx.showToast({
        title: '获取权限失败，请设置授权',
        icon: "none",
        duration: 1500
      })
    }
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