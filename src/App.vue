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
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>
<style lang="scss">
.markdown {
  h1 {
    $border_wodth: 7;
    font-size: 2rem;
    border-left: #{$border_wodth}px red solid;
    padding-left: #{$border_wodth * 2}px;
  }
  h2 {
    $border_wodth: 5;
    font-size: 1.8rem;
    border-left: #{$border_wodth}px blue solid;
    padding-left: #{$border_wodth * 2}px;
  }
  h3 {
    $border_wodth: 3;
    font-size: 1.6rem;
    border-left: #{$border_wodth}px green solid;
    padding-left: #{$border_wodth * 2}px;
  }
  h4 {
    $border_wodth: 1;
    font-size: 1.4rem;
    border-left: #{$border_wodth}px yellow solid;
    padding-left: #{$border_wodth * 2}px;
  }
  table {
    border-collapse: collapse;
    th,
    td {
      border: 1px solid gray;
      padding: 5px;
    }
  }
}
</style>
