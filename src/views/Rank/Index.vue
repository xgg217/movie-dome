<template>
  <section>
    <ul>
      <li>
        <p class="rank-text rank-1">1</p>
        <div class="image">
          <van-image fit="contain" width="83" height="130" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
        </div>
        <div class="descript">
          <h4>温泉屋的小老板娘 若おかみは小学生！</h4>
          <p>上映时间: 2021-01-29</p>
          <p>主演: 高坂希太郎,小林星兰,水树奈奈,松田飒水,远藤璃菜,小樱悦子</p>
          <p>时长: 95分钟</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Image, Icon } from "vant"
export default defineComponent({

  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
  },

})
</script>

<style lang="less" scoped>
ul {
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 10px 0;
    box-sizing: border-box;

    .rank-text {
      width: 30px;
      height: 30px;
      font-weight: 700;
      background-color: #f5f7fa;
      color: #909399;
      text-align: center;
      line-height: 30px;
      margin: 0 10px;
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
      // border: 1px solid red;
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
      }
    }
  }
}
</style>