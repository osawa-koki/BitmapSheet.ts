<template>
  <main>
    <BitmapSheet />
    <DescriptionBlock />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BitmapSheet from "./components/BitmapSheet.vue";
import DescriptionBlock from "./components/DescriptionBlock.vue";

export default defineComponent({
  name: "App",
  components: {
    BitmapSheet,
    DescriptionBlock,
  },
});
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  main {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
