<template>
  <van-nav-bar
    title=""
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  >
  </van-nav-bar>
  <van-tabs @click="onClick" type="card" v-model:active="activeInd">
    <van-tab title="正在上映">12</van-tab>
    <van-tab title="即将上映">内容 2</van-tab>
  </van-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Tab, Tabs, NavBar, List  } from 'vant';
export default defineComponent({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [List.name]: List,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const activeIndRef = ref(0); // 当前索引

    // 当前路由
    watchEffect(() => {
      const { params: { index } } = route;
      activeIndRef.value = Number(index);
    })

    const onClick = (name:string, title:string) => {
      console.log(name);
      console.log(title);
    };

    

    /**
     * 返回上一页
     */
    const onClickLeft = () => {
      router.go(-1);
    };

    return {
      activeInd:activeIndRef,
      onClick,
      onClickLeft
    }
  }
})
</script>

<style>

</style>