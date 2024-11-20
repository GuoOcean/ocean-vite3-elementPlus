<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-19 16:42:21
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-20 21:09:59
 * @FilePath: /ocean-vite3-elementPlus/src/layoutsComponents/OceanMenu/OceanMenuColumnItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-menu-item
    :key="item.path"
    :index="item.path"
    v-for="item in menus"
    @click="openOneMenu(item.key)"
    class="ocean-menu-item"
  >
    <!-- <router-link :to="item.path">
      <svg-icon icon="UserOutlined" class="router-icon"></svg-icon>
      <span>{{ item.meta?.title }}</span>
    </router-link> -->
    <svg-icon icon="UserOutlined" class="router-icon"></svg-icon>
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { useRouterStore } from "@/store/modules/router";
const routerStore = useRouterStore();
import eventBus from "@/utils/eventBus";

// 过滤一级数组
const menus = routerStore.routes
  .filter((item: any) => !item.meta.hidden)
  .map((route: any) => {
    if (route.children?.length == 1) {
      return {
        path: route.children[0].path,
        meta: route.children[0].meta,
        key: route.path,
        children: [],
      };
    } else {
      return {
        path: route.path,
        meta: route.meta,
        key: route.path,
        children: [],
      };
    }
  });

const openOneMenu = (key: any) => {
  routerStore.setMenuChildrenRoutes(key);
  eventBus.emit("reload-router-view");
};
</script>

<style scoped></style>
