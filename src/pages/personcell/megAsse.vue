<template>
  <div>
    <div class="socialMind-box">
      <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
        评估基本信息
      </div>
      <div class="flow">
        <div class="flow-warp">
          <span class="flow-num1 flow-num1_cur"></span>
          <span class="flow-br"></span>
          <span class="flow-num2 flow-num2_cur"></span>
          <span class="flow-br"></span>
          <span class="flow-num3"></span>
        </div>
        <div class="name-warp">
          <span class="flowName_cur">填写参与人</span>
          <span class="flowName_cur">评估基本信息</span>
          <span>评估干预信息</span>
        </div>
      </div>
      <div class="warp-c">
        <Stable>
          <slot slot="stablename">年龄</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : ageIndex == index}"
              v-for="(item,index) in ageData"
              @click="selage(item,index)"
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
              @click="selsex(item,index)"
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
              @click="selmarital(item,index)"
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
              @click="selwork(item,index)"
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
              @click="selculture(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">经济来源</slot>
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
          <slot slot="stablename">居住条件</slot>
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
          <slot slot="stablename">家庭完整度</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : dwellIndex1 == index}"
              v-for="(item,index) in dwellData1"
              @click="seldwell1(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">家庭经济状况</slot>
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
          <slot slot="stablename">家庭关系状况</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : houserelaIndex == index}"
              v-for="(item,index) in houserelaData"
              @click="selhouserela(item,index)"
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
              @click="selhealth(item,index)"
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
              @click="selcharacter(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">情绪</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : moodIndex == index}"
              v-for="(item,index) in moodData"
              @click="selmood(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">认知</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : perceiveIndex == index}"
              v-for="(item,index) in perceiveData"
              @click="selperceive(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
        <Stable>
          <slot slot="stablename">行为</slot>
          <slot slot="stablemeg">
            <span
              class="man"
              :class="{man_cur : behaviourIndex == index}"
              v-for="(item,index) in behaviourData"
              @click="selbehaviour(item,index)"
            >{{item}}</span>
          </slot>
        </Stable>
      </div>
      <div class="next-step megAsseNextStep" @click="nextStep()">下一步</div>
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
      path: "",
      isFlag: false,
      // evealData: [],
      ageData: ["60岁以上", "46-60岁", "36-45岁", "19-35岁", "18岁以下"],
      ageIndex: -1,
      sexData: ["男", "女"],
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
      cultureData: ["大学以上", "中/大学", "高中", "初中", "小学"],
      cultureIndex: -1,
      econData: ["自给自足", "父母或亲友支持", "无固定来源", "其他"],
      econIndex: -1,
      dwellData: ["自有房产", "与父母居住", "租赁", "与朋友合租"],
      dwellIndex: -1,
      dwellData1: ["父母子女健在", "直系亲人离世", "失独", "其它"],
      dwellIndex1: -1,
      houseeconData: ["富裕", "良好", "一般", "差"],
      houseeconIndex: -1,
      houserelaData: ["良好", "一般少沟通", "矛盾较深", "暴力"],
      houserelaIndex: -1,
      healthData: ["健康", "有慢性病或隐性病", "残疾或生活不能自理", "传染病"],
      healthIndex: -1,
      characterData: ["外向", "内向", "敏感", "冲动"],
      characterIndex: -1,
      moodData: ["理想", "偶尔情绪化", "有明显抑郁", "有明显焦虑"],
      moodIndex: -1,
      perceiveData: ["客观", "自卑", "自负", "偏执"],
      perceiveIndex: -1,
      behaviourData: ["有自控能力", "自控能力较弱", "容易失控", "有自伤倾向"],
      behaviourIndex: -1,
      disData: []
    };
  },
  mounted() {
     this.disData = JSON.parse(sessionStorage.getItem("disData"));
    if (this.disData.length == undefined) {
      this.ageIndex = this.disData.assessBaseInfo.age;
      this.sexIndex = this.disData.assessBaseInfo.gender;
      this.maritalIndex = this.disData.assessBaseInfo.marriage;
      this.workIndex = this.disData.assessBaseInfo.workCondition;
      this.cultureIndex = this.disData.assessBaseInfo.education;
      this.econIndex = this.disData.assessBaseInfo.economicSources;
      this.dwellIndex = this.disData.assessBaseInfo.livingCondition;
      this.dwellIndex1 = this.disData.assessBaseInfo.familyIntegrity;
      this.houseeconIndex = this.disData.assessBaseInfo.familyEconomicStatus;
      this.houserelaIndex = this.disData.assessBaseInfo.familyRelations;
      this.healthIndex = this.disData.assessBaseInfo.physicalFitness;
      this.characterIndex = this.disData.assessBaseInfo.characterTrait;
      this.moodIndex = this.disData.assessBaseInfo.emotion;
      this.perceiveIndex = this.disData.assessBaseInfo.perceive;
      this.behaviourIndex = this.disData.assessBaseInfo.behavior;
    }
    if(sessionStorage.getItem('evealData') != null){
      this.evealData = JSON.parse(sessionStorage.getItem('evealData'))
      this.ageIndex = this.evealData[0].ageIndex;
      this.sexIndex = this.evealData[0].sexIndex;
      this.maritalIndex = this.evealData[0].maritalIndex;
      this.workIndex = this.evealData[0].workIndex;
      this.cultureIndex = this.evealData[0].cultureIndex;
      this.econIndex = this.evealData[0].econIndex;
      this.dwellIndex = this.evealData[0].dwellIndex;
      this.dwellIndex1 = this.evealData[0].dwellIndex1;
      this.houseeconIndex = this.evealData[0].houseeconIndex;
      this.houserelaIndex = this.evealData[0].houserelaIndex;
      this.healthIndex = this.evealData[0].healthIndex;
      this.characterIndex = this.evealData[0].characterIndex;
      this.moodIndex = this.evealData[0].moodIndex;
      this.perceiveIndex = this.evealData[0].perceiveIndex;
      this.behaviourIndex = this.evealData[0].behaviourIndex;
    }
  },
  methods: {
    selage(item, index) {
      this.ageIndex = index;
    },
    selsex(item, index) {
      this.sexIndex = index;
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
    seldwell1(item, index) {
      this.dwellIndex1 = index;
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
    selcharacter(item, index) {
      this.characterIndex = index;
    },
    selmood(item, index) {
      this.moodIndex = index;
    },
    selperceive(item, index) {
      this.perceiveIndex = index;
    },
    selbehaviour(item, index) {
      this.behaviourIndex = index;
    },
    hidePopsure() {
      this.isFlag = false;
    },
    nextStep() {
      this.evealData = [
        {
          ageIndex: this.ageIndex,
          sexIndex: this.sexIndex,
          maritalIndex: this.maritalIndex,
          workIndex: this.workIndex,
          cultureIndex: this.cultureIndex,
          econIndex: this.econIndex,
          dwellIndex: this.dwellIndex,
          dwellIndex1: this.dwellIndex1,
          houseeconIndex: this.houseeconIndex,
          houserelaIndex: this.houserelaIndex,
          characterIndex: this.characterIndex,
          moodIndex: this.moodIndex,
          healthIndex: this.healthIndex,
          perceiveIndex: this.perceiveIndex,
          behaviourIndex: this.behaviourIndex
        }
      ];
      console.log(this.evealData)
      sessionStorage.setItem("evealData", JSON.stringify(this.evealData));
      if (
        this.ageIndex == -1 ||
        this.sexIndex == -1 ||
        this.maritalIndex == -1 ||
        this.workIndex == -1 ||
        this.cultureIndex == -1 ||
        this.econIndex == -1 ||
        this.dwellIndex == -1 ||
        this.houseeconIndex == -1 ||
        this.houserelaIndex == -1 ||
        this.characterIndex == -1 ||
        this.moodIndex == -1 ||
        this.perceiveIndex == -1 ||
        this.behaviourIndex == -1 ||
        this.ageIndex == undefined ||
        this.sexIndex == undefined ||
        this.maritalIndex == undefined ||
        this.workIndex == undefined ||
        this.cultureIndex == undefined ||
        this.econIndex == undefined ||
        this.dwellIndex == undefined ||
        this.houseeconIndex == undefined ||
        this.houserelaIndex == undefined ||
        this.characterIndex == undefined ||
        this.moodIndex == undefined ||
        this.perceiveIndex == undefined ||
        this.behaviourIndex == undefined
      ) {
        this.$Message.info("还有未选择项");
      } else {
        this.$router.push("/InterveneMeg");
      }
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
.megAsseNextStep {
  position: relative;
}
</style>
