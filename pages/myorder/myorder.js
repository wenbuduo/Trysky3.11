const DB = wx.cloud.database().collection("NewTryskyData")

Page({
  data: {
    orderInfor:[],
    showText:""
  },
  getUserInfor(){
    wx.getStorage({
      key: 'openid'
    })
    .then(res=>{
      //console.log(res.data)
      DB
        .where({ repiremanOid: res.data }).orderBy('num', 'desc').get()
      .then(res=>{
        this.setData({
          orderInfor:res.data
        })
        //console.log(this.data.orderInfor)
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
       // console.log("跳转成功")
      },
      fail: function (res) {
        wx.showToast({
          icon: 'none',
          title: '!跳转失败!',
        })
       // console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfor()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  
})