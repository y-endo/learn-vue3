<script setup lang="ts">
interface Props {
  title: string;
  content?: string;
}

// defineProps<Props>();
withDefaults(defineProps<Props>(), {
  content: '-'
});
</script>

<template>
  <section class="box">
    <h4>{{ title }}</h4>
    <p>{{ content }}</p>
  </section>
</template>

<style scoped>
.box {
  border: 1px solid green;
  margin: 10px;
}
</style>
