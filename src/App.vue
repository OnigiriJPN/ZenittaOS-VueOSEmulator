<script setup>
// import HelloWorld from './components/HelloWorld.vue'

import { ref, onMounted, onUnmounted } from 'vue';
//import DraggableWindow from './components/DraggableWindow.vue'; // 先ほどのコンポーネントをimport

const state = ref('boot'); // 'boot', 'setup', 'desktop'
const initOS = (e) => {
  // .screen クラスを持つ要素、またはその子要素をタップしたか判定
  if (e.target.closest('.screen')) {
    if (state.value === 'boot') {
      state.value = 'setup';
      console.log("Zenitta OS: Initializing Setup...");
      if (navigator.vibrate) navigator.vibrate(100); // タップ振動
      if (!navigator.vibrate) console.error("Error! Vibration is not supported this is browser. Please update browser. (isNot supported vibrate Chrome or Firefox iOS Edition. )");
    }
  }
};

onMounted(() => {
  // アプリ全体でイベントを監視
  window.addEventListener('pointerdown', initOS);
});

onUnmounted(() => {
  window.removeEventListener('pointerdown', initOS);
});
const step = ref(1);
const user = ref("");
const pin = ref("");
const agreed = ref(false);
const progress = ref(0);
const status = ref("");

// Enterキーで起動
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && state.value === 'boot') state.value = 'setup';
});
// インストール実行処理
const install = () => {
  step.value = 7;
  const tasks = ["Checking sectors...", "Formatting System/...", "Unpacking Kernel...", "Setting permissions...", "Finalizing."];
  let i = 0;
  const timer = setInterval(() => {
    status.value = tasks[i];
    progress.value += 20;
    i++;
    if (i >= tasks.length) {
      clearInterval(timer);
      setTimeout(() => state.value = 'desktop', 1000);
    }
  }, 1000);
};

</script>

<template>
  <div id="zenitta-os">
    <div v-if="state === 'boot'" class="screen">
      <img src="/ZenittaOSLogo.png" class="boot-logo" />
      <p class="blink">> PRESS ENTER OR CLICK TO START SETUP...</p>
    </div>

    <div v-if="state === 'setup'" class="screen setup-container">
      <div class="card">
        <h2 class="neon-text">Step {{ step }} / 7</h2>

        <div v-if="step === 1">
          <h1 style="color: white;">Welcome to Zenitta</h1><button @click="step++">はじめる</button>
        </div>
        <div v-if="step === 2">
          <h2 style="color: white;">利用規約</h2>
          <div class="terms">このオペレーティングシステムはMITライセンスです。改造は許可します。</div><input type="checkbox" v-model="agreed">
          同意する<br><button :disabled="!agreed" @click="step++">次へ</button>
        </div>
        <div v-if="step === 3">
          <h2 style="color: white;">ユーザー名</h2><input v-model="user" type="text" placeholder="Name"> <button @click="step++"
            :disabled="!user">次へ</button>
        </div>
        <div v-if="step === 4">
          <h2 style="color: white;">パスワード</h2><input type="password" v-model="pin" placeholder="PIN(4桁)"> <button
            :disabled="!pin" @click="step++">次へ</button>
        </div>
        <div v-if="step === 5">
          <h2 style="color: white;">プロダクトキー</h2><input type="text" placeholder="XXXX-XXXX"> <button @click="step++">認証</button>
        </div>
        <div v-if="step === 6">
          <h2 style="color: white;">フォーマット</h2><button @click="install" class="danger">System/ を初期化</button>
        </div>
        <div v-if="step === 7">
          <h2 style="color: white;">インストール中...</h2>
          <div class="bar">
            <div :style="{ width: progress + '%' }"></div>
          </div>
          <p>{{ status }}</p>
        </div>
      </div>
    </div>

    <div v-if="state === 'desktop'" class="desktop">
      <header class="taskbar">Zenitta OS | User: {{ user }}</header>
      <main class="icons">
        <div class="icon">Terminal</div>
        <div class="icon">Files</div>
      </main>
    </div>
  </div>
</template>


<style>
body {
  margin: 0;
  background: #000;
  color: #0f0;
  font-family: 'Courier New', monospace;
}

.screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.boot-logo {
  width: 300px;
  margin-bottom: 20px;
}

.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.card {
  border: 1px solid #f0f;
  padding: 40px;
  background: #111;
  text-align: center;
}

.neon-text {
  color: #f0f;
  text-shadow: 0 0 10px #f0f;
}

.bar {
  width: 300px;
  height: 10px;
  border: 1px solid #0f0;
}

.bar div {
  height: 100%;
  background: #0f0;
  transition: width 0.5s;
}

.danger {
  background: #800;
  color: white;
}

.desktop {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.taskbar {
  background: #222;
  padding: 10px;
}

.icons {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.icon {
  border: 1px solid #fff;
  padding: 20px;
  cursor: pointer;
}

button {
  /* ブラウザ標準の見た目を強制リセット */
  appearance: none;
  -webkit-appearance: none;

  /* Zenitta OSのスタイルを適用 */
  background: #111;
  border: 1px solid #0f0;
  /* ネオンカラーの枠 */
  color: #0f0;
  padding: 10px 20px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  transition: all 0.2s;
}

button:hover {
  background: #0f0;
  color: #000;
  opacity: 0.6;
}

button:disabled {
  background: #333;
  border-color: #555;
  color: #555;
  cursor: not-allowed;
  opacity: 0.5;
}

/* 押した時の反応もOSっぽく */
button:active {
  background: #0f0;
  color: #000;
  opacity: 1;
}

/* 入力欄（テキストボックス） */
input[type="text"],
input[type="password"] {
  background: #000;
  border: 2px solid #555;
  color: #0f0;
  /* レトロな緑の文字 */
  padding: 10px;
  font-family: 'Courier New', monospace;
  outline: none;
  transition: border 0.3s;
  width: 100%;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border: 2px solid #0f0;
  /* フォーカス時に縁が緑に光る */
}

/* ラベルの調整 */
label {
    color: #aaa;
    font-size: 0.9rem;
    margin-bottom: 5px;
    display: block;
}
</style>