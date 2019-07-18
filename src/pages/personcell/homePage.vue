<template>
  <div class="container">
    <div class="socialMind-box">
      <router-link to="/">
        <div class="header">
          <img src="../../assets/img/back-bg.png" alt="goback">
          人员信息
        </div>
      </router-link>
      <div class="nav">
        <div class="nav-left nav_item" @click="impPerson()" :class="{nav_cur : isShow}">重点人员</div>
        <div class="nav_br"/>
        <div class="nav-right nav_item" @click="warpTrigger()" :class="{nav_cur : !isShow}">关怀对象</div>
      </div>
      <!--重点人员-->
      <div class="warp-z" v-show="isShow">
        <div class="global-promotion">
          <NavSlide @sendCurindex="getCurindex"></NavSlide>
        </div>
        <div class="selWarp">
          <div class @click="selectArea()">
            <span class="selArea">{{ text }}</span>
            <span class="sel_ico1"></span>
          </div>
          <div class="filtrate" @click="Filtrate()">筛选</div>
        </div>
        <div class="noMeg" v-show="internalId > 20">请切换到街道或以下层级查看人员信息！</div>
        <!-- <div v-for="(items,index) in list"> -->
        <EasyRefresh
          :userSelect="false"
          :onRefresh="onRefresh"
          :loadMore="loadMore"
          v-show="listdata.length > 0 && internalId <=
           20 "
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
          <Meglist v-for="( item , key ) in listdata" :key="item.id">
            <!-- v-show="listdata.length > 0 && curIndex == index" -->
            <slot slot="name">
              <div
                @click="correctMeg(item)"
                class="name line"
                :class="{nameFmale :item.gender != undefined && item.gender.id == genderList[1],namemale : item.gender != undefined &&  item.gender.id == genderList[0]}"
              >{{item.name}}</div>
            </slot>
            <!-- <router-link :to="{name:'correctMeg',query:{OrgId: item.id,parentOrgId:parentOrgId}}"> -->
            <slot slot="site">
              <span class="aaaa">地址：{{item.currentAddress}}</span>
            </slot>
            <slot slot="warnico">
              <span
                class="warn_ico"
                :class="{ warn_icoRed : item.warningLevel.id == warningLevelArr[0] ,warn_icoOrgange: item.warningLevel.id  == warningLevelArr[1], warn_icoYellow : item.warningLevel.id  == warningLevelArr[2], warn_icoGreen: item.warningLevel.id  == warningLevelArr[3]}"
              ></span>
            </slot>
            <!-- </router-link> -->
            <slot slot="eval">
              <span class="eval" @click="shpwPop(item)" v-show="(evaqx == true)&&authorityIs">评估</span>
            </slot>
          </Meglist>
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
        <!-- </div> -->
      </div>
      <!--关怀对象-->
      <div class="warp-g" v-show="!isShow">
        <div class="global-promotion">
          <span class="pelType">残疾人</span>
          <span class="pelDes">民政救助人员</span>
        </div>
        <div class="selWarp">
          <div class @click="selectArea()">
            <span class="selArea">{{ text }}</span>
            <span class="sel_ico1"></span>
          </div>
          <div class="filtrate" @click="Filtrate()">筛选</div>
        </div>
        <!-- <div class="noMeg" v-show="personData.length == 0">请切换到街道或以下层级查看人员信息！</div> -->
        <!-- <Meglist v-for="( item , key ) in personData" :key="item.id" v-show="personData.length > 0">
          <slot slot="name">
            <div
              class="name line"
              :style="{backgroundImage:item.sexSrc}"
              @click="correctMeg(item)"
            >{{item.name}}</div>
          </slot>
          <slot slot="site">地址：{{item.site}}</slot>
          <slot slot="warnico" :style="{background:item.warnSrc}"></slot>
          <slot slot="eval">
            <span class="eval" @click="shpwPop(item)">评估</span>
          </slot>
        </Meglist>-->
      </div>
      <!--弹窗-->
      <div class="pop-up" v-show="isFlag">
        <div class="popWarp">
          <div class="pop-content">
            <div class="tip">提示</div>
            <div class="tipContent">
              <div>{{tilmeg}}</div>
              <div v-if="!isServer">
                上次评估时间
                <span>{{assessDate}}</span>
              </div>
            </div>
            <div class="tip-btn">
              <span class="del" @click="hidePopdel()">取消</span>
              <span class="sure" @click=" hidePopsure()">确定</span>
            </div>
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
    </div>
    <div class="sumtil" v-show="this.isRefreshing">共{{this.sumtotal}}条</div>
  </div>
</template>

<script>
import Common from "../../assets/js/common.js";
import NavSlide from "@/components/basic/navSlide";
import Meglist from "@/components/basic/meglist";
import AreaSelect from "@/components/basic/areaSelect";
import eventBus from "../../assets/js/eventBus.js";
// 刷新加载更多的组件
import pullRefresh from "../../components/basic/pullRefresh";
export default {
  components: {
    pullRefresh,
    NavSlide,
    Meglist,
    AreaSelect
  },
  data() {
    return {
      isShow: true,
      isFlag: false,
      isServer: false,
      curIndex: 0,
      area: "北京",
      showArea: false,
      loginData: [],
      isArea: false,
      curparentOrgId: 0,
      parentOrgId: 0,
      internalId: 0,
      PopulationType: "mentalPatient",
      assessDate: "",
      warningDate: "",
      assessId: 0,
      isAss: false,
      list: [],
      AssData: [],
      isonLoadMore: true,
      evaqx: false,
      sumtotal: 0,
      tilmeg: "",

      refreshText: "下拉刷新",
      refreshReadyText: "释放刷新",
      refreshingText: "正在刷新",
      refreshedText: "完成刷新",
      loadText: "上拉加载",
      loadReadyText: "释放加载",
      loadingText: "正在加载",
      noMoreText: "没有更多数据",
      loadedText:'加载完成',
      text: "未选择",
      personData: [
        {
          id: 0,
          name: "王富贵4",
          site: "湖墅新村40栋2单元402室",
          sexSrc:
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACoklEQVQ4T42UT2hUVxjFf2cSnWgUQcFNF26CqFXzEtGuWgq6UtRSSCzOjKCIoYWCSAul4h9sSxEFRVR00YpkXv7oQgjooouuBHGhbyYBJSK4EWpxEZBGTHTeKe8lijOZJPOtHvd+93cP3z3viAYqCH0R8x2gWdvF3VJOn8/e8NHJjqKvGHrmu7uUlxoCpqAbbuqqIT59Sy6OuSaRSbbmBtpa389KmcmRnMZq1QWhuzB9QDPCGNUFdob+umIOCb4AFk2D/kXcyYjzD/dqOAi9G3MTWIA4ijkKLK4CrrnuFS3NDGC2TUMMJMqyQOv02juUqtqDyRpOlfM6ERQ9XgXcdNXLKq3cA9YaXiB+y0wwGB3QywTUUfS6WPTIfJuqAmxOlwv6KfmeAQxC38B0IaLJBWx/1K0X9V406PeXrjAkWCqxL8qpdwZwY78/y8SpurHYtA/n9Xwue7QXvUcwAPzTNM6qBz16W6XwvcdsjpcL+mU+r00rug9skdkdFTQUhL6P00fZoKDXo4jVsVkzXNBoQ8DQP2DOYM6WCvox8Wh6rlsVBUX/B7SUFpJNFhoBdvZ5ZxwzZBgs5/XNx2fU3utXEq1N47Qk82gEGPT5K2JuCQajWmBQ9AiwXiaICio3Amzv9TGJU8Dvpbx+rlIYFH0OOPxhHvMRTzoTtJGIWBdn2Dq8V39XATsHvDZ+xwhmQmJzlNejuZgdff7eMReA0dJCPq2de5o2QdGXIM27Z5mYHQ/36XFdY4fOYf5M/xazs1TQ7dq+FNh2wdkly/mLqUB4jblcyTAw+YYnSxaRjWM2W2ke7kpSxeJYOadf6136IQ/b7jjbOsYlmf0wlW91KnHEkSinP2Yby4yA3RB6U7M5aNgKfIKYwDzF3FaWy1H3VGDMVv8De98YJOaokDsAAAAASUVORK5CYII=)",
          warnSrc:
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACcUlEQVQ4T52TP2jUcBTHv9+7QNsEq3XyD4gksYIuCuKfwaG6OCkoHiSVglao1eJSsFspbopuKv6hIuLlyokODkJB2sWhDiIiopZL0Ip2cOgfSGrpNU/S65W73B89f0t4/z7kvfd9xD883zHughDNcnv/ls54wkLG7G5exlOeyc0XY35aHwUpmu0eK/rkidkaJHFas3LDpYwKoO8YP0l5rlpeXz2gn9ZvkTyp2u6WusCFEf1sGPK+Au5psnMfo2TJ6utnAGxMeXORvZg1d+Xz8h6UHs3yHtYFyhASwU6jW/3Fx7ycWywAkYy+TGF5xX5pNgVz0qV+cYc5hLAM6I+YvZClCc369q40EGTbt4bL+X4KjwOyvRDjV6G8SCSVm2pq8kdpvp8x9yaJg/Qz5igkPJogh5s3uZfYgXzg6BaABwJqVbcqEpA4r9peRsahBNPGHUDOAYkxCsDfjtkZUg5rltsTOPopgFkBEjFYHoBS9BFRq5JSbe/ZQiQr8HWznUuXbVnS29oCKi7AtjKYYBbEBIA12RTiMqNK3mDnVLSzwlDK5uYYVwS4VtEm2QdBFyD74zECA6rtXq8FHBOgI1b0VlXcA/6SMUNiXRXguGq7R2oBXQH0tSKRkJBDEobfkVQ+rLREaRGhWgLwVNs1qgKjKwGwueQv7mm2e6For2i03XgDYF9JzrRWci1lM6wCfEVylpBPLZY76DvmRUBux9puCFhc3aNwCQMJRT5XKABoHBhtUoDdQLTpivcfQMENIfrjMltFNw5EQdgbqp5hvGU/bZ4Qirmq8kEArTUKa7nnBbgaBRMSTjFwjEkBdjQIqZXu/QHOegp2Wjb8JQAAAABJRU5ErkJggg==)"
        }
      ],
      // 下拉刷新设置  当前列表
      listdata: [],
      num: 5,
      isRefreshing: false,
      pullHeight: "",
      authorityIs: false,
      loginId: 0,
      page:1,
    };
  },
  mounted() {
    this.personDate = [];
    this.evaqx = JSON.parse(sessionStorage.getItem("evaqx"));
    //预警等级
    Common.getWarningLevel(this);
    Common.getGender(this);
    sessionStorage.removeItem("curName");
    if (sessionStorage.getItem("text") == undefined) {
      this.loginData = JSON.parse(sessionStorage.getItem("id"));
      this.text = this.loginData[0];
      this.parentOrgId = this.loginData[1];
      this.loginId = this.loginData[1];
      this.internalId = this.loginData[2];
      this.PatientListForMobile(this.parentOrgId, 0, this.PopulationType);
    } else {
      this.loginData[0] = sessionStorage.getItem("text");
      this.loginData[1] = sessionStorage.getItem("orgId");
      this.loginData[2] = sessionStorage.getItem("internalId");
      this.text = this.loginData[0];
      this.curparentOrgId = Number(this.loginData[1]);
      this.parentOrgId = Number(this.loginData[1]);
      this.internalId = this.loginData[2];
    }
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    this.pullHeight = h - 136 + "px";
    this.authority();
  },
  watch: {
    parentOrgId(newId, oldId) {
      this.PatientListForMobile(this.parentOrgId, 0, this.PopulationType);
      this.page = 1
    }
  },
  created() {
    eventBus.$on("choiceList", data => {
      if (data.rows.length > 0) {
        this.lista = [];
        this.lista = data;
      } else {
        this.lista = [];
      }
    });
  },
  methods: {
    // 地区选择配置
    getIsArea(data) {
      this.isArea = data;
    },
    getText(data) {
      this.text = data;
    },
    selectArea() {
      if (this.internalId > 0 ||  this.loginId != this.parentOrgId) {
        this.isArea = true;
      }
    },
    getParentOrgId(data) {
      this.parentOrgId = data;
    },
    getinternalId(data) {
      this.internalId = data;
    },

    // 信息列表
    // 获取人员信息列表
    PatientListForMobile(organizationId, Emphasis, PopulationType) {
      this.listdata = [];
      this.$http
        .post(
          "/baseinfo/mentalPatientManage/mentalPatientListForMobile.action",
          {
            organizationId: organizationId,
            "population.isEmphasis": Emphasis,
            "population.attentionPopulationType": PopulationType,
            // rows: 10,
            page: 1
          }
        )
        .then(res => {
          this.list = [];
          this.response = res.rows;
          this.responseSum = res.rows;
          let response = [];
          this.sumtotal1 = res.records
          this.sumtotal = res.records
          this.listdata = this.response
          if (this.lista.rows != undefined) {
            this.response = this.lista.rows;
            this.sumtotal = this.lista.records;
            let response = [];
            this.listdata = this.lista.rows;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    onRefresh(done) {
      sessionStorage.removeItem("shaixuan")
      setTimeout(() => {
         if (this.lista != undefined) {
            this.listdata = this.responseSum
            this.sumtotal = this.sumtotal1
          }else{
            this.PatientListForMobile(this.parentOrgId, 0, this.PopulationType)
          }
          this.page = 1;
          done()
      }, 1000);
    },
     loadMore(done){
      this.isRefreshing = true;
      setTimeout(() => {
        this.page = this.page + 1;
        this.isRefreshing = false;
       if(Math.ceil(this.sumtotal/10) < this.page){
         done(true)
       }else{
         if(JSON.parse(sessionStorage.getItem("shaixuan")) != null){
            this.orgId = JSON.parse(sessionStorage.getItem("shaixuan"))[0].orgId
            this.name = JSON.parse(sessionStorage.getItem("shaixuan"))[0].name
            this.warningLevelId = JSON.parse(sessionStorage.getItem("shaixuan"))[0].warningLevelId
            this.genderId = JSON.parse(sessionStorage.getItem("shaixuan"))[0].genderId
            this.area = JSON.parse(sessionStorage.getItem("shaixuan"))[0].area
          // 筛选更多
          this.$http
        .post(
          "/baseinfo/searchMentalPatient/findMentalPatientsByQueryCondition.action",
          {
            organizationId: this.organizationId,
            "searchMentalPatientVo.name": this.name,
            "searchMentalPatientVo.genderId":this. genderId,
            "searchMentalPatientVo.currentAddress": this.area,
            "searchMentalPatientVo.warningLevel.id":this. warningLevel,
             page: this.page
          }
        )
        .then(
          response => {
            this.listdata = this.listdata.concat(response.rows);
          },
          () => {}
        )
        .catch(res => {
          console.log(res);
        });

          }else{
          this.$http
        .post(
          "/baseinfo/mentalPatientManage/mentalPatientListForMobile.action",
          {
            organizationId: this.parentOrgId,
            "population.isEmphasis": 0,
            "population.attentionPopulationType": this.PopulationType,
            // rows: 10,
            page: this.page
          }
        )
        .then(res => {
          this.sumtotal = res.records
          this.listdata = this.listdata.concat(res.rows);
        })
        .catch(res => {
          console.log(res);
        }); 
        done(false)
       }
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
        })
        .catch(res => {
          console.log(res);
        });
    },
    getCurindex(index) {
      this.curIndex = index;
      if (index == 1) {
        this.listdata = this.list;
      } else {
        this.listdata = [];
      }
    },
    warpTrigger() {
      this.isShow = false;
      // this.PatientListForMobile(this.parentOrgId, 1, this.PopulationType);
      // this.personData = this.list
    },
    impPerson() {
      this.isShow = true;
    },
    shpwPop(item) {
      this.AssData = item;
      this.warningDate = item.warningDate;
      this.assessId = item.id;
      this.assessDate = item.assessDate;
      this.whetherServiceScheme = item.whetherServiceScheme;
      // this.exsistedAssessSubmit(this.assessId, this.assessDate);
      this.$http
        .post(
          "/plugin/psychosocialService/serviceAssessManage/exsistedAssessSubmit.action",
          {
            "assessBaseInfo.assesseeId": this.assessId,
            populationType: "mentalPatient",
            "warningRecord.warningDate": this.warningDate
          }
        )
        .then(res => {
          this.isAss = res;
          if (this.whetherServiceScheme === "有服务方案") {
            this.isServer = true;
            this.isFlag = true;
            this.tilmeg = "有服务方案，不能进行评估，请走正常评估流程";
          } else if (this.isAss == true) {
            this.isFlag = true;
            this.tilmeg = "上次评估已提交，确定要再次评估?";
            this.assessDate = item.assessDate;
          } else {
            this.AssData1 = JSON.stringify(this.AssData);
            this.$router.push({
              path: "/PersonAsse",
              query: {
                AssData: this.AssData1
              }
            });
          }
        })
        .catch(res => {
          consloe.log(res);
        });
    },
    hidePopdel() {
      this.isFlag = false;
      this.isServer = false
    },
    hidePopsure() {
      if (this.isServer == true) {
        this.isFlag = false;
        this.isServer = false
      } else {
        this.AssData1 = JSON.stringify(this.AssData);
        this.isFlag = false;
        this.$router.push({
          path: "/PersonAsse",
          query: {
            AssData: this.AssData1
          }
        });
      }
    },
    selctArea() {
      this.showArea = true;
    },
    correctMeg(item) {
      this.$router.push({
        path: "/correctMeg",
        query: {
          OrgId: item.id,
          parentOrgId: this.parentOrgId
        }
      });
    },
    // 筛选
    Filtrate() {
      this.$router.push({
        path: "/Filtrate",
        query: {
          OrgId: this.parentOrgId,
          internalId: this.internalId,
          text: this.text
        }
      });
    },
    // 判断是否评估
    exsistedAssessSubmit(assesseeId, curTime) {
      this.$http
        .post(
          "/plugin/psychosocialService/serviceAssessManage/exsistedAssessSubmit.action",
          {
            "assessBaseInfo.assesseeId": assesseeId,
            populationType: "mentalPatient",
            "warningRecord.warningDate": curTime
          }
        )
        .then(res => {
          this.isAss = res;
        })
        .catch(res => {
          consloe.log(res);
        });
    },
    handleChange(value, selectedData) {
      this.text = selectedData.pop().label;
    }
  },
  beforeDestroy() {
    eventBus.$off("choiceList");
  }
};
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
.selArea {
  display: inline-block;
  margin-left: 12px;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.socialMind-box {
  width: 100%;
  background: rgba(243, 245, 249, 1);
}
.socialMind-content {
  margin-top: 20px;
  width: 100%;
  height: 603px;
  overflow-y: auto;
}
.nav {
  display: flex;
  margin-top: 1px;
  width: 100%;
  height: 42px;
  background: rgba(255, 255, 255, 1);
}
.nav-left {
  /*margin-top: 1.2rem;*/
  width: 49%;
  height: 42px;
  line-height: 42px;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.nav-right {
  /*margin-top: 1.2rem;*/
  width: 50%;
  height: 42px;
  line-height: 42px;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.nav_br {
  margin-top: 12px;
  height: 18px;
  width: 1px;
  background-color: rgba(227, 227, 227, 1);
}
.nav_cur {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(48, 164, 255, 1);
  border-bottom: 2px solid rgba(48, 164, 255, 1);
}
.global-promotion {
  touch-action: none;
  margin-top: 10px !important;
  padding-left: 12px;
  width: 100%;
  height: 43px;
  line-height: 43px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.5px 0rem 0rem rgba(227, 227, 227, 1);
}
.swiper-slide {
  width: auto !important;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 43px;
  margin-left: 20px;
}
.hk {
  margin-left: 10px;
}
.swiper-slide_cur {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 184, 34, 1);
}
.selWarp {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 40px;
  background: rgba(255, 255, 255, 1);
}
.filtrate {
  margin-right: 12px;
  width: 50px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  background: url(../../assets/img/screen.png) right 13px no-repeat;
}
.filtrate2 {
  background: url(../../assets/img/redlight.png) right 13px no-repeat;
}
.filtrate3 {
  background: url(../../assets/img/Orangelight.png) right 13px no-repeat;
}
.mesWarp {
  margin-top: 20px;
  text-align: left;
}
.name {
  position: relative;
  width: 100%;
  height: 44px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  line-height: 44px;
  padding-left: 45px;
  // background: rgba(255, 255, 255, 1)
  // margin-bottom: 1px;
  background: rgba(255, 255, 255, 1) url(../../assets/img/bnbn.png) 12px center
    no-repeat;
}
.nameFmale {
  background: rgba(255, 255, 255, 1) url(../../assets/img/female.png) 12px
    center no-repeat;
}
.namemale {
  background: rgba(255, 255, 255, 1) url(../../assets/img/male.png) 12px center
    no-repeat;
}
.eval {
  margin-top: 11px;
  // margin-left: 293px;
  display: inline-block;
  margin-right: 12px;
  width: 68px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(170, 170, 170, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 32px;
  text-align: center;
}

.pelType {
  margin-left: 12px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 184, 34, 1);
}
.pelDes {
  margin-left: 20px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.warn_ico {
  margin-top: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
}

.warn_icoOrgange {
  background: url(../../assets/img/Orangelight.png) no-repeat !important;
}
.warn_icoRed {
  background: url(../../assets/img/redlight.png) no-repeat !important;
}
.warn_icoYellow {
  background: url(../../assets/img/yellowlight.png) no-repeat !important;
}
.warn_icoGreen {
  background: url(../../assets/img/greenlight.png) no-repeat !important;
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
  width: 280px;
  padding-left: 10px;
  padding-right: 10px;
  height: 160px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  z-index: 9999;
}
.tip {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
}
.tipContent {
  margin: 10px auto 20px auto;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.tip-btn {
  width: 100%;
}
.del {
  display: inline-block;
  width: 49%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.sure {
  display: inline-block;
  width: 49%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(48, 164, 255, 1);
}

/deep/ .ivu-cascader .ivu-input {
  border: none;
}
/deep/ .ivu-cascader .ivu-input:focus {
  outline: none;
  border: none;
  box-shadow: 0 0 0 0.053333rem rgba(45, 140, 240, 0);
}
.sel_ico1 {
  margin-left: 5px;
  display: inline-block;
  width: 13px;
  height: 8px;
  background: url(../../assets/img/retract.png) no-repeat;
}
.yo-scroll {
  font-size: 0.64rem;
  position: absolute;
  top: 4.626667rem;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 100;
  height: auto;
}
/deep/ .v-easy-refresh .v-easy-refresh-body {
  z-index: 99;
}
</style>
