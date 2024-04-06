<script setup lang="ts">
import { computed } from 'vue';
import useCounterStore from '@/stores/counter';

const counterStore = useCounterStore();
// counterStore.counter を直接参照してもリアクティブにならないので、computed でラップする
const count = computed((): number => {
  return counterStore.counter;
});
const doubleCount = computed((): number => {
  return counterStore.doubleCounter;
});
const handleIncrementClick = () => {
  counterStore.increment();
};
</script>

<template>
  <p>現在のポイント: {{ count }}</p>
  <p>現在のポイントの倍: {{ doubleCount }}</p>
  <button @click="handleIncrementClick">加算</button>
</template>
