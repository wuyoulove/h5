<template>
  <div class="areaSelect">
    <div class="popWarp">
      <div class="pop-content">
        <div class="tip">
          <!-- <slot name="sureAreaWarp"></slot> -->
          <span
            v-for="(item,index) in sureArea"
            class="areaItem"
            @click="backArea(item,index)"
          >{{item.orgName}}</span>
        </div>
        <div class="tipContent">
          <!-- <slot name="area"></slot> -->
          <span v-for="item in area" class="areaItem item1" @click="selct(item)">{{item.orgName}}</span>
        </div>
        <div class="tip-btn">
          <span class="del" @click="delAreaSelect()">
            <!-- <slot name='del'></slot> -->
            取消
          </span>
          <span class="sure" @click="sureAreaSelect()">
            <!-- <slot name='sure'></slot> -->
            确定
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sureArea: [],
      area: ["hhh", "iiii"],
      // parentOrgId: 0,
      isArea: false,
      text: ""
    };
  },
  props: {
    loginData: {
      type: Array,
      default: () => []
    },
    curparentOrgId: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  watch: {
    loginData(newdata,olddata) {
      if(newdata[0] == olddata[0]){
        return
      }
      this.orgName = this.loginData[0];
      this.sureArea = [];
      this.sureArea.push({
        orgName: this.loginData[0],
        orgId: this.loginData[1],
        internalId:this.loginData[2]
      });
      this.parentOrgId = this.loginData[1];
      this.getOrgList(this.parentOrgId);
    },
    curparentOrgId() {
      this.getOrgList(this.curparentOrgId);
      if (this.sureArea.length == 0) {
        this.sureArea.push({
          orgName: this.loginData[0],
          orgId: this.loginData[1],
          internalId:this.loginData[2]
        });
      }
    }
  },
  mounted() {},
  methods: {
    // 获取组织机构树
    getOrgList(parentOrgId) {
      this.area = [];
      this.$http
        .post("/mentalPatientAdapterManage/getOrgListByParentOrgId.action", {
          parentOrgId: parentOrgId
        })
        .then(res => {
          res.data.map(items => {
            this.area.push({
              orgName: items.orgName,
              orgId: items.id,
              internalId: items.orgLevel.internalId
            });
          });
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 地区选择
    selectArea() {
      this.isArea = true;
    },
    sureAreaSelect() {
      this.isArea = false;
      this.text = this.orgName;
      this.$emit("sendIsArea", this.isArea);
      this.$emit("sendText", this.text);
      this.$emit("sendParentOrgId",this.parentOrgId);
      this.$emit("sendinternalId",this.internalId);
      sessionStorage.setItem('text',this.text)
      sessionStorage.setItem('orgId',this.parentOrgId)
      sessionStorage.setItem('internalId',this.internalId)
    },
    delAreaSelect() {
      this.isArea = false;
      this.$emit("sendIsArea", this.isArea);
    },
    backArea(item, index) {
      this.parentOrgId = item.orgId;
      this.sureArea.splice(index + 1, this.sureArea.length - 1 - index);
      this.getOrgList(item.orgId);
      this.orgName = item.orgName;
      this.internalId = item.internalId
    },
    selct(item) {
      this.parentOrgId = item.orgId;
      this.sureArea.push(item);
      this.orgName = item.orgName;
      this.internalId = item.internalId
      this.getOrgList(item.orgId);
      // if(item.internalId > 0){

      // }
    }
  }
};
</script>
<style lang="scss" scoped>
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
  bottom: 0;
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  z-index: 9999;
}
.tip {
  // margin-top: 8px;
  width: 100%;
  overflow-x: auto;
  height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  white-space: nowrap;
}
.tipContent {
  // margin: 10px auto 20px auto;
  width: 100%;
  height: 110px;
  overflow-y: auto;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  border-top: 1px solid #f3f5f9;
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
</style>
