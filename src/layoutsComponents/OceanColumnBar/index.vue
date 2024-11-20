<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-20 20:40:29
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-20 20:53:28
 * @FilePath: /ocean-vite3-elementPlus/src/layoutsComponents/OceanColumnBar/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="ocean-side-bar ocean-side-bar-wrapper"
    :class="settingsStore.isCollapse ? 'ocean-side-bar-retract' : ''"
    :style="{ zIndex: zIndex + 10 }"
  >
    <div class="ocean-side-bar-container column">
      <ocean-logo />
      <div
        style="
          flex: 1;
          overflow: hidden auto;
          padding: 0 4px;
          box-sizing: border-box;
        "
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
  width: $ocean-columnbar-width;
  min-width: $ocean-columnbar-width;
  max-width: $ocean-columnbar-width;
  background: #001529;
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
</style>
