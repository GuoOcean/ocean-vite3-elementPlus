<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-13 23:28:19
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-14 13:09:23
 * @FilePath: /ocean-vite3-elementPlus/src/layoutsComponents/OceanNav/nav-operation.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="header-collapsed-button"
    v-if="
      settingsStore.isSideMenu ||
      settingsStore.isColumnMenu ||
      settingsStore.isMixingMenu
    "
  >
    <span
      class="anticon"
      @click="settingsStore.toggleIsCollapse(!settingsStore.isCollapse)"
    >
      <svg-icon
        v-if="settingsStore.isCollapse"
        icon="MenuUnfoldOutlined"
      ></svg-icon>
      <svg-icon v-else icon="MenuFoldOutlined"></svg-icon>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/modules/settings";

const settingsStore = useSettingsStore();
</script>

<style scoped lang="scss">
.header-collapsed-button {
  display: flex;
  align-items: center;
  // margin-left: 8px;
  font-size: 20px;

  .anticon {
    display: inline-flex;
    align-items: center;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
  }
}

.left_operation {
  min-width: 155px;
  height: 30px;
  background: rgba(217, 217, 217, 0.5);
  border-radius: 32px;
  margin-right: 29px;
  display: flex;
  align-items: center;
  padding: 0 12px;

  .retreatIcon {
    margin-left: 12px;
    margin-right: 30px;
    font-size: 16px;
    color: #999 !important;
  }

  .advanceIcon {
    margin-right: 30px;
    font-size: 16px;
    color: #999 !important;
  }

  .refreshIcon {
    font-size: 20px;
    font-weight: bold;
    font-size: 16px;
    color: #999 !important;
  }

  i {
    cursor: pointer;
    font-size: 16px;
    color: #999;
    &:hover {
      color: #f42f2f;
    }
  }
}
</style>
