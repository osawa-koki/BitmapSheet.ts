<template>
  <p class="site-description">
    Bitmapファイルに含まれるプロパティを解析します。
  </p>
  <img
    src="@/assets/import.png"
    alt="import"
    class="import"
    @click="($refs['file'] as HTMLInputElement).click()"
  />
  <input type="file" class="hidden" ref="file" v-on:change="onFileChange" />
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
      if (files.length < 0) return;
      const file = files[0];
      this.file2ByteArray(file)
        .then((data) => {
          const byte_array = new Uint8Array(data);
          console.log(byte_array);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    file2ByteArray(file: File): Promise<Uint8Array> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          if (event === null) {
            reject("event is null");
            return;
          }
          resolve(event.target.result);
        };
        reader.readAsArrayBuffer(file);
      });
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
p.site-description {
  margin-top: 50px;
}
.import {
  width: 50px;
  border: 1px lightgray solid;
  border-radius: 10%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
}
#BitmapSheet {
  margin-top: 50px;
  border: 1px black solid;
}
.hidden {
  display: none;
}
</style>
