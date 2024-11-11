<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-11 14:23:31
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-11 21:59:19
 * @FilePath: /ocean-vite3-elementPlus/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
import zhCN from "element-plus/es/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";

const settingsStore = useSettingsStore();

watchEffect(() => {
  settingsStore.isMacOS
    ? document.body.classList.add("is-mac-os")
    : document.body.classList.remove("is-mac-os");
  settingsStore.isMobile
    ? document.body.classList.add("is-mobile")
    : document.body.classList.remove("is-mobile");
  // settingsStore.isMixMenu
  //   ? document.body.classList.add("is-mix-menu")
  //   : document.body.classList.remove("is-mix-menu");
  // settingsStore.isTopMenu
  //   ? document.body.classList.add("is-top-menu")
  //   : document.body.classList.remove("is-top-menu");
  // settingsStore.isSideMenu
  //   ? document.body.classList.add("is-side-menu")
  //   : document.body.classList.remove("is-side-menu");
  // settingsStore.isRealDark
  //   ? document.body.classList.add("is-real-dark")
  //   : document.body.classList.remove("is-real-dark");
  settingsStore.isWindowOS
    ? document.body.classList.add("is-window-os")
    : document.body.classList.remove("is-window-os");
  // settingsStore.themeWeak
  //   ? document.body.classList.add("is-theme-weak")
  settingsStore.multiTab
    ? document.body.classList.add("is-multi-tab")
    : document.body.classList.remove("is-multi-tab");
  // ConfigProvider.config({ theme: settingsStore.themeColor });
  // dayjs.locale(settingsStore.language);
});
</script>

<template>
  <el-config-provider :locale="zhCN" namespace="ocean">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<style scoped></style>
