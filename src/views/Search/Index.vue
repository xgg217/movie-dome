<template>
  <!-- 搜索 -->
  <div class="swarch">
    <van-search
      v-model="searchValue"
      placeholder="请输入"
      @update:model-value="debounceSearch"
    >
    </van-search>
  </div>
  <div v-show="searchValue.length">
    <scroll-cmp :heightValue="86">
      <ul>
        <template v-for="item of rankList" :key="item.id">
          <rank-card
            :rank="item"
            @click="goMoviePage(item.id)"
          >
          </rank-card>
        </template>
      </ul>
      <van-empty v-show="!rankList.length" description="暂无数据"></van-empty>
    </scroll-cmp>
  </div>
  <div class="hou" v-show="!searchValue.length">
    <h3>热门搜索</h3>
    <ul>
      <template v-for="item of keywordList" :key="item.count">
        <li @click="searchHou(item.name)">{{ item.name }}</li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Search, Toast, Empty } from 'vant';

import { debounce } from "lodash";

import Scroll from "/@/components/Scroll.vue"
import RankCard from "/@/components/RankCard.vue"

import { Rank } from "/@/types/rank";

import { getSearchAPI, getKeywordAPI } from "/@/api/home";

interface Casts {
  name:string // 主角名字
}

interface Keyword {
  name: string
  count: number
}

export default defineComponent({

  components: {
    [Search.name]: Search,
    [Empty.name]: Empty,
    "rank-card": RankCard,
    "scroll-cmp": Scroll
  },

  setup() {
    const router = useRouter();

    const keywordListRef = ref<Keyword[]>([]);

    const searchValueRef = ref("");

    const rankListRef = ref<Rank[]>([]);

    const onSearch = (val:string) => {
      if(val) {
        getList(val);
      }
    }

    const debounceSearch = debounce(onSearch, 500);

    /**
     * 获取搜索结果
     */
    const getList = async(val:string) => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });

      const { code, errMsg, data }= await getSearchAPI(searchValueRef.value);
      Toast.clear();

      rankListRef.value = data.map((item:any):Rank => {

        const arr = item.casts.map((item:Casts):string => {
          return item.name;
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
        }
      })
    };

    /**
     * 热门搜索
     */
    watchEffect(async() => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });

      const { code, errMsg, data }= await getKeywordAPI();
      Toast.clear();

      keywordListRef.value = data;
    });

    const searchHou = (val:string) => {
      searchValueRef.value = val;
      getList(val);
    };

    // 跳转到预告片页面
    const goMoviePage = (id:string) => {
      router.push(`/movie/${id}`);
    }

    return {
      searchValue: searchValueRef,
      rankList: rankListRef,
      keywordList: keywordListRef,
      goMoviePage,
      onSearch,
      debounceSearch,
      searchHou,
    }
  }
})
</script>

<style lang="less" scoped>
.hou {
  padding: 0 15px 8px 15px;
  background-color: rgb(247, 248, 250);


  h3 {
    padding: 15px 0;
    font-size: 15px;
    color: #606266;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 13px;
      color: #333;
      background-color: #fff;
      margin: 0 12px 12px 0;
    }
  }
}
</style>