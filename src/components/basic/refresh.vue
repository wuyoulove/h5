<template>
  <div class=''>
   <div class='refresh' @click='refreshData()'>刷新查看更多～</div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    refreshData() {

    },
  },
}
</script>
<style lang="scss" scoped>
.refresh{
  width:375px;
  height:66px;
  text-align: center;
  line-height: 66px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  background:rgba(243,245,249,1);
}
</style>

