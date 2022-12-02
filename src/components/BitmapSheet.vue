<template>
  <img
    src="import.png"
    alt="import"
    @click="($refs['file'] as HTMLInputElement).click()"
  />
  <input type="file" class="hidden" ref="file" onchange="onFileChange" />
  <div id="BitmapSheet"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BitmapSheet",
  props: {
    msg: String,
  },
  methods: {
    onFileChange(e: any) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file: any) {
      const image = new Image();
      const reader = new FileReader();
      reader.readAsDataURL(file);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#BitmapSheet {
  margin-top: 50px;
  border: 1px black solid;
}
.hidden {
  display: none;
}
</style>
