<template>
  <li>
    <div class="image">
      <van-image
        fit="contain"
        width="83"
        height="130"
        :src="card.poster"
      ></van-image>
      <em>{{ card.rate }}</em>
    </div>
    <p>{{ card.title }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, PropType, computed } from "vue";
import { Image } from "vant"
interface Rank {
  poster: String; // 电影海报
  rate: String; // 频繁
  title: String; // 电影名称
}

export default defineComponent({

  components: {
    [Image.name]: Image,
  },

  props: {
    cardObj: {
      type: Object as PropType<Rank>,
      required: true,
    },
  },

  setup(props) {
    const cardRef = computed(() => {
      return props.cardObj;
    });

    return {
      card: cardRef,
    };
  },
});
</script>

<style lang="less" scoped>
li {
  .image {
    position: relative;
    top: 0;
    left: 0;
    

    em {
      position: absolute;
      right: 5px;
      bottom: 8px;
      font-weight: 700;
      color: #ffb400;
    }
  }

  p {
    width: 80px;
    padding: 10px 0;
    font-size: 15px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>