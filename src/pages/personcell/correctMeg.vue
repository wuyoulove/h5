<template>
  <div class>
    <div class="header">
      <img src="../../assets/img/back-bg.png" @click="$router.back(-1)" alt="goback">
      精神病人员
    </div>
    <div class="header_nav">
      <Tabs v-model="curName" @on-click="CurNameIndex">
        <TabPane label="基本信息" name="name1">
          <EasyRefresh
            :userSelect="false"
            :onRefresh="onRefresh"
            :loadMore="loadMore"
            v-show="basicData.length > 0"
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
            <div v-show="basicData.length == 0" class="noMeg">暂无基本信息</div>
            <!-- <Scroll :on-reach-bottom="handleReachBottom"> -->
            <List v-for="(item,index) in basicData1" :key="index" v-show="basicData.length > 0">
              <slot slot="name">{{item.name}}</slot>
              <slot slot="mes">{{item.mes}}</slot>
            </List>
            <Refresh v-show="!isShow && basicData.length != 0"/>
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
          <!-- </Scroll> -->
        </TabPane>
        <TabPane label="服务记录" name="name2">
          <div v-show="serverData.length == 0" class="noMeg">暂无服务记录</div>
          <List
            v-for="(item,index) in serverData"
            :key="index"
            @click.native="serverDetails(item)"
            v-show="serverData.length > 0"
          >
            <slot slot="name">{{item.occurPlace}}</slot>
            <slot slot="mes">{{item.occurDate}}</slot>
          </List>
        </TabPane>
        <TabPane label="预警记录" name="name3">
          <div v-show="warnData.length == 0" class="noMeg">暂无预警记录</div>
          <List v-for="(item,index) in warnData" :key="item.index" v-show="warnData.length > 0">
            <slot slot="name">{{item.name}}</slot>
            <slot slot="ico">
              <img :src="item.warnSrc">
            </slot>
            <slot slot="mes">{{item.mes}}</slot>
          </List>
        </TabPane>
        <TabPane label="评估记录" name="name4">
          <div v-show="evaData.length == 0" class="noMeg">暂无评估记录</div>
          <div
            class="evaWarp"
            v-for="item in evaData"
            @click="evalutaDetails(item)"
            v-show="warnData.length > 0"
          >
            <div class="eva_item" :class="{uneva_item:item.type}">{{item.eva}}</div>
            <div class="eva-warp">
              <p class="eva_name">评估人：{{item.name}}</p>
              <p class="eva_time">{{item.time}}</p>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import Common from "../../assets/js/common.js";
import Refresh from "@/components/basic/refresh";
import List from "@/components/basic/list";
export default {
  components: {
    Refresh,
    List
  },
  data() {
    return {
      isShow: false,
      statusType: 0,
      curName: "name1",
      evaData: [
        {
          eva: "评估未提交",
          name: "张富贵",
          time: "2018-09-20 15:23:11",
          type: false
        },
        {
          eva: "评估已提交",
          name: "李富贵",
          time: "2018-09-20 15:23:11",
          type: true
        }
      ],
      basicData: [
        {
          name: "姓名",
          mes: "王富贵",
          key: 0
        },
        {
          name: "性别",
          mes: "王富贵",
          key: 1
        },
        {
          name: "身份证号",
          mes: "王富贵",
          key: 2
        },
        {
          name: "现居地址",
          mes: "王富贵",
          key: 3
        },
        {
          name: "预警等级",
          mes: "王富贵",
          key: 4
        },
        {
          name: "预警时间",
          mes: "王富贵",
          key: 5
        },
        {
          name: "管控等级",
          mes: "王富贵",
          key: 6
        },
        {
          name: "刑法执法类别",
          mes: "王富贵",
          key: 7
        },
        {
          name: "原判刑期",
          mes: "王富贵",
          key: 8
        },
        {
          name: "是否重点管控",
          mes: "王富贵",
          key: 9
        },
        {
          name: "是否有服务方案",
          mes: "王富贵",
          key: 10
        },
        {
          name: "是否有管控方案",
          mes: "王富贵",
          key: 11
        },
        {
          name: "社区矫正开始时间",
          mes: "王富贵",
          key: 12
        },
        {
          name: "社区矫正结束时间",
          mes: "王富贵",
          key: 13
        },
        {
          name: "评估时间",
          mes: "王富贵",
          key: 14
        },
        {
          name: "有无服务成员",
          mes: "王富贵",
          key: 15
        },
        {
          name: "最新服务时间",
          mes: "王富贵",
          key: 16
        },
        {
          name: "所属网格",
          mes: "王富贵",
          key: 17
        },
        {
          name: "曾用名",
          mes: "王富贵",
          key: 18
        },
        {
          name: "出生日期",
          mes: "王富贵",
          key: 19
        },
        {
          name: "工作单位",
          mes: "王富贵",
          key: 20
        },
        {
          name: "户籍地",
          mes: "王富贵",
          key: 21
        },
        {
          name: "户籍详址",
          mes: "王富贵",
          key: 22
        },
        {
          name: "户籍派出所",
          mes: "王富贵",
          key: 23
        },
        {
          name: "身高",
          mes: "王富贵",
          key: 24
        },
        {
          name: "民族",
          mes: "王富贵",
          key: 25
        },
        {
          name: "政治面貌",
          mes: "王富贵",
          key: 26
        },
        {
          name: "文化程度",
          mes: "王富贵",
          key: 27
        },
        {
          name: "职业",
          mes: "王富贵",
          key: 28
        },
        {
          name: "婚姻状况",
          mes: "王富贵",
          key: 29
        },
        {
          name: "血型",
          mes: "王富贵",
          key: 30
        },
        {
          name: "宗教信仰",
          mes: "王富贵",
          key: 31
        },
        {
          name: "联系电话",
          mes: "王富贵",
          key: 32
        },
        {
          name: "联系手机",
          mes: "王富贵",
          key: 33
        },
        {
          name: "电子邮件",
          mes: "王富贵",
          key: 34
        },
        {
          name: "其他地址",
          mes: "王富贵",
          key: 35
        },
        {
          name: "有无户籍信息",
          mes: "王富贵",
          key: 36
        },
        {
          name: "数据来源",
          mes: "王富贵",
          key: 37
        },
        {
          name: "数据录入时间",
          mes: "王富贵",
          key: 38
        },
        {
          name: "数据更新时间",
          mes: "王富贵",
          key: 39
        }
      ],
      serverData: [
        {
          name: "姓名姓名姓名姓姓名姓名姓名姓1",
          mes: "2018-09-20 15:23:11",
          key: 0
        },
        {
          name: "姓名2",
          mes: "王富贵",
          key: 1
        },
        {
          name: "姓名3",
          mes: "王富贵",
          key: 2
        },
        {
          name: "姓名4",
          mes: "王富贵",
          key: 3
        }
      ],
      warnData: [
        {
          name: "预警等级1",
          key: 0,
          mes: "2018-09-20 15:23:11",
          warnSrc: require("../../assets/img/redlight.png")
        },
        {
          name: "预警等级2",
          key: 1,
          mes: "王富贵",
          warnSrc: require("../../assets/img/redlight.png")
        },
        {
          name: "预警等级3",
          key: 2,
          mes: "王富贵",
          warnSrc: require("../../assets/img/redlight.png")
        },
        {
          name: "预警等级4",
          key: 3,
          mes: "王富贵",
          warnSrc: require("../../assets/img/redlight.png")
        }
      ],
      orgId: 0,
      data: {},
      dictsData: [],
      parentOrgId: 0,
      basicData1: [],
      pullHeight: "",
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
  mounted() {
    if (sessionStorage.getItem("curName") != null) {
      this.curName = sessionStorage.getItem("curName");
    }
    this.dictsData = JSON.parse(sessionStorage.getItem("dictsData"));
    this.orgId = this.$route.query.OrgId;
    this.parentOrgId = this.$route.query.parentOrgId;
    this.basicData = [];
    this.CommonPopulationForMoblie(this.orgId);
    this.findServiceRecords(this.orgId, this.parentOrgId);
    this.findWarningRecordPage(this.orgId);
    this.findAssessListForPage(this.orgId);
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    this.pullHeight = h - 136 + "px";
  },
  methods: {
    // 数据刷新
    // handleReachBottom() {
    //   this.isShow = true
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       this.basicData1 = this.basicData
    //       resolve();
    //     }, 2000);
    //   });
    // },
    onRefresh(done) {
      setTimeout(() => {
        this.CommonPopulationForMoblie(this.orgId);
        done();
      }, 1000);
    },
    loadMore(done) {
      this.isRefreshing = true;
      setTimeout(() => {
        this.isRefreshing = false;
        if ( this.basicData1.length ==  this.basicData.length) {
          done(true);
          this.isShow = true
        } else {
          this.basicData1 = this.basicData;
          done(false);
        }
      }, 1000);
    },
    CurNameIndex(name) {
      sessionStorage.setItem("curName", name);
    },
    serverDetails(item) {
      // this.$router.push("/ServerDetails");
      this.$router.push({
        path: "/ServerDetails",
        query: {
          serverId: item.id
        }
      });
    },
    evalutaDetails(item) {
      this.$router.push({
        path: "/EvalutaDetails",
        query: {
          evalutaId: item.id
        }
      });
    },
    // 精神病人员详情--基本信息
    CommonPopulationForMoblie(id) {
      this.$http
        .post(
          "/baseinfo/mentalPatientManage/viewCommonPopulationForMoblie.action",
          {
            "population.id": id,
            "population.attentionPopulationType": "mentalPatient",
            "population.isEmphasis": 0
          }
        )
        .then(res => {
          let sex = "",
            warningLevel = "",
            treat = "",
            death = "",
            nation = "",
            politicalBackground = "",
            schooling = "",
            career = "",
            maritalState = "",
            bloodType = "",
            faith = "",
            isNormal = "",
            dangerLevel = "",
            sourcesstate = "",
            hasServiceTeamMember = "";

          // 民族
          this.dictsData[0].nation.map(items => {
            if (res.nation != undefined && res.nation.id == items.id) {
              nation = items.displayName;
            } else {
              nation = "";
            }
          });
          // 政治面貌
          this.dictsData[0].schooling.map(items => {
            if (res.schooling != undefined && res.schooling.id == items.id) {
              schooling = items.displayName;
            } else {
              schooling = "";
            }
          });
          // 文化程度
          this.dictsData[0].politicalBackground.map(items => {
            if (
              res.politicalBackground != undefined &&
              res.politicalBackground.id == items.id
            ) {
              politicalBackground = items.displayName;
            } else {
              politicalBackground = "";
            }
          });
          // 职业
          this.dictsData[0].career.map(items => {
            if (res.career != undefined && res.career.id == items.id) {
              career = items.displayName;
            } else {
              career = "";
            }
          });
          // 婚姻
          this.dictsData[0].maritalState.map(items => {
            if (
              res.maritalState != undefined &&
              res.maritalState.id == items.id
            ) {
              maritalState = items.displayName;
            } else {
              maritalState = "";
            }
          });
          // 血型
          this.dictsData[0].bloodType.map(items => {
            if (res.bloodType != undefined && res.bloodType.id == items.id) {
              bloodType = items.displayName;
            } else {
              bloodType = "";
            }
          });
          // 宗教信仰
          this.dictsData[0].faith.map(items => {
            if (res.faith != undefined && res.faith.id == items.id) {
              faith = items.displayName;
            } else {
              faith = "";
            }
          });
          // 危险程度
          this.dictsData[0].dangerLevel.map(items => {
            if (
              res.dangerLevel != undefined &&
              res.dangerLevel.id == items.id
            ) {
              dangerLevel = items.displayName;
            } else {
              dangerLevel = "";
            }
          });
          if ((res.isNormal = 1)) {
            isNormal = "有";
          } else {
            isNormal = "无";
          }
          Common.getGender(this);
          if (res.gender != undefined && res.gender.id == this.genderList[0]) {
            sex = "男";
          } else if (
            res.gender != undefined &&
            res.gender.id == this.genderList[1]
          ) {
            sex = "女";
          } else {
            sex = "";
          }
          if (res.hasServiceTeamMember == 0) {
            hasServiceTeamMember = "无";
          } else {
            hasServiceTeamMember = "有";
          }
          //预警等级
          Common.getWarningLevel(this);
          if (res.warningLevel != undefined) {
            switch (res.warningLevel.id) {
              case this.warningLevelArr[0]:
                warningLevel = "红色";
                break;
              case this.warningLevelArr[1]:
                warningLevel = "橙色";
                break;
              case this.warningLevelArr[2]:
                warningLevel = "黄色";
                break;
              case this.warningLevelArr[3]:
                warningLevel = "绿色";
                break;
              default:
                warningLevel = "";
            }
          }
          switch (res.sourcesstate) {
            case 1:
              sourcesstate = "录入";
              break;
            case 2:
              sourcesstate = "认领";
              break;
            case 3:
              sourcesstate = "已核实";
              break;
            default:
              sourcesstate = "录入";
          }
          if (res.treat == true) {
            treat = "是";
          } else {
            treat = "否";
          }
          if ((res.death = true)) {
            death = "是";
          } else {
            death = "否";
          }
          // this.basicData = []
          this.basicData = [
            {
              name: "姓名",
              mes: `${res.name === undefined ? "" : res.name}`,
              key: 0
            },
            {
              name: "性别",
              mes: `${sex}`,
              key: 1
            },
            {
              name: "身份证号",
              mes: `${res.idCardNo === undefined ? "" : res.idCardNo}`,
              key: 2
            },
            {
              name: "现居地址",
              mes: `${
                res.currentAddress === undefined ? "" : res.currentAddress
              }`,
              key: 3
            },
            {
              name: "预警等级",
              mes: `${warningLevel}`,
              key: 4
            },
            {
              name: "预警时间",
              mes: `${res.warningDate === undefined ? "" : res.warningDate}`,
              key: 5
            },
            {
              name: "患病名称",
              mes: `${
                res.psychosisName === undefined ? "" : res.psychosisName
              }`,
              key: 6
            },
            {
              name: "是否接受过治疗",
              mes: `${treat}`,
              key: 7
            },
            {
              name: "康复机构",
              mes: `${
                res.cureDepartment === undefined ? "" : res.cureDepartment
              }`,
              key: 8
            },
            {
              name: "是否有管控方案",
              mes: `${
                res.whetherControlScheme === undefined
                  ? ""
                  : res.whetherControlScheme
              }`,
              key: 9
            },
            {
              name: "是否有服务方案",
              mes: `${
                res.whetherServiceScheme === undefined
                  ? ""
                  : res.whetherServiceScheme
              }`,
              key: 10
            },
            {
              name: "是否有管控方案",
              mes: `${res.idCardNo === undefined ? "" : res.idCardNo}`,
              key: 11
            },
            {
              name: "评估时间",
              mes: `${res.assessDate === undefined ? "" : res.assessDate}`,
              key: 12
            },
            {
              name: "有无服务成员",
              mes: `${
                res.hasServiceTeamMember === undefined
                  ? ""
                  : hasServiceTeamMember
              }`,
              key: 13
            },
            {
              name: "最新服务时间",
              mes: `${
                res.lastRecordTime === undefined ? "" : res.lastRecordTime
              }`,
              key: 14
            },
            {
              name: "所属网格",
              mes: `${
                res.organization === undefined ? "" : res.organization.orgName
              }`,
              key: 15
            },
            {
              name: "曾用名",
              mes: `${res.usedName === undefined ? "" : res.usedName}`,
              key: 16
            },
            {
              name: "出生日期",
              mes: `${res.birthday === undefined ? "" : res.birthday}`,
              key: 17
            },
            {
              name: "工作单位",
              mes: `${res.workUnit === undefined ? "" : res.workUnit}`,
              key: 18
            },
            {
              name: "危险程度",
              mes: `${dangerLevel}`,
              key: 22
            },
            {
              name: "户籍地",
              mes: `${(res.province === undefined ? "" : res.province) +
                (res.city === undefined ? "" : res.city) +
                (res.district === undefined ? "" : res.district)}`,
              key: 24
            },
            {
              name: "户籍详址",
              mes: `${
                res.nativePlaceAddress === undefined
                  ? ""
                  : res.nativePlaceAddress
              }`,
              key: 25
            },
            {
              name: "户籍派出所",
              mes: `${
                res.nativePoliceStation === undefined
                  ? ""
                  : res.nativePoliceStation
              }`,
              key: 26
            },
            {
              name: "身高",
              mes: `${res.stature === undefined ? "" : res.stature}`,
              key: 27
            },
            {
              name: "民族",
              mes: `${nation}`,
              key: 28
            },
            {
              name: "政治面貌",
              mes: `${politicalBackground}`,
              key: 29
            },
            {
              name: "文化程度",
              mes: `${schooling}`,
              key: 30
            },
            {
              name: "职业",
              mes: `${career}`,
              key: 31
            },
            {
              name: "婚姻状况",
              mes: `${maritalState}`,
              key: 32
            },
            {
              name: "血型",
              mes: `${bloodType}`,
              key: 33
            },
            {
              name: "宗教信仰",
              mes: `${faith}`,
              key: 34
            },
            {
              name: "联系电话",
              mes: `${res.telephone === undefined ? "" : res.telephone}`,
              key: 35
            },
            {
              name: "联系手机",
              mes: `${res.mobileNumber === undefined ? "" : res.mobileNumber}`,
              key: 36
            },
            {
              name: "电子邮件",
              mes: `${res.email === undefined ? "" : res.email}`,
              key: 37
            },
            {
              name: "其他地址",
              mes: `${res.otherAddress === undefined ? "" : res.otherAddress}`,
              key: 38
            },
            {
              name: "有无户籍信息",
              mes: `${isNormal}`,
              key: 39
            },
            {
              name: "数据来源",
              mes: `${sourcesstate}`,
              key: 39
            },
            {
              name: "数据录入时间",
              mes: `${res.createDate === undefined ? "" : res.createDate}`,
              key: 40
            },
            {
              name: "数据更新时间",
              mes: `${res.updateDate === undefined ? "" : res.updateDate}`,
              key: 41
            }
          ];
          this.basicData.map((item, index) => {
            if (index < 20) {
              this.basicData1.push(item);
            }
          });
        })
        .catch(res => {
          console.log(res);
        });
    },
    refresh() {
      this.isShow = true;
    },
    // 精神病人员详情--服务记录
    findServiceRecords(objectIds, orgId) {
      this.$http
        .post("/plugin/serviceTeam/serviceRecord/findServiceRecords.action", {
          objectIds: objectIds,
          populationType: "mentalPatient",
          "serviceRecordVo.organization.id": orgId
        })
        .then(res => {
          this.serverData = [];
          this.serverData = res.rows;
        })
        .catch(res => {});
    },
    // 精神病人员详情--预警记录
    findWarningRecordPage(objectIds) {
      this.$http
        .post(
          "/psychosocialService/warningRecordManage/findWarningRecordPage.action",
          {
            "warningRecord.personId": objectIds,
            "warningRecord.personType": "mentalPatient"
          }
        )
        .then(res => {
          let warnSrc = "";
          this.warnData = [];
          Common.getWarningLevel(this);
          res.rows.map(items => {
            switch (items.warningLevel.id) {
              case this.warningLevelArr[0]:
                warnSrc = require("../../assets/img/redlight.png");
                break;
              case this.warningLevelArr[1]:
                warnSrc = require("../../assets/img/Orangelight.png");
                break;
              case this.warningLevelArr[2]:
                warnSrc = require("../../assets/img/yellowlight.png");
                break;
              case this.warningLevelArr[3]:
                warnSrc = require("../../assets/img/greenlight.png");
                break;
            }
            this.warnData.push({
              name: "预警等级",
              warnSrc: `${warnSrc}`,
              mes: items.warningDate
            });
          });
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 精神病人员详情--评估记录
    findAssessListForPage(populationId) {
      this.$http
        .post(
          "/plugin/psychosocialService/personnelAssessManage/findAssessListForPage.action",
          {
            populationId: populationId,
            populationType: "mentalPatient"
          }
        )
        .then(res => {
          let type = true,
            eva = "";
          this.evaData = [];
          res.rows.map(items => {
            if ((items.statusType = 1)) {
              type = true;
              eva = "评估已提交";
            } else {
              type = false;
              eva = "评估未提交";
            }
            this.evaData.push({
              eva: `${eva}`,
              name: items.evaluatorname,
              time: items.assessDate,
              type: `${type}`,
              id: items.id
            });
          });
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.header_nav {
  width: 100%;
  margin-top: 1px;
}
/deep/ .ivu-tabs-nav .ivu-tabs-tab {
  padding: 0.213333rem 0.240667rem !important;
  background: #ffffff;
}
/deep/ .ivu-tabs .ivu-tabs-tabpane {
  background: #ffffff;
}
/deep/ .ivu-tabs-nav {
  margin-left: 10px !important;
}
/deep/ .ivu-tabs-bar {
  background: rgba(255, 255, 255, 1);
  margin-bottom: 14px;
}
/deep/ .ivu-scroll-container {
  height: 667px !important;
}
.evaWarp {
  height: 84px;
  border-bottom: 14px solid rgba(243, 245, 249, 1);
}
.eva_item {
  margin: 18px 12px 12px 12px;
  width: 80px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(255, 132, 107, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 132, 107, 1);
}
.uneva_item {
  border: 1px solid rgba(48, 164, 255, 1);
  color: rgba(48, 164, 255, 1);
}
.eva_name {
  margin-left: 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.eva_time {
  margin-right: 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.eva-warp {
  display: flex;
  justify-content: space-between;
}
/deep/ .v-easy-refresh .v-easy-refresh-body {
  z-index: 99;
}
</style>
