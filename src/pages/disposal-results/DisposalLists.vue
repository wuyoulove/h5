<template>
  <div class="container">
    <div class="socialMind-box">
      <div class="header">
        <router-link to="/Index">
          <img src="../../assets/img/back-bg.png" alt="goback">
        </router-link>处置结果
      </div>
      <div class="nav">
        <div class="nav-left nav_item" @click="impPerson()" :class="{nav_cur : isShow}">当前列表</div>
        <div class="nav_br fl"/>
        <div class="nav-right nav_item" @click="warpTrigger()" :class="{nav_cur : !isShow}">下辖列表</div>
      </div>
      <!--列表-->
      <div class="warp-z">
        <div class="global-promotion">
          <div>
            <span @click="getCurindexU()" :class="{pelType:activeClass}">未完成</span>
          </div>
          <div>
            <span @click="getCurindexC()" :class="{pelType:!activeClass}">已完成</span>
          </div>
        </div>
        <div class="selWarp">
          <div class="fl" @click="selectArea()">
            <span class="selArea">{{ text }}</span>
            <span class="sel_ico1"></span>
          </div>
          <div class="filtrate" @click="filtrate">筛选</div>
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
            <router-link :to="{name:'ResultDetail',query:{signerId:item.id}}">
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
              <router-link
                :to="{name:'ResultsView',query:{signerId:item.id,peopleId:item.peopleId,populationType:'mentalPatient'}}"
              >
                <span class="eval btn_common">查看</span>
              </router-link>
              <span
                class="sign_btn btn_common"
                v-show="getMore&&authorityIs"
                @click="evaluate(item)"
              >评估</span>
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
    pullRefresh,
    AreaSelect
  },
  data() {
    return {
      api: Config.api,
      //当前
      isShow: true,
      activeClass: true,
      //评估按钮
      getMore: true,
      // 地区选择
      isArea: false,
      showArea: false,
      text: "未选择",
      loginData: [],
      // AssData:[],
      curparentOrgId: 0,
      chooseOrganizationId: 0,
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
        this.lista = [];
        this.lista = data;
        this.sumtotal = this.response.length;
        sessionStorage.setItem("response", JSON.stringify(this.response));
        sessionStorage.setItem("sumtotal", this.sumtotal);
        this.listdata = this.response;
      } else {
        // this.lista = [];
      }
    });
  },
  watch: {
    chooseOrganizationId(neworgId, oldorgId) {
       if (oldorgId != 0) {
        this.getCurrentLists();
      }
      this.page = 1;
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
      this.chooseOrganizationId = Number(this.loginData[1]);
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
        sessionStorage.setItem("dealStep", 4);
        //评估按钮
        this.getMore = true;
        this.isShow = true;
        this.dealStep = 4;
      }
      this.getCurrentLists();
    }
    if (JSON.parse(sessionStorage.getItem("response") != null)) {
      this.response = JSON.parse(sessionStorage.getItem("response"));
      let response = [];
      for (let i = 0; i < this.response.length; i++) {
        response.push(this.response[i]);
      }
      // this.listdata = response.slice(0, this.num);
       this.listdata = response
      this.sumtotal = sessionStorage.getItem("sumtotal");
      // 当前已完成
      if (
        sessionStorage.getItem("orgScope") == "sameGrade" &&
        sessionStorage.getItem("dealStep") == 5
      ) {
        this.getMore = false;
        this.isShow = true;
        this.dealStep = 5;
        this.activeClass = false;
      }
      // 当前未完成
      if (
        sessionStorage.getItem("orgScope") == "sameGrade" &&
        sessionStorage.getItem("dealStep") == 4
      ) {
        this.getMore = true;
        this.isShow = true;
        this.dealStep = 4;
        this.activeClass = true;
      }
      //下辖已完成
      if (
        sessionStorage.getItem("orgScope") == "directJurisdiction" &&
        sessionStorage.getItem("dealStep") == 5
      ) {
        this.getMore = false;
        this.isShow = false;
        this.dealStep = 5;
        this.activeClass = false;
      }
      //下辖未完成
      if (
        sessionStorage.getItem("orgScope") == "directJurisdiction" &&
        sessionStorage.getItem("dealStep") == 4
      ) {
        this.getMore = false;
        this.isShow = false;
        this.dealStep = 4;
        this.activeClass = true;
      }
      this.orgScope = sessionStorage.getItem("orgScope");
    }
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    this.pullHeight = h - 176 + "px";
    this.authority();
    //   sessionStorage.setItem("authorityIs", this.authorityIs);
    // this.authorityIs = sessionStorage.getItem('authorityIs')
  },
  methods: {
    // 评估
    evaluate(item) {
      console.log(item);
      this.AssData = JSON.stringify(item);
      sessionStorage.setItem("disAssData", this.AssData);
      this.$router.push({
        path: "/PersonAsse"
      });
    },
    //已完成
    getCurindexC() {
      this.activeClass = !this.activeClass;
      this.dealStep = 5;
      this.getMore = false;
      sessionStorage.setItem("dealStep", 5);
      this.getCurrentLists();
    },
    //未完成
    getCurindexU() {
      this.activeClass = !this.activeClass;
      this.dealStep = 4;
      this.getMore = true;
      sessionStorage.setItem("dealStep", 4);
      this.getCurrentLists();
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
      if (sessionStorage.getItem("dealStep") == 5) {
        this.getMore = false;
      }
      this.getCurrentLists();
    },
    //点击下辖列表
    warpTrigger() {
      this.authorityIs = false;
      this.isShow = false;
      this.isText = true;
      this.isTextLe = false;
      this.orgScope = "directJurisdiction";
      sessionStorage.setItem("orgScope", "directJurisdiction");
      //隐藏评估
      this.getMore = false;
      this.getCurrentLists();
    },
    //当前处置结果列表
    getCurrentLists() {
      var api =
        "/plugin/psychosocialService/personnelAssessManage/findPersonnelAssessPageBySearchVoForMobile.action";
      this.$http
        .post(api, {
          // 当前所选择的组织机构id
          "serviceSearchVo.organization.id": this.chooseOrganizationId,
          //当前列表使用sameGrade、下辖列表使用directJurisdiction
          "serviceSearchVo.orgScope": this.orgScope,
          // 当前登录对象所在层级 全国60、省50、市40、区县30、街道20、村10、网格0
          "serviceSearchVo.internalId": this.internalId,
          // 4未完成、5已完成
          "serviceSearchVo.dealStep": this.dealStep,
          "serviceSearchVo.populaitionType": "mentalPatient",
          // rows: 10,
          page: 1
        })
        .then(
          response => {
            if (response != null) {
              this.response = response.rows;
              this.responseSum = response.rows;
              this.sumtotal = response.records;
              this.sumtotal1 = response.records
              sessionStorage.setItem("response", JSON.stringify(this.response));
               sessionStorage.setItem("Sumresponse", JSON.stringify(this.response));
              sessionStorage.setItem("sumtotal", this.sumtotal);
              sessionStorage.setItem("Asumtotal", this.sumtotal);
              this.listdata = response.rows;
              if (this.lista != undefined) {
                this.response = this.lista.rows;
                this.sumtotal = this.lista.records;
                let response = [];
                this.listdata = this.lista.rows;
              }
            }
          },
          () => {}
        );
    },
    onRefresh(done) {
      sessionStorage.removeItem("shaixuan")
      setTimeout(() => {
        this.dealStep = sessionStorage.getItem("dealStep");
        this.orgScope = sessionStorage.getItem("orgScope");
        if (this.lista != undefined) {
          this.listdata = JSON.parse(sessionStorage.getItem("Sumresponse"));
          this.sumtotal = sessionStorage.getItem("Asumtotal")
        } else {
          this.getCurrentLists();
        }
        done();
        this.page = 1;
      }, 1000);
    },
    loadMore(done) {
      this.isRefreshing = true;
      this.dealStep = sessionStorage.getItem("dealStep");
      this.orgScope = sessionStorage.getItem("orgScope");
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
          }else{
            this.date = ''
            this.dateEnd = ''
            this.warningLevelId = ''
            this.planName = ''
          }
          var api =
            "/plugin/psychosocialService/personnelAssessManage/findPersonnelAssessPageBySearchVoForMobile.action";
          this.$http
            .post(api, {
              // 当前所选择的组织机构id
              "serviceSearchVo.organization.id": this.chooseOrganizationId,
              //当前列表使用sameGrade、下辖列表使用directJurisdiction
              "serviceSearchVo.orgScope": this.orgScope,
              // 当前登录对象所在层级 全国60、省50、市40、区县30、街道20、村10、网格0
              "serviceSearchVo.internalId": this.internalId,
              // 4未完成、5已完成
              "serviceSearchVo.dealStep": this.dealStep,
              "serviceSearchVo.populaitionType": "mentalPatient",
              'serviceSearchVo.beginDate':this.date,
              // 截至时间
              'serviceSearchVo.endDate':this.dateEnd,
              // 预警等级
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
            enamesStr: "personnelAssess"
          }
        )
        .then(res => {
          this.authorityIs = res.data.personnelAssess;
          this.loginId = JSON.parse(sessionStorage.getItem("id"))[1];
          this.chooseOrganizationId =JSON.parse( sessionStorage.getItem("chooseOrganizationId"));
          if (this.loginId == this.chooseOrganizationId && this.orgScope == 'sameGrade') 
          {
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
    //筛选
    filtrate() {
      this.$router.push({
        name: "ResultsScreening",
        query: {
          chooseOrganizationId: this.chooseOrganizationId,
          orgScope: this.orgScope,
          internalId: this.internalId,
          dealStep: this.dealStep,
          text: this.text
        }
      });
      this.response = [];
    },
    //顶部注释部分代码
    selctArea() {
      this.showArea = true;
    }
  },
  destroyed() {
    eventBus.$off("choiceList");
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/listCommon.css";
@import "../../assets/css/listThress.css";
.yo-scroll {
  top: 180px;
}
.selWarp {
  margin-top: 0;
}
.global-promotion {
  touch-action: none;
  margin-top: 10px !important;
  width: 100%;
  height: 43px;
  line-height: 43px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.5px 0rem 0rem rgba(227, 227, 227, 1);
}
.global-promotion div {
  width: 50%;
  text-align: center;
  float: left;
}
.global-promotion span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.global-promotion .pelType {
  color: rgba(255, 184, 34, 1);
  border-bottom: 1px solid #ffb822;
}
/deep/ .v-easy-refresh .v-easy-refresh-body {
  z-index: 99;
}
</style>
