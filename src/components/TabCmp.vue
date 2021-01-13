<template>
  <header>
    <div class="logo"></div>
    <ul>
      <!-- 内容切换 -->
      <template v-for="item of routerArr" :key="item.title">
        <li>
          <router-link :to="item.src" custom v-slot="{ isActive, navigate }">
            <p @click="navigate" @keypress.enter="navigate" role="link" :class="[isActive && 'router-link-active']">{{ item.title }}</p>
          </router-link>
        </li>
      </template>
    </ul>
    <div class="logins">
      <!-- 登录注册 -->
      <router-link to="/login" custom v-slot="{ navigate }">
        <van-icon
          color="#1989fa"
          size="40"
          name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
          @click="navigate"
        />
      </router-link>
    </div>
  </header>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { Icon } from 'vant';

interface Urls {
  title: string
  src: string
}
export default defineComponent({

  components: {
    [Icon.name]: Icon,
  },


  setup() {


    console.log(Icon);
    
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
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    width: 70%;
  }
}

.router-link-active {
  border-bottom: 5px solid #fff;
  color: #fff;
}
</style>