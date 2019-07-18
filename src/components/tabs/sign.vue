<template>
  <div class="plan_msg">
    <p class="meg_item" v-for="item in asseData" :key="item.item">
      <span class="begin_time">
        <slot name="msg_title"/>
        {{item.item}}
      </span>
      <span class="content">
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
          item: "签收人：",
          mes: ""
        },
        {
          item: "联系方式：",
          mes: ""
        }
      ]
    };
  },
  created() {
    // console.log(this.$route.query.signerId)
    this.getDetail(this.$route.query.signerId);
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
            if (response != null) {
              this.asseData[0].mes = response.signer;
              this.asseData[1].mes = response.telephone;
            }
            //服务计划
            if(JSON.parse(sessionStorage.getItem('servicePlanlist'))!=null){
                this.asseData[0].mes = JSON.parse(sessionStorage.getItem('servicePlanlist')).signer;
                this.asseData[1].mes = JSON.parse(sessionStorage.getItem('servicePlanlist')).telephone;
            }
            //服务事项
            if (response == null) {
              if (JSON.parse(sessionStorage.getItem("queryData")) != null) {
                let data = JSON.parse(sessionStorage.getItem("queryData"));
                this.asseData[0].mes = data.singer;
                this.asseData[1].mes = data.telephone;
              }
            }
            //处置结果
            if (JSON.parse(sessionStorage.getItem("personnelSign")) != null) {
              let data = JSON.parse(sessionStorage.getItem("personnelSign"));
              this.asseData[0].mes = data.signer;
              this.asseData[1].mes = data.telephone;
            }
          },
          () => {}
        );
    }
  }
};
</script>

<style lang="scss" scoped >
.plan_msg {
  width: 100%;
  height: 80px;
  background: #fff;
  padding: 17px 12px 0 12px;
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
</style>
