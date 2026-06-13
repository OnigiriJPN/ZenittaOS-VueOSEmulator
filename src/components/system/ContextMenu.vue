<template>
  <div v-if="visible" class="os-context-menu" :style="{ top: y + 'px', left: x + 'px' }">
    <div v-for="item in items" :key="item.label" class="os-menu-item" @click="handleAction(item.action)">
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  x: Number,
  y: Number,
  items: Array
});
const emit = defineEmits(['action']);
const handleAction = (action) => emit('action', action);
</script>