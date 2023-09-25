let name=""
let wxNum=""
let check=true
let id ="43e67d8d64f40e1d00d57543317dc470"
Page({
  data: {
    ifManagerTime:false
  },
  onLoad:function(options){
    this.getTime()
  },
  addName(e){
    // console.log(e.detail.value)
    name = e.detail.value
  },
  addwx(e){
    wxNum = e.detail.value
  },
  addInfor(){
    if (this.data.ifManagerTime){
      if (check){
        if(name!=""&&wxNum!=""){
          wx.cloud.database().collection("managers")
          .add({
            data:{
              name:name,
              wxNum:wxNum,
              ifDirector:false
            }
          })
          .then(res =>{
            check=false
            wx.showToast({
              title: '认证成功',
              icon:'none'
            })
          })
        }
        else{
          wx.showToast({
            title: '信息未完善',
            icon: 'none'
          })
        }
      }
    }
  },
  getTime(){
    wx.cloud.database().collection("ChangeData")
    .doc(id)
    .get()
    .then(res=>{
      this.setData({
        ifManagerTime: res.data.ifManagerTime
      })
    })
  }


})