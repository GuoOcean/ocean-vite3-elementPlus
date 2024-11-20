<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-19 16:42:21
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-20 20:49:34
 * @FilePath: /ocean-vite3-elementPlus/src/layoutsComponents/OceanMenu/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- :theme="settingsStore.themeMode" -->
<template>
  <!-- 左侧菜单/混合布局菜单 -->
  <template v-if="settingsStore.isSideMenu || settingsStore.isMixingMenu">
    <el-menu
      :default-active="selectedKeys"
      :default-openeds="openKeys"
      :collapse="settingsStore.isCollapse"
      :collapse-transition="false"
      mode="vertical"
      style="width: 100%; background-color: transparent"
      class="ocean-menu-vertical"
      router
    >
      <OceanMenuItem
        v-for="(route, index) in routers"
        :key="route.path + index"
        :item="route"
      />
    </el-menu>
  </template>
  <!-- 顶部菜单 -->
  <template v-if="settingsStore.isHeadMenu">
    <el-menu
      :default-active="selectedKeys"
      :collapse-transition="false"
      mode="horizontal"
      style="
        width: 100%;
        background-color: transparent;
        line-height: 48px;
        border: none;
      "
      class="ocean-menu-horizontal"
      router
    >
      <OceanMenuItem
        v-for="(route, index) in routers"
        :key="route.path + index"
        :item="route"
      />
    </el-menu>
  </template>
  <!-- 分栏菜单 -->
  <template v-if="settingsStore.isColumnMenu">
    <el-menu
      :default-active="routerStore.parentRoute"
      :collapse="settingsStore.isCollapse"
      :collapse-transition="false"
      router
      style="width: 100%; background-color: transparent"
      class="ocean-menu-column"
    >
      <OceanMenuColumnItem />
    </el-menu>
  </template>
</template>

<script setup lang="ts">
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
import { useRouterStore } from "@/store/modules/router";
import OceanMenuItem from "./OceanMenuItem.vue";
import { useRoute } from "vue-router";
const settingsStore = useSettingsStore();
const route = useRoute();
const routerStore = useRouterStore();
const selectedKeys = ref<string>("");
const openKeys = ref<string[]>([]);
withDefaults(
  defineProps<{
    mode?: string;
  }>(),
  {
    mode: "inline",
  }
);

const filterRoutes = (routes: any) => {
  return routes
    .filter((route: any) => !route.meta.hidden)
    .map((route: any) => ({
      ...route,
      children: route.children ? filterRoutes(route.children) : undefined,
    }));
};
const routers = ref(filterRoutes(routerStore.routes));

watch(
  () => route,
  (newVal) => {
    if (newVal.path) {
      routerStore.findTopLevelParent(newVal.path);
      if (newVal.meta?.activeMenu) {
        selectedKeys.value = newVal.meta?.activeMenu as string;
      } else {
        selectedKeys.value = newVal.path;
      }
      // 下方代码需要当前路由的前缀和父级一致 -- 简单做法
      openKeys.value = [newVal.path.slice(0, newVal.path.indexOf("/", 1))];
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="scss"></style>
