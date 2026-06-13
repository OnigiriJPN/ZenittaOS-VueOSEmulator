// src/utils/SystemManager.js

export const getBatteryStatus = async () => {
  try {
    // APIが非対応、またはユーザーが拒否している場合を想定
    if (!navigator.getBattery) {
      throw new Error("Battery API not supported");
    }

    const battery = await navigator.getBattery();
    
    // バッテリー状態が異常に低い場合（例: 5%以下）の警告フラグ
    const isCritical = battery.level <= 0.05 && !battery.charging;
    
    return {
      level: Math.round(battery.level * 100) + '%',
      charging: battery.charging,
      isCritical,
      error: null
    };
  } catch (err) {
    console.warn("Battery status unavailable:", err);
    return {
      level: '--%',
      charging: false,
      isCritical: false,
      error: "Battery info unavailable: " + err.message
    };
  }
};