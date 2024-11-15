<template>
  <el-dialog
    :z-index="zIndex + 50"
    :closable="false"
    width="672px"
    v-model="visible"
    @ok="handleOk"
    :before-close="handleCancel"
    wrap-class-name="modal-wrap-search"
  >
    <div class="body-wrap">
      <div class="shortcutKeys">
        <div class="shortcutKeys-left">
          <div class="shortcutKeys-item">
            <div class="shortcutKeys-item-btn">
              <svg-icon
                icon="enter"
                color="#262626"
                class="enter-icon"
              ></svg-icon>
            </div>
            <span>访问</span>
          </div>
          <div class="shortcutKeys-item">
            <div class="shortcutKeys-item-btn">
              <!-- <CaretUpOutlined /> -->
            </div>
            <div class="shortcutKeys-item-btn">
              <!-- <CaretDownOutlined /> -->
            </div>
            <span>切换</span>
          </div>
        </div>
        <div
          class="shortcutKeys-right"
          v-if="settingsStore.showEnableNavSearchHotkeys"
        >
          <div class="shortcutKeys-item">
            <div class="shortcutKeys-item-btn">ESC</div>
            <span>退出</span>
          </div>
        </div>
      </div>
      <div class="search-wrap">
        <!-- <a-input></a-input> -->
        <!-- <SearchOutlined /> -->
        <input
          class="search-input"
          v-model="searchInput"
          ref="searchInputRef"
          placeholder="搜索页面，支持标题、URL模糊查询"
          @keydown.esc="eventBus.emit('global-search-toggle')"
          @keydown.up.prevent="keyUp"
          @keydown.down.prevent="keyDown"
          @keydown.enter.prevent="keyEnter"
        />
      </div>
      <div class="result-wrap">
        <OverlayScrollbarsComponent
          ref="searchResultRef"
          :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }"
          defer
          style="height: 100%"
        >
          <template v-if="resultList.length > 0">
            <a
              v-for="(item, index) in resultList"
              ref="searchResultItemRef"
              :key="item.path"
              :data-index="index"
              class="result-item-wrap"
              :class="{ 'result-item-hover': index === actived }"
              @click="pageJump(item.path)"
              @mouseover="actived = index"
            >
              <div class="result-item">
                <div class="result-item-top">
                  <!-- <SearchOutlined /> -->
                  <div class="ml-5">
                    {{
                      (typeof item.title === "function"
                        ? item.title()
                        : item.title) ?? "[ 无标题 ]"
                    }}
                  </div>
                </div>
                <!-- <div class="result-item-bottom"></div> -->
                <!-- <a-breadcrumb v-if="item.breadcrumb.length">
                  <a-breadcrumb-item
                    v-for="(bc, bcIndex) in item.breadcrumb"
                    :key="bcIndex"
                  >
                    {{
                      (typeof bc.title === "function"
                        ? bc.title()
                        : bc.title) ?? "[ 无标题 ]"
                    }}
                  </a-breadcrumb-item>
                </a-breadcrumb> -->
              </div>
            </a>
          </template>
        </OverlayScrollbarsComponent>
      </div>
    </div>
    <template #footer> </template>
  </el-dialog>
</template>

<script setup lang="ts">
import pinia from "@/store";
// import {
//   SearchOutlined,
//   CaretUpOutlined,
//   CaretDownOutlined,
// } from "@ant-design/icons-vue";
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
import { useRouterStore } from "@/store/modules/router";
import eventBus from "@/utils/eventBus";
import type { OverlayScrollbarsComponentRef } from "overlayscrollbars-vue";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import type { RouteRecordRaw } from "vue-router";
import { cloneDeep } from "lodash-es";
import useKeys from "@/hooks/useKeyboardEvent";
type routeType = {
  path: string;
  icon?: string;
  title?: string | (() => string);
  breadcrumb: {
    title?: string | (() => string);
  }[];
};
const settingsStore = useSettingsStore(pinia);
const { routes } = useRouterStore(pinia);
const router = useRouter();
const { nextZIndex } = useZIndex();
const zIndex = nextZIndex();
const visible = ref(false);
const searchInput = ref("");
const searchInputRef = ref<HTMLInputElement>();
const searchResultRef = ref<OverlayScrollbarsComponentRef>();
const searchResultItemRef = ref<HTMLElement[]>([]);
const routesList = ref<routeType[]>([]);
const actived = ref(-1);

const resultList = computed(() => {
  let result = [];
  result = routesList.value.filter((item) => {
    let flag = false;
    if (item.title) {
      if (typeof item.title === "function") {
        if (item.title().includes(searchInput.value)) {
          flag = true;
        }
      } else {
        if (item.title.includes(searchInput.value)) {
          flag = true;
        }
      }
    }
    if (item.path.includes(searchInput.value)) {
      flag = true;
    }
    if (
      item.breadcrumb.some((b) => {
        if (typeof b.title === "function") {
          if (b.title().includes(searchInput.value)) {
            return true;
          }
        } else {
          if (b.title?.includes(searchInput.value)) {
            return true;
          }
        }
        return false;
      })
    ) {
      flag = true;
    }
    return flag;
  });
  return result;
});

const handleOk = () => {
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

const initSourceList = () => {
  routesList.value = [];
  // router.options.routes.forEach((item) => {
  //   getSourceListByMenus(item.children, undefined, undefined, [
  //     item.meta?.title || "",
  //   ] as string[]);
  // });

  routes.forEach((item) => {
    getSourceListByMenus(item.children, undefined, undefined, [
      item.meta?.title || "",
    ] as string[]);
  });
};

const getSourceListByMenus = (
  arr: readonly RouteRecordRaw[] | undefined,
  icon?: string,
  breadcrumb?: { title?: string | (() => string) }[],
  parentTitles: string[] = [] // 新增的参数，用于存储父级标题
) => {
  arr?.forEach((item) => {
    const breadcrumbTemp = cloneDeep(breadcrumb) || [];
    const currentTitle = item.meta?.title || "";
    const currentBreadcrumb = [
      ...parentTitles.map((title) => ({ title })),
      { title: currentTitle },
    ];

    if (item.children && Array.isArray(item.children)) {
      // 递归调用时，将当前的标题添加到 parentTitles 中
      getSourceListByMenus(
        item.children,
        (item.meta?.icon ?? icon) as string,
        breadcrumbTemp,
        [...parentTitles, currentTitle] as string[]
      );
    } else {
      if (item.meta?.hidden) return;
      routesList.value.push({
        path: item.path,
        icon: (item.meta?.icon ?? icon) as string,
        title: currentTitle as string,
        breadcrumb: currentBreadcrumb as { title?: string | (() => string) }[],
      });
    }
  });
};

// 递归函数，用于提取所有子菜单项
// function flattenChildren(routes: readonly RouteRecordRaw[]) {
//     return routes.reduce((acc, route) => {
//         if (route.children && Array.isArray(route.children)) {
//             acc.push(...route.children);
//             acc.push(...flattenChildren(route.children));
//         }
//         return acc;
//     }, []);
// }

onMounted(() => {
  eventBus.on("openSearch", () => {
    if (!visible.value) {
      initSourceList();
    }
    visible.value = true;
  });
  useKeys({
    "alt+ß": () => {
      if (settingsStore.showEnableNavSearchHotkeys) {
        initSourceList();
        visible.value = true;
      }
    },
  });
  useKeys({
    escape: () => {
      if (settingsStore.showEnableNavSearchHotkeys) {
        if (visible.value) {
          visible.value = false;
        }
      }
    },
  });
});

watch(
  () => visible.value,
  (val) => {
    if (val) {
      searchInput.value = "";
      actived.value = -1;
      // 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
      useKeys({ up: keyUp });
      useKeys({ down: keyDown });
      useKeys({ enter: keyEnter });
      nextTick(() => {
        // searchInputRef.value?.focus()
        // searchInputRef.value?.value = ''
      });
    } else {
      useKeys({ up: () => {} });
      useKeys({ down: () => {} });
      useKeys({ enter: () => {} });
    }
  }
);
watch(
  () => resultList.value,
  () => {
    actived.value = -1;
    handleScroll();
  }
);

const keyUp = () => {
  if (resultList.value.length) {
    actived.value -= 1;
    if (actived.value < 0) {
      actived.value = resultList.value.length - 1;
    }
    handleScroll();
  }
};
const keyDown = () => {
  if (resultList.value.length) {
    actived.value += 1;
    if (actived.value > resultList.value.length - 1) {
      actived.value = 0;
    }
    handleScroll();
  }
};
const keyEnter = () => {
  if (actived.value !== -1) {
    searchResultItemRef.value
      .find((item) => Number.parseInt(item.dataset.index!) === actived.value)
      ?.click();
  }
};

const handleScroll = () => {
  if (searchResultRef.value) {
    const contentDom = searchResultRef.value.osInstance()!.elements().content;
    let scrollTo = 0;
    if (actived.value !== -1) {
      scrollTo = contentDom.scrollTop;
      const activedOffsetTop =
        searchResultItemRef.value.find(
          (item) => Number.parseInt(item.dataset.index!) === actived.value
        )?.offsetTop ?? 0;
      const activedClientHeight =
        searchResultItemRef.value.find(
          (item) => Number.parseInt(item.dataset.index!) === actived.value
        )?.clientHeight ?? 0;
      const searchScrollTop = contentDom.scrollTop;
      const searchClientHeight = contentDom.clientHeight;
      if (
        activedOffsetTop + activedClientHeight >
        searchScrollTop + searchClientHeight
      ) {
        scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight;
      } else if (activedOffsetTop <= searchScrollTop) {
        scrollTo = activedOffsetTop;
      }
    }
    contentDom.scrollTo({
      top: scrollTo,
    });
  }
};

const pageJump = (path: routeType["path"]) => {
  router.push(path);
  visible.value = false;
};
</script>

<style scoped lang="scss">
:global(.modal-wrap-search .ant-modal) {
  min-height: 320px;
  max-height: 680px;
  height: calc(100% / 3 * 2);
}

:global(.modal-wrap-search .ant-modal-content) {
  padding: 10px !important;
  border-radius: 12px;
  height: 100%;
  overflow: hidden;
}

:global(.modal-wrap-search .ant-modal-content .ant-modal-body) {
  height: 100%;
}

:global(.modal-wrap-search .ant-modal-content .ant-modal-header) {
  background-color: transparent;
}

:global(.modal-wrap-search .ant-modal-content .ant-modal-close) {
  top: 15px;
  inset-inline-end: 15px;
}

.body-wrap {
  height: 100%;
}

.shortcutKeys {
  padding: 20px 16px 10px;
  display: flex;
  justify-content: space-between;

  .shortcutKeys-left {
    display: flex;
    gap: 32px;
  }

  &-item {
    gap: 4px;
    font-size: 12px;
    line-height: 16px;
    display: inline-flex;
    align-items: center;
  }

  .shortcutKeys-item-btn {
    font-size: 12px;
    padding: 0 4px;
    background-color: rgb(245, 245, 244);
    border-radius: 4px;
    display: inline-flex;
    min-width: 32px;
    justify-content: center;
    align-items: center;
    height: 28px;
    margin-right: 4px;
    border: 1px solid rgb(214 211 209);
  }

  .enter-icon {
    font-size: 14px;
  }
}

.search-wrap {
  border-radius: 5px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  margin: 10px 10px 0;
  border: 1px solid rgb(231, 229, 228);

  .search-input {
    width: 100%;
    font-size: 14px;
    padding: 0 12px;
    background-color: transparent;
  }
}

.result-wrap {
  margin: 10px 10px 0;
  border: 1px solid rgb(231, 229, 228);
  overflow-y: hidden;
  position: relative;
  border-radius: 5px;
  height: calc(100% - 126px);

  .result-item-wrap {
    display: flex;
    cursor: pointer;
    align-items: center;

    .result-item {
      padding: 12px 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      gap: 4px;
      display: flex;
      flex-direction: column;
      flex: 1;

      &-top {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        display: flex;
      }

      :deep(.ant-breadcrumb) {
        font-size: 12px !important;
      }
    }
  }

  .result-item-wrap.result-item-hover {
    background-color: rgb(231 229 228 / 0.4);
  }
}
</style>
