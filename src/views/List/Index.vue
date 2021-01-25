<template>
  <van-nav-bar
    title=""
    left-text=""
    left-arrow
    @click-left="onClickLeft"
  >
  </van-nav-bar>
  <van-tabs @click="onClick" type="card" v-model:active="pageObj.activeStatus">
    <van-tab title="即将上映"></van-tab>
    <van-tab title="正在上映"></van-tab>
    <div class="box">
      <scroll-cmp :heightValue="86.5">
        <van-list
            v-model:loading="pageObj.loading"
            :finished="pageObj.finished"
            finished-text="没有更多了"
            @load="getListAsync"
          >
          <!-- <van-cell v-for="item in state.list" :key="item" :title="item" /> -->
          <template v-for="item of pageObj.list" :key="item.id">
            <rank-card
              :rank="item"
              @click="goMoviePage(item.id)"
            >
            </rank-card>
          </template>
        </van-list>
      </scroll-cmp>
    </div>
  </van-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Tab, Tabs, NavBar, List, Toast  } from 'vant';
import RankCard from "/@/components/RankCard.vue"
import Scroll from "/@/components/Scroll.vue"
import { getStatusListAPI } from "/@/api/movie"
import { Rank, Category, UpdataCategoryData } from "/@/types/rank";

interface Casts {
  name:string // 主角名字
}

interface Page {
  index:number
  size:number
  activeStatus:number
  list:Rank[]
  finished:boolean
  loading:boolean
}


export default defineComponent({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [List.name]: List,
    "rank-card": RankCard,
    "scroll-cmp": Scroll,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    // const activeIndRef = ref(0); // 当前索引
    const pageObj = reactive<Page>({
      index: 0,
      size: 10,
      activeStatus: 0,
      list: [],
      finished: false,
      loading: false,
    })

    // 当前路由
    watchEffect(() => {
      const { params: { index } } = route;
      pageObj.activeStatus = Number(index);
    });

    /**
     * 获取列表数据
     */
    const getListAsync = async() => {
      // if(!pageObj.loading) { return }

      const { code, errMsg, data } = await getStatusListAPI(pageObj.index, pageObj.size, pageObj.activeStatus);

      pageObj.index = pageObj.index + 1;
      const { list,  total} = data;

      const newArr  = list.map((item:any):Rank  => {
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
      });

      pageObj.list = [...pageObj.list, ...newArr];

      // 加载状态结束
      pageObj.loading = false;

      // 数据全部加载完成
      if (pageObj.list.length >= total) {
        pageObj.finished = true;
      }
    };

    // 切换状态
    const onClick = async (index:number) => {
      console.log(index);
      
      pageObj.activeStatus = index;
      pageObj.list = [];
      await getListAsync();
      Toast.clear();
    };

    // 初始化
    onClick(pageObj.activeStatus);

    /**
     * 返回上一页
     */
    const onClickLeft = () => {
      router.go(-1);
    };

    const goMoviePage = (id:string) => {
      router.push(`/movie/${id}`);
    };

    return {
      pageObj,
      onClick,
      onClickLeft,
      goMoviePage,
      getListAsync
    }
  }
})
</script>

<style lang="less" scoped>
.box {
  margin-top: 10px;
}
</style>