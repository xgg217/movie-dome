<template>
  <li>
    <template v-if="index">
      <p class="rank-text" :class="[ (index >= 4) ? '' : `rank-${index}` ]">{{ index }}</p>
    </template>

    <div class="image">
      <van-image
        fit="contain"
        width="83"
        height="130"
        :src="rankObj.poster"
      ></van-image>
    </div>
    <div class="descript">
      <h4>{{ rankObj.title }}</h4>
      <p v-if="rankObj.isPlay">
        观众评: <span>{{ rankObj.rate }}</span>
      </p>
      <p v-else>上映时间: {{ rankObj.pubdate }}</p>
      <p>主演: {{ rankObj.casts }}</p>
      <p>时长: {{ rankObj.duration }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, PropType, computed } from "vue";
import { Rank } from "/@/types/rank";

import { Image } from "vant";

export default defineComponent({
  props: {
    index: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Object as PropType<Rank>,
      required: true,
    },
  },

  components:{
    [Image.name]: Image,
  },

  setup(props) {
    const rankRef = computed(() => {
      return props.rank;
    });

    return {
      rankObj: rankRef,
    };
  },
});
</script>

<style lang="less" scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 0;
  box-sizing: border-box;
  padding-left: 10px;

  .rank-text {
    width: 30px;
    height: 30px;
    font-weight: 700;
    background-color: #f5f7fa;
    color: #909399;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
  }

  .rank-1,
  .rank-2,
  .rank-3 {
    color: #fff;
  }

  .rank-1 {
    background: #ef4238;
  }
  .rank-2 {
    background: #ffb400;
  }
  .rank-3 {
    background: #ffb47a;
  }

  .image {
    width: 80px;
    height: 120px;
  }

  .descript {
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
    overflow: hidden;
    font-size: 13px;
    color: #606266;
    line-height: 30px;

    h4 {
      width: 100%;
      color: #303133;
      font-size: 17px;
      font-weight: 700;
    }

    h4,
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      span {
        font-size: 15px;
        font-weight: 700;
        color: #ffb400;
      }
    }
  }
}
</style>
