<template>
  <div class="dwm-root">
    <Window 
      v-for="win in windows" 
      :key="win.id"
      :title="win.title"
      :style="{ zIndex: win.zIndex }"
      @close="closeWindow(win.id)"
      @mousedown="focusWindow(win.id)"
    >
      <component :is="win.component" @close="closeWindow(win.id)" />
    </Window>

    <Taskbar :activeWindows="windows" @focus="focusWindow" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Window from './components/system/Window.vue';
import Taskbar from './components/system/Taskbar.vue';
const props = defineProps(['currentUser']);
const windows = ref([]);

// Window生成プロトコル
const openApp = (appInfo) => {
  windows.value.push({
    id: Date.now(),
    title: appInfo.title,
    component: appInfo.component,
    zIndex: windows.value.length + 1,
    // その他フラグ（isControlBoxなど）もここで定義可能
  });
};

// 外部から叩けるように公開
defineExpose({ openApp });
</script>