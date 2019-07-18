<template>
  <div id='app'>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {

  },
}
</script>

<style>
@import './assets/css/reset.css';
@import './assets/css/swiper.min.css';
@import './assets/css/common.css';
html,body{
   width:100%;
   height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background:rgba(243,245,249,1)
}
</style>
