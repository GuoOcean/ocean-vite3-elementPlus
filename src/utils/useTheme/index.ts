/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-25 22:42:16
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-09-28 15:23:30
 * @FilePath: /ocean-vite3/src/utils/useTheme/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import pinia from "@/store";
// 导入系统仓库
import { useSettingsStore } from "@/store/modules/settings";
// 实例化仓库
const settingsStore = useSettingsStore(pinia);
const themeMode = ref(settingsStore.themeMode);

const followOS = () => {
  console.log("主题跟随系统变化", match.matches ? "dark" : "light");
  settingsStore.toggleThemeMode(match.matches ? "dark" : "light");
};
// 监听系统变化
const match = window.matchMedia("(prefers-color-scheme: dark)");
// 添加监听事件
match.addEventListener("change", followOS);

// 监听主题变化
watchEffect(() => {
  // followOS();
  if (themeMode.value === "OS") {
    followOS();
  } else {
    match.removeEventListener("change", followOS);
    settingsStore.toggleThemeMode(themeMode.value);
  }
});

// 默认抛出
export default function useTheme() {
  return {
    themeMode,
  };
}
