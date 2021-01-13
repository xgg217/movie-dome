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
            <li @click="goMoviePage(item.id)">
              <div class="image">
                <van-image fit="contain" width="83" height="130" :src="item.poster"></van-image>
                <em>{{ item.rate }}</em>
              </div>
              <p>{{ item.title }}</p>
            </li>
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
            <li @click="goMoviePage(item.id)">
              <div class="image">
                <van-image fit="contain" width="83" height="130" :src="item.poster"></van-image>
                <em>{{ item.rate }}</em>
              </div>
              <p>{{ item.title }}</p>
            </li>
          </template>
        </ul>
      </div>
    </scroll-cmp>
  </section>
</template>

<script lang="ts">

import { defineComponent, watchEffect, ref, reactive, toRef } from "vue";
import { useRouter } from "vue-router";
import Scroll from "./../../components/Scroll.vue"
import { Image, Icon, Toast } from "vant"
import { getHotAPI } from "./../../api/home"
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
    [Image.name]: Image,
    [Icon.name]: Icon,
    "scroll-cmp": Scroll,
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

    watchEffect( async() => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const { code, errMsg, data }= await getHotAPI();
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

    li {

      .image {
        position:relative;
        top: 0;
        left: 0;

        em {
          position: absolute;
          right: 5px;
          bottom: 8px;
          font-weight: 700;
          color: #ffb400;
        }
      }

      p {
        width: 80px;
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