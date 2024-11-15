<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-13 23:28:19
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-14 13:01:35
 * @FilePath: /ocean-vite3-elementPlus/src/layoutsComponents/OceanNav/nav-search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <span
    class="noticeButton"
    style="display: flex; align-items: center; padding: 0 6px"
    @click="openSearch"
  >
    <span class="navigationSearch">
      <svg-icon icon="SearchOutlined"></svg-icon>
      <em class="searchText">搜索</em>
      <em class="seachBtn" v-if="settingsStore.showEnableNavSearchHotkeys"
        >{{ settingsStore.isMacOS ? "⌥" : "Alt" }}+ S</em
      >
    </span>
  </span>
</template>

<script setup lang="ts">
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
import eventBus from "@/utils/eventBus";
const settingsStore = useSettingsStore();
const openSearch = () => {
  eventBus.emit("openSearch");
};
</script>

<style scoped lang="scss">
.noticeButton {
  cursor: pointer;
  transition: all 0.3s;
}

.navigationSearch {
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background-color: #fff;
  border-radius: 5px;
  gap: 6px;
  cursor: pointer;
  height: 32px;

  .searchText {
    font-size: 14px;
    color: rgb(120, 113, 108);
    font-weight: 700;
  }

  .seachBtn {
    font-size: 12px;
    padding: 0 4px;
    background-color: rgb(245, 245, 244);
    border-radius: 4px;
    display: inline-flex;
    min-width: 32px;
    height: 26px;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(214 211 209);
  }
}
</style>
