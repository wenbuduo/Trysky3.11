const DB = wx.cloud.database().collection("NewTryskyData")
const MDB = wx.cloud.database().collection("ChangeData")
let name=""
let wxnum=""
let phonenum=""
let gradeMajor=""
let dor=""
let gender=""
let type=""
let details=""
let time=""
let totalLen=0
let open ='cbddf0af6093951806b5918b6ccc66eb'
let msgID ='b00064a760989c1b162c195872f2c647'

Page({
  data: {
    ifOpen:false,
    msg:'',
    check:false,
    agImage:"../../icon/error.png",
    click:true,//误点函数
  },
  onLoad:function(){
    MDB.doc(open).get()
    .then(res =>{
      this.setData({
        ifOpen:res.data.ifOpen
      })
    })
    .catch(res =>{
      //console.log(res)
    })
    MDB.doc(msgID).get()
    .then(res =>{
      this.setData({
        msg:res.data.msg
      })
    })
  },
  renew(){
    MDB.doc(open).get()
      .then(res => {
        this.setData({
          ifOpen: res.data.ifOpen
        })
      })
      .catch(res => {
        //console.log(res)
      })
  },
  // clickTest(){
  //   console.log("点到我了！")
  // },
  addName(e){
    //console.log(e.detail.value);
    name=e.detail.value
  },
  addWechat(e){
    wxnum=e.detail.value
  },
  addPhone(e){
    phonenum=e.detail.value
  },
  addGM(e){
    gradeMajor=e.detail.value
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
    //console.log(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate());
    time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()+"-"+d.getHours()+":"+d.getMinutes();
    //console.log(time)
  },
  agreementCheck() {
    this.setData({
      check: true,
      agImage: "../../icon/agreementCheck.png"
    })
  },

  addData(){
    let that=this

    if (name != '' && wxnum != '' && phonenum != '' && gradeMajor != '' && dor != '' && gender != '' && type != '' && details != ''){
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
                  //console.log(res.total, that.data.totalLen)
                  DB.add({
                    data: {
                      name: name,
                      wxnum: wxnum,
                      phonenum: phonenum,
                      gradeMajor: gradeMajor,
                      dor: dor,
                      gender: gender,
                      type: type,
                      details: details,
                      time: time,
                      ifAccept:false,
                      repireman:'获取中',
                      repiremanOid:'NULL',
                      num: that.data.totalLen,
                    },
                    success(res) {
                      //console.log("添加成功",res)
                      setTimeout(function(){
                        wx.hideLoading(),
                          wx.showToast({
                            title: '申请成功',
                            icon: 'success',
                            duration: 2000,
                            mask: true,
                            success(res) {
                              // setTimeout(function(){
                              // wx.redirectTo({
                              //   url: '/pages/demo3/demo3'
                              // })
                              // },500)//延时
                              that.setData({
                                click: false
                              })
                            }

                          })
                      },1000)
                      
                      
                  },
                  fail(res) {
                    //console.log("添加失败",res)
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
          title: '未同意修机协议',
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