<template>
  <section>
    <div class="videos">
      <video-content
        :title="movieObj.title"
        :duration="movieObj.duration"
        :rate="movieObj.rate"
        :videoUrl="movieObj.videoUrl"
        :movieTypes="movieObj.movieTypes"
        :cover="movieObj.cover"
      >
      </video-content>
    </div>
    <div class="spacing"></div>

    <!-- 推荐相关 -->
    
      <!-- <recommend-cmp>
      </recommend-cmp> -->
    <div class="recommend">
      <h3>相关推荐</h3>
      <scroll-cmp :heightValue="53">
        <ul>
          <template v-for="item of relativeMoviesArr" :key="item.id">
            <relative-cmp
              :rank="item"
              @click="goMoviePage(item.id)"
            ></relative-cmp>
          </template>
        </ul>
      </scroll-cmp>
    </div>
    
  </section>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant"

import VideoContent from "./cmp/VideoContent.vue";
import Recommend from "./cmp/Recommend.vue";
import Scroll from "/@/components/Scroll.vue"
import RecommendCmp from "./cmp/RecommendCmp.vue";

import { getMovieAPI } from "/@/api/movie";
import { Rank } from "/@/types/rank";

interface Casts {
  name:string // 主角名字
}

interface MovieTypes {
  name: string
}

export default defineComponent({

  components: {
    "video-content": VideoContent,
    "recommend-cmp": Recommend,
    "scroll-cmp": Scroll,
    "relative-cmp": RecommendCmp,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const relativeMoviesArrRef = ref<Rank[]>([]);
    const movieObj = reactive({
      title: "", // 电影名称
      duration: "", // 电影时长
      rate: "", // 电影评分
      videoUrl: "", // 电影
      movieTypes: "", // 电影类型
      cover: "", // 视频下载时显示的图像,或者在用户点击播放按钮前显示的图像
    });

    watchEffect( async() => {
      const { params: { id:ids } } = route;

      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const { code, errMsg, data: { movie, relativeMovies } } = await getMovieAPI(ids as string);
      Toast.clear();

      // 电影
      {
        movieObj.title = movie.title;
        movieObj.duration = movie.duration;
        movieObj.rate = movie.rate;
        movieObj.videoUrl = movie.video;
        const movieArr = movie.movieTypes.map((item:MovieTypes):string => {
          return item.name
        });
        movieObj.movieTypes = movieArr.join("/");
        movieObj.cover = movie.cover;
      }

      // 推荐相关
      relativeMoviesArrRef.value = relativeMovies.map((item:any):Rank => {
        const arr = item.casts.map((item:Casts):string => {
          return item.name
        });
        return {
          id: item.id,
          title: item.title, // 电影名称
          duration: item.duration, // 电影时长
          isPlay: !!Number(item.isPlay), // 是否正在上映
          rate: item.rate, // 评分--如果没有上映就显示上映时间，否则显示电影评分
          casts: arr.join("/"), // 主角们
          poster: item.poster, // 图片地址
          pubdate: item.pubdate, // 上映时间
        };
      });
    });

    const goMoviePage = (id:string) => {
      console.log(id);
      
      router.replace(`/movie/${id}`);
    }

    return {
      relativeMoviesArr: relativeMoviesArrRef,
      movieObj,
      goMoviePage,
    }


  }
})
</script>

<style lang="less" scoped>
.spacing {
  height: 10px;
  background-color: rgb(246, 246, 246);
}

.recommend {
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  // border: 1px solid #000;

  h3 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 15px;
  }

}
</style>