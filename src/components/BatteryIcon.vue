<template>
  <div class="battery-outer">
    <div class="battery-level" :style="{ width: level + '%' }"></div>
    <div class="battery-tip"></div>
  </div>
</template>

<script setup>
defineProps(['level']); // 0〜100の数値を渡す
</script>

<style scoped>
.battery-outer {
  width: 28px;
  height: 14px;
  border: 1.5px solid #333;
  border-radius: 3px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 1px;
}
/* 残量30%以下で赤くするロジックの例 */
.battery-level.low {
  background: #ff5f56;
}
.battery-level {
  height: 100%;
  background: #0f0; /* 充電時は緑、残量減で色を変えるロジックも追加可能 */
  transition: width 0.5s ease;
}
.battery-tip {
  width: 3px;
  height: 6px;
  background: #333;
  border-radius: 0 1px 1px 0;
}
</style>