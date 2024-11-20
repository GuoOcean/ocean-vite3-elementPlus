<template>
  <div class="ocean-logo ocean-logo-wrapper" :class="oceanLogoClass">
    <router-link to="/">
      <div class="ocean-logo-container">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
        <h1 v-if="!settingsStore.isCollapse">{{ VITE_APP_TITLE }}</h1>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
const settingsStore = useSettingsStore();

const oceanLogoClass = computed(() => ({
  "ocean-logo-retract": settingsStore.isCollapse,
  "ocean-logo-column": settingsStore.isColumnMenu,
}));

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE;
</script>

<style scoped lang="scss">
.ocean-logo {
  position: relative;
  display: flex;
  align-items: center;
  width: $ocean-sidebar-width;
  height: $ocean-header-height;
  cursor: pointer;
  padding: 0 16px;
}
.ocean-logo-column {
  width: $ocean-columnbar-width;
}
.ocean-logo-retract {
  width: $ocean-sidebar-retractWidth;
  padding: 0 8px;
}
h1 {
  // color: var(--ant-primary-color);
  color: var(--el-color-primary);
  margin-bottom: 0;
  margin-left: 10px;
  animation: pro-layout-title-hide 0.3s;
}

.ocean-logo-container {
  display: flex;
  align-items: center;
  .logo {
    width: 32px;
  }
}

@keyframes pro-layout-title-hide {
  0% {
    display: none;
    opacity: 0;
  }
  80% {
    display: none;
    opacity: 0;
  }
  100% {
    display: unset;
    opacity: 1;
  }
}
</style>
