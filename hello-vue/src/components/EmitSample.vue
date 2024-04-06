<script setup lang="ts">
interface Props {
  rand: number;
  num: number;
}

interface Emits {
  (event: 'createNewRand', payload: { id: number; text: string }): void;
  (event: 'update:num', payload: number): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleNewRandButtonClick = (): void => {
  emit('createNewRand', {
    id: 0,
    text: 'test'
  });
};

const handleInputNum = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  emit('update:num', Number(input.value));
};
</script>

<template>
  <section class="box">
    <p>子コンポーネントで乱数を表示: {{ rand }}</p>
    <input type="number" :value="num" @input="handleInputNum" />
    <button @click="handleNewRandButtonClick">新たな乱数を発生</button>
  </section>
</template>

<style scoped>
.box {
  border: 1px solid blue;
  margin: 10px;
}
</style>
