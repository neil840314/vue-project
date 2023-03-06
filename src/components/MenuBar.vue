<script setup lang="ts">
import type { Category } from '@/models/category'
import { type Ref, ref, type PropType } from 'vue'
import MenuItem from './MenuItem.vue'

const props = defineProps({
  categories: {
    type: Array as PropType<Category[]>,
    required: true
  }
})

const activeId: Ref<string> = ref('')
</script>

<template>
  <div>
    <MenuItem
      v-for="category in props.categories"
      :key="category.id"
      :category="category"
      v-model:activeId="activeId"
    />
  </div>
</template>

<style lang="scss" scoped>
/** style */
</style>
