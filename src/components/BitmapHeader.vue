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
        <th>予約領域①</th>
        <td>6～7</td>
        <td>{{ reserved1 }}</td>
      </tr>
      <tr>
        <th>予約領域②</th>
        <td>8～9</td>
        <td>{{ reserved2 }}</td>
      </tr>
      <tr>
        <th>ヘッダサイズ</th>
        <td>10～13</td>
        <td>{{ header_size }}</td>
      </tr>
      <tr>
        <th>情報ヘッダのサイズ</th>
        <td>14～17</td>
        <td>{{ info_header_size }}</td>
      </tr>
      <tr>
        <th>画像の幅</th>
        <td>18～21</td>
        <td>{{ width }}</td>
      </tr>
      <tr>
        <th>画像の高さ</th>
        <td>22～25</td>
        <td>{{ height }}</td>
      </tr>
      <tr>
        <th>プレーン数</th>
        <td>26～27</td>
        <td>{{ plane }}</td>
      </tr>
      <tr>
        <th>1画素の色数</th>
        <td>28～29</td>
        <td>{{ color_depth }}</td>
      </tr>
      <tr>
        <th>圧縮形式</th>
        <td>30～33</td>
        <td>{{ compression }}</td>
      </tr>
      <tr>
        <th>圧縮サイズ</th>
        <td>34～37</td>
        <td>{{ compression_size }}</td>
      </tr>
      <tr>
        <th>水平解像度</th>
        <td>38～41</td>
        <td>{{ horizontal_resolution }}</td>
      </tr>
      <tr>
        <th>垂直解像度</th>
        <td>42～45</td>
        <td>{{ vertical_resolution }}</td>
      </tr>
      <tr>
        <th>色数</th>
        <td>46～49</td>
        <td>{{ color_palette }}</td>
      </tr>
      <tr>
        <th>重要色数</th>
        <td>50～53</td>
        <td>{{ important_color }}</td>
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
    reserved1: {
      type: Number,
      required: true,
    },
    reserved2: {
      type: Number,
      required: true,
    },
    header_size: {
      type: Number,
      required: true,
    },
    info_header_size: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    plane: {
      type: Number,
      required: true,
    },
    color_depth: {
      type: Number,
      required: true,
    },
    compression: {
      type: Number,
      required: true,
    },
    compression_size: {
      type: Number,
      required: true,
    },
    horizontal_resolution: {
      type: Number,
      required: true,
    },
    vertical_resolution: {
      type: Number,
      required: true,
    },
    color_palette: {
      type: Number,
      required: true,
    },
    important_color: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  border: 1px solid black;
  th,
  td {
    border: 1px solid black;
    padding: 0.5rem 1rem;
  }
}
</style>
