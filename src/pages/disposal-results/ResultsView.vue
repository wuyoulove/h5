<template>
  <div>
    <div class="socialMind-box">
        <div class="header">
          <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
          查看
          </div>
      <div class="flow">
        <div class="flow-warp" v-model="tabView">
          <div v-for="(tab ,index) in tabs">
            <span
              :class="{flow_num1:iscur==index}"
              @click="iscur=index,tabChange('select' + (index + 1))"
            ></span>
            <span class="flow-br" v-if="index!=3"></span>
          </div>
        </div>
        <div class="name-warp">
          <span>人员签收</span>
          <span>制定计划</span>
          <span>具体事项</span>
          <span>人员评估</span>
        </div>
      </div>
      <div style="margin:10px 0;"></div>
      <keep-alive>
        <component v-bind:is="tabView"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import List from "@/components/basic/list";
import select1 from "@/components/tabs/sign";
import select2 from "@/components/tabs/plan";
import select3 from "@/components/tabs/matters";
import select4 from "@/components/tabs/assessment";
export default {
  components: {
    List
  },
  data() {
    return {
      tabView: "select4",
      tabs: [{ name: "" }, { name: "" }, { name: "" }, { name: "" }],
      iscur: 3
    };
  },
  components: {
    select1,
    select2,
    select3,
    select4
  },
  methods: {
    tabChange: function(tab) {
      this.tabView = tab;
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
  margin: 24px auto 6px 40px;
  height: 30px;
}
.flow-warp > div {
  display: inline-block;
}
.flow-warp span {
  float: left;
  vertical-align: middle;
}
.flow-warp span:first-child.flow_num1 {
  background: url(../../assets/img/location_hl.png) no-repeat;
  background-size: 100% 100%;
}
.flow-warp span:first-child {
  width: 34px;
  height: 34px;
  background: url(../../assets/img/location_nor.png) no-repeat;
  background-size: 100% 100%;
}
.flow-br {
  width: 53px;
  height: 2px;
  background: rgba(237, 239, 242, 1);
  margin-top: 16px;
}
.name-warp {
  margin-left: 33px;
}
.name-warp > span {
  margin-right: 36px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 12px;
}
</style>
