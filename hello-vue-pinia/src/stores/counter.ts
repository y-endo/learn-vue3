import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0);
//   const doubleCount = computed(() => count.value * 2);
//   function increment() {
//     count.value++;
//   }

//   return { count, doubleCount, increment };
// });

interface State {
  counter: number;
}

const useCounterStore = defineStore({
  id: 'counter',
  state: (): State => ({
    counter: 0
  }),
  getters: {
    doubleCounter: state => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++;
    }
  }
});

export default useCounterStore;
