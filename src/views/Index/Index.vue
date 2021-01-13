<template>
  <section>
    <div class="box">
      <div class="info">
        <h2>正在热映(22)</h2>
        <van-icon size="20" name="arrow"></van-icon>
      </div>
      <ul>
        <li>
          <div class="image">
            <van-image fit="contain" width="83" height="130" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
            <em>7.5</em>
          </div>
          <p>心里旅行</p>
        </li>
        <li>
          <div class="image">
            <van-image fit="contain" width="83" height="130" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
            <em>7.5</em>
          </div>
          <p>心里旅行sdf sdf</p>
        </li>
        <li>
          <div class="image">
            <van-image fit="contain" width="83" height="130" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
            <em>7.5</em>
          </div>
          <p>心里旅行</p>
        </li>
        <li>
          <div class="image">
            <van-image fit="contain" width="83" height="130" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
            <em>7.5</em>
          </div>
          <p>心里旅行</p>
        </li>
      </ul>
    </div>

    <div class="spacing"></div>
  </section>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { Image, Icon } from "vant"


export default defineComponent({

  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
  },
  
})
</script>

<style lang="less" scoped>
.box {
  padding: 15px;

  .info {
    font-style: 20px;
    font-weight: 700;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: normal;
    justify-content: space-between;

    li {
      // border: 1px solid red;

      .image {
        position:relative;
        top: 0;
        left: 0;

        em {
          position: absolute;
          right: 5px;
          bottom: 2px;
          font-weight: 700;
          color: #ffb400;
        }
      }

      p {
        width: 80px;
        // border: 1px solid #000;
        padding: 10px 0;
        font-size: 15px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
     
    }
  }
}

.spacing {
  height: 10px;
  background-color: rgb(246, 246, 246);
}
</style>