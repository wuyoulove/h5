<template>
  <div class="Social-Service">
    <div class="header" @click="jsCallJavaClose">
      <span class="mandatory_choose"></span>
      社会心理
    </div>
    <div class="title_index">社会心理</div>
    <div class="Social-box">
      <div
        class="Social-item fl"
        v-for="(item,index) in SocialData"
        v-if="item.isShow" >
        <div @click="SocialDetil(item)">
        <div class="Social-item-ico1" v-show="index!=5"  >
          <img :src="item.img">
        </div>
        <p class="Social-item-til">{{item.til}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Config from "../model/config.js";
import Common from "../assets/js/common.js";
export default {
  data() {
    return {
      loginData: [],
      DictsData: [],
      SocialData: [
        {
          img: require("../assets/img/renyuanxinxi.png"),
          til: "人员信息",
          path: "/HomePage",
          isShow: true
        },
        {
          img: require("../assets/img/renyuanqianshou.png"),
          til: "人员签收",
          path: "/CurrentList",
          isShow: true
        },
        {
          img: require("../assets/img/fuwujihua.png"),
          til: "服务计划",
          path: "/PlanList",
          isShow: true
        },
        {
          img: require("../assets/img/fuwushixiang.png"),
          til: "服务事项",
          path: "/ItemsLIists",
          isShow: true
        },
        {
          img: require("../assets/img/chuzhijieguo.png"),
          til: "处置结果",
          path: "/DisposalLists",
          isShow: true
        }
      ],
      nation: [],
      schooling: [],
      career: [],
      maritalState: [],
      bloodType: [],
      faith: [],
      politicalBackground: [],
      AllData: [],
      //用户权限
      //人员签收
      //服务计划
      //服务事项
      //结果处置
    };
  },
  mounted() {
    // 登录信息
    Common.getUser(this).then(val => {
      this.loginData = val;
      sessionStorage.setItem("id", JSON.stringify(val));
    });
    // 返回后清除sessionStorage
    sessionStorage.removeItem("text");
    sessionStorage.removeItem("orgId");
    sessionStorage.removeItem("internalId");
    sessionStorage.removeItem("authorityIs");
    sessionStorage.removeItem("shaixuan")
    sessionStorage.removeItem("sumtotal")
    sessionStorage.removeItem("Sumresponse")
    sessionStorage.removeItem("Asumtotal")
    //权限
    this.authority();
    // 获取字典查询项
    this.Fschooling();
    this.Fcareer();
    this.Fnation();
    this.FpoliticalBackground();
    this.FmaritalState();
    this.Ffaith();
    this.FbloodType();
    this.FdangerLevel();
    this.warningLevel();
    this.gender();
  },
  methods: {
    //权限
    authority() {
      this.$http
        .post(
          "/mobile/sessionManageMobileManage/checkPermissionByEnames.action",
          {
            enamesStr:
              "servicePlanManagement,personnelSignManagement,serviceItemsManagement,personnelAssessManagement"
          }
        )
        .then(res => {
          //人员签收
          this.SocialData[1].isShow = res.data.personnelSignManagement;
          //  this.SocialData[1].isShow =false;
          //服务计划
          this.SocialData[2].isShow = res.data.servicePlanManagement;
          //服务事项
          this.SocialData[3].isShow = res.data.serviceItemsManagement;
          //结果处置
          this.SocialData[4].isShow = res.data.personnelAssessManagement;
         
          sessionStorage.setItem('evaqx',JSON.stringify(this.SocialData[4].isShow))
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 关闭当前
    jsCallJavaClose() {
      window.jsInterface.close();
      sessionStorage.removeItem("id");
    },
    SocialDetil(item) {
      this.$router.push({
        path: `${item.path}`,
        query: {
          data: this.loginData
        }
      });
      this.AllData = [
        {
          schooling: this.schooling,
          nation: this.nation,
          politicalBackground: this.politicalBackground,
          career: this.career,
          maritalState: this.maritalState,
          bloodType: this.bloodType,
          faith: this.faith,
          dangerLevel: this.dangerLevel,
          warningLevel: this.warningLevel,
          gender: this.gender
        }
      ];
      sessionStorage.setItem("dictsData", JSON.stringify(this.AllData));
    },
    // 获取字典项
    //性别
    gender() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "性别"
        })
        .then(res => {
          this.gender = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 文化程度
    Fschooling() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "文化程度"
        })
        .then(res => {
          this.schooling = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 民族
    Fnation() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "民族"
        })
        .then(res => {
          this.nation = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 政治面貌
    FpoliticalBackground() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "政治面貌"
        })
        .then(res => {
          this.politicalBackground = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 职业
    Fcareer() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "职业"
        })
        .then(res => {
          this.career = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 婚姻状况
    FmaritalState() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "婚姻状况"
        })
        .then(res => {
          this.maritalState = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 血型
    FbloodType() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "血型"
        })
        .then(res => {
          this.bloodType = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 宗教信仰
    Ffaith() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "宗教信仰"
        })
        .then(res => {
          this.faith = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 危险程度
    FdangerLevel() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "危险程度"
        })
        .then(res => {
          this.dangerLevel = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    warningLevel() {
      this.$http
        .post("/mentalPatientAdapterManage/getPropertyDicts.action", {
          domainName: "预警等级"
        })
        .then(res => {
          this.warningLevel = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  beforeDestroy() {
    //去除 当前列表和下辖列表标志  返回的数据
    sessionStorage.removeItem("orgScope");
    sessionStorage.removeItem("response");
    sessionStorage.removeItem("dealStep");
  }
};
</script>
<style lang="scss" scoped>
.Social-Service {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: #ffffff;
}
.header {
  height: 60px;
  line-height: 60px;
  text-align: left;
  padding-left: 48px;
  background: #07a9f5;
  font-size:18px;
  color: #fff;
  span {
    top: 22px;
    left:12px;
  }
}
.mandatory_choose {
  width: 14px;
  height: 14px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(-135deg);
  display: inline-block;
  position: absolute;
}
.title_index{
  height: 36px;
  line-height: 36px;
  padding-left: 18px;
  font-size:16px;
  font-family:PingFangSC-Medium;
  font-weight:500;
 color:rgba(51,51,51,1)
}
.Social-box {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  border-top:1px solid #EDEFF2;
}
.Social-item {
  width:33.3%;
  height: 150px;
  text-align: center;
  border-right:1px solid #EDEFF2;
  border-bottom:1px solid #EDEFF2;
}
.Social-item:nth-child(3){
  border-right:none;
}
.Social-item-ico1 {
  width: 70px;
  height: 70px;
  margin:20px auto 0px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    border:none;
  }
}
.Social-item-til {
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  color: #000;
  text-align: center;
}
</style>
