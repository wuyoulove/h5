<template>
  <div class="stable">
    <div class="sexName">
      <slot name="stablename"></slot>
    </div>
    <div class="sex">
      <slot name="stablemeg">
      </slot>
    </div>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
.stable{
  background: #ffffff;
}
.sexName{
  padding-left: 12px;
  width: 100%;
  height:60px;
  font-size:16px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:60px;
}
</style>
