//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    guard: 0,
    property: 1
  },
  getScancodeChange: function() {
    var _this = this;
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log(result)
        _this.setData({
          result: result,
        })
        wx.navigateTo({
          url: '../owner/owner?propertyname=' + this.data.result,
        })
      }
    })

  },
  guardChange: function() {
    console.log(this.data.guard)
    wx.navigateTo({
      url: "../verification/verification?people=" + this.data.guard
    })
  },
  propertyChange: function() {
    console.log(this.data.property)
    wx.navigateTo({
      url: "../verification/verification?people=" + this.data.property
    })
  },
  onShow: function() {
    // 查看是否授权
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
})