<script setup lang="ts">
import { reactive, provide } from 'vue';
import { RouterView } from 'vue-router';
import type { Member } from '@/interfaces';

const memberList = new Map<number, Member>();
memberList.set(33456, {
  id: 33456,
  name: '田中太郎',
  email: 'bow@example.com',
  points: 35,
  note: '初回入会特典あり。'
});
memberList.set(47783, { id: 47783, name: '鈴木次郎', email: 'mue@example.com', points: 52 });

provide('memberList', reactive(memberList));
</script>

<template>
  <header>
    <h1>Vue Routerサンプル</h1>
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
