const CDB = wx.cloud.database().collection("ChangeData")
const DB = wx.cloud.database().collection("NewTryskyData")
let changeID = "cbddf0af6093951806b5918b6ccc66eb"
Page({
  data: {
    managerLogin:true,
    userInfo:[],
    openid:"",
    userSum:[],
    ifManager:false,
    managerInfor:[],
    ifDirector:false,
    managerNum:""
  },
  /**
   * 
   * 
   *  获取缓存 **/
  onLoad: function (options) {
    wx.getStorage({
      key: 'userinfor',
    })
    .then(res =>{
      this.setData({
        userInfo: res.data
      })
    })
    .catch(res =>{

    })

    wx.getStorage({
      key: 'managerLogin',
    })
    .then(res =>{
      this.setData({
        managerLogin: res.data
      })
    })
    .catch(res =>{

    })

    wx.getStorage({
      key: 'openid',
    })
    .then(res =>{
      this.setData({
        openid:res.data
      })
    })

    wx.getStorage({
      key: 'ifManager',
    })
    .then(res =>{
      this.setData({
        ifManager:res.data
      })

      if (this.data.ifManager) {

        wx.getStorage({
          key: 'managerInfor'
        })
        .then(res => {
            this.setData({
              managerInfor: res.data
            })

            this.getnum(res.data[0].name)

            wx.cloud.database().collection("managers").doc(res.data[0]._id)
            .count()
            .then(res => {
              //console.log(res.data[0])
              this.setData({
                ifDirector: res.data.ifDirector
              })
            })
            .catch(res => {
              console.log(res)
            })

        })

      }

    })
    
  },
  

  /**
   * 
   * 
   * 管理员的操作 */

  getnum(e){
    DB.where({repireman:e}).count()
    .then(res=>{
      console.log(res.total)
      this.setData({
        managerNum: res.total
      })
    })
    .catch(res=>{
      console.log(res)
    })
  },
  openS() {
    wx.cloud.callFunction({
      name:'changeOpen',
      data:{
        change:true,
        changeID:changeID
      }
    })
    .then(res => {
      //console.log("成功",res)
      wx.showToast({
        icon:'none',
        title: '开启成功',
      })
    })
    .catch(res =>{
      wx.showToast({
        icon: 'none',
        title: '!开启失败!',
      })
    })
  },
  stopS() {
    wx.cloud.callFunction({
      name: 'changeOpen',
      data: {
        change: false,
        changeID: changeID
      }
    })
      .then(res => {
        wx.showToast({
          icon: 'none',
          title: '关闭成功',
        })
      })
      .catch(res => {
        wx.showToast({
          icon: 'none',
          title: '!关闭失败!',
        })
      })
  },
  showData(){
    wx.navigateTo({
      url: '../../pages/managers/managers',
      success: function (res) {
       
      },
      fail:function(res){
        wx.showToast({
          icon: 'none',
          title: '!跳转失败!',
        })
      }
    })
  },
  backPage(){
    wx.showToast({
      icon:'none',
      title:'接口制作中'
    })
    // wx.navigateTo({
    //   url: '../../pages/MainPage/MainPage',
    //   success: function(res) {},
    //   fail: function(res) {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '!跳转失败!',
    //     })
    //   },
    // })
  },

  /**
   * 
   * 
   * 登陆操作 */
  getUserProfile(e){
    wx.getUserProfile({
      desc: '完善信息'
    })
    .then(res =>{
      this.setData({
        userInfo: res.userInfo,
        managerLogin: false,
      })
      wx.setStorageSync('userinfor', res.userInfo)
      wx.setStorageSync('managerLogin', false)
    })
    .catch(res =>{
      if (err.errMsg == "getUserProfile:fail auth deny") {
        wx.showToast({
          icon: 'none',
          title: '不要拒绝小踹嘛',
        })
      }
      else {
        wx.showToast({
          icon: 'none',
          title: '您联网了嘛？',
        })
      }
    })

    wx.cloud.callFunction({
      name: 'getOpen'
    })
      .then(res => {
        this.setData({
          openid: res.result.openid
        })
        wx.setStorageSync('openid',res.result.openid)

        wx.cloud.database().collection("managers").where({
          _openid: res.result.openid
        }).get()
        .then(res =>{
          if(res.data.length!=0){
            this.setData({
              ifManager: true,
              managerInfor: res.data,
              ifDirector:res.data[0].ifDirector
            })
            wx.setStorageSync('managerInfor', res.data)
            wx.setStorageSync('ifManager', true)
            
          }
          
        })
        .catch(res =>{
          this.setData({
            ifManager: false
          })
          wx.setStorageSync('ifManager', false)
          console.log(res)
        })
      })
      .catch(res => {
        console.log(res)
      })

  },

  /***
   * 
   * 用户操作
   *  */
  getSubmit(){
    //console.log(this.data.openid)
    DB
      .where({ _openid: this.data.openid }).orderBy('num', 'desc').get()
      .then(res =>{
        //console.log('成功',res)
        if(res.data.length==0){
          console.log("没有数据")
        }
        this.setData({
          userSum:res.data
        })
      })
      .catch(res =>{
        console.log('失败',res)
      })
  },
  activities(){
    wx.showToast({
      icon:'none',
      title: '敬请期待',
    })
  },


  /***
   * 
   * 退出
   */
  exit(){
    wx.showModal({
      title: '警告',
      content: '是否要退出登陆',
    })
    .then(res =>{
        if (res.confirm) {
          wx.setStorageSync('userinfor', null)
          wx.setStorageSync('managerLogin', true)
          wx.setStorageSync('openid', null)
          wx.setStorageSync('managerInfor', null)
          wx.setStorageSync('ifManager', false)
          this.setData({
            userInfo: null
          })
          this.setData({
            managerLogin: true
          })
          this.setData({
            openid: null
          })
          this.setData({
            ifManager: false
          })
          this.setData({
            managerInfor: null
          })

        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      
    })
    .catch(res =>{
      wx.showToast({
        title: '网络错误',
        icon:'none',
      })
    })
    
  },

})

/**获取数据长度开始 */
function getTotal(e) {
  return new Promise((resolve, reject) => {
      collection.
      where({
              street: _.eq(e)

          }).count()
          .then(
              res => {
                  console.log("当前接到机子的数量总数量：" + res.total),
                      resolve(res.total)

              }
          ).catch(err => {
              console.error(err),
                  reject("查询失败")
          });
  })
}
/**获取数据长度结束 */

 /**单次查询函数 */
 function getResultSkip(value, skip) {
  return new Promise((resolve, reject) => {
      let selectPromise;
      console.log("拿到的值是" + value);
      if (skip > 0) {
          selectPromise = collection.
          where({
              street: _.eq(value)

          }).skip(skip).get()
      } else {
          selectPromise = collection.
          where({
              street: _.eq(value)

          }).get()
      }
      selectPromise.
      then(
          res => {
              console.log(res.data),
                  resolve(res.data)
          }
      ).catch(err => {
          console.error(err)
          reject("查询失败！")
      });

  })

}
/** 单次查询函数结束*/

/**
         * 获取结果list
         */
        let list = [];
        new Promise((resolve, reject) => {
            getTotal(e.target.dataset.item._id).then(
                res => {
                    let count = res;//获取待查询的数据总数

                    for (let i = 0; i < count; i += 20) {
                        getResultSkip(e.target.dataset.item._id, i).then(
                            res => {
                                list = list.concat(res);
                                if (list.length == count) {//当查询结果列表的长度等于count，即结束循环
                                    if (list.length != 0) {
                                        this.setData({
                                            address: list
                                        })

                                    } else {
                                        this.setData({
                                            address: []
                                        })

                                    }
                                    resolve(list)
                                }

                            }
                        ).catch(err => {
                            console.error(err),
                                reject('查询失败')
                        })
                    }
                }
            )
        })

        /**
         * 获取结果list结束1
         */


