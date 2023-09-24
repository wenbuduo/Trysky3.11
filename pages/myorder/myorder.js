const DB = wx.cloud.database().collection("xiuji2023")
Page({
  data: {
    orderInfor:[],
    showText:""
  },
  getUserInfor(){
    wx.getStorage({
      key: 'openid',
      success (res) {
        console.log(res.data)
      }
    })
    .then(res=>{
      DB.where({ repiremanOid: res.data }).orderBy('num', 'desc').get()
      .then(res=>{
        this.setData({
          orderInfor:res.data
        })
      })
      .catch(err=>{
        console.log(err)
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  back(){
    wx.navigateTo({
      url: '../../pages/managers/managers',
      success: function (res) {
      },
      fail: function (res) {
        wx.showToast({
          icon: 'none',
          title: '!跳转失败!',
        })
      }
    })
  },
  onLoad: function (options) {
    this.getUserInfor()
  },
  onReachBottom: function () {
  },
})