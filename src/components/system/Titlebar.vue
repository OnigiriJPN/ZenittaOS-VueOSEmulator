<template>
  <div class="titlebar" @mousedown="onDragStart">
    <span class="title-text">{{ title }}</span>
    <div class="title-controls">
      <button class="btn-min" @click.stop="$emit('minimize')">-</button>
      <button class="btn-close" @click.stop="$emit('close')">×</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title']);
const emit = defineEmits(['open-menu', 'drag']);

let pressTimer = null;

const handleTouchStart = (e) => {
  pressTimer = setTimeout(() => {
    emit('open-menu', { x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, 500); // 500msの長押しで発火
};

const handleTouchEnd = () => clearTimeout(pressTimer);
const openMenu = (e) => emit('open-menu', { x: e.clientX, y: e.clientY });

defineProps({ title: String });
const emit = defineEmits(['drag', 'minimize', 'close']);

const onDragStart = (e) => {
  const onMouseMove = (moveE) => {
    emit('drag', moveE.movementX, moveE.movementY);
  };
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
</script>