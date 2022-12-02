<template>
  <div id="BitmapSheet"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BitmapSheet",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#BitmapSheet {
  margin-top: 50px;
  border: 1px black solid;
}
</style>
