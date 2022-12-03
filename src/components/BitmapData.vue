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
      :key="pixel.toString()"
      class="pixel"
      v-bind:style="{
        backgroundColor: get_background_color(pixel),
      }"
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
  },
  mounted() {
    const BitmapCanvas = this.$refs["BitmapCanvas"] as HTMLElement;
  },
});
</script>

<style scoped lang="scss">
#BitmapDataCanvas {
  display: grid;
  margin: 50px 0;
  width: 500px;
  aspect-ratio: 1 / 1;
}
</style>
