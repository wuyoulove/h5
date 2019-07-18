<template>
  <div>
    <div class='megWarp'>
      <p class='meg_item1'>
        <slot name='name'></slot>
        <span class='warn_ico'>
         <slot name='ico' />
        </span>
        </p>
      <p class='meg_item2'>
        <slot name='mes'></slot>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
 .megWarp{
   width: 100%;
   min-height: 44px;
   display: flex;
   justify-content: space-between;
   background:rgba(255,255,255,1);
   align-items:center; 
   border-bottom: 1px solid rgba(243,245,249,1)
 }
 .meg_item1{
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(51,51,51,1);
  padding-left: 12px;
  width: 158px;
  align-items:center; 
  display: -webkit-flex;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
 }
 .meg_item2{
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  padding-right: 12px;
  width: 217px;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  text-align: right;
 }
 .warn_ico{
  // margin-top: 11px;
  display: inline-block;
  margin-left: 5px;
  width: 20px;
  height: 20px;
  // vertical-align: middle;
  }
</style>
