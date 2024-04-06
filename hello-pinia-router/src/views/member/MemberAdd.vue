<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import type { Member } from '@/interfaces';
import useMembersStore from '@/stores/members';

const router = useRouter();
const membersStore = useMembersStore();
const member: Member = reactive({
  id: 0,
  name: '',
  email: '',
  points: 0,
  note: ''
});
const add = (): void => {
  const promise = membersStore.insertMember(member);
  promise
    .then((result: boolean) => {
      if (result) {
        router.push({ name: 'MemberList' });
      }
    })
    .catch((error: Error) => {
      console.error(error);
    });
};
</script>

<template>
  <h1>会員管理</h1>
  <nav id="breadcrumbs">
    <ul>
      <li>
        <RouterLink :to="{ name: 'AppTop' }">TOP</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'MemberList' }">会員リスト</RouterLink>
      </li>
      <li>会員詳細情報</li>
    </ul>
  </nav>
  <section>
    <h2>会員リスト</h2>
    <p>情報を入力し、登録ボタンをクリックしてください。</p>
    <form @submit.prevent="add">
      <dl>
        <dt><label>ID</label></dt>
        <dd><input type="number" v-model.number="member.id" required /></dd>
        <dt><label>名前</label></dt>
        <dd><input type="text" v-model="member.name" required /></dd>
        <dt><label>メールアドレス</label></dt>
        <dd><input type="email" v-model="member.email" required /></dd>
        <dt><label>保有ポイント</label></dt>
        <dd><input type="number" v-model.number="member.points" required /></dd>
        <dt><label>備考</label></dt>
        <dd><textarea v-model="member.note"></textarea></dd>
      </dl>
      <button type="submit">登録</button>
    </form>
  </section>
</template>
