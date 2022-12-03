<template>
  <div
    id="BitmapCanvas"
    ref="BitmapCanvas"
    v-bind:style="{
      gridTemplateColumns: grid_template_columns,
      gridTemplateRows: grid_template_rows,
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    data: {
      type: Uint8Array,
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
  mounted() {
    const BitmapCanvas = this.$refs["BitmapCanvas"] as HTMLElement;
    console.log(1);
  },
});
</script>

<style scoped lang="scss">
#BitmapDataCanvas {
  width: 500px;
  aspect-ratio: 1 / 1;
}
</style>
