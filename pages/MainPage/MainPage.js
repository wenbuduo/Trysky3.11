let photoid = "43e67d8d64f3ff3300d3d6ac6d4a162d";
Page({
  data: {
    touch1:false,
    touch2:false,
    touch3:false,
    photo1:"",
    photo2: "",
    photo3: "",
    gundong:"",
    isluru:"",
  },
  getPhoto(){
    wx.cloud.database().collection("ChangeData")
    .doc(photoid)
    .get()
    .then(res=>{
      console.log(res.data);
      this.setData({
        photo1: res.data.photo1,
        photo2: res.data.photo2,
        photo3: res.data.photo3,
        gundong:res.data.gundong,
        isluru:res.data.isMa
      })
    })
    .catch(res=>{
      console.log(res)
    })
  },
  photoTouch1(){
    let that = this
    if(this.data.touch1){
     // console.log(touch1);
      this.setData({
        touch1:false
      })
    }else{
      this.setData({
        touch1: true
      })
    }
  },
  photoTouch2() {
    if (this.data.touch2) {
      this.setData({
        touch2: false
      })
    } else {
      this.setData({
        touch2: true
      })
      touch2 = true;
    }
  },
  photoTouch3() {
    if (this.data.touch3) {
      this.setData({
        touch3: false
      })
    } else {
      this.setData({
        touch3: true
      })
    }
  },
  inn(){
    if(this.data.isluru){
      wx.navigateTo({
        url: '../../pages/certification/certification',
        success: function(res) {},
        fail: function(res) {
          console.log("失败")
        },
        complete: function(res) {},
      })
    }
    
  },
  bottom(){
    wx.showToast({
      icon:'none',
      title: '完善中',
    })
  },
  onLoad: function (options) {
    this.getPhoto()
  },
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