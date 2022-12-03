<template>
  <div
    id="BitmapDataCanvas"
    ref="BitmapCanvas"
    v-bind:style="{
      gridTemplateColumns: grid_template_columns,
      gridTemplateRows: grid_template_rows,
    }"
  >
    <div
      v-for="pixel in colors"
      :key="pixel.idx"
      class="pixel"
      v-bind:style="{
        backgroundColor: get_background_color(pixel),
        gridColumn: `${pixel.x + 1} / ${pixel.x + 2}`,
        gridRow: `${pixel.y + 1} / ${pixel.y + 2}`,
      }"
      v-bind:title="get_pixel_title(pixel)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Color from "@/common/Color";

export default defineComponent({
  name: "BitmapData",
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    colors: {
      type: Array as PropType<Color[]>,
      required: true,
    },
  },
  computed: {
    grid_template_rows: function (): string {
      return `repeat(${this.height}, 1fr)`;
    },
    grid_template_columns: function (): string {
      return `repeat(${this.width}, 1fr)`;
    },
  },
  methods: {
    get_background_color: function (color: Color): string {
      return `rgb(${color.r}, ${color.g}, ${color.b})`;
    },
    get_pixel_title: function (color: Color): string {
      // eslint-disable-next-line prettier/prettier
      return `(BYTE: ${color.idx})\n(X: ${color.x + 1}, Y: ${color.y})\n(R: ${color.r}, G: ${color.g}, B: ${color.b})`;
    },
  },
});
</script>

<style scoped lang="scss">
#BitmapDataCanvas {
  display: grid;
  margin: 50px 0;
  width: 500px;
  aspect-ratio: 1 / 1;
  .pixel {
    transition: all 0.5s ease;
    cursor: crosshair;
    &:hover {
      border: 1px solid black;
      transform: scale(1.5);
    }
  }
}
</style>
