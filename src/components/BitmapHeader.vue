<template>
  <table>
    <tbody>
      <tr>
        <th>フォーマット種類</th>
        <td>0～1</td>
        <td>{{ format_type }}</td>
      </tr>
      <tr>
        <th>ファイルサイズ</th>
        <td>2～5</td>
        <td>{{ file_size }}</td>
      </tr>
      <tr>
        <th></th>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BitmapHeader",
  props: {
    format_type: {
      type: String,
      required: true,
    },
    file_size: {
      type: Number,
      required: true,
    },
  },
});
</script>
