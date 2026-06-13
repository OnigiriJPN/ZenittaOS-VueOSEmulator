<template>
  <div v-if="isDragging" class="snap-guide" :class="snapPreviewClass"></div>

  <div 
    ref="winRef"
    class="window"
    :style="winStyle"
    @mousedown="startDrag"
  >
    <div class="handle">DRAG HERE</div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useMouse, useWindowSize } from '@vueuse/core';

const winRef = ref(null);
const isDragging = ref(false);
const snapPreviewClass = ref('');
const winStyle = reactive({ top: '100px', left: '100px', width: '320px', height: 'auto' });

const { x: mouseX, y: mouseY } = useMouse();
const { width: screenW, height: screenH } = useWindowSize();

const startDrag = (e) => {
  isDragging.value = true;
  const offsetX = e.clientX - parseInt(winStyle.left);
  const offsetY = e.clientY - parseInt(winStyle.top);

  const onMove = (moveE) => {
    winStyle.left = `${moveE.clientX - offsetX}px`;
    winStyle.top = `${moveE.clientY - offsetY}px`;
    checkSnap(moveE.clientX, moveE.clientY);
  };

  const onUp = () => {
    isDragging.value = false;
    applySnap();
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
};

const checkSnap = (mx, my) => {
  if (my < 20) snapPreviewClass.value = 'snap-top';      // 上部スナップ候補
  else if (mx < 20) snapPreviewClass.value = 'snap-left';   // 左スナップ候補
  else if (mx > screenW.value - 20) snapPreviewClass.value = 'snap-right'; // 右スナップ候補
  else snapPreviewClass.value = '';
};

const applySnap = () => {
  if (snapPreviewClass.value === 'snap-top') {
    winStyle.top = '0px'; winStyle.left = '25vw';
    winStyle.width = '50vw'; winStyle.height = '50vh';
  }
  snapPreviewClass.value = '';
};
</script>

<style scoped>
.window { position: fixed; background: #000; border: 1px solid #FF00FF; transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
.handle { height: 30px; background: #222; cursor: move; }

/* スナップガイド（ピンクのガイド枠） */
.snap-guide { position: fixed; border: 2px solid #FF00FF; background: rgba(255, 0, 255, 0.1); pointer-events: none; }
.snap-top { top: 0; left: 25vw; width: 50vw; height: 50vh; }
.snap-left { top: 0; left: 0; width: 50vw; height: 100vh; }
.snap-right { top: 0; right: 0; width: 50vw; height: 100vh; }
</style>