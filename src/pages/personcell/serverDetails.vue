<template>
  <div>
    <div class="header">
      <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
      服务记录
    </div>
    <div class="serverWarp">
      <List v-for="(item,index) in datetilsData" :key="item.item">
        <slot slot="name">{{item.name}}</slot>
        <slot slot="mes">{{item.mes}}</slot>
      </List>
      <div class="megWarp" v-show="this.fujianData.length > 0">
        <p class="meg_item1">附件</p>
        <div class="meg_item2">
          <p v-for="(item,index) in fujianData" @click="download(item,index)">{{item.mes}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import List from "@/components/basic/list";
// import  "../../assets/js/download.js";
export default {
  components: {
    List
  },
  data() {
    return {
      datetilsData: [],
      fujianData: [],
      serverId: 0
    };
  },
  mounted() {
    this.serverId = this.$route.query.serverId;
    this.ServiceRecordForMobile(this.serverId);
  },
  methods: {
    // 服务记录详情
    ServiceRecordForMobile(id) {
      this.$http
        .post(
          "/plugin/serviceTeam/serviceRecord/viewServiceRecordForMobile.action",
          {
            "serviceRecord.id": id
          }
        )
        .then(res => {
          this.datetilsData = [];
          this.datetilsData = [
            {
              name: "服务地点",
              mes: `${res.occurPlace === undefined ? "" : res.occurPlace}`
            },
            {
              name: "服务时间",
              mes: `${res.occurDate === undefined ? "" : res.occurDate}`
            },
            {
              name: "记录所属人",
              mes: `${
                res.serviceMembers === undefined ? "" : res.serviceMembers
              }`
            },
            {
              name: "服务内容",
              mes: `${
                res.serviceContent === undefined ? "" : res.serviceContent
              }`
            }
          ];
        
          if (res.serviceRecordAttachments != undefined) {
             console.log(res.serviceRecordAttachments)
              this.fujianData = [];
            for (let i = 0; i < res.serviceRecordAttachments.length; i++) {
             
              console.log(res.serviceRecordAttachments[i].fileActualUrl);
              this.fujianData.push({
                name: "附件",
                mes: `${res.serviceRecordAttachments[i].fileName}`,
                serviceRecordAttachmentsId: res.serviceRecordAttachments[i].id,
                url: res.serviceRecordAttachments[i].fileActualUrl
              });
            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 下载附件
    download(item, index) {
      // if (item.name == "附件") {
      //   this.downLoadAttachFile(item.serviceRecordAttachmentsId);
      //   let aTag = document.createElement("a");
      //   let blob = new Blob([this.content]); // 这个content是下载的文件内容
      //   aTag.download = item.mes; // 下载的文件名
      //   aTag.href = URL.createObjectURL(blob);
      //   aTag.click();
      //   URL.revokeObjectURL(blob);
        // let url = item.url,
        //   name = item.mes;
        // download(url, name, "text/plain");
         window.jsInterface.download(item.url);
      // }
    },
    // 服务记录详情页的附件下载
    downLoadAttachFile(keyId) {
      this.$http
        .post("/enclosureTQOSS/downLoadAttachFile.action", {
          keyId: keyId,
          keyMode: "serviceRecord"
        })
        .then(res => {
          // this.content = res;
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
.meg_item2{
  p{
    color: #30a4ff;
  }
}
</style>
