<template>
  <div id="DescriptionBlock"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#DescriptionBlock {
  margin-top: 50px;
  border: 1px black solid;
}
</style>
