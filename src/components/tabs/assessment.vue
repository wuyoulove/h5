<template>
  <div class="ass_person">
    <div class="lists" v-for="(item , key ) in msgData" :key="item.id">
      <p class="meg_item" @click="tapClick(key)">
        <span class="msg_title">
          <slot name="msg_title"/>
          {{item.name}}
        </span>
        <span :class="[rotate&&key==limit?'mandatory_choose go':'mandatory_choose aa']"></span>
      </p>
      <div class="assment" v-show="key==limit&&key==0">
        <List v-for="(items,index) in serverData" :key="items.key">
          <slot slot="name">{{items.name}}</slot>
          <slot slot="mes" v-if='index!=4&&index!=7'> {{items.mes}}</slot>
          <slot slot="mes" v-if='index==4||index==7'>{{items.mes}}</slot>
        </List>
      </div>
      <div class="warp-c" v-show="key==limit&&key==1">
        <Stable>
          <slot slot="stablename">年龄</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : ageIndex == index}"
              v-for="(item,index) in ageData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">性别</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : sexIndex == index}"
              v-for="(item,index) in sexData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">婚姻状况</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : maritalIndex == index}"
              v-for="(item,index) in maritalData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">工作状况</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : workIndex == index}"
              v-for="(item,index) in workData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">文化程度</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : cultureIndex == index}"
              v-for="(item,index) in cultureData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">经济来源</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : economicIndex == index}"
              v-for="(item,index) in economicData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">居住条件</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : liveIndex == index}"
              v-for="(item,index) in liveData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">家庭完整度</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : familyIntegrityIndex == index}"
              v-for="(item,index) in familyIntegrityData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">家庭经济状况</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : familyEcoIndex == index}"
              v-for="(item,index) in familyEcoData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">家庭关系状况</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : familyStatusIndex == index}"
              v-for="(item,index) in familyStatusData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">身体健康程度</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : healthIndex == index}"
              v-for="(item,index) in healthData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">性格特点</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : characterIndex == index}"
              v-for="(item,index) in characterData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">情绪</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : emotionIndex == index}"
              v-for="(item,index) in emotionData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">认知</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : cognitionIndex == index}"
              v-for="(item,index) in cognitionData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">行为</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : behaviorIndex == index}"
              v-for="(item,index) in behaviorData"
            >{{item}}</span>
          </slot>
        </Stable>
      </div>
      <div class="warp-c" v-show="key==limit&&key==2">
        <Stable>
          <slot slot="stablename">治疗情况</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : HIndex == index}"
              v-for="(item,index) in HData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">治疗效果</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : JIndex == index}"
              v-for="(item,index) in JData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">目前病情</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : sillIndex == index}"
              v-for="(item,index) in sillData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">不良反应</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : badIndex == index}"
              v-for="(item,index) in badData"
            >{{item}}</span>
          </slot>
        </Stable>

        <Stable>
          <slot slot="stablename">服药方式</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : yaoIndex == index}"
              v-for="(item,index) in yaoData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">药物依从性</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : yaoYIndex == index}"
              v-for="(item,index) in yaoYData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">焦虑</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : jiaolvIndex == index}"
              v-for="(item,index) in jiaolvData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">抑郁</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : yiyuIndex == index}"
              v-for="(item,index) in yiyuData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">存在以下睡眠问题</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : shuiIndex == index}"
              v-for="(item,index) in shuiData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">近期生活事件</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : livesIndex == index}"
              v-for="(item,index) in livesData"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">肇事肇祸</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : zhaoshiIndex == index}"
              v-for="(item,index) in zhaoshiData"
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
          >{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import List from "@/components/basic/list";
import Stable from "@/components/basic/Stable";
export default {
  components: {
    List,
    Stable
  },
  data() {
    return {
      msg: "",
      msgData: [
        {
          id: 0,
          name: "评估信息",
          site: ""
        },
        {
          id: 1,
          name: "基本信息",
          site: ""
        },
        {
          id: 2,
          name: "干预信息",
          site: ""
        }
      ],
      serverData: [
        {
          name: "评估对象",
          mes: "",
          key: 5
        },
        {
          name: "身份证号码",
          mes: "",
          key: 6
        },
        {
          name: "所属类型",
          mes: "",
          key: 7
        },
        {
          name: "最新预警等级",
          mes: "",
          key: 8
        },
        {
          name: "最新预警时间",
          mes: "",
          key: 9
        },
        {
          name: "所属服务方案",
          mes: "",
          key: 10
        },
        {
          name: "评估人",
          mes: "",
          key: 11
        },
        {
          name: "评估时间",
          mes: "",
          key: 12
        },
        {
          name: "参与人",
          mes: "",
          key: 13
        }
      ],
      rotate: false,
      limit: -1,
      //基本信息
      ageData: ["60岁以上", "46-60岁", "36-45岁", "19-35岁", "18岁以下"],
      ageIndex: -1,
      sexData: ["女", "男"],
      sexIndex: -1,
      maritalData: ["已婚", "丧偶", "离婚", "未婚"],
      maritalIndex: -1,
      workData: [
        "公务员、事业单位、离退休人员",
        "丧私营业主、个体户",
        "学生、工人、农民",
        "无业人员"
      ],
      workIndex: -1,
      //文化程度
      cultureData: ["大学以上", "中/大学", "高中", "初中", "小学"],
      cultureIndex: -1,
      //经济来源
      economicData: ["自给自足", "父母或亲友支持", "无固定来源", "其他"],
      economicIndex: -1,
      //居住条件
      liveData: ["自有房产", "与父母居住", "租赁", "与朋友合租"],
      liveIndex: -1,
      //家庭完整度
      familyIntegrityData: ["父母子女健在", "直系亲人离世", "失独", "其他"],
      familyIntegrityIndex: -1,
      //家庭经济
      familyEcoData: ["富裕", "良好", "一般", "差"],
      familyEcoIndex: -1,
      //家庭状况
      familyStatusData: ["良好", "一般少沟通", "矛盾较深", "暴力"],
      familyStatusIndex: -1,
      //身体健康状况
      healthData: ["健康", "有慢性病或隐性病", "残疾或生活不能自理", "传染病"],
      healthIndex: -1,
      //性格特点
      characterData: ["外向", "内向", "敏感", "冲动"],
      characterIndex: -1,
      //情绪
      emotionData: ["理想", "偶尔情绪化", "有明显抑郁", "有明显焦虑"],
      emotionIndex: -1,
      //认知
      cognitionData: ["客观", "自卑", "自负", "偏执"],
      cognitionIndex: -1,
      //行为
      behaviorData: ["有自控能力", "自控能力较弱", "容易失控", "有自伤倾向"],
      behaviorIndex: -1,
      //治疗情况
      HData: ["社区治疗随访", "门诊治疗", "住院治疗"],
      HIndex: -1,
      //治疗效果
      JData: ["好转", "无变化", "加重"],
      JIndex: -1,
      //目前病情
      sillData: ["稳定期", "慢性残留期", "波动期", "急性发作期"],
      sillIndex: -1,
      //不良反应
      badData: ["无", "有"],
      badIndex: -1,
      //服药方式
      yaoData: [
        "自行服药",
        "他人给药自己服",
        "注射给药",
        "强制给药",
        "自行停药"
      ],
      yaoIndex: -1,
      //药物依从性
      yaoYData: ["规律", "间断", "不服药"],
      yaoYIndex: -1,
      //焦虑
      jiaolvData: [
        "无明显焦虑",
        "小部分时间焦虑",
        "大部分时间焦虑",
        "总是焦虑"
      ],
      jiaolvIndex: -1,
      //抑郁
      yiyuData: ["无明显抑郁", "小部分时间抑郁", "大部分时间抑郁", "总是抑郁"],
      yiyuIndex: -1,
      //存在以下睡眠问题
      shuiData: [
        "早醒",
        "夜间苏醒",
        "入睡困难",
        "做噩梦",
        "白天思睡",
        "白天没精神（记忆力、注意力差）"
      ],
      shuiIndex: -1,
      //近期生活事件
      livesData: [
        "重病外伤",
        "亲人丧失",
        "邻居解纷",
        "家庭成员纠纷",
        "失业",
        "重大财务损失",
        "离异",
        "怀孕",
        "法律纠纷",
        "其他"
      ],
      livesIndex: -1,
      //肇事肇祸
      zhaoshiData: ["轻度滋事", "肇事", "肇祸", "自伤", "自杀未遂"],
      zhaoshiIndex: -1,
      //社会功能
      sheData: ["职业和工作", "婚姻职能", "父母职能", "社会退缩"],
      sheIndex: -1,

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
      disData: [],
      single1: false,
      single2: false,
      single3: false,
      single4: false,
      single5: false,
      single6: false,
      single7: false,
      single8: false,
      single9: false,
      single10: false
    };
  },
  created() {
    this.getDetail(
      this.$route.query.signerId,
      this.$route.query.peopleId,
      this.$route.query.populationType
    );
  },
  methods: {
    tabChange: function(tab) {
      this.tabView = tab;
    },
    getDetail(signerId, peopleId, populationType) {
      var api =
        "/plugin/psychosocialService/serviceAssessManage/viewServiceAssessForMobile.action";
      this.$http
        .post(api, {
          "assessBaseInfo.serviceStepId": signerId,
          "assessBaseInfo.assesseeId": peopleId,
          populationType: populationType
        })
        .then(
          response => {
            this.serverData[2].mes = response.populationName;
            if (response.serviceStep != undefined) {
              this.serverData[3].mes = response.serviceStep.warningLevel.id;
              this.serverData[4].mes = response.serviceStep.warningDate != undefined ? response.serviceStep.warningDate.substring(0,10) : '';
              this.serverData[5].mes = response.serviceStep.schemeName;
            }
            if (response.personnelSign != undefined) {
              sessionStorage.setItem(
                "personnelSign",
                JSON.stringify(response.personnelSign)
              );
            }
            if (response.servicePlan != undefined) {
              sessionStorage.setItem(
                "servicePlan",
                JSON.stringify(response.servicePlan)
              );
            }
            if (response.serviceItemsList != undefined) {
              console.log(response.serviceItemsList)
              sessionStorage.setItem(
                "serviceItemsList",
                JSON.stringify(response.serviceItemsList)
              );
            }

            // 基本信息
            if (response.assessBaseInfo != undefined) {
              this.serverData[0].mes = response.assessBaseInfo.assesseeName;
              this.serverData[1].mes = response.assessBaseInfo.idCardNo;
              this.serverData[6].mes = response.assessBaseInfo.evaluatorname;
              this.serverData[7].mes = response.assessBaseInfo.assessDate != undefined ? response.assessBaseInfo.assessDate.substring(0,10) : '';
              this.serverData[8].mes = response.assessBaseInfo.participant;
              this.ageIndex = response.assessBaseInfo.age;
              this.sexIndex = response.assessBaseInfo.gender;
              this.maritalIndex = response.assessBaseInfo.marriage;
              this.workIndex = response.assessBaseInfo.workCondition;
              this.cultureIndex = response.assessBaseInfo.education;
              this.economicIndex = response.assessBaseInfo.economicSources;
              this.liveIndex = response.assessBaseInfo.livingCondition;
              this.familyIntegrityIndex =
                response.assessBaseInfo.familyIntegrity;
              this.familyEcoIndex =
                response.assessBaseInfo.familyEconomicStatus;
              this.familyStatusIndex = response.assessBaseInfo.familyRelations;
              this.healthIndex = response.assessBaseInfo.physicalFitness;
              this.characterIndex = response.assessBaseInfo.characterTrait;
              this.emotionIndex = response.assessBaseInfo.emotion;
              this.cognitionIndex = response.assessBaseInfo.perceive;
              this.behaviorIndex = response.assessBaseInfo.behavior;
            }
            if (response.populationsAssessMentalpatients != undefined) {
              this.HIndex =
                response.populationsAssessMentalpatients.cureSituation;
              this.JIndex = response.populationsAssessMentalpatients.cureEffect;
              this.sillIndex =
                response.populationsAssessMentalpatients.illnessState;
              this.badIndex =
                response.populationsAssessMentalpatients.adverseReaction;
              this.yaoIndex =
                response.populationsAssessMentalpatients.takeMedicine;
              this.yaoYIndex =
                response.populationsAssessMentalpatients.drugCompliance;
              this.jiaolvIndex =
                response.populationsAssessMentalpatients.anxious;
              this.yiyuIndex =
                response.populationsAssessMentalpatients.depressed;
              this.shuiIndex = Number(
                response.populationsAssessMentalpatients.sleepProblem
              );
              this.livesIndex =
                response.populationsAssessMentalpatients.lifeEvent;
              this.zhaoshiIndex =
                response.populationsAssessMentalpatients.causeTrouble;
              //社会功能
              this.proIndex = response.populationsAssessMentalpatients.jobWork;
              this.characterIndex =
                response.populationsAssessMentalpatients.marriageFunction;
              this.moodIndex =
                response.populationsAssessMentalpatients.parentalFunction;
              this.perceiveIndex =
                response.populationsAssessMentalpatients.socialWithdrawal;
              this.perceiveIndex1 =
                response.populationsAssessMentalpatients.familyOutActivities;
              this.perceiveIndex2 =
                response.populationsAssessMentalpatients.familyInActivities;
              this.perceiveIndex3 =
                response.populationsAssessMentalpatients.familyFunction;
              this.perceiveIndex4 =
                response.populationsAssessMentalpatients.personArrange;
              this.perceiveIndex5 =
                response.populationsAssessMentalpatients.outsideInterest;
              this.perceiveIndex6 =
                response.populationsAssessMentalpatients.responsibilityPlan;
              this.single1 =
                response.populationsAssessMentalpatients.hasJobWork == 1
                  ? true
                  : false;
              this.single2 =
                response.populationsAssessMentalpatients.hasMarriageFunction ==
                1
                  ? true
                  : false;
              this.single3 =
                response.populationsAssessMentalpatients.hasParentalFunction ==
                1
                  ? true
                  : false;
              this.single4 =
                response.populationsAssessMentalpatients.hasSocialWithdrawal ==
                1
                  ? true
                  : false;
              this.single5 =
                response.populationsAssessMentalpatients
                  .hasFamilyOutActivities == 1
                  ? true
                  : false;
              this.single6 =
                response.populationsAssessMentalpatients
                  .hasFamilyInActivities == 1
                  ? true
                  : false;
              this.single7 =
                response.populationsAssessMentalpatients.hasFamilyFunction == 1
                  ? true
                  : false;
              this.single8 =
                response.populationsAssessMentalpatients.hasPersonArrange == 1
                  ? true
                  : false;
              this.single9 =
                response.populationsAssessMentalpatients.hasOutsideInterest == 1
                  ? true
                  : false;
              this.single10 =
                response.populationsAssessMentalpatients
                  .hasResponsibilityPlan == 1
                  ? true
                  : false;
            }
          },
          () => {}
        );
    },

    tapClick(e) {
      this.rotate = !this.rotate;
      if (e == this.limit) {
        this.limit = -1;
      } else {
        this.limit = e;
      }
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem("personnelSign");
    sessionStorage.removeItem("servicePlan");
    sessionStorage.removeItem("serviceItemsList");
  }
};
</script>
<style lang="scss" scoped >
.lists {
  margin-bottom: 15px;
}
.meg_item {
  height: 40px;
  line-height: 40px;
  background: #edeff2;
  position: relative;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-left: 12px;
}
.mandatory_choose {
  width: 9px;
  height: 9px;
  border-top: 2px solid #aaaaaa;
  border-right: 2px solid #aaaaaa;
  transform: rotate(135deg);
  display: inline-block;
  position: absolute;
  top: 17px;
  right: 15px;
}
/deep/ div .megWarp {
  position: relative;
  border-bottom: none;
  min-height: 44px;
  padding-right: 12px;
}
/deep/ .megWarp:before {
  content: " ";
  position: absolute;
  left: 12px;
  bottom: 0;
  width: 363px;
  height: 1px;
  border-top: 1px solid #f3f5f9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
/deep/ .megWarp p {
  display: inline-block;
}
/deep/ .megWarp p:nth-child(2) {
  width: 200px;
  line-height: 22px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: right;
}
/deep/ .megWarp .meg_item2 {
  padding-right: 0px;
}
.aa {
  transition: all 2s;
}
.go {
  transform: rotate(-45deg);
  transition: all 2s;
}
.checkWarp {
  margin-left: 12px;
}
/deep/ .ivu-checkbox-group {
  margin-left: 12px;
}
/deep/ .ivu-checkbox-wrapper {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 117px;
  margin: 0 0 12px 0;
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
</style>
