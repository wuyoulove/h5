<template>
  <div>
      <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
        评估记录
      </div>
    <div class="serverWarp">
      <List v-for="(item,index) in evalutaData" :key="item.item">
        <slot slot="name">{{item.item}}</slot>
        <slot slot="mes">{{item.meg}}</slot>
      </List>
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
      evalutaId: 0,
      evalutaData: [
        {
          item: "服务地点1",
          meg: "司法所1"
        },
        {
          item: "服务地点2",
          meg: "司法所2"
        }
      ]
    };
  },
  mounted() {
    this.evalutaId = this.$route.query.evalutaId;
    this.getDetailByAssessId(this.evalutaId)
  },
  methods: {
    // 评估记录信息详情页面
    getDetailByAssessId(id) {
      this.$http.post(
        "/plugin/psychosocialService/personnelAssessManage/getDetailByAssessId.action",
        {
          id: id,
          populationType:'mentalPatient'
        }
      )
        .then(res => {
          Common.getWarningLevel(this);
          let warningLevel = '', statusType = ''
          switch(res.warningLevel.id){
          case this.warningLevelArr[0]:
          warningLevel = '红色'
          break;
          case this.warningLevelArr[1]:
          warningLevel = '橙色';
          break;
          case this.warningLevelArr[2]:
          warningLevel = '黄色';
          break;
          case this.warningLevelArr[3]:
          warningLevel = '绿色';
          break;
        }
        if(res.statusType == 1){
          statusType = '评估已提交'
        }else{
          statusType = '评估未提交'
        }
          this.evalutaData = [
            {
              item: "预警等级",
              meg: `${warningLevel}`
            },
            {
              item: "预警时间",
              meg: res.warningDate
            },
            {
              item: "评估人",
              meg: res.evaluatorname
            },
            {
              item: "评估时间",
              meg: res.assessDate
            },
            {
              item: "评估状态",
              meg: `${statusType}`
            },
          ]
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.serverWarp {
  margin-top: 14px;
}
</style>
