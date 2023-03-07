import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
  const storeActiveId = ref('')
  return { storeActiveId }
  //   const count = ref(0)
  //   const doubleCount = computed(() => count.value * 2)
  //   function increment() {
  //     count.value++
  //   }

  //   return { count, doubleCount, increment }
})
