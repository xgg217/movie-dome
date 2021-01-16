<template>
  <div class="box">
    <div class="videos">
      <video :src="videoUrl" controls :poster="cover"></video>
    </div>
    <div class="content">
      <div class="left">
        <h2>{{ title }}</h2>
        <div>
          <p>{{ rate }}分</p>
          <p>&nbsp;·&nbsp;</p>
          <p>{{ movieTypes }}</p>
          <p>&nbsp;·&nbsp;</p>
          <p>{{ duration }}</p>
        </div>
      </div>
      <p class="right">简介<van-icon name="arrow" /></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from 'vant';
export default defineComponent({
  components: {
    [Icon.name]: Icon
  },

  props: {
    title: String, // 电影名称
    duration: String, // 电影时长
    rate: String, // 电影评分
    videoUrl: String, // 电影
    movieTypes: String, // 电影类型
    cover: String, // 电影类型
    movieObj:String, // 上映时间
  }
})
</script>

<style lang="less" scoped>

.videos {
  width: 100%;
  // border: 1px solid red;
  box-sizing: border-box;

  video {
    width: 100%;
    height: 28vh;
  }
}
.content {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #fff;
  .left {
    flex: 1;
    h2 {
      font-size: 20px;
      font-weight: 700;
    }

    div {
      display: flex;
      margin-top: 20px;
      font-size: 15px;
      color: #606266;
    }
  }

  .right {
    color: #606266;
    display: flex;
  }
  
}
</style>