<template>
  <div>
    <div class="socialMind-box">
      <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
        制定计划
      </div>
      <div class="make_msg">
        <div class="make_list">
          <div>
            <span class="mandatory_icon">*</span>
            <span class="mandatory_title">计划开始时间</span>
          </div>
          <div>
            <input
            type="text"
            onfocus="this.blur();"
            placeholder="请选择"
            @click="setDate"
            v-model="dateBegin"
          >
          <span class="mandatory_choose"></span>
          </div>
        </div>
        <div class="make_list">
          <div>
            <span class="mandatory_icon">*</span>
            <span class="mandatory_title">计划结束时间</span>
          </div>
          <div>
            <input
            type="text"
            onfocus="this.blur();"
            placeholder="请选择"
            @click="setDateEnd"
            v-model="dateEnd"
            >
            <span class="mandatory_choose"></span>
          </div>
        </div>
        <div class="make_list">
          <div>
            <span class="mandatory_icon">*</span>
            <span class="mandatory_title">计划描述</span>
          </div>
          <input type="text" placeholder="请输入" style="padding-right:0px;" v-model="planDescribe">
        </div>
        <div class="make_list">
          <div>
            <span class="mandatory_icon">*</span>
            <span class="mandatory_title">涉及部门情况</span>
          </div>
          <input
            type="text"
            placeholder="请输入"
            style="padding-right:0px;"
            v-model="involveDepartment"
          >
        </div>
        <!-- <p class="make_list">
          <span class="mandatory_title">短信通知人员</span>
          <input type="text" onfocus="this.blur();" placeholder="请选择">
          <span class="mandatory_choose"></span>
        </p>-->
        <div class="make_list">
          <span class="mandatory_title">备注</span>
          <input type="text" placeholder="请输入" style="padding-right:0px;" v-model="remark">
        </div>
        <!-- <p class="make_list">
          <span class="mandatory_title">附件上传</span>
          <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">请选择</Button>
          </Upload>
        </p>-->
      </div>
      <div class="next-step" @click.stop="submit">提交</div>
      <div class="only_pop" v-show="isOnlyTop">{{popContent}}</div>
    </div>
  </div>
</template>
<script>
import common from '../../assets/js/common.js'
export default {
  data() {
    return {
      dateBegin: "",
      dateEnd: "",
      planDescribe: "",
      involveDepartment: "",
      remark: "",
      isOnlyTop: false,
      popContent: "",
      planStartDate:'',
      planEndDate:'',
      planDescribev:''
    };
  },
  created() {
    // 数据id
    this.dataId = this.$route.query.signerId;
    this.chooseOrganizationId = this.$route.query.chooseOrganizationId;
    this.getHistory();
  },
  methods: {
    setDate() {
      this.$picker.show({
        type: "datePicker",
        onOk: date => {
          this.dateBegin = date;
        }
      });
    },
    setDateEnd() {
      this.$picker.show({
        type: "datePicker",
        onOk: date => {
          this.dateEnd = date;
        }
      });
    },
    // 数据回显
    getHistory(signerId) {
      let api =
        "/plugin/psychosocialService/servicePlanManage/servicePlanData.action";
      this.$http
        .post(api, {
          id: this.dataId
          // 1893
          // 2133
        })
        .then(
          response => {
            if (response.servicePlan != undefined) {
              this.dateBegin = response.servicePlan.planStartDate;
              this.dateEnd = response.servicePlan.planEndDate;
              this.planDescribe = response.servicePlan.planDescribe;
              this.involveDepartment = response.servicePlan.involveDepartment;
              this.remark = response.servicePlan.remark;
            }
            //提交计划需要的数据
            this.eventId = response.serviceStep.eventId;
            this.serviceStepId = response.serviceStep.id;
            this.warningRecordId = response.serviceStep.warningRecordId;
          },
          () => {}
        );
    },
    submit() {
      if (this.involveDepartment == "") {
        this.isOnlyTop = true;
        this.popContent = "涉及部门不能为空";
        common.getPop(this)
      }
      if (this.planDescribe == "") {
        this.isOnlyTop = true;
        this.popContent = "计划描述不能为空";
        common.getPop(this)
      }
      if (this.dateEnd == "") {
        this.isOnlyTop = true;
        this.popContent = "计划结束时间不能为空";
       common.getPop(this)
      }
      if (this.dateBegin == "") {
        this.isOnlyTop = true;
        this.popContent = "计划开始时间不能为空";
         common.getPop(this)
      }
      if (
        this.involveDepartment != "" &&
        this.planDescribe != "" &&
        this.dateEnd != "" &&
        this.dateBegin != ""
      ) {
        let api =
          "/plugin/psychosocialService/servicePlanManage/maintainServicePlanForMoblie.action";
         this.$http
          .post(api, {
            mode: "submit",
            // 当前所选的组织机构id
            "servicePlan.organization.id": this.chooseOrganizationId,
            // 方案事件id  点击执行计划数据回显返回值里面的serviceStep.eventId
            "servicePlan.eventId": this.eventId,
            // 服务步骤id 点击执行计划数据回显返回值里面的serviceStep.id
            "servicePlan.serviceStepId": this.serviceStepId,
            //預警记录id  点击执行计划数据回显返回值里面的serviceStep.warningRecordId
            "servicePlan.warningRecordId": this.warningRecordId,
            //计划开始时间
            "servicePlan.planStartDate": this.dateBegin,
            //计划结束时间
            "servicePlan.planEndDate": this.dateEnd,
            //计划描述
            "servicePlan.planDescribe": this.planDescribe,
            // 涉及部门
            "servicePlan.involveDepartment": this.involveDepartment,
            // 备注
            "servicePlan.remark": this.remark,
            // 服务计划id 所选数据的id
            // this.dataId
            "servicePlan.id": ''
          })
          .then(
            response => {
              console.log(response)
              if (response == true) {
                 sessionStorage.setItem('ok',true)
                this.$router.go(-1);
              }
            },
            () => {}
          );
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.make_msg {
  margin-top: 15px;
  background: #fff;
}
.make_list {
  line-height: 44px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding: 0 12px;
  position: relative;
  width:100%;
  white-space: nowrap;
  display:flex;
  justify-content:space-between;
}
.make_list:before {
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
.mandatory_icon {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 132, 107, 1);
}
input {
  background: pink;
  // float: right;
  text-align: right;
  border: none;
  padding-right: 10px;
  border: 0; // 去除未选中状态边框
  outline: none; // 去除选中状态边框
  background-color: rgba(0, 0, 0, 0); // 透明背景
}
// Mozilla Firefox 4 to 18
input:-moz-placeholder {
  text-align: right;
  color: rgba(170, 170, 170, 1);
}
// Mozilla Firefox 19+
input::-moz-placeholder {
  text-align: right;
  color: rgba(170, 170, 170, 1);
}
// Internet Explorer 10+
input:-ms-input-placeholder {
  text-align: right;
  color: rgba(170, 170, 170, 1);
}
// 谷歌浏览器
input::-webkit-input-placeholder {
  text-align: right;
  color: rgba(170, 170, 170, 1);
}
.mandatory_choose {
  width: 7px;
  height: 7px;
  border-top: 2px solid #aaaaaa;
  border-right: 2px solid #aaaaaa;
  transform: rotate(45deg);
  display: inline-block;
  position: absolute;
  top: 17px;
  right: 12px;
}
/deep/ .ivu-upload {
  float: right;
}
</style>
