<template>
  <div class="window" :style="{ left: x + 'px', top: y + 'px', zIndex: zIndex }">
    <Titlebar 
      :title="title" 
      :showControls="isControlBox"
      @contextmenu.prevent="isSysMenu ? openMenu : null"
      @drag="handleMove" 
      @close="$emit('close')" 
    />
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Titlebar from './Titlebar.vue';

const props = defineProps({
  title: { type: String, default: 'Zenitta OS' }, // ウィンドウのタイトル
  isControlBox: { type: Boolean, default: true }, // コントロールボックスの表示
  isSysMenu: { type: Boolean, default: true }, // システムメニューの表示
  initialX: { type: Number, default: 50 }, // ウィンドウの初期X座標
  initialY: { type: Number, default: 50 }, // ウィンドウの初期Y座標
  zIndex: { type: Number, default: 1 } // ウィンドウのz-index
});

const x = ref(props.initialX);
const y = ref(props.initialY);

const handleMove = (dx, dy) => {
  x.value += dx;
  y.value += dy;
};

const handleDragEnd = (e) => {
  const threshold = 20; // 画面端から20pxでスナップ開始
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 左半分にスナップ
  if (e.clientX < threshold) {
    x.value = 0;
    y.value = 0;
    width.value = screenWidth / 2;
    height.value = screenHeight;
  }
  // 右半分にスナップ
  else if (e.clientX > screenWidth - threshold) {
    x.value = screenWidth / 2;
    y.value = 0;
    width.value = screenWidth / 2;
    height.value = screenHeight;
  }
  // 上部（最大化）
  else if (e.clientY < threshold) {
    x.value = 0; y.value = 0;
    width.value = screenWidth; height.value = screenHeight;
  }
};

</script>