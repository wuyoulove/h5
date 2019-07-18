<template>
  <div class="container">
    <div class="socialMind-box">
      <div class="header">
        <router-link to="/Index">
          <img src="../../assets/img/back-bg.png" alt="goback">
        </router-link>服务计划
      </div>
      <div class="nav">
        <div class="nav-left nav_item" @click="impPerson()" :class="{nav_cur : isShow}">当前列表</div>
        <div class="nav_br fl"/>
        <div class="nav-right nav_item" @click="warpTrigger()" :class="{nav_cur : !isShow}">下辖列表</div>
      </div>
      <!--当前列表-->
      <div class="warp-z">
        <div class="selWarp">
          <div class="fl" @click="selectArea()">
            <span class="selArea">{{ text }}</span>
            <span class="sel_ico1"></span>
          </div>
          <div class="filtrate fr" @click="filtrate">筛选</div>
        </div>
        <div class="noMeg" v-show="listdata.length == 0">暂无更多数据显示</div>
        <!-- <pull-refresh :refreshing="isRefreshing" :on-refresh="onRefresh" :style="{height:pullHeight}" v-show="listdata.length > 0"> -->
        <EasyRefresh
          :userSelect="false"
          :onRefresh="onRefresh"
          :loadMore="loadMore"
          :style="{height:pullHeight}"
        >
          <template v-slot:header>
            <ClassicsHeader
              :refreshText="refreshText"
              :refreshReadyText="refreshReadyText"
              :refreshingText="refreshingText"
              :refreshedText="refreshedText"
            />
          </template>
          <div class="mesWarp" v-for="(item,index) in listdata">
            <div class="name line">
              <img v-if="item.gender==genderList[1]" src="../../assets/img/female.png" alt>
              <img v-else-if="item.gender==genderList[0]" src="../../assets/img/male.png" alt>
              {{item.peopleName}}
            </div>
            <router-link :to="{name:'PlanDetail',query:{signerId:item.id}}">
              <div class="message line">
                <p class="site">人员类型：{{item.peopleTypeName}}</p>
                <p class="warn">
                  预警等级：
                  <img
                    class="warn_ico"
                    v-if="item.warningLevel.id==warningLevelArr[0]"
                    src="../../assets/img/redlight.png"
                    alt
                  >
                  <img
                    class="warn_ico"
                    v-if="item.warningLevel.id==warningLevelArr[1]"
                    src="../../assets/img/Orangelight.png"
                    alt
                  >
                  <img
                    class="warn_ico"
                    v-if="item.warningLevel.id==warningLevelArr[2]"
                    src="../../assets/img/yellowlight.png"
                    alt
                  >
                  <img
                    class="warn_ico"
                    v-if="item.warningLevel.id==warningLevelArr[3]"
                    src="../../assets/img/greenlight.png"
                    alt
                  >
                </p>
              </div>
            </router-link>
            <div class="evaluate">
              <router-link :to="{name:'PlanView',query:{signerId:item.id}}">
                <span class="eval btn_common">查看</span>
              </router-link>
              <router-link
                :to="{name:'MakePlan',query:{signerId:item.id,chooseOrganizationId:chooseOrganizationId}}"
              >
                <span class="sign_btn btn_common" v-show="getMore&&authorityIs">制定计划</span>
              </router-link>
            </div>
          </div>
          <!-- </pull-refresh> -->
          <template v-slot:footer>
            <ClassicsFooter
              :loadText="loadText"
              :loadReadyText="loadReadyText"
              :loadingText="loadingText"
              :loadedText="loadedText"
              :noMoreText="noMoreText"
            />
          </template>
        </EasyRefresh>
      </div>
      <!-- 地区选择 -->
      <AreaSelect
        v-show="isArea"
        :loginData="loginData"
        :curparentOrgId="curparentOrgId"
        @sendIsArea="getIsArea"
        @sendText="getText"
        @sendParentOrgId="getParentOrgId"
        @sendinternalId="getinternalId"
      ></AreaSelect>
    </div>
    <div class="sumtil" v-show="this.isRefreshing">共{{this.sumtotal}}条</div>
  </div>
</template>
<script>
import Config from "../../model/config.js";
import Common from "../../assets/js/common.js";
// 刷新加载更多的组件
import pullRefresh from "../../components/basic/pullRefresh";
//地区组件
import AreaSelect from "@/components/basic/areaSelect";
import eventBus from "../../assets/js/eventBus.js";
export default {
  components: {
    AreaSelect,
    pullRefresh
  },
  data() {
    return {
      api: Config.api,
      //当前
      isShow: true,
      //制定计划按钮
      getMore: true,
      // 地区选择
      isArea: false,
      showArea: false,
      text: "未选择",
      loginData: [],
      chooseOrganizationId: 0,
      curparentOrgId: 0,
      data: [
        {
          value: "",
          label: "",
          id: 1,
          children: []
        }
      ],
      // 下拉刷新设置  当前列表
      listdata: [],
      num: 5,
      isRefreshing: false,
      pullHeight: "",
      sumtotal: 0,
      authorityIs: false,
      refreshText: "下拉刷新",
      refreshReadyText: "释放刷新",
      refreshingText: "正在刷新",
      refreshedText: "完成刷新",
      loadText: "上拉加载",
      loadReadyText: "释放加载",
      loadingText: "正在加载",
      noMoreText: "没有更多数据",
      loadedText: "加载完成",
      page: 1
    };
  },
  created() {
    eventBus.$on("choiceList", data => {
      if (data != undefined) {
        this.response = data.rows;
        this.sumtotal =data.records;
        sessionStorage.setItem("response", JSON.stringify(this.response));
        let response = [];
        sessionStorage.setItem("sumtotal", this.sumtotal);
        for (let i = 0; i < this.response.length; i++) {
          response.push(this.response[i]);
        }
        this.listdata = response;
      }
    });
  },
  watch: {
    chooseOrganizationId(neworgId, oldorgId) {
      if (oldorgId != 0) {
        this.getCurrentLists();
      }
    },
    text(newText, oldText) {
      if (sessionStorage.getItem("text") != undefined) {
        this.loginData = JSON.parse(sessionStorage.getItem("id"));
        if (newText != this.loginData[0]) {
          this.getMore = false;
        } else {
          this.getMore = true;
        }
      }
    }
  },
  mounted() {
    //预警等级
    Common.getWarningLevel(this);
    Common.getGender(this);
    if (sessionStorage.getItem("text") == undefined) {
      this.loginData = JSON.parse(sessionStorage.getItem("id"));
      this.text = this.loginData[0];
      this.internalId = this.loginData[2];
      this.chooseOrganizationId = this.loginData[1];
      sessionStorage.setItem("chooseOrganizationId",JSON.stringify(this.chooseOrganizationId));
      this.loginId = this.loginData[1];
    } else {
      this.loginData[0] = sessionStorage.getItem("text");
      this.loginData[1] = sessionStorage.getItem("orgId");
      this.loginData[2] = sessionStorage.getItem("internalId");
      this.text = this.loginData[0];
      this.curparentOrgId = Number(this.loginData[1]);
      this.internalId = this.loginData[2];
      // sessionStorage.removeItem("text");
      // sessionStorage.removeItem("orgId");
      // sessionStorage.removeItem("internalId");
    }

    if (
      this.response == undefined &&
      JSON.parse(sessionStorage.getItem("response") == null)
    ) {
      if (sessionStorage.getItem("orgScope") == null) {
        //初始化
        this.orgScope = "sameGrade";
        sessionStorage.setItem("orgScope", "sameGrade");
        //制定按钮
        this.getMore = true;
        this.isShow = true;
      }
      this.getCurrentLists();
    }
    if (JSON.parse(sessionStorage.getItem("response") != null)) {
      this.response = JSON.parse(sessionStorage.getItem("response"));
      let response = [];
      for (let i = 0; i < this.response.length; i++) {
        response.push(this.response[i]);
      }
      this.listdata = response;
      this.sumtotal = sessionStorage.getItem("sumtotal");
      if (sessionStorage.getItem("orgScope") == "sameGrade") {
        this.getMore = true;
        this.isShow = true;
      }
      if (sessionStorage.getItem("orgScope") == "directJurisdiction") {
        this.getMore = false;
        this.isShow = false;
      }
      this.orgScope = sessionStorage.getItem("orgScope");
      if (sessionStorage.getItem("ok") == "true") {
        this.getCurrentLists();
      }
    }
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    this.pullHeight = h - 136 + "px";
    this.authority();
  },
  methods: {
    //计划列表
    getCurrentLists() {
      var api =
        "/plugin/psychosocialService/servicePlanManage/findServicePlanPageBySearchVoForMobile.action";
      this.$http
        .post(api, {
          // 当前所选择的组织机构id
          "serviceSearchVo.organization.id": this.chooseOrganizationId,
          //当前列表使用sameGrade、下辖列表使用directJurisdiction
          "serviceSearchVo.orgScope": this.orgScope,
          // 当前登录对象所在层级 全国60、省50、市40、区县30、街道20、村10、网格0
          "serviceSearchVo.internalId": this.internalId,
          "serviceSearchVo.dealStep": 2,
          // rows: 10,
          page: 1
        })
        .then(
          response => {
            if (response != null) {
              this.response = response.rows;
              this.sumtotal = response.records;
              sessionStorage.setItem("response", JSON.stringify(this.response));
              sessionStorage.setItem("sumtotal", this.sumtotal);
              this.listdata = response.rows;
            }
          },
          () => {}
        );
    },
    onRefresh(done) {
      sessionStorage.removeItem("shaixuan")
      setTimeout(() => {
        this.getCurrentLists();
        done();
        this.page = 1;
      }, 1000);
    },
    loadMore(done) {
      this.isRefreshing = true;
      setTimeout(() => {
        this.page = this.page + 1;
        this.isRefreshing = false;
        if (Math.ceil(this.sumtotal / 10) < this.page) {
          done(true);
        } else {
          if(JSON.parse(sessionStorage.getItem("shaixuan")) != null){
            this.date = JSON.parse(sessionStorage.getItem("shaixuan"))[0].date
            this.dateEnd = JSON.parse(sessionStorage.getItem("shaixuan"))[0].dateEnd
            this.warningLevelId = JSON.parse(sessionStorage.getItem("shaixuan"))[0].warningLevelId
            this.planName = JSON.parse(sessionStorage.getItem("shaixuan"))[0].planName
            this.dealStep = ''
          }else{
            this.date = ''
            this.dateEnd = ''
            this.warningLevelId = ''
            this.planName = ''
            this.dealStep = 2
          }
          var api =
            "/plugin/psychosocialService/servicePlanManage/findServicePlanPageBySearchVoForMobile.action";
          this.$http
            .post(api, {
              // 当前所选择的组织机构id
              "serviceSearchVo.organization.id": this.chooseOrganizationId,
              //当前列表使用sameGrade、下辖列表使用directJurisdiction
              "serviceSearchVo.orgScope": this.orgScope,
              // 当前登录对象所在层级 全国60、省50、市40、区县30、街道20、村10、网格0
              "serviceSearchVo.internalId": this.internalId,
              "serviceSearchVo.dealStep": this.dealStep,

              'serviceSearchVo.beginDate':this.date,
              // 截至时间
              'serviceSearchVo.endDate':this.dateEnd,
              'serviceSearchVo.warningLevel.id':this.warningLevelId,
              // 方案名称
              'serviceSearchVo.schemeName':this.planName,
              // rows: 10,
              page: this.page
            })
            .then(
              response => {
                if (response != null) {
                  if (response.rows != undefined) {
                    this.response = response.rows;
                    this.sumtotal = response.records;
                    sessionStorage.setItem(
                      "response",
                      JSON.stringify(this.response)
                    );
                    this.listdata = this.listdata.concat(response.rows);
                  }
                }
              },
              () => {}
            );
          done(false);
        }
      }, 1000);
    },
    //权限
    authority() {
      this.$http
        .post(
          "/mobile/sessionManageMobileManage/checkPermissionByEnames.action",
          {
            enamesStr: "makeServicePlan"
          }
        )
        .then(res => {
          this.authorityIs = res.data.makeServicePlan;
          this.loginId = JSON.parse(sessionStorage.getItem("id"))[1];
          this.chooseOrganizationId =JSON.parse( sessionStorage.getItem("chooseOrganizationId"));
          if (this.loginId === this.chooseOrganizationId && this.orgScope == 'sameGrade') {
            this.authorityIs = true;
          } else {
            this.authorityIs = false;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 地区选择
    getIsArea(data) {
      this.isArea = data;
    },
    getText(data) {
      this.text = data;
    },
    selectArea() {
      if (this.internalId > 0 || this.loginId != this.chooseOrganizationId) {
        this.isArea = true;
      }
    },
    getParentOrgId(data) {
      this.chooseOrganizationId = data;
      sessionStorage.setItem("chooseOrganizationId",JSON.stringify(this.chooseOrganizationId));
    },
    getinternalId(data) {
      this.internalId = data;
    },
    backArea(item, index) {
      this.sureArea.splice(index + 1, this.sureArea.length - 1 - index);
      this.getOrgList(item.orgId);
      this.orgName = item.orgName;
    },
    selct(item) {
      this.getOrgList(item.orgId);
      this.sureArea.push(item);
      this.orgName = item.orgName;
    },
    //点击当前列表
    impPerson() {
      this.isShow = true;
      this.isText = true;
      this.isTextLe = true;
      this.orgScope = "sameGrade";
      sessionStorage.setItem("orgScope", "sameGrade");
      if (sessionStorage.getItem("text") != undefined) {
        this.loginData = JSON.parse(sessionStorage.getItem("id"));
        if (sessionStorage.getItem("text") != this.loginData[0]) {
          this.getMore = false;
        } else {
          this.getMore = true;
        }
      } else {
        this.getMore = true;
      }
      this.getCurrentLists();
    },
    //点击下辖列表
    warpTrigger() {
      this.isShow = false;
      this.isText = true;
      this.isTextLe = false;
      this.orgScope = "directJurisdiction";
      sessionStorage.setItem("orgScope", "directJurisdiction");
      this.getMore = false;
      this.getCurrentLists();
    },
    //筛选
    filtrate() {
      this.$router.push({
        name: "PlanScreening",
        query: {
          chooseOrganizationId: this.chooseOrganizationId,
          orgScope: this.orgScope,
          internalId: this.internalId,
          text: this.text
        }
      });
      this.response = [];
    },
    //点击制定计划
    //顶部注释部分代码
    selctArea() {
      this.showArea = true;
    }
  },
  destroyed() {
    sessionStorage.removeItem("ok");
    eventBus.$off("choiceList");
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/listCommon.css";
@import "../../assets/css/listThress.css";
/deep/ .v-easy-refresh .v-easy-refresh-body {
  z-index: 99;
}
</style>
