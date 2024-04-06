<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <h1>Piniaサンプル</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
main {
  border: 1px solid blue;
  padding: 10px;
}
#breadcrumbs {
  margin-left: 0;

  ul {
    padding-left: 0;
    li {
      display: inline;
      list-style-type: none;

      &::before {
        content: '>';
        margin: 0 5px;
      }

      &.current {
        color: red;
      }

      &:first-child::before {
        content: none;
      }
    }
  }
}
</style>
