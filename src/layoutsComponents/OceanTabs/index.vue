<template>
  <div
    class="ocean-tabsWrap"
    :class="tabsWrapClass"
    v-if="settingsStore.showTabs"
    :style="{ zIndex: zIndex }"
  >
    <div class="ocean-tabs">
      <div class="ocean-tabs-left" ref="tabsWrapRef">
        <div class="ocean-tabs-list">
          <div
            class="ocean-tab-item"
            :ref="(el) => (tabsRefs[index] = el)"
            @click="tagClick(item.path, index)"
            :class="tabsStore.nowRouter === item.path ? 'is-active' : ''"
            v-for="(item, index) in tabsStore.routerHistory"
            :key="index"
          >
            <span>{{ item.title }}</span>
            <svg-icon
              icon="close1"
              class="ml-5 close-icon"
              @click.stop="removeTag(item.path)"
              v-if="index !== 0"
            ></svg-icon>
          </div>
        </div>
      </div>
      <el-dropdown @visible-change="handleOpenChange">
        <div
          class="ocean-tabs-right ml-10"
          v-if="settingsStore.showEnableTabsQuick"
        >
          <span
            class="ocean-tabs-more"
            :class="{ 'ocean-tabs-more-active': active }"
          >
            <span class="ocean-tabs-more-icon">
              <i class="box box-t"></i>
              <i class="box box-b"></i>
            </span>
          </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="nav-info-menu">
            <el-dropdown-item @click="handleCommand('refreshThisTab')">
              <svg-icon icon="RedoOutlined" class="icon"></svg-icon>
              <span class="ml-10">刷新</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleCommand('closeOthersTabs')">
              <svg-icon icon="CloseOutlined" class="icon"></svg-icon>
              <span class="ml-10">关闭其他</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleCommand('closeLeftTabs')">
              <svg-icon icon="ArrowLeftOutlined" class="icon"></svg-icon>
              <span class="ml-10">关闭左侧</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleCommand('closeRightTabs')">
              <svg-icon icon="ArrowRightOutlined" class="icon"></svg-icon>
              <span class="ml-10">关闭右侧</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleCommand('closeAllTabs')">
              <svg-icon icon="CloseOutlined" class="icon"></svg-icon>
              <span class="ml-10">关闭全部</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useZIndex } from "@/hooks/useZIndex";
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
import { useTabsStore } from "@/store/modules/tabs";
import { useRouterStore } from "@/store/modules/router";
// import {
//   CloseOutlined,
//   RedoOutlined,
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
// } from "@ant-design/icons-vue";
import eventBus from "@/utils/eventBus";
const settingsStore = useSettingsStore();
const tabsStore = useTabsStore();
const routerStore = useRouterStore();
const route = useRoute();
const router = useRouter();
const tabsWrapRef = ref<any>(null);
const tabsRefs = ref<any>([]);
const active = ref<boolean>(false);
const { nextZIndex } = useZIndex();
const zIndex = nextZIndex();
const handleOpenChange = (open: boolean) => {
  active.value = open;
};

const tabsWrapClass = computed(() => ({
  "ocean-fixed-tabs": settingsStore.fixedHeader,
  "ocean-header-side": settingsStore.isSideMenu,
  "ocean-header-head": settingsStore.isHeadMenu,
  "ocean-header-column": settingsStore.isColumnMenu,
  "ocean-header-mixing": settingsStore.isMixingMenu,
  "ocean-header-retract":
    settingsStore.isCollapse &&
    (settingsStore.isSideMenu || settingsStore.isMixingMenu),
}));

// 点击的是那个
const handleCommand = (command: string) => {
  switch (command) {
    case "refreshThisTab":
      refreshThisTab();
      break;
    case "closeOthersTabs":
      closeOthersTabs();
      break;
    case "closeLeftTabs":
      closeLeftTabs();
      break;
    case "closeRightTabs":
      closeRightTabs();
      break;
    case "closeAllTabs":
      closeAllTabs();
      break;
  }
  active.value = false;
};
// 刷新
const refreshThisTab = () => {
  console.log("refreshThisTab");
  window.location.reload();
};

// 关闭其他
const closeOthersTabs = () => {
  tabsStore.delOthersVisitedRoutes(route.path);
};
// 关闭左侧
const closeLeftTabs = () => {
  tabsStore.delLeftVisitedRoutes(route.path);
};
// 关闭右侧
const closeRightTabs = () => {
  tabsStore.delRightVisitedRoutes(route.path);
};
// 关闭全部
const closeAllTabs = () => {
  tabsStore.delAllVisitedRoutes();
  router.push("/index");
  routerStore.setMenuChildrenRoutes("/index");
};
// 点击
const tagClick = (path: string, index: number) => {
  // 这里进行路由跳转之后，会被路由拦截器拦截，然后进行路由跳转并更新tab仓库中的路由历史数组
  router.push(path);
  routerStore.setMenuChildrenRoutes(path);
  countSroll(index);
};
// 清除tag
// 这里就直接清除了，没有放到tab仓库中，可以放到仓库中国，然后通过仓库中的路由历史数组进行判断
const removeTag = (routerPath: string) => {
  // 删除tag返回新路由历史数组并存入store仓库
  let newArr = tabsStore.routerHistory.filter(
    (item) => item.path !== routerPath
  );
  tabsStore.toggleRouterHistory(newArr);
  // 如果删除的路由是当前路由，路由跳转至目前路由历史数组最后一个路由
  if (route.path == routerPath) {
    router.push({
      path: newArr[newArr.length - 1].path,
    });
    routerStore.setMenuChildrenRoutes(
      newArr[newArr.length - 1].path == "/index"
        ? "/"
        : newArr[newArr.length - 1].path
    );
  } else if (route.meta?.activeMenu) {
    // 防止进入的路由是详情页导致无法跳转
    router.push({
      path: newArr[newArr.length - 1].path,
    });
  }
  eventBus.emit("reload-router-view");
};
// 设置滚动位置
const countSroll = (index: number) => {
  const targetElement = tabsRefs.value[index];
  if (targetElement) {
    const targetOffset = targetElement.offsetLeft;
    const containerScrollLeft = tabsWrapRef.value.scrollLeft;
    const containerWidth = tabsWrapRef.value.offsetWidth;
    const targetWidth = targetElement.offsetWidth;

    // 计算目标元素的中心位置
    const targetCenter = targetOffset + targetWidth / 2;
    const containerCenter = containerScrollLeft + containerWidth / 2;

    // 计算需要滚动的距离
    const scrollToPosition = targetCenter - containerCenter;

    // 使用 scrollTo 方法进行平滑滚动
    tabsWrapRef.value.scrollTo({
      left: tabsWrapRef.value.scrollLeft + scrollToPosition,
      behavior: "smooth",
    });
  }
};

watch(
  () => route,
  (newVal) => {
    if (newVal.meta?.activeMenu) {
      tabsStore.setNowRouter(newVal.meta?.activeMenu as string);
    } else {
      tabsStore.setNowRouter(newVal.path);
    }
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="scss">
.ocean-tabsWrap {
  padding: 6px 0 6px;
  width: 100%;
}

.ocean-tabsWrap.ocean-header-retract {
  padding-left: $ocean-sidebar-retractWidth;
}

.ocean-header-side {
  padding-left: $ocean-sidebar-width;
}
// 分栏布局tabs类名
.ocean-header-column {
  padding-left: $ocean-columnbar-width;
}
// 混合布局tabs类名
.ocean-header-mixing {
  padding-left: $ocean-sidebar-width;
}

.ocean-header-head {
  padding-left: 0;
}

.ocean-fixed-tabs {
  position: fixed;
  top: $ocean-header-height;
  transition:
    all 0.2s,
    background 0s;
}

.ocean-tabs {
  display: flex;
  align-items: center;
  padding: 1px 16px;
  height: 100%;
  width: 100%;
  background-color: #fff;

  .ocean-tabs-left * {
    transition:
      all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      border 0s,
      color 0.1s,
      font-size 0s;
  }

  .ocean-tabs-left {
    // margin-left: 8px;
    // width: calc(100% - 50px);
    flex: 1;
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }

    .ocean-tabs-list {
      display: flex;
      float: left;
      white-space: nowrap;

      .ocean-tab-item {
        flex-shrink: 0;
        padding: 0 10px;
        cursor: pointer;
        background: #e5e5e5;
        border-radius: 4px;
        margin-right: 5px;
        height: $ocean-tabs-height;
        line-height: $ocean-tabs-height;
        transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: color 0.3s;
        display: flex;
        align-items: center;

        span {
          color: #262626;
          font-size: 14px;
        }

        .close-icon {
          width: 0px;
          font-size: 12px;
          margin-left: 5px;
          position: relative;
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          color: #fff;
        }

        &:hover {
          .close-icon {
            width: 14px;
          }
        }
      }

      .is-active {
        background: var(--el-color-primary);

        span {
          color: #fff !important;
        }

        .close-icon {
          width: 14px;
          color: #fff;
        }
      }
    }
  }

  .ocean-tabs-right * {
    transition:
      all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      border 0s,
      color 0.1s,
      font-size 0s;
  }

  .ocean-tabs-right {
    width: 50px;
    line-height: 1px;

    .ocean-tabs-more {
      position: relative;
      box-sizing: border-box;
      display: block;
      text-align: right;
      padding-right: 12px;

      &-icon {
        display: inline-block;
        color: #9a9a9a;
        cursor: pointer;
        transition: transform 0.3s ease-out;

        .box {
          position: relative;
          display: block;
          width: 14px;
          height: 8px;

          &::before {
            position: absolute;
            top: 2px;
            left: 0;
            width: 6px;
            height: 6px;
            content: "";
            background: #9a9a9a;
          }

          &::after {
            position: absolute;
            top: 2px;
            left: 8px;
            width: 6px;
            height: 6px;
            content: "";
            background: #9a9a9a;
          }
        }

        .box-t::before {
          transition: transform 0.3s ease-out 0.3s;
        }
      }

      &:hover {
        .ocean-tabs-more-icon {
          transform: rotate(90deg);

          .box-t::before {
            transform: rotate(45deg);
          }

          .box:before,
          .box:after {
            background: var(--el-color-primary);
          }
        }
      }
    }

    .ocean-tabs-more-active {
      .ocean-tabs-more-icon {
        transform: rotate(90deg);

        .box-t::before {
          transform: rotate(45deg);
        }

        .box:before,
        .box:after {
          background: var(--el-color-primary);
        }
      }
    }
  }
}

.icon {
  font-size: 16px;
}
</style>
