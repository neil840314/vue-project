<script setup lang="ts">
import type { Category } from '@/models/category'
import { ref, type PropType, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const props = defineProps({
  activeId: {
    type: String
  },
  category: {
    type: Object as PropType<Category>,
    required: true
  }
})

const emit = defineEmits<{
  (event: 'update:activeId', id: string): void
}>()

const subActiveId: Ref<string> = ref('')

const store = useOrderStore()

const { storeActiveId } = storeToRefs(store)

function emitCurrentType(id: string, isLast: boolean) {
  // storeActiveId.value.push(id)
  console.log(id)
  storeActiveId.value = id
  if (isLast) {
    localStorage.setItem('active', id)
  }
  if (id !== props.activeId) {
    emit('update:activeId', id)
  } else {
    emit('update:activeId', '')
  }
}
</script>

<template>
  <div>
    <div class="title-bar" @click="emitCurrentType(props.category.id, !props.category.children)">
      <p
        :class="{
          active:
            props.activeId === props.category.id &&
            !props.category.children &&
            storeActiveId === props.category.id
        }"
      >
        {{ props.category.name }}
      </p>
      <a v-if="props.category.children" class="toggle-icon" href="#">
        {{ props.activeId === props.category.id ? '-' : '+' }}
      </a>
    </div>
    <template v-if="props.category.children">
      <MenuItem
        class="sub-menu"
        v-show="props.activeId === props.category.id"
        v-for="item in props.category.children"
        :key="item.id"
        :category="item"
        v-model:activeId="subActiveId"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.sub-menu {
  margin-left: 30px;
}
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  cursor: pointer;
}

.toggle-icon {
  color: grey;
  text-decoration: none;
}

.active {
  color: yellow;
}
</style>
