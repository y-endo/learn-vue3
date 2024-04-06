<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  reactive,
  watchEffect,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onRenderTracked,
  onRenderTriggered
} from 'vue';

import OneSection from './components/OneSection.vue';
import OneInfo from './components/OneInfo.vue';
import OneMember from './components/OneMember.vue';
import EmitSample from './components/EmitSample.vue';

import Input from './components/Input.vue';
import Radio from './components/Radio.vue';
import Select from './components/Select.vue';

import type { DebuggerEvent } from 'vue';
import type { Member } from './interfaces';

const seconds = ref(new Date().getSeconds());

const twiceSeconds = computed(() => seconds.value * 2);
// 算出プロパティは読み取り専用
// twiceSeconds.value = 100 // エラー

// reactiveでリアクティブなテンプレート変数をまとめられる
const user = reactive({
  name: 'YukiEndo',
  age: 30
});

const isSubmitButtonDisabled = ref(true);

const attrNameStyle = ref('style');

const imgAttr = ref({
  src: '/images/logo.svg',
  alt: 'Vue logo',
  width: 100,
  height: 100
});

const red = ref('red');

const style1 = ref({
  fontSize: '14px',
  fontWeight: 700
});

const style2 = ref({
  color: red
});

const styles = ref({
  textColorRed: false,
  bgColorBlue: true
});
const computedStyles = computed((): { textColorRed: boolean; bgColorBlue: boolean } => {
  const ran1 = Math.round(Math.random());
  const ran2 = Math.round(Math.random());

  return {
    textColorRed: ran1 === 0,
    bgColorBlue: ran2 === 0
  };
});

function updateSeconds() {
  const date = new Date();
  seconds.value = date.getSeconds();
}

const handleButtonClick = () => {
  user.name = 'Endo, Yuki';
};

const handleButtonClick2 = (arg1: string, event: MouseEvent) => {
  console.log(arg1);
  console.log(event);
};

const handleKeyDownEnter = () => {
  console.log('Enter');
};

const handleKeyDownTab = () => {
  console.log('Tab');
};

const inputNameModel = ref('ホゲホゲ');
const inputNumber = ref(0);

const randomNumber = ref(Math.round(Math.random()));

const fruits: string[] = ['apple', 'banana', 'orange'];
const companyDirectory: { [key: number]: string } = {
  0: 'Tanake',
  1: 'suzuki',
  2: 'sato'
};
const companyDirectoryMap = new Map<number, string>();
companyDirectoryMap.set(0, 'Tanake');
companyDirectoryMap.set(1, 'suzuki');
companyDirectoryMap.set(2, 'sato');
const companyDirectoryMapRef = ref(companyDirectoryMap);

interface Product {
  id: number;
  name: string;
  price: number;
}
const products: Product[] = [
  { id: 0, name: 'apple', price: 100 },
  { id: 1, name: 'banana', price: 200 },
  { id: 2, name: 'orange', price: 300 }
];
const productsRef = ref(products);
const productsOver200 = computed((): Product[] => {
  const filteredProducts = productsRef.value.filter((product: Product) => product.price > 200);
  return filteredProducts;
});

const watchEffectResult = ref(0);
watchEffect(() => {
  watchEffectResult.value = seconds.value * 2;
});

const watchResult = ref(0);
watch(
  seconds,
  (newValue, oldValue) => {
    watchResult.value = newValue * 2;
  },
  { immediate: true }
);

onBeforeMount(() => {
  // console.log('onBeforeMount');
});

onMounted(() => {
  // console.log('onMounted');
});

onBeforeUpdate(() => {
  // console.log('onBeforeUpdate');
});

onUpdated(() => {
  // console.log('onUpdated');
});

// デバッグ用ライフサイクル
onRenderTracked((event: DebuggerEvent) => {
  // console.log('onRenderTracked');
  // console.log(event);
});

// デバッグ用ライフサイクル
onRenderTriggered((event: DebuggerEvent) => {
  // console.log('onRenderTriggered');
  // console.log(event);
});

const handleCreateNewRand = (payload: { id: number; text: string }): void => {
  console.log(payload);
  randomNumber.value = Math.round(Math.random() * 10);
};

const numEmitSample = ref(0);

const memberList = new Map<number, Member>();
memberList.set(0, {
  id: 0,
  name: '遠藤勇気',
  email: 'yuki@endo.com',
  points: 50,
  note: '特典あり。'
});
memberList.set(1, { id: 1, name: '遠藤生真', email: 'ikuma@endo.com', points: 0 });

// provideの値はreactiveを利用する。
// ref()でも使えるが、Injectしたデータに.valueでアクセスするとTypeScriptでは型エラーになる。
provide('memberList', reactive(memberList));

const currentComponent = ref(Input);
const currentComponentName = ref('Input');
const componentList = [Input, Radio, Select];
const componentNameList: string[] = ['Input', 'Radio', 'Select'];
let currentComponentIndex = 0;
const switchComponent = (): void => {
  currentComponentIndex++;
  if (currentComponentIndex >= 3) {
    currentComponentIndex = 0;
  }
  currentComponent.value = componentList[currentComponentIndex];
  currentComponentName.value = componentNameList[currentComponentIndex];
};

setInterval(updateSeconds, 1000);
</script>

<template>
  <div>
    <h1>{{ seconds }}</h1>
    <img v-bind="imgAttr" />
    <img v-bind="imgAttr" alt="属性は後から指定した方が上書きする" />
  </div>
  <div>
    <h2>{{ twiceSeconds }}</h2>
  </div>
  <div :[attrNameStyle]="'height:100px;'">
    <p>{{ user.name }} is {{ user.age }} years old.</p>
  </div>
  <form>
    <button :disabled="isSubmitButtonDisabled">送信</button>
  </form>
  <div>
    <p :style="{ fontSize: '18px' }">テキスト</p>
    <p :style="{ color: red }">テキスト</p>
    <p :style="style1">テキスト</p>
    <p :style="[style1, style2]">テキスト</p>
  </div>
  <div>
    <p :class="{ textColorRed: true, bgColorBlue: true }">テキスト</p>
    <p :class="styles">テキスト</p>
    <p :class="computedStyles">テキスト</p>
  </div>
  <div>
    <button @click="handleButtonClick">Yuki Endo to Endo, Yuki.</button>
    <button @click.once="handleButtonClick2('hoge', $event)">ボタン2 once</button>
    <input type="text" value="@keydown.enter" @keydown.enter="handleKeyDownEnter" />
    <input type="text" value="@keydown.tab" @keydown.tab="handleKeyDownTab" />
  </div>
  <div>
    <p>通常のv-model</p>
    <input type="text" v-model="inputNameModel" />
    <p>v-model.lazy lazy修飾子はinputイベントではなくchangeイベントで動く</p>
    <input type="text" v-model.lazy="inputNameModel" />
    <p>v-model.trim time修飾子は入力値をtrim()してくれる。</p>
    <input type="text" v-model.trim="inputNameModel" />
    <p>v-model.number number修飾子は入力値を数値にする</p>
    <input type="text" v-model.number="inputNumber" />
    <p>inputNameModel: {{ inputNameModel }}</p>
    <p>inputNumber: {{ inputNumber * 2 }}</p>
  </div>
  <div>
    <section v-pre>v-pre: {{ seconds }}</section>
    <p v-once>v-once: {{ seconds }}</p>
  </div>
  <div>
    <p v-cloak>v-cloak {{ seconds }}</p>
  </div>
  <div>
    <template v-if="randomNumber === 0">
      <p>乱数が0</p>
      <p>templateタグに囲われています。</p>
      <p>templateタグはv-ifディレクトリのためだけのタグです。</p>
    </template>
    <template v-else-if="randomNumber === 1">
      <p>乱数が1</p>
      <p>templateタグに囲われています。</p>
      <p>templateタグはv-ifディレクトリのためだけのタグです。</p>
    </template>
  </div>
  <div>
    <ul>
      <li v-for="(fruit, index) in fruits" :key="`item-${index}`">{{ fruit }}</li>
    </ul>
    <ul>
      <li v-for="(name, id, index) in companyDirectory" :key="`employee-${index}`">
        {{ id }}: {{ name }}
      </li>
    </ul>
    <ul>
      <li v-for="(name, id, index) in companyDirectory" :key="`employee-${index}`">
        {{ id }}: {{ name }}
      </li>
    </ul>
    <ul>
      <li v-for="[id, name] in companyDirectoryMapRef" :key="id">{{ id }}: {{ name }}</li>
    </ul>
    <ul>
      <li v-for="i in 10" :key="`index-${i}`">
        <span>v-for i in 10： i = {{ i }}</span>
      </li>
    </ul>
    <p>
      v-forの中にv-ifでループ内の条件にあったものを抽出できるが、Vueのスタイルガイドに反する。computeでfilterした配列を回す。
    </p>
    <ul>
      <li v-for="product in productsOver200" :key="`product-${product.id}`">
        {{ product.name }}: {{ product.price }}
      </li>
    </ul>
  </div>
  <div>
    <p>watchEffectの監視対象はwatchEffectの関数内で使用されているリアクティブオブジェクト</p>
    <p>watchEffectResult: {{ watchEffectResult }}</p>
    <p>watchの監視対象はwatch関数の第一引数で渡されたリアクティブオブジェクト</p>
    <p>watchResult: {{ watchResult }}</p>
  </div>
  <OneSection />
  <OneSection>
    <p>Slot機能のテスト 子HTML</p>
  </OneSection>
  <!-- コンポーネントの入れ子にHTMLを入れると、コンポーネントの slot に挿入される -->
  <OneSection text="テスト">
    <template v-slot:default>
      <p>デフォルトの slot 子HTML</p>
    </template>
    <template v-slot:slot-sample2>
      <p>slot-sample2 の 子HTML</p>
    </template>
  </OneSection>
  <OneSection text="テスト2">
    <template #default="slotProps">
      <p>デフォルトの slot 子HTML</p>
      <p>{{ slotProps.info.name }}さんの状況</p>
      <p>{{ slotProps.info.state }}</p>
    </template>
    <template #slot-sample2>
      <p>slot-sample2 の 子HTML</p>
    </template>
  </OneSection>
  <OneInfo title="タイトル1" content="コンテント1" />
  <OneInfo title="タイトル2" :content="user.name" />
  <OneInfo title="タイトル3" />
  <EmitSample
    :rand="randomNumber"
    v-model:num="numEmitSample"
    @createNewRand="handleCreateNewRand"
  />
  <p>numEmitSample: {{ numEmitSample }}</p>
  <OneMember v-for="id in memberList.keys()" :id="id" :key="id" />

  <div>
    <p>コンポーネント名：{{ currentComponentName }}</p>
    <KeepAlive>
      <component :is="currentComponent"></component>
    </KeepAlive>
    <button @click="switchComponent">コンポーネント切り替え</button>
  </div>
</template>

<style>
[v-clock] {
  display: none;
}
.textColorRed {
  color: red;
}
.bgColorBlue {
  background-color: blue;
}
</style>
