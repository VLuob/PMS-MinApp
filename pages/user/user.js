// pages/user/user.js
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
    array: ['身份', '保安', '物业'],
    currentTab: 0, //选项卡默认索引
    index: 0,
    id: null, //索引下标
    showModal: false,
    name: null,
    phone: null,
    position: null,
    items: [], //保安
    staff: [], //物业
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      position: this.data.array[e.detail.value]
    })
    console.log(this.data.array[e.detail.value])
  },
  searchBox: async function(e) {
    var name = e.detail.value['username']
    var phone = e.detail.value['phone']
    var position = this.data.position
    var ctb = this.data.currentTab
    var idx = this.data.index
    let param = {
      name,
      phone,
      position
    }
    if (name != '' && phone != '' && position != '') {
      if (ctb == 0 && idx == 1) {
        let res = await _Post(API.guardadd, param)
        let {
          code,
        } = res
        if (code === 200) {
          this.data.items.push(param)
          let items = this.data.items
          this.setData({
            items,
            showModal: false,
          })
        } else {
          wx.showToast({
            title: '添加失败,请稍后再试',
            icon: "none",
            duration: 1500
          })
        }
      } else if (idx == 2 && ctb == 1) {
        let res = await _Post(API.staffadd, param)
        console.log(res)
        let {
          code,
          data
        } = res
        wx.setStorageSync("data", data)
        if (code === 200) {
          let staff = this.data.staff
          this.data.staff.push(param)
          this.setData({
            staff,
            showModal: false,
          })
        } else {
          wx.showToast({
            title: '添加失败,请稍后再试',
            icon: "none",
            duration: 1500
          })
        }
      } else {
        wx.showToast({
          title: '身份选择有误,请重新选择！',
          icon: "none",
          duration: 1500
        })
      }
    } else {
      wx.showToast({
        title: '添加用户信息不能为空',
        icon: "none",
        duration: 1000
      })
    }
    let that = this
    setTimeout(function() {
      console.log(1)
      that.onShow()
    }, 100)
  },
  openChange: function() {
    this.setData({
      showModal: true,
    })
  },
  closeChange: function() {
    this.setData({
      showModal: false,
      del: false
    })

  },
  gobackChange: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  delListChange: function(e) {
    let items = this.data.items
    let id = e.currentTarget.dataset.id
    let param = {
      id
    }
    let res = _Post(API.guarddel + id)

    console.log(1)
    items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items,

    })
  },
  delstaffChange: function(e) {
    let staff = this.data.staff
    let id = e.currentTarget.dataset.id
    let param = {
      id
    }
    let res = _Post(API.staffdel + id)
    wx.removeStorageSync('data')
    staff.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      staff,

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  async getlist() {
    let res = await _Post(API.staffgetList + "?page=1&pageCount=10")
    let result = await _Post(API.guardgetList + "?page=1&pageCount=10")

    let {
      code,
      data,
      message
    } = result
    if (code == 200) {
      this.setData({
        items: data.data,
        staff: res.data.data,

      })

    } else {
      wx.showToast({
        title: '获取失败',
        icon: "none",
        duration: 1500
      })
    }

  },

  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  okChange: function(e) {
    console.log(1)
    wx.navigateTo({
      url: '../EstateManagement/estatemanagement',
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
    this.getlist()

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

})