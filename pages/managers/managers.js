const DB = wx.cloud.database().collection("NewTryskyData")
const NEWDB = wx.cloud.database().collection("NewUserData")
let uesrID=""
let open=1
let stop=0
let i = 0;

Page({

  data: {
    opp:false,
    totalLen:0,
    testInf:[],
    ifAccept:false,
  },
  
  waitDispose(e){
    //console.log(e.currentTarget.dataset.userid);
    wx.showModal({
      title: '选择',
      content: '是否修理',
    })
      .then(res => {
        if (res.confirm) {
          wx.getStorage({
            key: 'managerInfor'
          })
            .then(res => {
              var repireman = res.data[0].name
              var repiremanOid = res.data[0]._openid
              //console.log(repiremanOid)
              wx.cloud.callFunction({
                name: 'changeDispose',
                data: {
                  id: e.currentTarget.dataset.userid,
                  repireman: repireman,
                  repiremanOid: repiremanOid
                }
              })
                .then(res => {
                  //console.log(e.currentTarget.dataset.repire)
                  this.setData({
                    ['testInf[' + e.currentTarget.dataset.repire +'].ifAccept']:true
                  })
                })
                .catch(res => {
                  console.log(res)
                })
            })
        }
      })
    
    
  },
  getInfor3(){//纪念一下改了三版
    let that = this
    let arrLen = that.data.testInf.length
    DB.count({
      success(res){
        let len = res.total
        if (arrLen == len) {
          wx.showToast({
            title: '数据加载完'
          })
          return
        }
        DB.skip(arrLen)
          .orderBy('num', 'desc')
          .get()
          .then(res => {
            //console.log('成功', res)
            that.setData({
              testInf: that.data.testInf.concat(res.data)

            })

          })
          .catch(res => {
            console.log('失败', res)
          })

      },
      fail(res){
        console.log("获取失败",res)
      }
    })

  },
  myorder()
  {
    wx.navigateTo({
      url: '../../pages/myorder/myorder',
      success: function (res) {

      },
      fail: function (res) {
        wx.showToast({
          icon: 'none',
          title: '!跳转失败!',
        })
        //console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfor3()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getInfor3()
  },
})

