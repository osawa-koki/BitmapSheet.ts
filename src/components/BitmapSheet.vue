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
  <input
    type="file"
    accept="image/bmp"
    class="hidden"
    ref="file"
    v-on:change="onFileChange"
  />
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
      <div id="BitmapDataInfo">
        <BitmapData :width="width" :height="height" :colors="colors" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BitmapHeader from "./BitmapHeader.vue";
import BitmapData from "./BitmapData.vue";
import Color from "@/common/Color";

export default defineComponent({
  name: "BitmapSheet",
  components: {
    BitmapHeader,
    BitmapData,
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
      colors: [] as Color[],
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
          const byte_array = new Uint8Array(data);
          // ヘッダ情報取得
          const format_type_bytes = [byte_array[0], byte_array[1]];
          const text_decoder = new TextDecoder("utf-8");
          this.format_type = text_decoder.decode(
            Uint8Array.from(format_type_bytes).buffer
          );
          if (this.format_type !== "BM") {
            alert(
              "ファイル形式が違います。\nBitmap形式のファイルを選択してください。"
            );
            return;
          }
          this.header_show = true; // このタイミングでヘッダ情報を表示
          this.file_size = this.obtainBytesByOffset(byte_array, 2, 5);
          this.reserved1 = this.obtainBytesByOffset(byte_array, 6, 7);
          this.reserved2 = this.obtainBytesByOffset(byte_array, 8, 9);
          this.header_size = this.obtainBytesByOffset(byte_array, 10, 13);
          this.info_header_size = this.obtainBytesByOffset(byte_array, 14, 17);
          this.width = this.obtainBytesByOffset(byte_array, 18, 21);
          this.height = this.obtainBytesByOffset(byte_array, 22, 25);
          this.plane = this.obtainBytesByOffset(byte_array, 26, 27);
          this.color_depth = this.obtainBytesByOffset(byte_array, 28, 29);
          let bcBitCount = -1;
          switch (this.color_depth) {
            case 24:
              bcBitCount = 3;
              break;
            case 32:
              bcBitCount = 4;
              break;
            default:
              alert("対応していないビット数です。");
              return;
          }
          this.compression = this.obtainBytesByOffset(byte_array, 30, 33);
          this.compression_size = this.obtainBytesByOffset(byte_array, 34, 37);
          this.horizontal_resolution = this.obtainBytesByOffset(
            byte_array,
            38,
            41
          );
          this.vertical_resolution = this.obtainBytesByOffset(
            byte_array,
            42,
            45
          );
          this.color_palette = this.obtainBytesByOffset(byte_array, 46, 49);
          this.important_color = this.obtainBytesByOffset(byte_array, 50, 53);
          // データ取得
          this.colors = [];
          const raw_data = byte_array.slice(this.header_size);
          for (let i = 0; i < raw_data.length; i += bcBitCount) {
            const color: Color = {
              b: raw_data[i],
              g: raw_data[i + 1],
              r: raw_data[i + 2],
              idx: this.header_size + i,
              x: (i / bcBitCount) % this.width,
              y: this.height - Math.floor(i / bcBitCount / this.width),
            };
            this.colors.push(color);
          }
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
  #BitmapSheet {
    margin-top: 50px;
  }
}
.hidden {
  display: none;
}
</style>
