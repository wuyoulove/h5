<template>
  <div>
    <div class="socialMind-box">
      <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
        筛选
      </div>
      <div class="inpName">
        姓名
        <input v-model="name" placeholder="请输入姓名">
      </div>
      <div class="inpArea">
        地址
        <input v-model="area" placeholder="请输入地址">
      </div>
      <div class="mes-content">
        <Stable>
          <slot slot="stablename">性别</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : sexIndex == index}"
              v-for="(item,index) in sexData"
              @click="selSex(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">等级</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : gradeIndex == index}"
              v-for="(item,index) in gradeData"
              @click="selGrade(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
      </div>
      <div class="reset-sure">
        <div class="reset-item fl" :class="{reset_cur : !resetTerggle}" @click="reset()">重置</div>
        <div class="sure-item fr" :class="{reset_cur : resetTerggle}" @click="sure()">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import Common from "../../assets/js/common.js";
import eventBus from "../../assets/js/eventBus.js";
import Stable from "@/components/basic/Stable";
export default {
  components: {
    Stable
  },
  data() {
    return {
      sexIndex: -1,
      gradeIndex:-1,
      resetTerggle: true,
      sexData: ["男", "女"],
      gradeData: ["红色", "橙色", "黄色", "绿色"],
      name: "",
      area: "",
      genderId: '',
      // warningLevel: 0,
      warningLevelId:'',
      orgId: 0
    };
  },
  mounted() {
    this.orgId = this.$route.query.OrgId;
    this.text = this.$route.query.text;
    this.internalId=Number(this.$route.query.internalId)
    sessionStorage.setItem('text',this.text)
    sessionStorage.setItem('orgId',this.orgId)
    sessionStorage.setItem('internalId',this.internalId)
  },
  methods: {
    selSex(item, index) {
      this.sexIndex = index;
      Common.getGender(this)
      // console.log(this.genderList)
      if(this.sexIndex == 0){
         this.genderId=this.genderList[0]
      }
      if(this.sexIndex == 1){
        this.genderId=this.genderList[1]
      }
     
    },
    selGrade(item, index) {
      this.gradeIndex = index;
     //预警等级
      Common.getWarningLevel(this)
      // console.log(this.warningLevelArr)
      if(this.gradeIndex==0){
        this.warningLevelId=this.warningLevelArr[0]
      }
      if(this.gradeIndex==1){
        this.warningLevelId=this.warningLevelArr[1]
      }
      if(this.gradeIndex==2){
        this.warningLevelId=this.warningLevelArr[2]
      }
      if(this.gradeIndex==3){
        this.warningLevelId=this.warningLevelArr[3]
      }
      if(this.gradeIndex== -1){
        this.warningLevelId=''
      }
    },
    reset() {
      this.resetTerggle = false;
      this.genderId = '';
      this.gradeIndex = '';
      this.warningLevelId=0;
      (this.name = ""), (this.area = "");
    },
    sure() {
      this.resetTerggle = true;
      console.log(this.orgId,this.name,this.genderId,this.area,this.warningLevelId)
       this.shaixuan = [
        {
         orgId:this.orgId, 
         name:this.name,
         warningLevelId:this.warningLevelId,
         genderId:this.genderId,
         area:this.area
        }
      ]
      sessionStorage.setItem("shaixuan",JSON.stringify(this.shaixuan))
      this.PatientsByQueryCondition(
        this.orgId,
        this.name,
        this.genderId,
        this.area,
        this.warningLevelId
      );
    },
    // 筛选
    PatientsByQueryCondition(
      organizationId,
      name,
      genderId,
      currentAddress,
      warningLevel
    ) {
      this.$http
        .post(
          "/baseinfo/searchMentalPatient/findMentalPatientsByQueryCondition.action",
          {
            organizationId: organizationId,
            "searchMentalPatientVo.name": name,
            "searchMentalPatientVo.genderId": genderId,
            "searchMentalPatientVo.currentAddress": currentAddress,
            "searchMentalPatientVo.warningLevel.id": warningLevel
          }
        )
        .then(
          response => {
            this.response = response;
            //调用router回退页面
            this.$router.go(-1);
          },
          () => {}
        )
        .catch(res => {
          console.log(res);
        });
    }
  },
  destroyed() {
    eventBus.$emit("choiceList", this.response);
  }
};
</script>
<style lang="scss" scoped>
.inpName {
  margin-top: 20px;
  padding-left: 12px;
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 44px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;
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
}
input:focus {
  outline: none;
  border: none;
}
.inpArea {
  display: flex;
  justify-content: space-between;
  margin-top: 1px;
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
.inpArea > input {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(170, 170, 170, 1);
  width: 280px;
  height: 44px;
  line-height: 44px;
  border: none;
  text-align: right;
  padding-right: 12px;
}
.mes-content {
  margin-top: 20px;
  background: rgba(255, 255, 255, 1);
}
.sexName {
  padding-left: 12px;
  width: 100%;
  height: 60px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 60px;
}
.reset-sure {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.reset-item,
.sure-item {
  width: 50%;
  height: 48px;
  background: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 48px;
  text-align: center;
}
.reset_cur {
  background: rgba(48, 164, 255, 1);
  color: #ffffff;
}
</style>
