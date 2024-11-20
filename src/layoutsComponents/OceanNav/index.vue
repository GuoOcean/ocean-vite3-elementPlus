<template>
  <!-- 根据是否固定来确定增加固定类名 -->
  <div
    class="ocean-header"
    :class="oceanNavClass"
    :style="{ zIndex: zIndex + mixinZIndex }"
  >
    <div class="header-content">
      <navOperation v-if="!settingsStore.isMixingMenu" />
      <div
        class="header-content-top-left row"
        v-if="settingsStore.isHeadMenu || settingsStore.isMixingMenu"
      >
        <ocean-logo />
        <navOperation />
      </div>
      <div
        style="flex: 1; height: 100%"
        v-if="
          settingsStore.isSideMenu ||
          settingsStore.isColumnMenu ||
          settingsStore.isMixingMenu
        "
      ></div>
      <div
        class="header-content-top-menu"
        style="flex: 1; height: 100%; min-width: 0"
        v-if="settingsStore.isHeadMenu"
      >
        <ocean-menu />
      </div>
      <div class="header-userInfo">
        <navSearch />
        <navSystemNotification />
        <navFullScreen />
        <navTheme />
        <navUserInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入组件
import navOperation from "./nav-operation.vue";
import navSearch from "./nav-search.vue";
import navSystemNotification from "./nav-systemNotification.vue";
import navFullScreen from "./nav-fullScreen.vue";
import navTheme from "./nav-theme.vue";
import navUserInfo from "./nav-userInfo.vue";
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";

const { nextZIndex } = useZIndex();
const zIndex = nextZIndex();
const settingsStore = useSettingsStore();

const oceanNavClass = computed(() => ({
  "ocean-fixed-nav": settingsStore.fixedHeader,
  "ocean-header-retract": settingsStore.isCollapse && settingsStore.isSideMenu,
  "ocean-header-side": settingsStore.isSideMenu,
  "ocean-header-head": settingsStore.isHeadMenu,
  "ocean-header-column": settingsStore.isColumnMenu,
  "ocean-header-mixing": settingsStore.isMixingMenu,
}));

const mixinZIndex = computed(() => {
  let zIndex = 0;
  if (settingsStore.isMixingMenu) {
    zIndex = 12;
  } else {
    zIndex = 0;
  }
  return zIndex;
});
</script>

<style scoped lang="scss">
.ocean-header {
  height: $ocean-header-height;
  width: 100%;
  // padding-left: $ocean-sidebar-width;
}

.ocean-header.ocean-header-retract {
  padding-left: $ocean-sidebar-retractWidth;
}

.ocean-header-side {
  padding-left: $ocean-sidebar-width;
}

.ocean-header-column {
  padding-left: $ocean-columnbar-width;
}

.ocean-header-head {
  padding-left: 0;
}

.ocean-header-mixing {
  .header-content {
    padding-left: 0;
  }
  .header-collapsed-button {
    padding-left: 16px;
  }
}

.ocean-fixed-nav {
  position: fixed;
  top: 0;
  transition:
    all 0.2s,
    background 0s;
  // transform: width 0.2s;
}

.header-content {
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 100%;
  width: 100%;
  background-color: #fff;

  .header-userInfo {
    display: flex;

    .noticeButton {
      cursor: pointer;
      transition: all 0.3s;
    }

    .nav-info {
      padding: 0 12px;
      display: inline-block;
      height: $ocean-header-height;
      line-height: $ocean-header-height;
      vertical-align: top;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>

<style>
.nav-info-icon {
  min-width: 14px;
  margin-right: 8px;
  font-size: 12px;
}

.nav-info-title {
  flex: auto;
}
</style>
