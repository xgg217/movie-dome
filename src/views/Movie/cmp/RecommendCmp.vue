<template>
  <li>
    <div class="imgs">
      <van-image
        fit="contain"
        width="56"
        height="85"
        :src="rankObj.poster"
      ></van-image>
    </div>
    <div class="right">
      <p>{{ rankObj.title }}</p>
      <p v-if="rankObj.isPlay">豆瓣评分：<span>{{ rankObj.rate }}</span></p>
      <p v-else>上映时间：{{ rankObj.pubdate }}</p>
      <p>类型:{{ rankObj.casts }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Image } from 'vant';
import { Rank } from "/@/types/rank";
export default defineComponent({

  props: {
    rank: {
      type: Object as PropType<Rank>,
      required: true,
    },
  },

  components: {
    [Image.name]: Image
  },

  setup(props) {
    const rankRef = computed(() => {
      return props.rank;
    });

    return {
      rankObj: rankRef,
    };
  },

})
</script>

<style lang="less" scoped>
li {
  padding: 10px 0;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
}

.imgs {
  width: 56px;
  height: 80px;
  // border: 1px solid #000;
}

.right {
  flex: 1;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // border: 1px solid #000;
  height: 80px;
  // width: 100%;
  overflow: hidden;

  p {
    font-size: 15px;
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


</style>