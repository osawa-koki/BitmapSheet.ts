<template>
  <div id="DescriptionBlock" v-html="md"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { marked } from "marked";
import { HttpClient } from "@/common/HttpClient";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      md: "",
    };
  },
  mounted() {
    this.md = this.getContent();
  },
  methods: {
    getContent() {
      return marked.parse("# HI");
    },
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
