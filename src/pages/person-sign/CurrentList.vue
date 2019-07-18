<template>
  <div class="container">
    <div class="socialMind-box">
      <div class="header">
        <router-link to="/Index">
          <img src="../../assets/img/back-bg.png" alt="goback">
        </router-link>人员签收
        <span v-show="isTextLe" @click="tapDel">编辑</span>
        <span v-show="!isText" @click="del">批量签收</span>
      </div>
      <div class="nav">
        <div class="nav-left nav_item" @click="impPerson()" :class="{nav_cur : isShow}">当前列表</div>
        <div class="nav_br fl"/>
        <div class="nav-right nav_item" @click="warpTrigger()" :class="{nav_cur : !isShow}">下辖列表</div>
      </div>
      <!--列表-->
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
          <div class="mesWarp" v-for="(item,index) in listdata" style="z-index:10;">
            <div class="name line">
              <img
                v-if="item.gender==genderList[1]"
                src="../../assets/img/female.png"
                v-show="isText"
                alt
              >
              <img
                v-else-if="item.gender==genderList[0]"
                src="../../assets/img/male.png"
                v-show="isText"
                alt
              >
              <input
                type="checkbox"
                :value="index"
                v-model="selectArr"
                v-show="!isText"
                @click.stop.native
              >
              {{item.peopleName}}
            </div>
            <router-link :to="{name:'CurrentDetail',query:{signerId:item.id}}">
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
            <div class="evaluate" v-show="getMore">
              <span
                class="eval_more btn_common"
                v-show="isOnly&&authorityIs"
                @click="shpsign(item.id)"
              >签收</span>
              <span class="eval_more btn_common unonetap" v-show="!isOnly">签收</span>
            </div>
            <div class="evaluate" v-show="!getMore">
              <router-link :to="{name:'SignCheck',query:{signerId:item.id}}">
                <span class="eval_more btn_common" @click="shpwPop()">查看</span>
              </router-link>
            </div>
          </div>
          <template v-slot:footer>
            <ClassicsFooter
              :loadText="loadText"
              :loadReadyText="loadReadyText"
              :loadingText="loadingText"
              :loadedText="loadedText"
              :noMoreText="noMoreText"
            />
          </template>
          <!-- :loadedText="loadedText" -->
        </EasyRefresh>
        <!-- </pull-refresh> -->
      </div>
      <!--批量删除弹窗-->
      <div class="pop-up" v-show="isFlag">
        <div class="popWarp"/>
        <div class="pop-content">
          <div class="tipContent">{{tipContent}}</div>
          <div class="tip-btn">
            <span class="del" @click="hidePopdel()">取消</span>
            <span class="sure" @click="hidePopsure()">确定</span>
          </div>
        </div>
      </div>
      <div class="pop-up" v-show="isOnlyFlag">
        <div class="popWarp"/>
        <div class="pop-content">
          <div class="tipContent">是否确认签收？</div>
          <div class="tip-btn">
            <span class="del" @click="hidePopdelOnly()">取消</span>
            <span class="sure" @click="hidePopsureOnly()">确定</span>
          </div>
        </div>
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
      <div class="only_pop" v-show="isOnlyTop">请勾选需要签收的人员</div>
    </div>
    <div class="sumtil" v-show="this.isRefreshing">共{{this.sumtotal}}条</div>
  </div>
</template>
<script>
import Vue from "vue";
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
      // 弹框
      isFlag: false,
      //签收按钮
      getMore: true,
      //编辑、批量签收
      isTextLe: true,
      isText: true,
      tipContent: "",
      arr: [],
      selectArr: [],
      //单个签收
      isOnlyFlag: false,
      isOnly: true,
      isOnlyTop: false,
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
      authorityIs: false,
      // 下拉刷新设置  当前列表
      listdata: [],
      num: 5,
      isRefreshing: false,
      pullHeight: "",
      sumtotal: 0,
      page:1,
      refreshText: "下拉刷新",
      refreshReadyText: "释放刷新",
      refreshingText: "正在刷新",
      refreshedText: "完成刷新",
      loadText: "上拉加载",
      loadReadyText: "释放加载",
      loadingText: "正在加载",
      noMoreText: "没有更多数据",
      loadedText: "加载完成"
    };
  },
  created() {
    eventBus.$on("choiceList", data => {
      if (data != undefined) {
        this.response = data.rows;
        sessionStorage.setItem("response", JSON.stringify(this.response));
        let response = [];
        for (let i = 0; i < this.response.length; i++) {
          response.push(this.response[i]);
        }
        this.sumtotal = data.records;
        sessionStorage.setItem("sumtotal", this.sumtotal);
        // this.listdata = response.slice(0, this.num).reverse();
        this.listdata = response.reverse();
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
    //签收需要用的手机号
    this.signTelephone = this.$route.query.data[5];
    //签收需要用到的姓名
    this.signName = this.$route.query.data[0];
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
        //签收按钮
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
      // this.listdata = response.slice(0, this.num);
      this.listdata = response
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
    }
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    this.pullHeight = h - 136 + "px";
    this.authority();
     if (this.orgScope == 'directJurisdiction' ) 
     {
        this.isText = true;
        this.isTextLe = false;
      }

  },
  methods: {
    //签收列表
    getCurrentLists() {
      const api =
        "/plugin/psychosocialService/personnelSignManage/findPersonnelSignPageBySearchVoForMobile.action";
      this.$http
        .post(api, {
          // 当前所选择的组织机构id
          "serviceSearchVo.organization.id": this.chooseOrganizationId,
          //当前列表使用sameGrade、下辖列表使用directJurisdiction
          "serviceSearchVo.orgScope": this.orgScope,
          // 当前登录对象所在层级 全国60、省50、市40、区县30、街道20、村10、网格0
          "serviceSearchVo.internalId": this.internalId,
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
              var response = [];
              for (let i = 0; i < this.response.length; i++) {
                response.push(this.response[i]);
              }
              this.listdata = response;
              this.page = 1;
            }
          },
          () => {}
        );
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
          }else{
            this.date = ''
            this.dateEnd = ''
            this.warningLevelId = ''
            this.planName = ''
          }
          const api =
            "/plugin/psychosocialService/personnelSignManage/findPersonnelSignPageBySearchVoForMobile.action";
          this.$http
            .post(api, {
              // 当前所选择的组织机构id
              "serviceSearchVo.organization.id": this.chooseOrganizationId,
              //当前列表使用sameGrade、下辖列表使用directJurisdiction
              "serviceSearchVo.orgScope": this.orgScope,
              // 当前登录对象所在层级 全国60、省50、市40、区县30、街道20、村10、网格0
              "serviceSearchVo.internalId": this.internalId,
              
              // 完成时间
              'serviceSearchVo.beginDate':this.date,
              // 截至时间
              'serviceSearchVo.endDate':this.dateEnd,
              // 本次只做精神病人员
              "serviceSearchVo.populaitionType": 'mentalPatient',
              // 预警等级
              'serviceSearchVo.warningLevel.id':this.warningLevelId,
              // 方案名称
              'serviceSearchVo.schemeName':this.planName,
              page: this.page
            })
            .then(
              response => {
                if (response != null) {
                  this.sumtotal = response.records;
                  this.listdata = this.listdata.concat(response.rows);
                }
              },
              () => {}
            );
          done(false);
        }
      }, 1000);
    },
    onRefresh(done) {
      sessionStorage.removeItem("shaixuan")
      setTimeout(() => {
        this.getCurrentLists();
        done();
        this.page = 1;
      }, 1000);
    },
    //权限
    authority() {
      this.$http
        .post(
          "/mobile/sessionManageMobileManage/checkPermissionByEnames.action",
          {
            enamesStr: "personnelSign"
          }
        )
        .then(res => {
          this.authorityIs = res.data.personnelSign;
          this.loginId = JSON.parse(sessionStorage.getItem("id"))[1];
          this.chooseOrganizationId =JSON.parse( sessionStorage.getItem("chooseOrganizationId"));
          if (this.loginId === this.chooseOrganizationId && this.orgScope == 'sameGrade' ) {
            this.authorityIs = true;
            this.getMore = true
          } else {
            this.authorityIs = false;
            this.getMore = false
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
    //点击当前列表
    impPerson() {
      this.isShow = true;
      this.isText = true;
      this.isTextLe = true;
      this.orgScope = "sameGrade";
      sessionStorage.setItem("orgScope", "sameGrade");
      // this.getMore = true;
      if (sessionStorage.getItem("text") != undefined) {
        this.loginData = JSON.parse(sessionStorage.getItem("id"));
        if (sessionStorage.getItem("text") != this.loginData[0]) {
          this.getMore = false;
          this.authorityIs = false;
        } else {
          this.getMore = true;
          this.authorityIs = true;
        }
      } else {
        // this.getMore = true;
        if (this.loginId === this.chooseOrganizationId) {
            this.getMore = true
            this.authorityIs = true;
          } else {
            this.getMore = false
            this.authorityIs = false;
          }
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
    //点击查看
    shpwPop() {
      this.isFlag = true;
    },
    //点击编辑
    tapDel() {
      this.isText = false;
      this.isTextLe = false;
      this.isOnly = false;
      this.tipContent = "是否确认批量签收？";
    },
    //批量签收
    del() {
      let allId = [];
      if (this.downdata != undefined) {
        this.listdata.concat(this.downdata).forEach(val => {
          allId.push(val);
        });
      } else {
        this.listdata.forEach(val => {
          allId.push(val);
        });
      }
      this.arr = [];
      for (let i = 0; i < allId.length; i++) {
        if (this.selectArr.indexOf(i) >= 0) {
        } else {
          this.arr.push(allId[i]);
        }
      }
      let delSid = [];
      for (let i = 0; i < this.selectArr.length; i++) {
        for (let j = 0; j < this.listdata.length; j++) {
          if (j == this.selectArr[i]) {
            delSid.push(this.listdata[j].id);
          }
        }
      }
      // 数组转字符串
      let delStr = ""; //空的字符串
      for (let i = 0; i < delSid.length - 1; i++) {
        delStr += delSid[i] + ",";
      }
      this.ids = delStr + delSid[delSid.length - 1];
      if (this.ids == "undefined") {
        this.isOnlyTop = true;
        Common.getPop(this);
        this.isFlag = false;
      } else {
        this.isOnlyTop = false;
        this.isFlag = true;
      }
    },
    // 批量签收
    //点击弹框取消
    hidePopdel() {
      this.isFlag = false;
    },
    //点击弹框确定
    hidePopsure() {
      const api =
        "/plugin/psychosocialService/personnelSignManage/maintainPersonnelSignForMoblie.action";
      this.$http
        .post(api, {
          mode: "submit",
          ids: this.ids,
          "personnelSign.organization.id": this.chooseOrganizationId,
          "personnelSign.signer": this.signName,
          "personnelSign.telephone": this.signTelephone
        })
        .then(
          response => {
            if (response == true) {
              this.isFlag = false;
              // 签收成功后
              // if (this.arr.length > 5) {
              //   this.listdata = this.arr.slice(0, 4);
              //   this.listdata = this.arr
              //   this.downdata = this.arr.slice(5);
              // } else {
              //   this.listdata = this.arr;
              //   this.downdata = [];
              // }
              this.listdata = this.arr;
              this.downdata = [];
              this.selectArr = [];
              this.isOnly = true;
              this.isTextLe = true;
              this.isText = true;
              document.getElementsByClassName(
              "v-easy-refresh-body"
            )[0].firstChild.style.transform =
              "translate3d(0px, 0px, 0px) scale(1)";
            }
          },
          () => {}
        );
    },
    //点击签收
    shpsign(item) {
      this.isOnlyFlag = true;
      this.delIdOnly = item;
    },
    hidePopdelOnly() {
      this.isOnlyFlag = false;
    },
    hidePopsureOnly() {
      const api =
        "/plugin/psychosocialService/personnelSignManage/maintainPersonnelSignForMoblie.action";
      this.$http
        .post(api, {
          mode: "submit",
          ids: String(this.delIdOnly),
          "personnelSign.organization.id": this.chooseOrganizationId,
          "personnelSign.signer": this.signName,
          "personnelSign.telephone": this.signTelephone
        })
        .then(
          response => {
            if (response == true) {
              let allId = [];
              if (this.downdata != undefined) {
                this.listdata.concat(this.downdata).forEach(val => {
                  allId.push(val);
                });
              } else {
                this.listdata.forEach(val => {
                  allId.push(val);
                });
              }
              let allLists = [];
              for (let i = 0; i < allId.length; i++) {
                if (allId[i].id != this.delIdOnly) {
                  allLists.push(allId[i]);
                }
              }
              // if (allLists.length > 5) {
              //   this.listdata = allLists.slice(0, 4);
              //   this.downdata = allLists.slice(5);
              // } else {
              //   this.listdata = allLists;
              //   this.downdata = [];
              // }
              this.listdata = allLists;
              this.downdata = [];
              this.isOnlyFlag = false;
            }
            document.getElementsByClassName(
              "v-easy-refresh-body"
            )[0].firstChild.style.transform =
              "translate3d(0px, 0px, 0px) scale(1)";
          },
          () => {}
        );
    },
    //筛选
    filtrate() {
      this.$router.push({
        name: "Screening",
        query: {
          chooseOrganizationId: this.chooseOrganizationId,
          orgScope: this.orgScope,
          internalId: this.internalId,
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
  beforeDestroy() {
    eventBus.$off("choiceList");
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/common.css";
@import "../../assets/css/listCommon.css";
//签收、查看按钮
.eval_more {
  float: right;
  margin-right: 12px;
}
/*弹窗*/
.popWarp {
  width: 100%;
  height: 667px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.pop-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 270px;
  height: 140px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  z-index: 9999;
}
.tipContent {
  width: 100%;
  height: 90px;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  color: rgba(102, 102, 102, 1);
  line-height: 90px;
  position: relative;
}
.tipContent:before {
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
.tip-btn {
  width: 100%;
}
.del {
  display: inline-block;
  width: 49%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.sure {
  display: inline-block;
  width: 49%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(48, 164, 255, 1);
}
// 批量删除时、单个签收的按钮置灰
.unonetap {
  background: rgba(243, 245, 249, 1);
  border: none;
  color: #fff;
}
/deep/ .v-easy-refresh .v-easy-refresh-body {
  z-index: 99;
}
</style>
