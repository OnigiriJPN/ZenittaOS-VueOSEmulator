<template>
  <Window title="仮想キーボード" :isControlBox="false" :isSysMenu="true">
    <div class="keyboard-container">
      <div class="row">
        <button class="mod" @click="toggle('ctrl')" :class="{active: isCtrl}">Ctrl</button>
        <button class="mod" @click="toggle('alt')" :class="{active: isAlt}">Alt</button>
        <button class="mod" @click="toggle('shift')" :class="{active: isShift}">Shift</button>
        <button class="func" @click="send('backspace')">Backspace</button>
      </div>

      <div class="row">
        <button v-for="key in '1234567890-='" :key="key" @click="send(key)">{{ key }}</button>
      </div>

      <div class="row">
        <button v-for="key in 'QWERTYUIOP[]'" :key="key" @click="send(key)">{{ key }}</button>
      </div>

      <div class="row">
        <button v-for="key in 'ASDFGHJKL;:'" :key="key" @click="send(key)">{{ key }}</button>
      </div>

      <div class="row">
        <button v-for="key in 'ZXCVBNM,./'" :key="key" @click="send(key)">{{ key }}</button>
        <button class="func" @click="send('enter')" style="flex-grow: 2;">Enter</button>
      </div>

      <div class="row">
        <button @click="send(' ')" style="width: 100%;">Space</button>
      </div>
    </div>
  </Window>
</template>

<script setup>
import { ref } from 'vue';
// 必要に応じてWindowをインポート
const isCtrl = ref(false);
const isAlt = ref(false);
const isShift = ref(false);

const toggle = (k) => { if(k==='ctrl') isCtrl.value = !isCtrl.value; /* 以下略 */ };
const send = (key) => { console.log(`Input: ${key}`); };
</script>

<style scoped>
.keyboard-container { display: flex; flex-direction: column; gap: 4px; padding: 10px; background: #222; }
.row { display: flex; gap: 4px; }
button { 
  flex: 1; padding: 10px 5px; border: none; border-radius: 4px;
  background: #444; color: white; cursor: pointer; font-size: 0.8rem;
}
button:active { background: var(--os-accent); color: black; }
.mod { background: #555; font-weight: bold; }
.func { background: #666; }
</style>