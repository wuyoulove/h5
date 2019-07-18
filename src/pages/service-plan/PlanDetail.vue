<template>
  <div class="container">
    <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
      服务计划
    </div>
    <div class="detail_list">
      <List v-for="(item,key) in serverData" :key="item.key" v-show="!isLoading">
        <slot slot="name">{{item.name}}</slot>
        <slot slot="mes">{{item.mes}}</slot>
      </List>
    </div>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>
<script>
import Common from "../../assets/js/common.js";
import List from "@/components/basic/list";
import Loading from "@/components/basic/loading";
export default {
  components: {
    List,
    Loading
  },
  data() {
    return {
      isLoading: true,
      serverData: [
        {
          key: 1,
          name: "所属区域",
          mes: ""
        },
        {
          key: 2,
          name: "姓名",
          mes: ""
        },
        {
          key: 3,
          name: "人员类型",
          mes: ""
        },
        {
          key: 4,
          name: "预警等级",
          mes: ""
        },
        {
          key: 5,
          name: "现完成起始时间",
          mes: ""
        },
        {
          key: 6,
          name: "预完成截止时间",
          mes: ""
        },
        {
          key: 7,
          name: "所属方案",
          mes: ""
        },
        {
          key: 8,
          name: "执行对象",
          mes: ""
        }
      ]
    };
  },
  created() {
    this.getDetail(this.$route.query.signerId);
  },
  methods: {
    getDetail(signerId) {
      var api =
        "/plugin/psychosocialService/personnelSignManage/getServiceStepById.action";
      this.$http
        .post(api, {
          id: signerId
        })
        .then(
          response => {
            //所属区域
            this.serverData[0].mes = response.peopleOrg.orgName;
            //姓名
            this.serverData[1].mes = response.peopleName;
            // 人员类型
            this.serverData[2].mes = response.peopleTypeName;
            //预警等级
             Common.getWarningLevel(this)
            if (response.warningLevel.id == this.warningLevelArr[0]) {
              this.serverData[3].mes = "红色";
            }
            if (response.warningLevel.id == this.warningLevelArr[1]) {
              this.serverData[3].mes = "橘色";
            }
            if (response.warningLevel.id == this.warningLevelArr[2]) {
              this.serverData[3].mes = "黄色";
            }
            if (response.warningLevel.id == this.warningLevelArr[3]) {
              this.serverData[3].mes = "绿色";
            }
            //现完成起始时间
            this.serverData[4].mes = response.startTime;
            //预完成截止时间
            this.serverData[5].mes = response.endTime;
            //所属方案
            this.serverData[6].mes = response.schemeName;
            //执行对象
            this.serverData[7].mes = response.executiveDepartmentName;
            this.isLoading = false;
          },
          () => {}
        );
    }
  }
};
</script>
<style lang="scss" scoped>
  .detail_list {
    margin-top: 14px;
  }
// >>> 亦可 改变自组件样式
.detail_list /deep/ .megWarp {
  position: relative;
  border-bottom: none;
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
//列表
/deep/ .megWarp p {
  display: inline-block;
}
/deep/ .megWarp p:nth-child(2) {
  width: 235px;
  line-height: 22px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: right;
}
.detail_list /deep/ .meg_item1 {
  width: 135px;
}
// 加载居中
/deep/ .ivu-col-span-8 {
  float: none;
}
</style>
