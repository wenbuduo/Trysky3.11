// pages/activities/activities.js
Page({
       niubi(){
              wx.navigateTo({
                url: '../../pages/activities/dustelimination/dustelimination.wxml',
              })
       },
       acticityones(){
              console.log("点击了标签"),
              wx.navigateTo({
                     url: '../../pages/activityone/acticityone',
                   })
       },
       acticitytwos(){
              console.log("点击了标签"),
              wx.navigateTo({
                     url: '../../pages/activitytwo/acticitytwo',
                   })
       },
       acticitythrees(){
              console.log("点击了标签"),
              wx.navigateTo({
                     url: '../../pages/activitythree/acticitythree',
                   })
       },
       acticityfours(){
              console.log("点击了标签"),
              wx.showToast({
                title: '正在完善中，更多信息请关注踹网官方公众号“TrySky”',
                icon:'none'
              })
       },
  /**
   * 页面的初始数据
   */
  data: {

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