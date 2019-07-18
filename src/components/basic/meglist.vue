<template>
  <div class="mesWarp">
    <slot name="name"></slot>
    <div class="message line">
      <p class="site">
        <slot name="site"></slot>
      </p>
      <p class="warn">
        预警等级：
        <slot name="warnico"></slot>
      </p>
    </div>
    <div class="evaluate">
      <slot name="eval"></slot>
      <!-- 添加的查看 -->
      <slot name="more"></slot>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.mesWarp {
  margin-top: 14px;
  text-align: left;
}
.site {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 10px;
  padding-left: 12px;
  line-height: 22px;
}
.message {
  position: relative;
  width: 100%;
  min-height: 74px;
  overflow: hidden;
  // margin-bottom: 1px;
  background: rgba(255, 255, 255, 1);
}
.warn {
  padding-left: 12px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  height: 37px;
  line-height: 37px;
}
.warn_ico {
  margin-top: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../../assets/img/redlight.png) no-repeat;
}
.warn_ico1{
  background: url(../../assets/img/Orangelight.png) no-repeat;
}
.evaluate {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 54px;
  background: rgba(255, 255, 255, 1);
}
</style>
