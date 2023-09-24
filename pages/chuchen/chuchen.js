const DB = wx.cloud.database().collection("chuchen2023")
const MDB = wx.cloud.database().collection("ChangeData")
let name=""
let phonenum=""
let place=""
let com=""
let dor=""
let gender=""
let type=""
let details=""
let time=""
let totalLen=0
let open ='9ffab92d64f4483f00da68fc08756ab2'
Page({
  data: {
    ifchuchen:false,
    msg:'',
    check:false,
    agImage:"../../icon/error.png",
    click:true,//误点函数
  },
  onLoad:function(){
    MDB.doc(open).get()
    .then(res =>{
      console.log(res.data.ifOpen)
      this.setData({
        ifchuchen:res.data.ifOpen
      })
      console.log(this.data.ifchuchen)
    })
    .catch(res =>{
      console.log(res)
    })
  },
  renew(){
    MDB.doc(open).get()
      .then(res => {
        this.setData({
          ifchuchen:res.data.ifOpen
        })
      })
      .catch(res => {
      })
  },
  addName(e){
    name=e.detail.value
  },
  addCom(e){
    com=e.detail.value
  },
  addPhone(e){
    phonenum=e.detail.value
  },
  addPlace(e){
    place=e.detail.value
  },
  addDor(e){
    dor=e.detail.value
  },
  addGender(e){
    gender=e.detail.value
  },
  addType(e){
    type=e.detail.value
  },
  addDa(e){
    details=e.detail.value
  },
  getTime() {
    var d = new Date();
    time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()+"-"+d.getHours()+":"+d.getMinutes()
  },
  agreementCheck() {
    this.setData({
      check: true,
      agImage: "../../icon/agreementCheck.png"
    })
  },
  addData(){
    let that=this
    if (name != '' && com != '' && phonenum != '' && place != '' && dor != '' && gender != '' && type != '' && details != ''){
      if(that.data.check){
        if (that.data.click){
          wx.showLoading({
            title: '加载中',
            mask: true,
            success(res) {
              that.getTime(),
              DB.count({
                success(res) {
                  that.setData({
                    totalLen: res.total
                  })
                  DB.add({
                    data: {
                      name: name,
                      com: com,
                      phonenum: phonenum,
                      place: place,
                      dor: dor,
                      gender: gender,
                      type: type,
                      details: details,
                      time: time,
                      ifAccept:false,
                      num: that.data.totalLen,
                    },
                    success(res) {
                      setTimeout(function(){
                        wx.hideLoading(),
                          wx.showToast({
                            title: '报名成功',
                            icon: 'success',
                            duration: 2000,
                            mask: true,
                            success(res) {
                              that.setData({
                                click: false
                              })
                            }

                          })
                      },1000)
                  },
                  fail(res) {
                    wx.showToast({
                      title: '请检查网络',
                      icon: 'loading',
                      duration: 1000,
                      mask: true
                    })
                  }
                })//添加数据
              },
              fail(res) {
                console.log("获取失败", res)
              }
            })//添加序号
            }
          }) //等待加载 
        }
        else{
          wx.showToast({
            title: '无法重复提交',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      }
      else{
        wx.showToast({
          title: '未同意除尘协议',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }else{
      wx.showToast({
        title: '信息未完整',
        icon:'none',
        duration:1000,
        mask:true
      })
    }
    
  }

})