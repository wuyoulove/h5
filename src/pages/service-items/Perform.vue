<template>
  <div>
    <div class="socialMind-box" >
      <div class="header">
        <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
        执行
      </div>
      <div class="make_msg">
        <div class="make_list">
          <div>
            <span class="mandatory_icon">*</span>
            <span class="mandatory_title">服务地点</span>
          </div>
          <input type="text" placeholder="请输入" style="padding-right:0px;" v-model="occurPlace">
        </div>
        <div class="make_list">
          <div>
            <span class="mandatory_icon">*</span>
            <span class="mandatory_title">服务时间</span>
          </div>
          <div>
            <input
            type="text"
            onfocus="this.blur();"
            placeholder="请选择"
            @click="setDate"
            v-model="occurDate"
          >
          <span class="mandatory_choose"></span>
          </div>
        </div>
        <div class="make_list">
          <div>
            <span class="mandatory_icon">*</span>
            <span class="mandatory_title">记录所属人</span>
          </div>
          <input
            type="text"
            placeholder="请输入"
            style="padding-right:0px;"
            v-on:input="inputName"
            v-model="serviceMembers"
          >
        </div>
        <div class="make_list">
          <span class="mandatory_title">服务参与人</span>
          <input type="text" placeholder="请输入" style="padding-right:0px;" v-model="serviceJoiners">
        </div>
        <div class="make_list">
          <div>
            <span class="mandatory_icon">*</span>
            <span class="mandatory_title">反馈内容</span>
          </div>
          <input type="text" placeholder="请输入" style="padding-right:0px;" v-model="serviceContent">
        </div>

        <div class="make_list">
          <span class="mandatory_title">附件上传</span>
          <input type="text" onfocus="this.blur();" placeholder="请选择">
          <span class="mandatory_choose"></span>
          <input
            type="file"
            class="file"
            v-on:change="onChange($event)"
            multiple="multiple"
            placeholder="请选择"
            style="opacity:0;"
          >
        </div>
        <div class="make_list">
          上传的文件:
          <div v-for="(item,index) in result">
            <div class="fileList">
              <p class="fileName">{{item.name}}</p>
              <span class="m-act-del" @click="delFile(item.id)"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="next-step" @click.stop="submit">提交</div>
    </div>
    <div class="only_pop" v-show="isOnlyTop">{{popContent}}</div>
    <!-- 记录所属人 蒙版 -->
    <div class="record_dialog" v-show="isRecord">
      <div class="record_lists" v-for="(item,key) in serverData" :key="key">
        <div class="record_list" @click="shpwOk(item.desc,item.label,item.value)">
          <div class="record_icon">
            <img src="../../assets/img/headportrait.png" alt>
          </div>
          <div class="record_content">
            <p>{{item.label}}</p>
            <p>{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../model/config";
import common from '../../assets/js/common.js'
export default {
  data() {
    return {
      //服务时间
      occurDate: "",
      //服务地点
      occurPlace: "",
      //记录所属人
      serviceMembers: "",
      //服务参与人
      serviceJoiners: "",
      //反馈内容
      serviceContent: "",
      //附件
      isRecord: false,
      isOnlyTop: false,
      popContent: "",
      serverData: [],
      picture: {},
      result: [],
      Aname:''
    };
  },
  created() {
    // 数据id
    this.dataId = this.$route.query.signerId;
    this.chooseOrganizationId = this.$route.query.chooseOrganizationId;
    this.getHistory();
  },
  methods: {
    // 上传附件
    onChange: function(event) {
      this.picture = event.target.files; // get input file object
      var that = this;
      for (let i = 0; i < this.picture.length; i++) {
        var formData = new FormData();
        formData.append("uploadFile", this.picture[i]);
        // uploadFileFileName
        formData.append("filename", this.picture[i].name);
        that.$http
          .post("/enclosureTQOSS/enclosureTQOSSUpload.action", formData)
          .then(
            function(res) {
              console.log(res)
              that.result = that.picture;
              that.result[i].urlSubmit = res.url;
              that.result[i].id = i;
            },
            function(res) {
              console.log(res.body);
            }
          );
      }
    },
    //删除
    delFile(id) {
      for (let i = 0; i < this.result.length; i++) {
        if (id == this.result[i].id) {
          this.result = Array.from(this.result);
          // 回显数据删除
          if (this.result[i].fileActualUrl != undefined) {
            this.getDel(this.result[i].id, this.result[i].name);
          }
          this.result.splice(i, 1);
        }
      }
    },
    getDel(id, name) {
      var api = "/enclosureTQOSS/deleteAttachFile.action";
      this.$http
        .post(api, {
          keyId: id,
          keyMode: "serviceRecord"
        })
        .then(
          response => {
            if (response == true) {
              this.isOnlyTop = true;
              this.popContent = name + "删除成功";
              common.getPop(this)
            }
          },
          () => {}
        );
    },
    setDate() {
      this.$picker.show({
        type: "datePicker",
        onOk: date => {
          this.occurDate = date;
        }
      });
    },
    // 数据回显
    getHistory() {
      let api =
        "/plugin/psychosocialService/serviceItems/eventExecutionForMobile.action";
      this.$http
        .post(api, {
          "serviceItemsVo.id":this.dataId
        })
        .then(
          response => {
           if(response!=null){
          
            if (response.serviceRecordVo != undefined) {
              //服务时间
              this.occurDate = response.serviceRecordVo.occurDate;
              //服务地点
              this.occurPlace = response.serviceRecordVo.occurPlace;
              //记录所属人 显示数据
              this.serviceMembers = response.serviceRecordVo.serviceMembers;
              //记录所属人要提交的数据
              let arr = [],
                membersLists;
              for (
                let i = 0;
                i < response.serviceRecordVo.members.length;
                i++
              ) {
                if (response.serviceRecordVo.members[i].teamId == undefined) {
                  membersLists =
                    response.serviceRecordVo.members[i].memberId +
                    "-" +
                    response.serviceRecordVo.members[i].memberName +
                    "-" +
                    0;
                } else {
                  membersLists =
                    response.serviceRecordVo.members[i].memberId +
                    "-" +
                    response.serviceRecordVo.members[i].memberName +
                    "-" +
                    response.serviceRecordVo.members[i].teamId;
                }
                arr.push(membersLists);
              }
              this.serviceValue = String(arr);
              //服务参与人
              this.serviceJoiners = response.serviceRecordVo.serviceJoiners;
              //反馈内容
              this.serviceContent = response.serviceRecordVo.serviceContent;
              //  console.log(response.serviceRecordVo.serviceRecordAttachments)
              //点击执行后数据回显的serviceRecordVo用户名
              this.createUser = response.serviceRecordVo.createUser;
              //点击执行后数据回显的serviceRecordVo时间
              this.createDate = response.serviceRecordVo.createDate;
              // 点击执行后数据回显的serviceRecordVo组织机构id，如果没有回显数据，就是当前所选得组织id
              this.userOrgId = response.serviceRecordVo.organization.id;
              this.organizationId = response.serviceRecordVo.organization.id;
              //点击执行后数据回显serviceRecordVo.id，如果没有回显就是空
              this.recordId = response.serviceRecordVo.id;
              //点击执行后数据回显的serviceRecordVo.teamId，如果没有回显就是serviceItems.id
              this.teamId = response.serviceRecordVo.teamId;

              //附件
              this.result = response.serviceRecordVo.serviceRecordAttachments;
              for (
                let i = 0;
                i < response.serviceRecordVo.serviceRecordAttachments.length;
                i++
              ) {
                this.result[i].name =
                  response.serviceRecordVo.serviceRecordAttachments[i].fileName;
                this.result[i].urlSubmit =
                  response.serviceRecordVo.serviceRecordAttachments[
                    i
                  ].fileActualUrl;
              }
              // console.log(Array.from(this.result))
            } else {
              this.userOrgId = this.chooseOrganizationId;
              this.organizationId = this.chooseOrganizationId;
              this.recordId = "";
              this.teamId = response.serviceItems.id;
              this.createUser = '';
              this.createDate = '';
            }
            // 提交需要的参数
            //点击执行后数据回显服务事项的人员id
            this.peopleId = response.serviceItems.peopleId;
            //点击执行后数据回显服务事项的人员姓名
            this.peopleName = response.serviceItems.peopleName;
            //点击执行后数据回显的服务事项的人员类型
            this.populationType = response.serviceItems.populationType;
            //点击执行后数据回显的serviceItems.id
            this.id = response.serviceItems.id;
           }
          },
          () => {}
        );
    },
    // 记录所属人
    inputName(e) {
      if (e.target.value != "") {
        let Earr = []
        Earr = e.target.value.split(';')
        e.target.value = Earr[Earr.length-1]
        this.getPeople(e.target.value);
      }
    },
    shpwOk(desc, label, value) {
      this.Aname = this.Aname + label + ';'
      this.serviceMembers = this.Aname;
      this.serviceValue = value;
      this.isRecord = false;
    },
    getPeople(name) {
      var api = "/plugin/serviceTeam/serviceRecord/findServiceMembers.action";
      this.$http
        .post(api, {
          // 记录所属人输入的姓名
          "serviceTeamMemberVo.name": name,
          "serviceTeamMemberVo.org.id": this.chooseOrganizationId
        })
        .then(
          response => {
            this.serverData = response;
            this.isRecord = true;
          },
          () => {}
        );
    },
    submit() {
      let attachFiles = [];
      let attachFileUrls = [];
      for (let i = 0; i < this.result.length; i++) {
        if (this.result[i].fileActualUrl != undefined) {
          attachFiles.push(this.result[i].id + "," + this.result[i].name);
          attachFileUrls.push(
            this.result[i].urlSubmit + "!" + this.result[i].name + "!" + 123
          );
        } else {
          // .substring(3)
          attachFiles.push(" ," + this.result[i].name);
          attachFileUrls.push(
            this.result[i].urlSubmit +
              "!" +
              this.result[i].name +
              "!" +
              0
          );
        }
      }
      this.attachFiles = attachFiles;
      this.attachFileUrls = attachFileUrls;

      // console.log(this.attachFiles)
      // console.log(this.attachFileUrls)

      if (this.serviceContent == "") {
        this.isOnlyTop = true;
        this.popContent = "反馈内容不能为空";
         common.getPop(this)
      }
      if (this.serviceMembers == "") {
        this.isOnlyTop = true;
        this.popContent = "记录所属人不能为空";
         common.getPop(this)
      }
      if (this.occurDate == "") {
        this.isOnlyTop = true;
        this.popContent = "服务时间不能为空";
         common.getPop(this)
      }
      if (this.occurPlace == "") {
        this.isOnlyTop = true;
        this.popContent = "服务地点不能为空";
         common.getPop(this)
      }
      if (
        this.serviceContent != "" &&
        this.serviceMembers != "" &&
        this.occurPlace != "" &&
        this.occurDate != ""
      ) {
        let api =
          "/plugin/psychosocialService/serviceItems/addServiceRecordForMobile.action";
        this.$http
          .post(api, {
            flag: "true",
            "serviceItemsVo.peopleId": this.peopleId,
            "serviceItemsVo.peopleName": this.peopleName,
            "serviceItemsVo.populationType": this.populationType,
            "serviceItemsVo.id": this.id,
            "serviceRecord.createUser": this.createUser,
            "serviceRecord.createDate": this.createDate,
            "serviceRecord.userOrgId": this.userOrgId,
            "serviceRecord.organization.id": this.organizationId,
            "serviceRecord.id": this.recordId,
            "serviceRecord.teamId": this.teamId,
            "serviceRecord.occurDate": this.occurDate,
            "serviceRecord.occurPlace": this.occurPlace,
            "serviceRecord.serviceMembers": this.serviceValue,
            "serviceRecord.serviceJoiners": this.serviceJoiners,
            "serviceRecord.serviceContent": this.serviceContent,
            //附件名称
            attachFiles: this.attachFiles,
            //附件url
            attachFileUrls: this.attachFileUrls
          })
          .then(
            response => {
              if (response == true) {
                 sessionStorage.setItem('ok',true)
                this.$router.go(-1);
              }
              if (response.message == "附件上传失败") {
                this.isOnlyTop = true;
                this.popContent = "附件上传失败";
                common.getPop(this)
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
.file {
  position: absolute;
  right: 12px;
  top: 0px;
  width: 100px;
}
input {
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
.fileList {
  position: relative;
}
.fileName {
  width: 200px;
  overflow-x: scroll;
}
// 记录所属人蒙版
.record_dialog {
  position: fixed;
  left: 0;
  top: 190px;
  height: 77%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  overflow-y: scroll;
}
.record_lists {
  background: #fff;
}
.record_list {
  height: 80px;
}
.record_icon {
  width: 52px;
  height: 52px;
  display: inline-block;
  border-radius: 50%;
  margin: 14px 14px 0 12px;
}
.record_content {
  width: 290px;
  height: 100%;
  float: right;
  position: relative;
}
.record_content:before {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #f3f5f9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.record_content p {
  font-family: PingFangSC-Regular;
  font-weight: 400;
}
.record_content p:nth-child(1) {
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  margin-top: 20px;
}
.record_content p:nth-child(2) {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
}
// 取消
.m-act-del {
  right: 12px;
  top: 18px;
  position: absolute;
  display: inline-block;
  width: 12px;
  height: 12px;
  overflow: hidden;
  background: #db384c;
  border-radius: 50%;
}
.m-act-del::before,
.m-act-del::after {
  content: "";
  position: absolute;
  height: 1px;
  width: 70%;
  top: 50%;
  left: 2px;
  margin-top: -1px;
  background: #fff;
}
.m-act-del::before {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.m-act-del::after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
</style>
