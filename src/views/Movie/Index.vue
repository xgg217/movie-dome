<template>
  <section>
    <van-nav-bar
      title="介绍"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <div class="videos">
      <video-content
        :title="movieObj.title"
        :duration="movieObj.duration"
        :rate="movieObj.rate"
        :videoUrl="movieObj.videoUrl"
        :movieTypes="movieObj.movieTypes"
        :cover="movieObj.cover"
        v-model:isShow="isShow"
      >
      </video-content>
    </div>
    <div class="spacing"></div>

    <!-- 推荐相关 -->
    <div class="recommend">
      <h3>相关推荐</h3>
      <scroll-cmp :heightValue="46.5">
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

    <!-- 详细简介 -->
    <div class="explain" v-show="isShow">
      <explain-cmp
        :explain="explain"
        v-model:isShow="isShow"
      ></explain-cmp>
    </div>
    
  </section>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Toast, NavBar } from "vant";

import VideoContent from "./cmp/VideoContent.vue";
import Scroll from "/@/components/Scroll.vue"
import RecommendCmp from "./cmp/RecommendCmp.vue";
import ExplainCmp from "./cmp/ExplainCmp.vue";

import { getMovieAPI } from "/@/api/movie";
import { Rank, Explain, MovieTypes } from "/@/types/rank";

interface Casts {
  name:string // 主角名字
}

export default defineComponent({

  components: {
    "video-content": VideoContent,
    "scroll-cmp": Scroll,
    "relative-cmp": RecommendCmp,
    "explain-cmp": ExplainCmp,
    [NavBar.name]: NavBar,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const isShowRef = ref(false);

    const relativeMoviesArrRef = ref<Rank[]>([]);
    const movieObj = reactive({
      title: "", // 电影名称
      duration: "", // 电影时长
      rate: "", // 电影评分
      videoUrl: "", // 电影
      movieTypes: "", // 电影类型
      cover: "", // 视频下载时显示的图像,或者在用户点击播放按钮前显示的图像
    });

    // 详细简介
    const explainRef = ref<Explain>({
      name: "", // 电影名称
      rate: "", // 评分
      author: "", // 导演
      // casts: "", // 演员
      movieTypes: "", // 电影类型
      authorArr: [], // 演员 + 照片
      summary: "", // 电影简介
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
          pubdate: item.pubdate || "", // 上映时间
        };
      });

      // 详细简介
      {
        explainRef.value.name = movie.title;
        explainRef.value.rate = movie.rate;
        explainRef.value.author = movie.author;
        explainRef.value.movieTypes = movie.movieTypes.map((item:any):string => {
          return item.name
        }).join("·");
        explainRef.value.authorArr = movie.casts;
        explainRef.value.summary = movie.summary;
      }
    });

    const onClickLeft = () => {
      router.go(-1);
    };

    const goMoviePage = (id:string) => {
      router.replace(`/movie/${id}`);
    };

    return {
      relativeMoviesArr: relativeMoviesArrRef,
      explain: explainRef,
      movieObj,
      goMoviePage,
      isShow: isShowRef,
      onClickLeft
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