<template>
  <div>
    <div class="socialMind-box">
      <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
        筛选
      </div>
      <div class="mes-content">
        <div class="sexName">人员类型</div>
        <div class="sex">
          <span
            class="man"
            :class="{man_cur : sexIndex == index}"
            v-for="(item,index) in sexData"
          >{{item}}</span>
          <!-- @click="selSex(item,index)" -->
        </div>
        <div class="sexName">等级</div>
        <div class="grade">
          <span
            class="man"
            :class="{man_cur : gradeIndex == index}"
            v-for="(item,index) in gradeData"
            @click="selGrade(item,index)"
          >{{item}}</span>
        </div>
      </div>
      <div class="make_msg">
        <p class="make_list">
          <span class="mandatory_title">完成起始时间</span>
          <input
            type="text"
            onfocus="this.blur();"
            placeholder="请选择"
            @click="setDate"
            v-model="date"
          >
          <span class="mandatory_choose"></span>
        </p>
        <p class="make_list">
          <span class="mandatory_title">完成截止时间</span>
          <input
            type="text"
            onfocus="this.blur();"
            placeholder="请选择"
            @click="setDateEnd"
            v-model="dateEnd"
          >
          <span class="mandatory_choose"></span>
        </p>
        <p class="make_list">
          <span class="mandatory_title">方案名称</span>
          <input type="text" placeholder="请输入" style="padding-right:0px;" v-model="planName">
        </p>
      </div>
      <div class="reset-sure">
        <div class="reset-item fl" :class="{reset_cur : !resetTerggle}" @click="reset()">重置</div>
        <div class="sure-item fr" :class="{reset_cur : resetTerggle}" @click="sure()">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import eventBus from '../../assets/js/eventBus.js';
import Common from "../../assets/js/common.js";
export default {
  data() {
    return {
      sexIndex: 0,
      gradeIndex: -1,
      resetTerggle: true,
      sexData: [
        "精神病人员",
        "社区矫正人员",
        "涉毒人员",
        "重点青少年",
        "涉稳信访人员",
        "涉邪教人员",
        "残疾人",
        "民政求助人员"
      ],
      gradeData: ["红色", "橙色", "黄色", "绿色"],
      name: "",
      area: "",
      date: "",
      dateEnd:'',
      planName:''
    };
  },
  mounted() {
    this.chooseOrganizationId=this.$route.query.chooseOrganizationId,
    this.orgScope=this.$route.query.orgScope
    this.internalId=Number(this.$route.query.internalId)
    this.dealStep=Number(this.$route.query.dealStep)
    this.text=this.$route.query.text
    sessionStorage.setItem('text',this.text)
    sessionStorage.setItem('orgId',this.chooseOrganizationId)
    sessionStorage.setItem('internalId',this.internalId)
  },
  methods: {
    //只做精神病
    selSex(item, index) {
      // this.sexIndex = index;
    },
    selGrade(item, index) {
      this.gradeIndex = index;
    },
    //选择起始时间
    setDate() {
      this.$picker.show({
        type: "datePicker",
        onOk: date => {
          this.date = date;
        }
      });
    },
     //选择结束时间
     setDateEnd() {
      this.$picker.show({
        type: "datePicker",
        onOk: date => {
          this.dateEnd = date;
        }
      });
    },
    reset() {
      this.resetTerggle = false;
      this.sexIndex = 0;
      this.gradeIndex = -1;
      (this.date = ""), (this.dateEnd = ""),(this.planName = "");
    },
   
    sure() {
      this.resetTerggle = true;
      //预警等级
      Common.getWarningLevel(this)
      if(this.gradeIndex==0){
        this.warningLevelId=this.warningLevelArr[0]
      }
      else if(this.gradeIndex==1){
        this.warningLevelId=this.warningLevelArr[1]
      }
      else if(this.gradeIndex==2){
        this.warningLevelId=this.warningLevelArr[2]
      }
      else if(this.gradeIndex==3){
        this.warningLevelId=this.warningLevelArr[3]
      }else{
         this.warningLevelId = ''
      }
       this.shaixuan = [
        {
         date:this.date, 
         dateEnd:this.dateEnd,
         warningLevelId:this.warningLevelId,
         planName:this.planName
        }
      ]
      sessionStorage.setItem("shaixuan",JSON.stringify(this.shaixuan))
      this.getScreeningLists() 
    },
    //筛选请求
    getScreeningLists() {
      var api = "/plugin/psychosocialService/personnelAssessManage/findPersonnelAssessPageBySearchVo.action";
      this.$http
        .post(api, {
          // 当前所选的组织机构id
          "serviceSearchVo.organization.id": this.chooseOrganizationId,
          // 组织范围 当前列表sameGrade、下辖列表directJurisdiction
          "serviceSearchVo.orgScope": this.orgScope,
          // 当前所选层级
          'serviceSearchVo.internalId':this.internalId,
          // 完成时间
          'serviceSearchVo.beginDate':this.date,
          // 截至时间
          'serviceSearchVo.endDate':this.dateEnd,
          // 本次只做精神病人员
          "serviceSearchVo.populaitionType": 'mentalPatient',
          // 预警等级
          'serviceSearchVo.warningLevel.id':this.warningLevelId,
          // 方案名称
          'serviceSearchVo.schemeName':this.planName,
          //未完成4、已完成5
          'serviceSearchVo.dealStep':this.dealStep,
          page:1
        })
        .then(
          response => {
            this.response=response
             //调用router回退页面
             this.$router.go(-1);
          },
          () => {}
        );
    },
  },
  destroyed(){
    eventBus.$emit("choiceList",this.response);
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/screenCommon.css";
</style>
