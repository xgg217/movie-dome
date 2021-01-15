<template>
  <div class="box">
    <div class="tabs">
      <p>分类</p>
    </div>
    <div class="tabs tabs-statr">
      <p>已上映</p>
    </div>
    <div class="tabs">
      <p>评分</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({

})
</script>

<style lang="less" scoped>
.box {
  // border: 1px solid #000;
  display: flex;
  border-bottom: 1px solid #dcdfe6;
  

  .tabs {
    position: relative;
    top: 0;
    left: 0;
    height: 41px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #606266;
    font-size: 13px;
  }

  .tabs-statr::before,
  .tabs-statr::after {
    position: absolute;
    content: "";
    display: block;
    height: 20px;
    top: 10px;
  }

  .tabs-statr::after {
    right: 0;
    border-right: 1px solid #e8e8e8;
  }

  .tabs-statr::before {
    left: 0;
    border-left: 1px solid #e8e8e8;
  }
}
</style>