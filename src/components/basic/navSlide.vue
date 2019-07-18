<template>
  <div class="">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in data" :key="item">
          <div
            class="swiperSlide"
            :class="{swiperSlide_cur : curIndex == index}"
            @click="selNav(item,index)">
            {{item}}
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'Banner',
    data() {
      return {
        data:['精神病人员'],
        curIndex:0,
        isSwiper:true,
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 3000,
          height:43,
          slidesPerView: 4,
          spaceBetween:25,
          loop: false
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    methods:{
      selNav(item,index){
        this.curIndex = index;
        this.$emit('sendCurindex',this.curIndex)
      }
    }
  }
</script>
<style lang="scss" scoped>
.swiper-slide{
  width: auto !important;
}
.swiperSlide{
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.swiperSlide_cur {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 184, 34, 1);
}
</style>
