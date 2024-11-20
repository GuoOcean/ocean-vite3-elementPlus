<template>
  <a-menu-item
    :key="item.path"
    v-for="item in menus"
    @click="openOneMenu(item.key)"
  >
    <router-link :to="item.path">
      <!-- <UserOutlined /> -->
      <span>{{ item.meta?.title }}</span>
    </router-link>
  </a-menu-item>
</template>

<script setup lang="ts">
// import { UserOutlined } from "@ant-design/icons-vue";
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
