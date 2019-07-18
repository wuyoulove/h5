<template>
    <Col class="demo-spin-col" span="8" >
      <Spin fix>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>加载中...</div>
      </Spin>
    </Col>
</template>
<script>
export default {
  data() {
    return {
    }
  }
};
</script>
<style lang="scss" scoped>
.demo-spin-col {
  height: 100px;
  position: relative;
  margin:100px auto;
}
/deep/ .ivu-spin-fix{
  background: rgba(243,245,249,1);
}
/deep/ .ivu-spin-fix  div{
  font-size:14px;
  margin-top:8px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
  font-size:36px!important;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
