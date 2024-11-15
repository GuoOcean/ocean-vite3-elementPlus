<template>
  <div
    class="ocean-side-bar ocean-side-bar-wrapper"
    :class="settingsStore.isCollapse ? 'ocean-side-bar-retract' : ''"
    :style="{ zIndex: zIndex + 10 }"
  >
    <div class="ocean-side-bar-container column">
      <ocean-logo v-if="!settingsStore.isMixingMenu" />
      <div class="stationElement"></div>
      <div
        :class="{
          'ocean-mix-menu': settingsStore.isMixingMenu,
        }"
        style="flex: 1; overflow: hidden auto"
      >
        <ocean-menu />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
const settingsStore = useSettingsStore();

const { nextZIndex } = useZIndex();
const zIndex = nextZIndex();
</script>

<style scoped lang="scss">
.ocean-side-bar {
  position: fixed;
  width: $ocean-sidebar-width;
  min-width: $ocean-sidebar-width;
  max-width: $ocean-sidebar-width;
  left: 0;
  height: 100%;
  top: 0;
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.05);
  transition:
    background-color 0.3s,
    min-width 0.3s,
    max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ocean-side-bar-retract {
  width: $ocean-sidebar-retractWidth;
  min-width: $ocean-sidebar-retractWidth;
  max-width: $ocean-sidebar-retractWidth;
}

.ocean-side-bar-container {
  height: 100%;
}

.ocean-mix-menu {
  margin-top: $ocean-header-height;
}
</style>
