<template>
  <div class="scroll-wrapper" :style="{ height: heightValue + 'vh' }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    heightValue: {
      type: Number,
      default: 90
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrapper {
  height: 90vh;
  overflow: hidden;
  // border: 1px solid #000;
  scroll-behavior: smooth;
  overflow-y: scroll;
}

</style>