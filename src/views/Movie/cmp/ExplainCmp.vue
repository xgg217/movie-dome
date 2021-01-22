<template>
  <div class="box">
    <scroll-cmp :heightValue="66.5">
      <div class="tit">
        <h2>{{ explain.name }}</h2>
        <p @click="handleShow">
          <van-icon name="arrow-down"></van-icon>
        </p>
      </div>
      <div class="descript ">
        <p class="ws">评分：{{ explain.rate }}</p>
        <p class="ws">导演：{{ explain.author }}</p>
        <p class="ws">影人：{{ setCastsType(explain.authorArr) }}</p>
        <p class="ws">类型：{{ explain.movieTypes }}</p>
      </div>

      <div class="casts">
        <ul>
          <template v-for="(item, index) of explain.authorArr" :key="item.avatar">
            <li>
              <div class="imgs" @click="handleImagePreview(index)">
                <van-image
                  fit="contain"
                  width="60"
                  height="85"
                  :src="item.avatar"
                ></van-image>
              </div>
              <p class="ws">{{ item.name }}</p>
            </li>
          </template>
        </ul>
      </div>

      <div class="summary">
        <h4>简介</h4>
        <p>{{ explain.summary }}</p>
      </div>
    </scroll-cmp>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import Scroll from "/@/components/Scroll.vue"
import { Image, Icon, ImagePreview } from "vant";

import { Rank, Explain, MovieTypes } from "/@/types/rank";
export default defineComponent({
  components:{
    [Image.name]: Image,
    [Icon.name]: Icon,
    "scroll-cmp": Scroll,
  },

  props: {
    viewsHeight: {
      type: Number,
      default: 40
    },
    explain: {
      type: Object as PropType<Explain>,
      required: true,
      validator(explain:Explain) {
        return !!explain.name
      }
    }
  },

  setup(props, ctx) {
    const setCastsType = (arr:MovieTypes[]):string => {
      return arr.map((item:MovieTypes):string => {
        return item.name;
      }).join("/");
    };

    const imgArrRef = computed(() => {
      return (props?.explain?.authorArr ?? []).map((item:any):string => {
        return item.avatar;
      })
    })

    const handleImagePreview = (index:number) => {
      ImagePreview({
        images:[...imgArrRef.value],
        startPosition: index
      });
    };

    /**
     * 显示/关闭 详细介绍
     */
    const handleShow = () => {
      ctx.emit("update:isShow", false);
    }

    return {
      setCastsType,
      handleShow,
      handleImagePreview
    }
  },

})
</script>

<style lang="less" scoped>
.box {
  position: fixed;
  top: 32vh;
  left: 0;
  // border: 1px solid red;
  width: 100vw;
  background-color: #fff;
  z-index: 10;
  box-sizing: border-box;
  padding: 5px 10px;
}

.tit {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ws {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.descript {
  margin: 10px 0;
  border-bottom: 1px solid #dcdfe6;
  p {
    border-top: 10px;
    font-size: 13px;
    margin-bottom: 10px;
  }
}

.casts {
  margin: 10px 0;
  border-bottom: 1px solid #dcdfe6;
  // border: 1px solid red;
  overflow-x: scroll;

  ul {
    display: flex;
    li {
      width: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 5px;

      p {
        width: 100%;
        margin-top: 10px;
        font-size: 13px;
        text-align: center;
      }
    }
  }
}

.summary {

  h4 {
    font-size: 15px;
    font-weight: 700;
    margin: 15px 0;
  }

  p {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>