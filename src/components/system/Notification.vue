<template>
  <div class="notification-toast">
    <div class="title">{{ title }}</div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<style scoped>
.notification-toast {
  position: fixed; top: 20px; right: 20px; z-index: 99999;
  width: 300px; padding: 16px; border-radius: 12px;
  background: rgba(243, 243, 243, 0.9);
  backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.title { font-weight: bold; font-size: 0.9rem; margin-bottom: 4px; }
.message { font-size: 0.8rem; color: #555; }
</style>