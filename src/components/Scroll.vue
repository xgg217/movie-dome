<template>
  <div class="scroll-wrapper">
    <slot />
  </div>
</template>

<script>
export default {

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