<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-29 22:22:38
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-10-09 17:13:21
 * @FilePath: /gc-carpool-admin/src/components/templateWarp/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="main-warp" :style="{ minWidth: minWidth }">
    <div id="main">
      <div id="main-container" ref="mainContainerRef">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="templateWarp">
// import {ResizeObserver} from '@juggle/resize-observer'
import { useSettingsStore } from "@/store/modules/settings";
const settingsStore = useSettingsStore();
// 模版外层组件
withDefaults(
  defineProps<{
    mainContainer?: boolean;
  }>(),
  {
    mainContainer: false,
  }
);
// 690
const minWidth = ref(settingsStore.isColumnMenu ? "690px" : "750px");
</script>
