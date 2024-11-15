<script setup lang="ts">
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
import zhCN from "element-plus/es/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
import { handleThemeStyle } from "@/utils/theme";

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

// 监听主题颜色变化
watch(
  () => settingsStore.primaryColor,
  () => {
    handleThemeStyle(settingsStore.primaryColor as string);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <!-- namespace="ocean" -->
  <el-config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<style scoped></style>
