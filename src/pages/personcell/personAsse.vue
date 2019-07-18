<template>
  <div>
    <div class="socialMind-box">
      <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
        人员评估
      </div>
      <div class="flow">
        <div class="flow-warp">
          <span class="flow-num1 flow-num1_cur"></span>
          <span class="flow-br"></span>
          <span class="flow-num2"></span>
          <span class="flow-br"></span>
          <span class="flow-num3"></span>
        </div>
        <div class="name-warp">
          <span class="flowName_cur">填写参与人</span>
          <span>评估基本信息</span>
          <span>评估干预信息</span>
        </div>
      </div>
      <div class="warp-c">
        <List v-for="(item,index)  in asseData" :key="item.item">
          <slot slot="name">{{item.item}}</slot>
          <slot slot="mes" v-if='index!=6'> {{item.mes}}</slot>
           <slot slot="mes" v-if='index==6'>{{item.mes}}</slot>
        </List>
         <div class="inpName">
        参与人
        <input v-model="participantName" placeholder="请输入参与人">
      </div>
      </div>
     
      <div class="next-step" @click="nextStep()">下一步</div>
    </div>
  </div>
</template>
<script>
import List from "@/components/basic/list";
import Common from "../../assets/js/common.js";
export default {
  components: {
    List
  },
  data() {
    return {
      participantName: "",
      asseData: [
        {
          item: "评估对象1",
          mes: "贾轩新1"
        },
        {
          item: "评估对象2",
          mes: "贾轩新2"
        },
        {
          item: "评估对象3",
          mes: "贾轩新3"
        },
        {
          item: "评估对象4",
          mes: "贾轩新4"
        }
      ],
      assesseeId: 0,
      warningDate: "",
      warningLevel: 1,
      parmData: [],
      disData: [],
      disAssDataa: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  mounted() {
    if (this.$route.query.AssData != undefined) {
      this.assesseeId = JSON.parse(this.$route.query.AssData).id;
      this.warningDate = JSON.parse(this.$route.query.AssData).warningDate;
      this.warningLevel = JSON.parse(this.$route.query.AssData).warningLevel.id;
      this.assessDataForMobile(
        this.assesseeId,
        this.warningDate,
        this.warningLevel
      );
    } else {
      this.disAssDataa = JSON.parse(sessionStorage.getItem("disAssData"));
      this.serviceStepId = this.disAssDataa.id;
      this.assesseeId = this.disAssDataa.peopleId;
      this.viewServiceAssessForMobile();
    }
    if (sessionStorage.getItem("participantName") != null) {
      this.participantName = JSON.parse(
        sessionStorage.getItem("participantName")
      );
    }
  },
  methods: {
    // 下一步
    nextStep() {
      sessionStorage.setItem("parmData", JSON.stringify(this.parmData));
      sessionStorage.setItem(
        "participantName",
        JSON.stringify(this.participantName)
      );
      sessionStorage.setItem("disData", JSON.stringify(this.disData));
      this.$router.push({
        path: "/MegAsse"
      });
    },
    // 人员信息评估
    assessDataForMobile(assesseeId, warningDate, warningLevel) {
      this.asseData = [];
      this.$http
        .post(
          "/plugin/psychosocialService/serviceAssessManage/assessDataForMobile.action",
          {
            "assessBaseInfo.assesseeId": assesseeId,
            populationType: "mentalPatient",
            "warningRecord.warningDate": warningDate,
            "warningRecord.warningLevel.id": warningLevel
          }
        )
        .then(res => {
          this.parmData = res;
          this.disData = res;
          let warningLevel = "";
          //预警等级
          Common.getWarningLevel(this);
          if(res.assessBaseInfo.warningLevel != undefined){
          switch (res.assessBaseInfo.warningLevel) {
            case this.warningLevelArr[0]:
              warningLevel = "红色";
              break;
            case this.warningLevelArr[1]:
              warningLevel = "橙色";
              break;
            case this.warningLevelArr[2]:
              warningLevel = "黄色";
              break;
            case this.warningLevelArr[3]:
              warningLevel = "绿色";
              break;
          }
          }
          this.asseData = [
            {
              item: "评估对象",
              mes: res.assessBaseInfo.assesseeName
            },
            {
              item: "身份证号码",
              mes: res.assessBaseInfo.idCardNo
            },
            {
              item: "所属类型",
              mes: res.populationName
            },
            {
              item: "最新预警等级",
              mes: `${warningLevel}`
            },
            {
              item: "最新预警时间",
              mes: res.assessBaseInfo.warningDate != undefined ? res.assessBaseInfo.warningDate.substring(0,10) : ''
            },
            {
              item: "所属服务方案",
              mes: res.assessBaseInfo.serviceStepId
            },
            {
              item: "评估人",
              mes: res.assessBaseInfo.evaluatorname
            },
            {
              item: "评估时间",
              mes: res.assessBaseInfo.assessDate != undefined ? res.assessBaseInfo.assessDate.substring(0,10) : ''
            }
          ];
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 点击评估数据回显
    viewServiceAssessForMobile() {
      this.$http
        .post(
          "/plugin/psychosocialService/serviceAssessManage/viewServiceAssessForMobile.action",
          {
            "assessBaseInfo.serviceStepId": this.serviceStepId,
            "assessBaseInfo.assesseeId": this.assesseeId,
            populationType: "mentalPatient"
          }
        )
        .then(res => {
          this.disData = res;
          let warningLevel = "";
          //预警等级
          Common.getWarningLevel(this);
          switch (res.serviceStep.warningLevel.id) {
            case this.warningLevelArr[0]:
              warningLevel = "红色";
              break;
            case this.warningLevelArr[1]:
              warningLevel = "橙色";
              break;
            case this.warningLevelArr[2]:
              warningLevel = "黄色";
              break;
            case this.warningLevelArr[3]:
              warningLevel = "绿色";
              break;
          }
          this.asseData = [
            {
              item: "评估对象",
              mes: res.assessBaseInfo.assesseeName
            },
            {
              item: "身份证号码",
              mes: res.assessBaseInfo.idCardNo
            },
            {
              item: "所属类型",
              mes: res.populationName
            },
            {
              item: "最新预警等级",
              mes: `${warningLevel}`
            },
            {
              item: "最新预警时间",
              mes: res.serviceStep.warningDate != undefined ? res.serviceStep.warningDate.substring(0,10) : ''
            },
            {
              item: "所属服务方案",
              mes:res.serviceStep.schemeName
            },
            {
              item: "评估人",
              mes: res.assessBaseInfo.evaluatorname
            },
            {
              item: "评估时间",
              mes: res.assessBaseInfo.assessDate != undefined ? res.assessBaseInfo.assessDate.substring(0,10) : ''
            }
          ];
          this.participantName = res.assessBaseInfo.participant;
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
.flow {
  margin-top: 1px;
  width: 100%;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.flow-warp {
  width: 275px;
  margin: 20px auto 10px auto;
  height: 30px;
}
.flow-warp > span {
  display: inline-block;
  vertical-align: middle;
}
.flow-num1 {
  width: 30px;
  height: 30px;
  background: url(../../assets/img/one_nor2x.png) no-repeat;
  background-size: 100% 100%;
}
.flow-num1_cur {
  background: url(../../assets/img/one_hl2x.png) no-repeat;
  background-size: 100% 100%;
}
.flow-num2 {
  width: 30px;
  height: 30px;
  background: url(../../assets/img/two_nor2x.png) no-repeat;
  background-size: 100% 100%;
}
.flow-num2_cur {
  background: url(../../assets/img/two_hl2x.png) no-repeat;
  background-size: 100% 100%;
}
.flow-num3 {
  width: 30px;
  height: 30px;
  background: url(../../assets/img/three_nor2x.png) no-repeat;
  background-size: 100% 100%;
}
.flow-num3_cur {
  background: url(../../assets/img/three_hl2x.png) no-repeat;
  background-size: 100% 100%;
}
.flow-br {
  width: 80px;
  height: 2px;
  background: rgba(237, 239, 242, 1);
}
.warp-c{
  margin-bottom: 80px;
}
.name-warp {
  margin-left: 35px;
}
.name-warp > span {
  margin-right: 43px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 12px;
}
.flowName_cur {
  color: rgba(48, 164, 255, 1) !important;
}
.inpName {
  // margin-top: 20px;
  padding-left: 12px;
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 44px;
  background: rgba(255, 255, 255, 1);
}
.inpName > input {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(170, 170, 170, 1);
  width: 280px;
  height: 44px;
  line-height: 44px;
  border: none;
  text-align: right;
  padding-right: 12px;
  float: right;
}
input:focus {
  outline: none;
  border: none;
}
</style>
