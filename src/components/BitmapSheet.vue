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
  <div id="BitmapInfoContainer">
    <div id="BitmapSheet" v-if="header_show">
      <div id="BitmapHeaderInfo">
        <BitmapHeader
          :format_type="format_type"
          :file_size="file_size"
          :reserved1="reserved1"
          :reserved2="reserved2"
          :header_size="header_size"
          :info_header_size="info_header_size"
          :width="width"
          :height="height"
          :plane="plane"
          :color_depth="color_depth"
          :compression="compression"
          :compression_size="compression_size"
          :horizontal_resolution="horizontal_resolution"
          :vertical_resolution="vertical_resolution"
          :color_palette="color_palette"
          :important_color="important_color"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BitmapHeader from "./BitmapHeader.vue";

export default defineComponent({
  name: "BitmapSheet",
  components: {
    BitmapHeader,
  },
  data() {
    return {
      header_show: false as boolean,
      format_type: "" as string,
      file_size: -1 as number,
      reserved1: -1 as number,
      reserved2: -1 as number,
      header_size: -1 as number,
      info_header_size: -1 as number,
      width: -1 as number,
      height: -1 as number,
      plane: -1 as number,
      color_depth: -1 as number,
      compression: -1 as number,
      compression_size: -1 as number,
      horizontal_resolution: -1 as number,
      vertical_resolution: -1 as number,
      color_palette: -1 as number,
      important_color: -1 as number,
    };
  },
  methods: {
    onFileChange(event: Event) {
      if (event == null) return;
      const files = (event.target as HTMLInputElement).files;
      if (files == null) return;
      if (files.length < 0) return;
      const file = files[0];
      this.file2ByteArray(file)
        .then((data) => {
          this.header_show = true;
          const byte_array = new Uint8Array(data);
          this.file_size = this.obtainBytesByOffset(byte_array, 2, 5);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    file2ByteArray(file: File): Promise<ArrayBuffer> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event === null) {
            reject("event is null");
            return;
          }
          resolve(event.target?.result as ArrayBuffer);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    obtainBytesByOffset(bytes: Uint8Array, start: number, end: number): number {
      let result = 0;
      for (let i = start; i < end; i++) {
        result += bytes[i] << (8 * (i - start));
      }
      return result;
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
#BitmapInfoContainer {
  #BitmapHeaderInfo {
    table {
      border-collapse: collapse;
      th,
      td {
        border: 1px solid black;
        padding: 5px;
      }
    }
  }
  #BitmapSheet {
    margin-top: 50px;
    border: 1px black solid;
  }
}
.hidden {
  display: none;
}
</style>
