<template>
  <div class="welcome-content">
    <h1>Zenitta OS</h1>
    <p>ようこそ、新しい環境へ。</p>
    <div class="actions">
      <button @click="closeSelf">開始する</button>
    </div>
  </div>
</template>

<script setup>
import { bus } from '../../utils/EventBus';

const emit = defineEmits(['close']);
const closeSelf = () => {
  emit('close');
  bus.emit('notify', { title: 'システム', message: 'Zenitta OSへようこそ！' });
};
</script>

<style scoped>
.welcome-content { padding: 20px; text-align: center; }
h1 { font-size: 1.5rem; margin-bottom: 10px; }
.actions { margin-top: 20px; }
button { padding: 8px 16px; cursor: pointer; }
</style>