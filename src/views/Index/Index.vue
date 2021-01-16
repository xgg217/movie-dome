<template>
  <section>
    <scroll-cmp>
      <div class="box">
        <div class="info">
          <h2>正在热映({{ playingCount }})</h2>
          <van-icon size="20" name="arrow"></van-icon>
        </div>
        <ul>
          <template v-for="item of playingMovies" :key="item.id">
            <card-cmp
              @click="goMoviePage(item.id)"
              :cardObj="item"
            >
            </card-cmp>
          </template>
        </ul>
      </div>

      <div class="spacing"></div>

      <div class="box">
        <div class="info">
          <h2>即将上映({{ commingCount }})</h2>
          <van-icon size="20" name="arrow"></van-icon>
        </div>
        <ul>
          <template v-for="item of commingMovies" :key="item.id">
            <card-cmp
              @click="goMoviePage(item.id)"
              :cardObj="item"
            >
            </card-cmp>
          </template>
        </ul>
      </div>
    </scroll-cmp>
  </section>
</template>

<script lang="ts">

import { defineComponent, watchEffect, ref, reactive, toRef } from "vue";
import { useRouter } from "vue-router";
import Scroll from "/@/components/Scroll.vue"
import Card from "./cmp/Card.vue";
import { Icon, Toast } from "vant"
import { getHotAPI } from "/@/api/home"
interface Mov {
  id:string
  title:string // 标题
  rate:string // 评分
  poster:string // 图片地址
}

interface List {
  count:number
  movies:Mov[]
}

export default defineComponent({

  components: {
    [Icon.name]: Icon,
    "scroll-cmp": Scroll,
    "card-cmp": Card
  },

  setup() {
    const router = useRouter();

    const commingRef:List = reactive({
      count: 0,
      movies: []
    });

    const playingRef:List = reactive({
      count: 0,
      movies: []
    });

    // 获取电影信息
    watchEffect( async() => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const { code, errMsg, data } = await getHotAPI();
      Toast.clear();

      const { comming, playing } = data;

      {
        const { count, movies } = comming;
        commingRef.count = count;
        commingRef.movies = movies;
      }

      {
        const { count, movies } = playing;
        playingRef.count = count;
        playingRef.movies = movies;
      }
    });

    // 跳转到预告片页面
    const goMoviePage = (id:string) => {
      router.push(`/movie/${id}`);
    }

    return {
      commingCount: toRef(commingRef, "count"), // 即将上映
      commingMovies: toRef(commingRef, "movies"),
      playingCount: toRef(playingRef, "count"), // 正在热映
      playingMovies: toRef(playingRef, "movies"),
      goMoviePage
    }

  }
  
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
  }
}

.spacing {
  height: 10px;
  background-color: rgb(246, 246, 246);
}
</style>