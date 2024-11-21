<template>
  <section id="container" :class="appMainContainerClass">
    <div
      class="ocean-container"
      ref="oceanContainerRef"
      :class="containerClass"
    >
      <div class="ocean-box">
        <!--  -->
        <router-view v-slot="{ Component, route }" :key="route.path">
          <transition
            :name="settingsStore.routerTransition"
            appear
            mode="out-in"
          >
            <keep-alive :include="keepAliveNameList" :max="keepAliveMaxNum">
              <component :is="Component" :key="route.path" ref="componentRef" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </section>
  <div
    class="ocean-menu ocean-menu-left"
    :class="oceanMenuLeftClass"
    v-if="settingsStore.isColumnMenu"
  >
    <div
      class="ocean-menu-content-wrapper"
      :class="oceanMenuContentWrapperClass"
      :style="{
        transform: `translateX(${routerStore.partialRoutes.length == 0 ? '0' : '100%'})`,
      }"
      style="padding: 0 4px; box-sizing: border-box"
    >
      <el-menu
        :default-active="selectedKeys"
        :theme="settingsStore.themeMode"
        style="width: 100%; background-color: transparent"
        class="ocean-menu-vertical"
        router
      >
        <el-menu-item
          :key="item.path"
          :index="item.path"
          class="ocean-menu-item"
          v-for="item in routerStore.partialRoutes"
        >
          <router-link :to="item.path">
            <span>{{ item.meta?.title }}</span>
          </router-link>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
import { useRouterStore } from "@/store/modules/router";
import { useTabsStore } from "@/store/modules/tabs";
import { ResizeObserver } from "@juggle/resize-observer";
import eventBus from "@/utils/eventBus";
const settingsStore = useSettingsStore();
const routerStore = useRouterStore();
const tabsStore = useTabsStore();
const route = useRoute();

const oceanContainerRef = ref<HTMLElement | null>(null);
const keepAliveNameList = ref();
const keepAliveMaxNum = ref(20);
const isLarge = ref(false);
const isLargeColumn = ref(false);
const selectedKeys = ref<string>("");
const containerClass = computed(() => ({
  "ocean-container-large": isLarge.value && !settingsStore.isColumnMenu,
  "ocean-container-large-column":
    isLargeColumn.value && settingsStore.isColumnMenu,
  "ocean-container-showTabs": settingsStore.showTabs,
}));

const appMainContainerClass = computed(() => ({
  "container-retract":
    settingsStore.isCollapse &&
    (settingsStore.isSideMenu ||
      settingsStore.isMixingMenu ||
      settingsStore.isColumnMenu),
  "container-side": settingsStore.isSideMenu || settingsStore.isMixingMenu,
  "container-head ": settingsStore.isHeadMenu,
  "container-column":
    settingsStore.isColumnMenu && routerStore.partialRoutes.length > 0,
  "container-column-noMenu":
    settingsStore.isColumnMenu && routerStore.partialRoutes.length <= 0,
  "container-column-retract":
    settingsStore.isColumnMenu &&
    settingsStore.isCollapse &&
    routerStore.partialRoutes.length > 0,
  "container-paddingTop48":
    settingsStore.fixedHeader && !settingsStore.showTabs,
  "container-paddingTop0": !settingsStore.fixedHeader,
  "container-paddingTop88": settingsStore.fixedHeader && settingsStore.showTabs,
}));

const oceanMenuLeftClass = computed(() => ({
  "ocean-menu-open": routerStore.partialRoutes.length > 0,
  "ocean-container-showTabs": settingsStore.showTabs,
  "ocean-menu-left": !settingsStore.fixedHeader,
  "ocean-menu-left88": settingsStore.fixedHeader && settingsStore.showTabs,
  "ocean-menu-left48": settingsStore.fixedHeader && !settingsStore.showTabs,
}));

const oceanMenuContentWrapperClass = computed(() => ({
  "ocean-menu-content-retract": settingsStore.isCollapse,
}));

const updateContainerSize = () => {
  if (oceanContainerRef.value) {
    isLarge.value = oceanContainerRef.value.offsetWidth < 799;
    isLargeColumn.value = oceanContainerRef.value.offsetWidth < 799;
  }
};

const updateKeepAliveNameList = (refreshRouteName = null) => {
  keepAliveNameList.value = tabsStore.routerHistory
    .filter((item) => {
      return item.path !== "Login";
    })
    .filter(
      (item: any) => !item.meta.noKeepAlive && item.name !== refreshRouteName
    )
    .flatMap((item: any) => item.name);

  // console.log(keepAliveNameList.value, "keepAliveNameList.value");
};

// 更新KeepAlive缓存页面
watchEffect(() => {
  // routerKey.value = handleActivePath(route, true)
  updateKeepAliveNameList();
});

eventBus.on("reload-router-view", (refreshRouteName: any = route.name) => {
  const cacheActivePath = route.path;
  // routerKey.value = null
  updateKeepAliveNameList(refreshRouteName);
  nextTick(() => {
    // routerKey.value = cacheActivePath
    updateKeepAliveNameList();
  });
});

onMounted(() => {
  if (oceanContainerRef.value) {
    updateContainerSize();
    const resizeObserver = new ResizeObserver(() => updateContainerSize());
    resizeObserver.observe(oceanContainerRef.value);
  }
});
// app这里监听路由变化，更新selectedKeys
watch(
  () => route,
  (newVal) => {
    if (newVal.path) {
      if (newVal.meta?.activeMenu) {
        selectedKeys.value = newVal.meta?.activeMenu as string;
      } else {
        selectedKeys.value = newVal.path;
      }
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
#container {
  background-color: #fff;
  transition:
    padding-left 0.2s,
    padding-top 0.2s;
}

// 左侧侧边栏收起模式使用
#container.container-retract {
  padding-left: $ocean-sidebar-retractWidth;
  // transition:
  //   all 0.2s,
  //   background 0s;
}

// 左侧侧边栏模式使用
.container-side {
  padding-left: $ocean-sidebar-width;
}

// 顶部导航模式使用
.container-head {
  padding-left: 0;
}

// 分栏布局使用 并且有子级菜单
.container-column {
  padding-left: calc($ocean-columnbar-width * 2);
}

// 分栏布局使用 并且没有子级菜单
.container-column-noMenu {
  padding-left: calc($ocean-columnbar-width * 1);
}

// 分栏布局使用 并且有子级菜单 收起模式使用
#container.container-column-retract {
  padding-left: calc($ocean-columnbar-width + $ocean-sidebar-retractWidth);
}

.container-paddingTop48 {
  padding-top: var(--ocean-header-height);
}

.container-paddingTop0 {
  padding-top: 0px;
}

.container-paddingTop88 {
  padding-top: calc(
    var(--ocean-header-height) + var(--ocean-tabs-height) + 6px + 6px
  );
}

.ocean-container {
  width: 100%;
  height: calc(100vh - $ocean-header-height);
}

.ocean-container.ocean-container-showTabs,
.ocean-menu.ocean-container-showTabs {
  height: calc(100vh - $ocean-header-height - ($ocean-tabs-height + 6px + 6px));
}

.ocean-box {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #eef0f5;
  // display: flex;
  transition: all 0.2s;
}

.ocean-menu {
  position: fixed;
  width: 0;
  height: calc(100vh - $ocean-header-height);
  z-index: 1300;
  -webkit-transition:
    height 0s ease 0.2s,
    width 0s ease 0.2s,
    -webkit-transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1),
    height 0s ease 0.2s,
    width 0s ease 0.2s,
    -webkit-transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.ocean-menu > * {
  -webkit-transition:
    -webkit-transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-box-shadow 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    -webkit-transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-box-shadow 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1),
    box-shadow 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1),
    box-shadow 0.2s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-box-shadow 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.ocean-menu-left {
  left: 0;
  top: 0;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ocean-menu-left48 {
  top: var(--ocean-header-height);
}
.ocean-menu-left88 {
  top: calc(var(--ocean-header-height) + var(--ocean-tabs-height) + 6px + 6px);
}

.ocean-menu-left .ocean-menu-content-wrapper {
  left: 0;
  position: absolute;
  height: 100%;
  width: $ocean-columnbar-width;
  overflow: hidden auto;
  transition: all 0.2s;
}

.ocean-menu-left .ocean-menu-content-wrapper.ocean-menu-content-retract {
  left: calc(($ocean-columnbar-width - $ocean-sidebar-retractWidth) * -1);
}

.ocean-menu-left.ocean-menu-open {
  // width: 100%;
  -webkit-transition: -webkit-transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: -webkit-transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-transform 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.ocean-menu-left.ocean-menu-open .ocean-menu-content-wrapper {
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 1px 0 5px rgba(0, 0, 0, 0.05);
}
</style>
