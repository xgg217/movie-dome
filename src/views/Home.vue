<template>
  <tab-cmp></tab-cmp>
  <section>
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TabCmp from "/@/components/TabCmp.vue"
export default defineComponent({

  components: {
    "tab-cmp": TabCmp
  }
})
</script>

<style>

</style>