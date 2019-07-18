<template>
  <div>
    <div class="socialMind-box">
      <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
        评估干预信息
      </div>
      <div class="flow">
        <div class="flow-warp">
          <span class="flow-num1 flow-num1_cur"></span>
          <span class="flow-br"></span>
          <span class="flow-num2 flow-num2_cur"></span>
          <span class="flow-br"></span>
          <span class="flow-num3 flow-num3_cur"></span>
        </div>
        <div class="name-warp">
          <span class="flowName_cur">填写参与人</span>
          <span class="flowName_cur">评估基本信息</span>
          <span class="flowName_cur">评估干预信息</span>
        </div>
      </div>
      <div class="warp-c">
        <Stable>
          <slot slot="stablename">治疗情况</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : cureIndex == index}"
              v-for="(item,index) in cureData"
              @click="selcure(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">治疗效果</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : therapeuticIndex == index}"
              v-for="(item,index) in therapeuticData"
              @click="seltherapeutic(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">目前病情</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : maritalIndex == index}"
              v-for="(item,index) in maritalData"
              @click="selmarital(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">不良反应</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : workIndex == index}"
              v-for="(item,index) in workData"
              @click="selwork(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">服药方式</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : cultureIndex == index}"
              v-for="(item,index) in cultureData"
              @click="selculture(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">药物依从性</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : econIndex == index}"
              v-for="(item,index) in econData"
              @click="selecon(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">焦虑</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : dwellIndex == index}"
              v-for="(item,index) in dwellData"
              @click="seldwell(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">抑郁</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : houseeconIndex == index}"
              v-for="(item,index) in houseeconData"
              @click="selhouseecon(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">存在以下睡眠问题</slot>
          <slot slot="stablemeg">
            <CheckboxGroup v-model="fruit">
              <Checkbox label="早醒"></Checkbox>
              <Checkbox label="夜间苏醒"></Checkbox>
              <Checkbox label="入睡困难"></Checkbox>
              <Checkbox label="做噩梦"></Checkbox>
              <Checkbox label="白天思睡"></Checkbox>
              <Checkbox label="白天没精神"></Checkbox>
            </CheckboxGroup>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">近期生活事件</slot>
          <slot slot="stablemeg">
            <CheckboxGroup v-model="fruitb">
              <Checkbox label="重病外伤"></Checkbox>
              <Checkbox label="亲人丧失"></Checkbox>
              <Checkbox label="邻居纠纷"></Checkbox>
              <Checkbox label="家庭成员纠纷"></Checkbox>
              <Checkbox label="失业"></Checkbox>
              <Checkbox label="重大财务损失"></Checkbox>
              <Checkbox label="离异"></Checkbox>
              <Checkbox label="怀孕"></Checkbox>
              <Checkbox label="法律纠纷"></Checkbox>
              <Checkbox label="其它"></Checkbox>
            </CheckboxGroup>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">肇事肇祸</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : healthIndex == index}"
              v-for="(item,index) in healthData"
              @click="selhealth(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>

        <div class="sexName">社会功能</div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single1">职业和工作</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : proIndex == index}"
            v-for="(item,index) in proData"
            @click="selpro(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single2">婚姻职能</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : characterIndex == index}"
            v-for="(item,index) in characterData"
            @click="selcharacter(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single3">父母职能</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : moodIndex == index}"
            v-for="(item,index) in moodData"
            @click="selmood(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single4">社会退缩</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : perceiveIndex == index}"
            v-for="(item,index) in perceiveData"
            @click="selperceive(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single5">家庭外活动</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : perceiveIndex1 == index}"
            v-for="(item,index) in perceiveData1"
            @click="selperceive1(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single6">家庭内活动</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : perceiveIndex2 == index}"
            v-for="(item,index) in perceiveData2"
            @click="selperceive2(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single7">家庭职能</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : perceiveIndex3 == index}"
            v-for="(item,index) in perceiveData3"
            @click="selperceive3(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single8">个人生活料理</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : perceiveIndex4 == index}"
            v-for="(item,index) in perceiveData4"
            @click="selperceive4(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single9">对外界的兴趣</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : perceiveIndex5 == index}"
            v-for="(item,index) in perceiveData5"
            @click="selperceive5(item,index)"
          >{{item}}</span>
        </div>
        <div class="siWarp">
          <div class="checkWarp">
            <Checkbox v-model="single10">责任心和计划性</Checkbox>
          </div>
          <span
            class="man"
            :class="{man_cur : perceiveIndex6 == index}"
            v-for="(item,index) in perceiveData6"
            @click="selperceive6(item,index)"
          >{{item}}</span>
        </div>
      </div>
      <div class="saveSub">
        <div class="save" :class="{save_cur : !isSave}" @click="save()">保存</div>
        <div class="sub" :class="{save_cur : isSave}" @click="sub()">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
import Stable from "@/components/basic/Stable";
export default {
  components: {
    Stable
  },
  data() {
    return {
      isSave: true,
      assesseeId: 0,
      isSucceed: false,
      noSucceesMeg: [],
      fruit: [],
      fruitAll: [
        "早醒",
        "夜间苏醒",
        "入睡困难",
        "做噩梦",
        "白天思睡",
        "白天没精神"
      ],
      fruita: [],
      fruitb: [],
      fruitcc: "",
      fruitaa: "",
      fruitbAll: [
        "重病外伤",
        "亲人丧失",
        "邻居纠纷",
        "家庭成员纠纷",
        "失业",
        "重大财务损失",
        "离异",
        "怀孕",
        "法律纠纷",
        "其它"
      ],
      fruitc: [],
      single1: false,
      single2: false,
      single3: false,
      single4: false,
      single5: false,
      single6: false,
      single7: false,
      single8: false,
      single9: false,
      single10: false,
      isFlag: false,
      evealData: [],
      parmData: [],
      participantName: "",
      cureData: ["社区治疗随访", "门诊治疗", "住院治疗"],
      cureIndex: -1,
      therapeuticData: ["好转", "无变化", "加重"],
      therapeuticIndex: -1,
      maritalData: ["稳定期", "慢性残留期", "波动期", "急性发作期"],
      maritalIndex: -1,
      workData: ["无", "有"],
      workIndex: -1,
      cultureData: [
        "自行服药",
        "他人给药自己服",
        "注射给药",
        "强制给药",
        "自行停药"
      ],
      cultureIndex: -1,
      econData: ["规律", "间断", "不服药"],
      econIndex: -1,
      dwellData: ["无明显焦虑", "小部分时间焦虑", "大部分时间焦虑", "总是焦虑"],
      dwellIndex: -1,
      houseeconData: [
        "无明显抑郁",
        "小部分时间抑郁",
        "大部分时间抑郁",
        "总是抑郁"
      ],
      houseeconIndex: -1,
      healthData: ["轻度滋事", "肇事", "肇祸", "自伤", "自杀未遂"],
      healthIndex: -1,
      proIndex: -1,
      proData: ["无缺陷", "轻度缺陷", "重度缺陷"],
      characterData: ["无缺陷", "轻度缺陷", "重度缺陷"],
      characterIndex: -1,
      moodData: ["无缺陷", "轻度缺陷", "重度缺陷"],
      moodIndex: -1,
      perceiveData: ["无缺陷", "轻度缺陷", "重度缺陷"],
      perceiveIndex: -1,
      perceiveData1: ["无缺陷", "轻度缺陷", "重度缺陷"],
      perceiveIndex1: -1,
      perceiveData2: ["无缺陷", "轻度缺陷", "重度缺陷"],
      perceiveIndex2: -1,
      perceiveData3: ["无缺陷", "轻度缺陷", "重度缺陷"],
      perceiveIndex3: -1,
      perceiveData4: ["无缺陷", "轻度缺陷", "重度缺陷"],
      perceiveIndex4: -1,
      perceiveData5: ["无缺陷", "轻度缺陷", "重度缺陷"],
      perceiveIndex5: -1,
      perceiveData6: ["无缺陷", "轻度缺陷", "重度缺陷"],
      perceiveIndex6: -1,
      behaviourData: ["有自控能力", "自控能力较弱", "容易失控", "有自伤倾向"],
      behaviourIndex: -1,
      disData: []
    };
  },
  watch: {
    single1() {
      if (this.single1 == false) {
        this.proIndex = -1;
      }
    },
    single2() {
      if (this.single2 == false) {
        this.characterIndex = -1;
      }
    },
    single3() {
      if (this.single3 == false) {
        this.moodIndex = -1;
      }
    },
    single4() {
      if (this.single4 == false) {
        this.perceiveIndex = -1;
      }
    },
    single5() {
      if (this.single4 == false) {
        this.perceiveIndex1 = -1;
      }
    },
    single6() {
      if (this.single4 == false) {
        this.perceiveIndex2 = -1;
      }
    },
    single7() {
      if (this.single4 == false) {
        this.perceiveIndex3 = -1;
      }
    },
    single8() {
      if (this.single4 == false) {
        this.perceiveIndex4 = -1;
      }
    },
    single9() {
      if (this.single4 == false) {
        this.perceiveIndex5 = -1;
      }
    },
    single10() {
      if (this.single4 == false) {
        this.perceiveIndex6 = -1;
      }
    }
  },
  mounted() {
    if(sessionStorage.getItem("participantName") == "undefined"){
      this.participantName = ''
    }else{
      this.participantName = JSON.parse(sessionStorage.getItem("participantName"));
    }
    this.evealData = JSON.parse(sessionStorage.getItem("evealData"));
    this.parmData = JSON.parse(sessionStorage.getItem("parmData"));
    this.disData = JSON.parse(sessionStorage.getItem("disData"));
    this.disAssData = JSON.parse(sessionStorage.getItem("disAssData"));
    if (this.parmData.length == 0) {
      this.serviceStepId =  this.disAssData.id;
      this.assesseeId = this.disData.assessBaseInfo.assesseeId;
      this.assesseeName = this.disData.assessBaseInfo.assesseeName;
      this.idCardNo = this.disData.assessBaseInfo.idCardNo;
      this.warningLevel = this.disAssData.warningLevel.id;
      this.evaluatorid = this.disData.assessBaseInfo.assesseeId;
      (this.evaluatorname = this.disData.assessBaseInfo.assesseeName),
        (this.warningDate = this.disAssData.warningDate.split("T")[0]);
    } else {
      this.serviceStepId = '';
      this.assesseeId = this.parmData.assessBaseInfo.assesseeId;
      this.assesseeName = this.parmData.assessBaseInfo.assesseeName;
      this.idCardNo = this.parmData.assessBaseInfo.idCardNo;
      this.warningLevel = this.parmData.assessBaseInfo.warningLevel;
      (this.evaluatorid = this.parmData.assessBaseInfo.evaluatorid),
        (this.evaluatorname = this.parmData.assessBaseInfo.evaluatorname),
        (this.warningDate = this.parmData.assessBaseInfo.warningDate.split(
          "T"
        )[0]);
    }
    if (
      this.disData.length == undefined &&
      this.disData.populationsAssessMentalpatients != undefined
    ) {
      this.fruitaa = this.disData.populationsAssessMentalpatients.sleepProblem;
      this.fruitcc = this.disData.populationsAssessMentalpatients.lifeEvent;
      this.cureIndex = this.disData.populationsAssessMentalpatients.cureSituation;
      this.therapeuticIndex = this.disData.populationsAssessMentalpatients.cureEffect;
      this.maritalIndex = this.disData.populationsAssessMentalpatients.illnessState;
      this.workIndex = this.disData.populationsAssessMentalpatients.adverseReaction;
      this.cultureIndex = this.disData.populationsAssessMentalpatients.takeMedicine;
      this.econIndex = this.disData.populationsAssessMentalpatients.drugCompliance;
      this.dwellIndex = this.disData.populationsAssessMentalpatients.anxious;
      this.houseeconIndex = this.disData.populationsAssessMentalpatients.depressed;
      this.healthIndex = this.disData.populationsAssessMentalpatients.causeTrouble;
      this.proIndex = this.disData.populationsAssessMentalpatients.jobWork;
      this.characterIndex = this.disData.populationsAssessMentalpatients.marriageFunction;
      this.moodIndex = this.disData.populationsAssessMentalpatients.parentalFunction;
      this.perceiveIndex = this.disData.populationsAssessMentalpatients.socialWithdrawal;
      this.perceiveIndex1 = this.disData.populationsAssessMentalpatients.familyOutActivities;
      this.perceiveIndex2 = this.disData.populationsAssessMentalpatients.familyInActivities;
      this.perceiveIndex3 = this.disData.populationsAssessMentalpatients.familyFunction;
      this.perceiveIndex4 = this.disData.populationsAssessMentalpatients.personArrange;
      this.perceiveIndex5 = this.disData.populationsAssessMentalpatients.outsideInterest;
      this.perceiveIndex6 = this.disData.populationsAssessMentalpatients.responsibilityPlan;
      this.single1 =
        this.disData.populationsAssessMentalpatients.hasJobWork == 1
          ? true
          : false;
      this.single2 =
        this.disData.populationsAssessMentalpatients.hasMarriageFunction == 1
          ? true
          : false;
      this.single3 =
        this.disData.populationsAssessMentalpatients.hasParentalFunction == 1
          ? true
          : false;
      this.single4 =
        this.disData.populationsAssessMentalpatients.hasSocialWithdrawal == 1
          ? true
          : false;
      this.single5 =
        this.disData.populationsAssessMentalpatients.hasFamilyOutActivities == 1
          ? true
          : false;
      this.single6 =
        this.disData.populationsAssessMentalpatients.hasFamilyInActivities == 1
          ? true
          : false;
      this.single7 =
        this.disData.populationsAssessMentalpatients.hasFamilyFunction == 1
          ? true
          : false;
      this.single8 =
        this.disData.populationsAssessMentalpatients.hasPersonArrange == 1
          ? true
          : false;
      this.single9 =
        this.disData.populationsAssessMentalpatients.hasOutsideInterest == 1
          ? true
          : false;
      this.single10 =
        this.disData.populationsAssessMentalpatients.hasResponsibilityPlan == 1
          ? true
          : false;
    }
  },
  methods: {
    selcure(item, index) {
      this.cureIndex = index;
    },
    seltherapeutic(item, index) {
      this.therapeuticIndex = index;
    },
    selmarital(item, index) {
      this.maritalIndex = index;
    },
    selwork(item, index) {
      this.workIndex = index;
    },
    selculture(item, index) {
      this.cultureIndex = index;
    },
    selecon(item, index) {
      this.econIndex = index;
    },
    seldwell(item, index) {
      this.dwellIndex = index;
    },
    selhouseecon(item, index) {
      this.houseeconIndex = index;
    },
    selhouserela(item, index) {
      this.houserelaIndex = index;
    },
    selhealth(item, index) {
      this.healthIndex = index;
    },
    selpro(item, index) {
      this.proIndex = index;
      this.single1 = true;
    },
    selcharacter(item, index) {
      this.characterIndex = index;
      this.single2 = true;
    },
    selmood(item, index) {
      this.moodIndex = index;
      this.single3 = true;
    },
    selperceive(item, index) {
      this.perceiveIndex = index;
      this.single4 = true;
    },
    selperceive1(item, index) {
      this.perceiveIndex1 = index;
      this.single5 = true;
    },
    selperceive2(item, index) {
      this.perceiveIndex2 = index;
      this.single6 = true;
    },
    selperceive3(item, index) {
      this.perceiveIndex3 = index;
      this.single7 = true;
    },
    selperceive4(item, index) {
      this.perceiveIndex4 = index;
      this.single8 = true;
    },
    selperceive5(item, index) {
      this.perceiveIndex5 = index;
      this.single9 = true;
    },
    selperceive6(item, index) {
      this.perceiveIndex6 = index;
      this.single10 = true;
    },
    hidePopsure() {
      this.isFlag = false;
    },
    save() {
      this.isSave = false;
      this.fruitaa = "";
      this.fruitcc = "";
      this.fruita = [];
      this.fruitc = [];
      sessionStorage.removeItem("disData");
      sessionStorage.removeItem("disAssData");
      sessionStorage.removeItem("parmData");
      sessionStorage.removeItem("disAssData");
      sessionStorage.removeItem("evealData");
      sessionStorage.removeItem("participantName");
      this.saveOrSubmitForPositiveinfos("save");
    },
    sub() {
      this.isSave = true;
      this.fruitaa = "";
      this.fruitcc = "";
      this.fruita = [];
      this.fruitc = [];
      sessionStorage.removeItem("disData");
      sessionStorage.removeItem("disAssData");
      sessionStorage.removeItem("parmData");
      sessionStorage.removeItem("disAssData");
      sessionStorage.removeItem("evealData");
      sessionStorage.removeItem("participantName");
      this.saveOrSubmitForPositiveinfos("commit");
      // if (
      //   this.workIndex == -1 ||
      //   this.cultureIndex == -1 ||
      //   this.econIndex == -1 ||
      //   this.dwellIndex == -1 ||
      //   this.houseeconIndex == -1 ||
      //   this.healthIndex == -1 ||
      //   (this.proIndex == -1 && this.single1 == true) ||
      //   (this.characterIndex == -1 && this.single2 == true) ||
      //   (this.moodIndex == -1 && this.single3 == true) ||
      //   (this.perceiveIndex == -1 && this.single4 == true) ||
      //   (this.perceiveIndex1 == -1 && this.single5 == true) ||
      //   (this.perceiveIndex2 == -1 && this.single6 == true) ||
      //   (this.perceiveIndex3 == -1 && this.single7 == true) ||
      //   (this.perceiveIndex4 == -1 && this.single8 == true) ||
      //   (this.perceiveIndex5 == -1 && this.single9 == true) ||
      //   (this.perceiveIndex6 == -1 && this.single10 == true)
      // ) {
      //   this.$Message.info("还有未选择项");
      // } else {
      //   if (this.parmData.length != 0) {
      //     this.$router.push("/HomePage");
      //     this.saveOrSubmitForPositiveinfos("commit");
      //   } else {
      //     this.$router.push("/DisposalLists");
      //     this.saveOrSubmitForPositiveinfos("commit");
      //   }
      // }
    },
    //点击保存或提交
    saveOrSubmitForPositiveinfos(type) {
      for (let i = 0; i < this.fruitAll.length; i++) {
        for (let j = 0; j < this.fruit.length; j++) {
          if (this.fruitAll[i] == this.fruit[j]) {
            this.fruita.push(i);
          }
        }
      }
      this.fruitaa = this.fruita.join(",");
      for (let i = 0; i < this.fruitbAll.length; i++) {
        for (let j = 0; j < this.fruitb.length; j++) {
          if (this.fruitAll[i] == this.fruit[j]) {
            this.fruitc.push(i);
          }
        }
      }
      this.fruitcc = this.fruitc.join(",");
      this.$http
        .post(
          "/plugin/psychosocialService/serviceAssessManage/saveOrSubmitForPositiveinfos.action",
          {
            type: type,
            populationType: "mentalPatient",

            "assessBaseInfo.serviceStepId":this.serviceStepId,
            "assessBaseInfo.assesseeId": this.assesseeId,
            "assessBaseInfo.assesseeName": this.assesseeName,
            "assessBaseInfo.idCardNo": this.idCardNo,
            populationName: "mentalPatient",
            "assessBaseInfo.warningLevel": this.warningLevel,
            "assessBaseInfo.evaluatorid": this.evaluatorid,
            "assessBaseInfo.evaluatorname": this.evaluatorname,
            "assessBaseInfo.warningDate": this.warningDate,
            "assessBaseInfo.participant": this.participantName,
            "assessBaseInfo.age": this.evealData[0].ageIndex,
            "assessBaseInfo.gender": this.evealData[0].sexIndex,
            "assessBaseInfo.marriage": this.evealData[0].maritalIndex,
            "assessBaseInfo.workCondition": this.evealData[0].workIndex,
            "assessBaseInfo.education": this.evealData[0].cultureIndex,
            "assessBaseInfo.economicSources": this.evealData[0].econIndex,
            "assessBaseInfo.livingCondition": this.evealData[0].dwellIndex,
            "assessBaseInfo.familyIntegrity": this.evealData[0].dwellIndex1,
            "assessBaseInfo.familyEconomicStatus": this.evealData[0]
              .houseeconIndex,
            "assessBaseInfo.familyRelations": this.evealData[0].houserelaIndex,
            "assessBaseInfo.physicalFitness": this.evealData[0].healthIndex,
            "assessBaseInfo.characterTrait": this.evealData[0].characterIndex,
            "assessBaseInfo.emotion": this.evealData[0].moodIndex,
            "assessBaseInfo.perceive": this.evealData[0].perceiveIndex,
            "assessBaseInfo.behavior": this.evealData[0].behaviourIndex,
            "populationsAssess.mentalpatientsAssess.cureSituation": this
              .cureIndex == -1 ? '' : this
              .cureIndex,
            "populationsAssess.mentalpatientsAssess.cureEffect": this
              .therapeuticIndex == -1 ? '' : this
              .therapeuticIndex,
            "populationsAssess.mentalpatientsAssess.illnessState": this
              .maritalIndex == -1 ? '' : this
              .maritalIndex,
            "populationsAssess.mentalpatientsAssess.adverseReaction": this.workIndex == -1 ? '' : this
              .workIndex,
            "populationsAssess.mentalpatientsAssess.takeMedicine": this
              .cultureIndex == -1 ? '' : this
              .cultureIndex,
            "populationsAssess.mentalpatientsAssess.drugCompliance": this
              .econIndex == -1 ? '' : this
              .econIndex,
            "populationsAssess.mentalpatientsAssess.anxious": this.dwellIndex == -1 ? '' : this
              .dwellIndex,
            "populationsAssess.mentalpatientsAssess.depressed": this
              .houseeconIndex == -1 ? '' : this
              .houseeconIndex,
            "populationsAssess.mentalpatientsAssess.sleepProblem": this.fruitaa,
            "populationsAssess.mentalpatientsAssess.lifeEvent": this.fruitcc,
            "populationsAssess.mentalpatientsAssess.causeTrouble": this
              .healthIndex == -1 ? '' : this
              .healthIndex,
            "populationsAssess.mentalpatientsAssess.hasJobWork":
              this.single1 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.jobWork":
              this.proIndex == -1 ? "" : this.proIndex,
            "populationsAssess.mentalpatientsAssess.hasMarriageFunction":
              this.single2 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.marriageFunction":
              this.characterIndex == -1 ? "" : this.characterIndex,
            "populationsAssess.mentalpatientsAssess.hasParentalFunction":
              this.single3 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.parentalFunction":
              this.moodIndex == -1 ? "" : this.moodIndex,
            "populationsAssess.mentalpatientsAssess.hasSocialWithdrawa":
              this.single4 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.socialWithdrawal":
              this.perceiveIndex == -1 ? "" : this.perceiveIndex,
            "populationsAssess.mentalpatientsAssess.hasFamilyOutActivities":
              this.single5 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.familyOutActivities":
              this.perceiveIndex1 == -1 ? "" : this.perceiveIndex1,
            "populationsAssess.mentalpatientsAssess.hasFamilyInActivities":
              this.single6 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.familyInActivities":
              this.perceiveIndex2 == -1 ? "" : this.perceiveIndex2,
            "populationsAssess.mentalpatientsAssess.hasFamilyFunction":
              this.single7 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.familyFunction":
              this.perceiveIndex3 == -1 ? "" : this.perceiveIndex3,
            "populationsAssess.mentalpatientsAssess.hasPersonArrange":
              this.single8 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.personArrange":
              this.perceiveIndex4 == -1 ? "" : this.perceiveIndex4,
            "populationsAssess.mentalpatientsAssess.hasOutsideInterest":
              this.single9 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.outsideInterest":
              this.perceiveIndex5 == -1 ? "" : this.perceiveIndex5,
            "populationsAssess.mentalpatientsAssess.hasResponsibilityPlan":
              this.single10 == true ? 1 : "",
            "populationsAssess.mentalpatientsAssess.responsibilityPlan":
              this.perceiveIndex6 == -1 ? "" : this.perceiveIndex6
          }
        )
        .then(res => {
          if (res == true) {
            this.$Message.info("提交成功");
            this.isSucceed = res;
            if (this.parmData.length != 0) {
                this.$router.push("/HomePage");
              } else if (this.parmData.length == 0) {
              this.$router.push("/DisposalLists");
          }
          } else {
            this.noSucceesMeg = res;
            this.$Message.info(`${this.noSucceesMeg.message}`);
          }
          // if (this.isSucceed == true && this.parmData.length != 0) {
          //   this.$router.push("/HomePage");
          // } else if (this.isSucceed == true && this.parmData.length == 0) {
          //   this.$router.push("/DisposalLists");
          // } else {
          //   this.$Message.info(`${this.noSucceesMeg.message}`);
          // }
          // if (this.noSucceesMeg.message != "") {
          //   this.$Message.info(`${this.noSucceesMeg.message}`);
          // }
        })
        .catch(res => {
          console.log(res)
        });
    }
  }
};
</script>
<style lang="scss" scoped>
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
/deep/ .ivu-checkbox-wrapper {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 117px;
  margin: 0 0px 12px 0;
}
/deep/ .ivu-checkbox-group {
  margin-left: 12px;
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
  background-color: #fff;
}
.siWarp {
  background-color: #fff;
}
.checkWarp {
  margin-left: 12px;
}
.saveSub {
  margin-top: 19px;
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 1);
  display: flex
}
.save,
.sub {
  line-height: 48px;
  text-align: center;
  width: 50%;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(48, 164, 255, 1);
}
.save_cur {
  background: rgba(48, 164, 255, 1);
  color: #fff;
}
</style>
