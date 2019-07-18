<template>
  <div class="plan_msg">
    <p class="meg_item" v-for="(item,index) in asseData" :key="item.item">
      <span class="begin_time">
        <slot name="msg_title"/>
        {{item.item}}
      </span>
       <span class="content" v-if='index!=0&&index!=1'>
        <slot name="msg_content"/>
        {{item.mes}}
      </span>
      <span class="content" v-if='index==0||index==1'>
        <slot name="msg_content"/>
        {{item.mes}}
      </span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
      asseData: [
        {
          item: "计划开始时间：",
          mes: " "
        },
        {
          item: "计划结束时间：",
          mes: ""
        },
        {
          item: "计划描述：",
          mes: ""
        },
        {
          item: "涉及部门情况：",
          mes: ""
        },
        {
          item: "备注：",
          mes: ""
        }
      ]
    };
  },
  mounted() {
    //服务事项
    if (JSON.parse(sessionStorage.getItem("queryData")) != null) {
      let data = JSON.parse(sessionStorage.getItem("queryData"));
      //计划开始时间
      this.asseData[0].mes = data.planStartDate.substring(0,10);
      //计划结束时间：
      this.asseData[1].mes = data.planEndDate.substring(0,10);
      //计划描述：
      this.asseData[2].mes = data.planDescribe;
      //涉及部门情况：
      this.asseData[3].mes = data.involveDepartment;
      //备注：
      this.asseData[4].mes = data.remark;
    } else if (JSON.parse(sessionStorage.getItem("servicePlan")) != null) {
      let data = JSON.parse(sessionStorage.getItem("servicePlan"));
      //  计划开始时间
      this.asseData[0].mes = data.planStartDate.substring(0,10);
      //计划结束时间：
      this.asseData[1].mes = data.planEndDate.substring(0,10);
      //计划描述：
      this.asseData[2].mes = data.planDescribe;
      //涉及部门情况：
      this.asseData[3].mes = data.involveDepartment;
      //备注：
      this.asseData[4].mes = data.remark;
    }else {
      this.getDetail(this.$route.query.signerId);
    }
  },
  methods: {
    tabChange: function(tab) {
      this.tabView = tab;
    },
    getDetail(signerId) {   
      var api =
        "/plugin/psychosocialService/personnelSignManage/viewSignForMoblie.action";
      this.$http
        .post(api, {
          id: signerId
        })
        .then(
          response => {
            //服务计划
            if (response != null) {
              sessionStorage.setItem(
                "servicePlanlist",
                JSON.stringify(response)
              );
            }
          },
          () => {}
        );
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem("servicePlanlist");
  }
};
</script>
<style lang="scss" scoped>
.plan_msg {
  width: 100%;
  background: #fff;
  padding: 17px 12px;
}
.meg_item {
  width: 100%;
}
.meg_item span {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  display: inline-block;
}
.meg_item:nth-child(3) span:nth-child(1) {
  width: 70px;
  vertical-align: top;
}
.meg_item:nth-child(3) span:nth-child(2) {
  width: 260px;
}
.meg_item:nth-child(4) span:nth-child(1) {
  width: 100px;
  vertical-align: top;
}
.meg_item:nth-child(4) span:nth-child(2) {
  width: 230px;
}
.meg_item:nth-child(5) span:nth-child(1) {
  width: 70px;
  vertical-align: top;
}
.meg_item:nth-child(5) span:nth-child(2) {
  width: 260px;
}
</style>

