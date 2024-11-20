<template>
  <template v-if="!item.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children as any, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <!-- 方式二 -->
      <!-- :class="{ 'isActive1': route.path.match(onlyOneChild.path)}" -->
      <router-link :to="onlyOneChild.path">
        <el-menu-item
          @click="handleLink"
          :key="onlyOneChild.path"
          :index="onlyOneChild.path"
          class="ocean-menu-item"
          :class="{ isActive1: route.path.match(onlyOneChild.path) }"
        >
          <svg-icon icon="UserOutlined" class="router-icon"></svg-icon>
          <template #title>
            <span>{{ onlyOneChild.meta?.title }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </template>

    <el-sub-menu
      :key="item.path"
      :index="item.path"
      v-else
      class="ocean-sub-menu"
      :class="{ isActive: route.path.match(item.path) }"
    >
      <template v-if="item.meta.title" #title>
        <svg-icon icon="UserOutlined" class="router-icon"></svg-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <OceanMenuItem
        v-for="(child, index) in item.children"
        :key="child.path + index"
        :item="child"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import eventBus from "@/utils/eventBus";
const route = useRoute();
type RouteRecordRaw = {
  noShowingChildren: boolean;
  path: string;
  meta: {
    title?: string;
    hidden?: boolean;
  };
  children?: RouteRecordRaw[];
};

withDefaults(
  defineProps<{
    item: RouteRecordRaw;
    isNest?: boolean;
    basePath?: string;
  }>(),
  {
    isNest: false,
    basePath: "",
  }
);

const onlyOneChild = ref<RouteRecordRaw>({
  noShowingChildren: true,
  path: "",
  meta: {
    title: undefined,
    hidden: undefined,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasOneShowingChild = (children = [], parent: any) => {
  // debugger
  // console.log(children, parent, "数据");
  const showingChildren = children.filter((item: RouteRecordRaw) => {
    if (item.meta.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });
  // console.log(showingChildren, "数据");
  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, noShowingChildren: true };
    return true;
  }

  return false;
};

const handleLink = () => {
  eventBus.emit("reload-router-view");
};
</script>

<style lang="scss">
.ocean-sub-menu {
  .el-menu--inline {
    background-color: transparent !important;
  }
}

.router-icon {
  font-size: 16px;
  // margin-right: 5px;
  text-align: center;
  flex-shrink: 0;
  // width: var(--el-menu-icon-width) !important;
}

.isActive .el-sub-menu__title {
  color: var(--el-menu-active-color) !important;
}
</style>
