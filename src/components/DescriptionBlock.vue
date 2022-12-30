<template>
  <div id="DescriptionBlock">
    <div class="markdown" v-html="description"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { marked } from "marked";
import { HttpClient } from "@/common/HttpClient";

export default defineComponent({
  name: "HelloWorld",
  data() {
    return {
      description: "",
    };
  },
  mounted() {
    this.getContent();
  },
  methods: {
    getContent() {
      HttpClient.Get("./description.md").then((response) => {
        this.description = marked.parse(response);
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#DescriptionBlock {
  margin-top: 50px;
  border: 1px black solid;
  padding: 25px;
  background-color: lightyellow;
}
</style>
