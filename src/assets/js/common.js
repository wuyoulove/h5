import Vue from 'vue'
export default {
  //获取用户信息
  getUser: function (el) {
      var p = new Promise(function(resolve, reject){
        const api = `/mentalPatientAdapterManage/getUserMobileAndName.action`;
        el.$http.post(api)
          .then(
            response => {
              //用户id
              // console.log(response.data.id);
              //用户名称
              // console.log(response.data.name);
              resolve([response.data.organization.orgName,response.data.organization.id,response.data.organization.orgLevel.internalId,response.data.organization.parentOrg.id,response.data.organization.fullPinyin,response.data.mobile]);
            },
            (res) => {
              alert("登录失效请重新登录")
              window.jsInterface.reLogin();
            }
          );
       });
    return p; 
  },
  getPop(el){
    let _this = el;
    setTimeout(function() {
      _this.isOnlyTop = false;
    }, 1500);
  },
  //列表预警等级 
  getWarningLevel(_this){
    _this.warningLevelArr=[]
    // console.log(JSON.parse(sessionStorage.getItem('dictsData')))
    for(let i=0;i<JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel.length;i++){
        if(JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel[i].displayName=='红色'){
            _this.warningLevelArr[0]=JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel[i].id
        }
         if(JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel[i].displayName=='橙色'){
            _this.warningLevelArr[1]=JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel[i].id
        }
         if(JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel[i].displayName=='黄色'){
            _this.warningLevelArr[2]=JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel[i].id
        }
         if(JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel[i].displayName=='绿色'){
            _this.warningLevelArr[3]=JSON.parse(sessionStorage.getItem('dictsData'))[0].warningLevel[i].id
        }
    }
    // console.log(_this.warningLevelArr)
  },
  //性别
  getGender(_this){
    _this.genderList=[]
    // console.log(JSON.parse(sessionStorage.getItem('dictsData'))[0].gender)
    for(let i=0;i<JSON.parse(sessionStorage.getItem('dictsData'))[0].gender.length;i++){
        if(JSON.parse(sessionStorage.getItem('dictsData'))[0].gender[i].displayName=='男'){
          _this.genderList[0]=JSON.parse(sessionStorage.getItem('dictsData'))[0].gender[i].id
        }
         if(JSON.parse(sessionStorage.getItem('dictsData'))[0].gender[i].displayName=='女'){
          _this.genderList[1]=JSON.parse(sessionStorage.getItem('dictsData'))[0].gender[i].id
        }
         if(JSON.parse(sessionStorage.getItem('dictsData'))[0].gender[i].displayName=='不明'){
          _this.genderList[2]=JSON.parse(sessionStorage.getItem('dictsData'))[0].gender[i].id
        }
    }
    // console.log(_this.genderList)
  }
}
