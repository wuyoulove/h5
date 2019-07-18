<template>
  <div class="plan_msg">
    <div class="lists" v-for="(val,c) in serviceItemsList" :key="c">
      <div class="meg_item">
        <span class="begin_time">服务记录{{c+1}}</span>
        <div class="content">
          <p>
            <span>服务地点：</span>
            <span v-if="val.serviceRecord!=undefined">{{val.serviceRecord.occurPlace}}</span>
          </p>
          <p>
            <span>服务时间：</span>
            <span v-if="val.serviceRecord!=undefined">{{val.serviceRecord.occurDate}}</span>
          </p>
          <p>
            <span>记录所属人：</span>
            <span v-if="val.serviceRecord!=undefined">{{val.serviceRecord.serviceMembers}}</span>
          </p>
          <p>
            <span>服务参与人：</span>
            <span v-if="val.serviceRecord!=undefined">{{val.serviceRecord.serviceJoiners}}</span>
          </p>
          <p>
            <span>反馈内容：</span>
            <span v-if="val.serviceRecord!=undefined">{{val.serviceRecord.serviceContent}}</span>
          </p>
          <div class="file-warp">
            <div class="file_title">文件列表：</div>
            <div class="file_list">
              <!-- <p
                v-for="(item,index) in datetilsData"
                :key="item.item"
                @click="download(item,index)"
              >

                <span slot="mes">{{item.mes}}</span>
              </p> -->
                <p v-for="(item,index) in datetilsData" @click="download(item,index)">
                  <span slot="mes">{{item.mes}}</span>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="only_pop" v-show="isOnlyTop">{{popContent}}</div>
  </div>
</template>
<script>
import List from "@/components/basic/list";
import config from "../../model/config";
import common from "../../assets/js/common.js";
export default {
  components: {
    List
  },
  data() {
    return {
      msg: "",
      datetilsData: [],
      serviceItemsList: [],
      isOnlyTop: false,
      popContent: ""
    };
  },
  created() {
    if (JSON.parse(sessionStorage.getItem("serviceItemsList")) != null) {
      this.serviceItemsList = JSON.parse(
        sessionStorage.getItem("serviceItemsList")
      );
      console.log(this.serviceItemsList)
      this.Record = "serviceItems";
      this.fileList();
    } else {
      this.Record = "serviceRecord";
      this.getDetail(this.$route.query.signerId);
    }
  },
  methods: {
    tabChange: function(tab) {
      this.tabView = tab;
    },
    getDetail(signerId) {
      console.log(signerId)
      var api =
        "/plugin/psychosocialService/serviceItems/viewServiceItemsForMoblie.action";
      this.$http
        .post(api, {
          "serviceItemsVo.id": signerId
        })
        .then(
          response => {
            if (response.message) {
              this.isOnlyTop = true;
              this.popContent = `${response.message}`;
              common.getPop(this);
            } else {
              sessionStorage.setItem("queryData", JSON.stringify(response));
              this.serviceItemsList = response.serviceItemsList;
               console.log(this.serviceItemsList[0].serviceRecord)
              if (this.serviceItemsList[0].serviceRecord != undefined) {
                this.fileList();
              }
            }
          },
          () => {}
        );
    },
    fileList() {
      for (
        let i = 0;
        i <
        this.serviceItemsList[0].serviceRecord.serviceRecordAttachments.length;
        i++
      ) {
      
        this.datetilsData.push({
          name: "附件",
          mes: `${
            this.serviceItemsList[0].serviceRecord.serviceRecordAttachments[i]
              .fileName
          }`,
          serviceRecordAttachmentsId: this.serviceItemsList[0].serviceRecord.serviceRecordAttachments[i].id,
          url: this.serviceItemsList[0].serviceRecord.serviceRecordAttachments[i].fileActualUrl
        });
      }
    },
    // 下载附件
    download(item, index) {
      if (item.name == "附件") {
        // this.downLoadAttachFile(item.serviceRecordAttachmentsId);
        // let aTag = document.createElement("a");
        // let blob = new Blob([this.content]); // 这个content是下载的文件内容
        // aTag.download = item.mes; // 下载的文件名
        // aTag.href = URL.createObjectURL(blob);
        // aTag.click();
        // URL.revokeObjectURL(blob);
        //  let url = item.url,
        //   name = item.mes;
        // download(url, name, "text/plain");
         window.jsInterface.download(item.url);
      }
    },
    //附件下载
    downLoadAttachFile(keyId) {
      this.$http
        .post("/enclosureTQOSS/downLoadAttachFile.action", {
          keyId: keyId,
          keyMode: this.Record
        })
        .then(res => {
          this.content = res;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem("queryData");
  }
};
</script>
<style lang="scss" scoped >
.plan_msg {
  width: 100%;
  background: #fff;
  padding: 0 12px;
}
.plan_msg .lists {
  position: relative;
  padding: 17px 0px;
}
.plan_msg .lists:before {
  content: " ";
  position: absolute;
  left: 0px;
  bottom: 0;
  width: 351px;
  height: 1px;
  border-top: 1px solid #f3f5f9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.meg_item {
  width: 100%;
}
.begin_time {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 8px;
  display: block;
}
p {
  line-height: 26px;
}
p span {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  display: inline-block;
}
p span:nth-child(1) {
  width: 85px;
  vertical-align: top;
}
p span:nth-child(2) {
  width: 250px;
}
p:nth-child(5) span:nth-child(1) {
  width: 85px;
  vertical-align: top;
}
p:nth-child(5) span:nth-child(2) {
  width: 250px;
}
p:nth-child(6) span:nth-child(1) {
  width: 70px;
  vertical-align: top;
}
p:nth-child(6) span:nth-child(2) {
  width: 265px;
}
.file_title {
  vertical-align: top;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
}
.file_list {
  width: 78%;
  overflow-x: scroll;
  p{
    text-align: right;
  }
}
.file_list p span {
  color: #30a4ff;
}
.file-warp{
  display: flex;
}
</style>
