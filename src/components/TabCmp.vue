<template>
  <header>
    <div class="logo"></div>
    <ul>
      <template v-for="item of routerArr" :key="item.title">
        <li>
          <router-link :to="item.src" custom v-slot="{ isActive, navigate }">
            <p @click="navigate" @keypress.enter="navigate" role="link" :class="[isActive && 'router-link-active']">{{ item.title }}</p>
          </router-link>
        </li>
      </template>
    </ul>
    <div class="logins">
      <router-link to="/login"></router-link>
    </div>
  </header>
</template>

<script lang="ts">

interface Urls {
  title: string
  src: string
}

import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const routerArr:Urls[] = [
      {
        title: "首页",
        src: "/home/index"
      }, {
        title: "分类",
        src: "/home/category"
      }, {
        title: "榜单",
        src: "/home/rank"
      }, {
        title: "搜索",
        src: "/home/search"
      },
    ];
    const routerArrRef = ref(routerArr);

    return {
      routerArr: routerArrRef
    }
  }
})
</script>

<style scoped lang="less">
header {
  height: 56px;
  border: 1px solid #000;
  display: flex;
  background-color: #1c2635;
}

.logo {
  width: 25%;
  height: 56px;
  border: 1px solid red;
}

ul {
  flex: 1;
  display: flex;
  
  li {
    flex-wrap: 700;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    p {
      font-size: 17px;
      color: #909399;
      line-height: 54px;
      text-align: center;
      box-sizing: border-box;
    }
  }
}

.logins {
  width: 15%;
  border: 1px solid red;
  a {
    display: block;
    height: 100%;
  }
}

.router-link-active {
  border-bottom: 5px solid #fff;
  color: #fff;
}
</style>