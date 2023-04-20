// pages/yunwei/yunwei.js

let choose1 = false;
let photoid = "28ee4e3e609d5318185d75f86a8994b7";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touch1:false,
    photo1:"",
  },
  getPhoto(){
    wx.cloud.database().collection("ChangeData")
    .doc(photoid)
    .get()
    .then(res=>{
      this.setData({
        photo1: res.data.photo1
      })
    })
    .catch(res=>{
      console.log(res)
    })
  },
  photoTouch1(){
    if(choose1){
      this.setData({
        touch1:false
      })
      choose1=false;
    }else{
      this.setData({
        touch1: true
      })
      choose1 = true;
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