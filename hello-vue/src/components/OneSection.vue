<script setup lang="ts">
import { reactive } from 'vue';

interface Props {
  text?: string;
}

defineProps<Props>();

const info = reactive({
  name: '田中太郎',
  state: 'Normal'
});
</script>

<template>
  <section class="box">
    <h4>コンポーネント</h4>
    <p>コンポーネントとは…</p>
    <p>props text: {{ text }}</p>
    <slot :info="info">
      <p>子HTMLなし</p>
      <p>{{ info.name }}さんの状況</p>
      <p>{{ info.state }}</p>
    </slot>
    <slot name="slot-sample2">
      <p>slotサンプル2 子HTMLなし</p>
    </slot>
  </section>
</template>

<style scoped>
.box {
  border: 1px solid #ccc;
  margin: 10px;
}
</style>
