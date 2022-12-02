<template>
  <div id="DescriptionBlock" v-html="description"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { marked } from "marked";
import { HttpClient } from "@/common/HttpClient";

export default defineComponent({
  name: "HelloWorld",
  props: {},
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
      HttpClient.Get("/description.md").then((response) => {
        this.description = marked.parse(response);
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#DescriptionBlock {
  margin-top: 50px;
  border: 1px black solid;
  padding: 25px;
  background-color: lightyellow;
}
</style>
