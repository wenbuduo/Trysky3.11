// pages/demo5/demo5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    technicalDirector: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection("ChangeData").doc("28ee4e3e609d16301850a8d17e48fbf7")
    .get()
    .then(res=>{
      //console.log(res.data.technicalDirector)
      this.setData({
        technicalDirector: res.data.technicalDirector
      })
    })
  },
})