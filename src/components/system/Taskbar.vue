<template>
  <div class="taskbar">
    <button class="taskbar-item start-btn">🪟</button>
    
    <div class="taskbar-apps">
      <button 
        v-for="win in activeWindows" 
        :key="win.id"
        class="taskbar-item"
        @click="$emit('focus', win.id)"
        :class="{ 'active': win.isFocused }"
      >
        {{ win.icon }}
      </button>
    </div>

    <div class="system-tray">
      {{ currentTime }}
      <BatteryIcon :level="parseInt(status.battery.level)" />
  <span>{{ status.battery.level }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const currentTime = ref(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
// 時計の更新ロジックはここに追加
</script>