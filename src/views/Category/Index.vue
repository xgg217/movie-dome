<template>
  <div class="head">
    <sheet-cmp :typeList="typeList">
    </sheet-cmp>
  </div>
  <scroll-cmp :heightValue="80">
    <ul>
      <template v-for="item of rankList" :key="item.id">
        <rank-card
          :rank="item"
          @click="goMoviePage(item.id)"
        >
        </rank-card>
      </template>
    </ul>
  </scroll-cmp>

</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from "vue";
import { useRouter } from "vue-router";
import Sheet from "./cmp/Sheet.vue";
import Scroll from "./../../components/Scroll.vue";
import RankCard from "./../../components/RankCard.vue"
import { Toast } from "vant";

import { getMovieStatusAPI, getCategoryAPI } from "./../../api/home";
import { Rank, Category } from "./../../types/rank";

interface Casts {
  name:string // 主角名字
}

export default defineComponent({

  components: {
    "sheet-cmp": Sheet,
    "scroll-cmp": Scroll,
    "rank-card": RankCard,
  },

  setup() {
    const rankListRef = ref<Rank[]>([]);
    const typeListRef = ref<Category[]>([]); // 类型

    const router = useRouter();

    // 获取电影列表接口
    watchEffect(async () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });

      const { code, data, errMsg } = await getMovieStatusAPI(1, JSON.stringify([0,10]));
      Toast.clear();

      rankListRef.value = data.map((item:any):Rank  => {
        const arr = item.casts.map((item:Casts):string => {
          return item.name
        });
        return {
          id: item.id,
          title: item.title, // 电影名称
          duration: item.duration, // 电影时长
          isPlay: !!Number(item.isPlay), // 是否正在上映
          rate: item.rate, // 评分--如果没有上映就显示上映时间，否则显示电影评分
          casts: arr.join(","), // 主角们
          poster:item.poster, // 图片地址
          pubdate: item.pubdate // 上映时间
        };
      })

    });

    // 获取分类
    watchEffect( async() => {
      const { code, data, errMsg } = await getCategoryAPI();
      typeListRef.value = data.map((item:Category):Category => {
        return item
      })
    });

    const goMoviePage = () => {
      // router.push(`/movie/${id}`);
    }

    return {
      rankList: rankListRef,
      typeList: typeListRef,
      goMoviePage
    }
  }
})
</script>

<style lang="less" scoped>

</style>