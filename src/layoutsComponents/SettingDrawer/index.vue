<!-- 自定义drawer并没有很多属性 -->
<!-- 模拟ant Design vue 的pro设置抽屉 -->
<template>
  <!-- https://cn.vuejs.org/guide/built-ins/teleport.html#teleport 查阅vue文档 -->
  <Teleport to="body">
    <div>
      <div
        class="ocean-drawer ocean-drawer-right"
        :class="{ 'ocean-drawer-open': open }"
        :style="{ zIndex: zIndex + 500 }"
      >
        <div class="ocean-drawer-mask" @click="closeDrawer"></div>
        <div
          class="ocean-drawer-content-wrapper"
          style="width: 344px"
          :style="{ transform: `translateX(${open ? '0' : '100%'})` }"
        >
          <div class="ocean-drawer-content">
            <div class="ocean-drawer-wrapper-body">
              <div class="ocean-drawer-header">
                <div class="ocean-drawer-header-title">系统设置</div>
                <div class="ocean-drawer-header-close" @click="closeDrawer">
                  <i class="icon-close"></i>
                </div>
              </div>
              <div class="ocean-drawer-body">
                <div class="ocean-setting-drawer-content">
                  <div class="ocean-setting-drawer-item">
                    <h3 class="ocean-setting-drawer-item-label">
                      整体风格设置
                    </h3>
                    <div class="ocean-setting-checbox">
                      <el-tooltip
                        placement="top"
                        content="亮色主题风格"
                        :popper-style="{ zIndex: zIndex + 501 }"
                      >
                        <div
                          class="ocean-setting-checbox-item"
                          @click="changeThemeMode('light')"
                        >
                          <div
                            class="ocean-setting-icon bg-light sidemenu-light topmenu-light"
                          />
                          <div class="ocean-setting-check">
                            <svg-icon
                              icon="CheckOutlined"
                              v-if="settingsStore.themeMode == 'light'"
                            ></svg-icon>
                          </div>
                        </div>
                      </el-tooltip>

                      <el-tooltip
                        placement="top"
                        content="暗黑模式"
                        :popper-style="{ zIndex: zIndex + 501 }"
                      >
                        <div
                          class="ocean-setting-checbox-item"
                          @click="changeThemeMode('dark')"
                        >
                          <div
                            class="ocean-setting-icon bg-dark sidemenu-dark topmenu-dark"
                          />
                          <div class="ocean-setting-check">
                            <svg-icon
                              icon="CheckOutlined"
                              v-if="settingsStore.themeMode == 'dark'"
                            ></svg-icon>
                          </div>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>

                  <div class="ocean-setting-drawer-item">
                    <h3 class="ocean-setting-drawer-item-label">主题色</h3>
                    <div>
                      <ColorPicker
                        v-model:pureColor="
                          settingsStore.themeColor.primaryColor
                        "
                        format="hex"
                        lang="ZH-cn"
                        :isWidget="true"
                        :disableAlpha="true"
                        :theme="
                          settingsStore.themeMode == 'dark' ? 'black' : 'white'
                        "
                        @update:pure-color="settingsStore.togglePrimaryColor"
                      ></ColorPicker>
                    </div>
                  </div>
                  <!-- <a-divider /> -->
                  <div class="ocean-setting-drawer-divider"></div>
                  <div class="ocean-setting-drawer-item">
                    <h3 class="ocean-setting-drawer-item-label">布局模式</h3>
                    <div class="ocean-setting-checbox">
                      <el-tooltip
                        placement="top"
                        content="侧边菜单导航"
                        :popper-style="{ zIndex: zIndex + 501 }"
                      >
                        <div
                          class="ocean-setting-checbox-item ocean-setting-checbox-item-side"
                          @click="changeLayoutMode('side')"
                        >
                          <div
                            class="ocean-setting-icon bg-light sidemenu-dark topmenu-light"
                          />
                          <div class="ocean-setting-check">
                            <svg-icon
                              icon="CheckOutlined"
                              v-if="settingsStore.layoutMode == 'side'"
                            ></svg-icon>
                          </div>
                        </div>
                      </el-tooltip>

                      <el-tooltip
                        placement="top"
                        content="顶部菜单导航"
                        :popper-style="{ zIndex: zIndex + 501 }"
                      >
                        <div
                          class="ocean-setting-checbox-item ocean-setting-checbox-item-top"
                          @click="changeLayoutMode('head')"
                        >
                          <div
                            class="ocean-setting-icon bg-light topmenu-dark"
                          />
                          <div class="ocean-setting-check">
                            <svg-icon
                              icon="CheckOutlined"
                              v-if="settingsStore.layoutMode == 'head'"
                            ></svg-icon>
                          </div>
                        </div>
                      </el-tooltip>

                      <el-tooltip
                        placement="top"
                        content="混合布局"
                        :popper-style="{ zIndex: zIndex + 501 }"
                      >
                        <div
                          class="ocean-setting-checbox-item ocean-setting-checbox-item-mix"
                          @click="changeLayoutMode('mixing')"
                        >
                          <div
                            class="ocean-setting-icon bg-light topmenu-dark sidemenu-light"
                          >
                            <div class="inner"></div>
                          </div>
                          <div class="ocean-setting-check">
                            <svg-icon
                              icon="CheckOutlined"
                              v-if="settingsStore.layoutMode == 'mixing'"
                            ></svg-icon>
                          </div>
                        </div>
                      </el-tooltip>

                      <el-tooltip
                        placement="top"
                        content="分栏菜单导航"
                        :popper-style="{ zIndex: zIndex + 501 }"
                      >
                        <div
                          class="ocean-setting-checbox-item ocean-setting-checbox-item-column"
                          @click="changeLayoutMode('column')"
                        >
                          <div
                            class="ocean-setting-icon bg-light sidemenu-dark topmenu-light"
                          >
                            <div class="inner"></div>
                          </div>
                          <div class="ocean-setting-check">
                            <svg-icon
                              icon="CheckOutlined"
                              v-if="settingsStore.layoutMode == 'column'"
                            ></svg-icon>
                          </div>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>

                  <div class="ocean-setting-drawer-item">
                    <h3 class="ocean-setting-drawer-item-label">组件尺寸</h3>
                    <div class="ocean-setting-components">
                      <span
                        class="setting-component"
                        @click="settingsStore.toggleComponentSize('small')"
                      >
                        <el-tag
                          class="setting-components-tag"
                          :style="{
                            background:
                              settingsStore.componentSize === 'small'
                                ? 'var(--el-color-primary)'
                                : '#e3e3e3',
                          }"
                        >
                          <span class="setting-components-text">小</span>
                        </el-tag>
                      </span>

                      <span
                        class="setting-component"
                        @click="settingsStore.toggleComponentSize('middle')"
                      >
                        <el-tag
                          class="setting-components-tag"
                          :style="{
                            background:
                              settingsStore.componentSize === 'middle'
                                ? 'var(--el-color-primary)'
                                : '#e3e3e3',
                          }"
                        >
                          <span class="setting-components-text">中</span>
                        </el-tag>
                      </span>

                      <span
                        class="setting-component"
                        @click="settingsStore.toggleComponentSize('large')"
                      >
                        <el-tag
                          class="setting-components-tag"
                          :style="{
                            background:
                              settingsStore.componentSize === 'large'
                                ? 'var(--el-color-primary)'
                                : '#e3e3e3',
                          }"
                        >
                          <span class="setting-components-text">大</span>
                        </el-tag>
                      </span>
                    </div>
                  </div>
                  <!-- <a-divider /> -->
                  <div class="ocean-setting-drawer-divider"></div>
                  <div class="ocean-setting-drawer-item">
                    <h3 class="ocean-setting-drawer-item-label">导航设置</h3>
                    <div class="ocean-setting-nav">
                      <div class="setting-item">
                        <div class="item-meta">
                          <div class="item-meta-content">
                            <h4>内容区域宽度</h4>
                          </div>
                        </div>
                        <div class="item-action">
                          <el-select
                            size="small"
                            style="width: 100px"
                            popper-class="ocean-setting-drawer-select"
                            :show-arrow="false"
                            :offset="5"
                            v-model="settingsStore.contentWidth"
                          >
                            <el-option label="Fixed" value="Fixed" />
                            <el-option label="Fluid" value="Fluid" />
                          </el-select>
                        </div>
                      </div>
                      <el-tooltip
                        placement="left"
                        :popper-style="{ zIndex: zIndex + 501 }"
                        content="混合模式必须开启固定顶部栏导航"
                        :disabled="!settingsStore.isMixingMenu"
                      >
                        <div class="setting-item">
                          <div class="item-meta">
                            <div class="item-meta-content">
                              <h4>固定顶部栏导航</h4>
                            </div>
                          </div>
                          <div class="item-action">
                            <el-switch
                              size="small"
                              v-model="settingsStore.fixedHeader"
                              :disabled="settingsStore.isMixingMenu"
                              @change="ChangeFixedHeader"
                            />
                          </div>
                        </div>
                      </el-tooltip>

                      <div class="setting-item">
                        <div class="item-meta">
                          <div class="item-meta-content">
                            <h4>标签栏是否展示</h4>
                          </div>
                        </div>
                        <div class="item-action">
                          <el-switch
                            size="small"
                            v-model="settingsStore.showTabs"
                            @change="ChangeShowTabs"
                          />
                        </div>
                      </div>

                      <div class="setting-item">
                        <div class="item-meta">
                          <div class="item-meta-content">
                            <h4>是否启用快捷键</h4>
                          </div>
                        </div>
                        <div class="item-action">
                          <el-switch
                            size="small"
                            v-model="settingsStore.showEnableTabsQuick"
                            @change="ChangeShowEnableTabsQuick"
                          />
                        </div>
                      </div>

                      <div class="setting-item">
                        <div class="item-meta">
                          <div class="item-meta-content">
                            <h4>是否启用导航搜索快捷键</h4>
                          </div>
                        </div>
                        <div class="item-action">
                          <el-switch
                            size="small"
                            v-model="settingsStore.showEnableNavSearchHotkeys"
                            @change="ChangeShowEnableNavSearchHotkeys"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 分割线 -->
                  <!-- <a-divider /> -->
                  <div class="ocean-setting-drawer-divider"></div>
                  <div class="ocean-setting-drawer-item">
                    <h3 class="ocean-setting-drawer-item-label">其他设置</h3>
                    <div class="ocean-setting-others">
                      <div class="setting-item">
                        <div class="item-meta">
                          <div class="item-meta-content">
                            <h4>路由动画</h4>
                          </div>
                        </div>
                        <div class="item-action">
                          <el-select
                            size="small"
                            style="width: 100px"
                            popper-class="ocean-setting-drawer-select"
                            :show-arrow="false"
                            :offset="5"
                            v-model="settingsStore.routerTransition"
                          >
                            <el-option
                              v-for="(item, index) in routerOptions"
                              :key="index"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </div>
                      </div>
                      <div class="setting-item">
                        <div class="item-meta">
                          <div class="item-meta-content">
                            <h4>显示进度条</h4>
                          </div>
                        </div>
                        <div class="item-action">
                          <el-switch
                            size="small"
                            v-model="settingsStore.showProgressBar"
                            @change="ChangeShowProgressBar"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div @click="afterOpenChange" class="ocean-setting-drawer-handle">
            <svg-icon
              icon="setting"
              spin
              class="ocean-setting-drawer-handle-icon"
              color="#fff"
            ></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// 导入仓库
import { useSettingsStore } from "@/store/modules/settings";
import useTheme from "@/utils/useTheme/index";
// 类型
import { ThemeMode, LayoutMode } from "@/settings.default";
// import type { SelectProps } from "ant-design-vue";
// 颜色选择器插件
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
const settingsStore = useSettingsStore();
const { themeMode } = useTheme();
const { nextZIndex } = useZIndex();
const zIndex = nextZIndex();
const open = ref<boolean>(false);
// 路由动画options
const routerOptions = ref([
  {
    value: "null",
    label: "NUll",
  },
  {
    value: "slideUp",
    label: "Slide Up",
  },
  {
    value: "slideRight",
    label: "Slide Right",
  },
  {
    value: "fadeIn",
    label: "Fade In",
  },
  {
    value: "zoom",
    label: "Zoom",
  },
]);

const afterOpenChange = () => {
  open.value = true;
};
// 关闭抽屉
const closeDrawer = () => {
  open.value = false;
};
// 主题模式展示
const changeThemeMode = (themeStyle: ThemeMode) => {
  themeMode.value = themeStyle;
};
// 布局模式切换
const changeLayoutMode = (layout: LayoutMode) => {
  settingsStore.toggleLayoutMode(layout);
};
// 修改固定头部
const ChangeFixedHeader = (checked: boolean | string | number) => {
  settingsStore.toggleFixedHeader(checked as boolean);
};
// 进度条是否展示
const ChangeShowProgressBar = (checked: boolean | string | number) => {
  settingsStore.toggleShowProgressBar(checked as boolean);
};
// 标签页tab是否展示
const ChangeShowTabs = (checked: boolean | string | number) => {
  settingsStore.toggleShowTabs(checked as boolean);
};
// 标签页是否展示快捷键
const ChangeShowEnableTabsQuick = (checked: boolean | string | number) => {
  settingsStore.toggleShowEnableTabsQuick(checked as boolean);
};
// 导航搜索快捷键是否启用
const ChangeShowEnableNavSearchHotkeys = (
  checked: boolean | string | number
) => {
  settingsStore.toggleShowEnableNavSearchHotkeys(checked as boolean);
};
</script>

<style scoped lang="scss">
.ocean-drawer {
  position: fixed;
  width: 0%;
  height: 100%;
  -webkit-transition:
    height 0s ease 0.3s,
    width 0s ease 0.3s,
    -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    height 0s ease 0.3s,
    width 0s ease 0.3s,
    -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.ocean-drawer-right {
  right: 0;
  top: 0;
  height: 100%;
}

.ocean-drawer-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: rgba(0, 0, 0, 0.45);
  opacity: 0;
  transition:
    opacity 0.3s linear,
    height 0s ease 0.3s;
}

.ocean-drawer-right .ocean-drawer-content-wrapper {
  right: 0;
}

.ocean-drawer-left .ocean-drawer-content-wrapper,
.ocean-drawer-right .ocean-drawer-content-wrapper {
  height: 100%;
}

.ocean-drawer-left.ocean-drawer-open,
.ocean-drawer-right.ocean-drawer-open {
  width: 100%;
  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.ocean-drawer.ocean-drawer-open .ocean-drawer-mask {
  height: 100%;
  opacity: 1;
  -webkit-transition: none;
  transition: none;
  -webkit-animation: oceandDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  animation: oceandDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.ocean-drawer-right.ocean-drawer-open .ocean-drawer-content-wrapper {
  -webkit-box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}

.ocean-drawer-content-wrapper {
  position: absolute;
}

.ocean-drawer > * {
  -webkit-transition:
    -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition:
    transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.ocean-drawer-content {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  overflow: auto;
  background-color: #fff;
  // @include bgColor("bgColor");
  background-clip: padding-box;
  border: 0;

  .ocean-drawer-wrapper-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .ocean-drawer-header {
      display: flex;
      flex: 0;
      align-items: center;
      padding: 16px 24px;
      font-size: 16px;
      line-height: 1.5;
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);

      .ocean-drawer-header-title {
        display: flex;
        flex: 1;
        align-items: center;
        min-width: 0;
        min-height: 0;
      }

      .ocean-drawer-header-close {
        // position: absolute;
        // top: 5px;
        // right: 5px;
        cursor: pointer;
        transition: all 0.3s;

        .icon-close {
          position: relative;
          display: inline-block;
          width: 24px;
          height: 24px;
          vertical-align: top;
        }
      }
    }

    .ocean-drawer-body {
      flex: 1;
      min-width: 0;
      min-height: 0;
      padding: 24px;
      overflow: auto;

      .ocean-setting-drawer-content {
        position: relative;

        .ocean-setting-drawer-item {
          margin-bottom: 24px;

          .ocean-setting-checbox {
            width: 100%;
            display: flex;
            margin-bottom: 20px;

            .ocean-setting-checbox-item {
              width: 44px;
              height: 38px;
              margin-right: 25px;
              border-radius: 4px;
              // border: solid 0.5px rgba(0, 0, 0, 0.1);
              box-shadow: 0 1px 2.5px rgba(0, 0, 0, 0.18);
              position: relative;
              overflow: hidden;
              cursor: pointer;

              .ocean-setting-icon {
                width: 100%;
                height: 100%;

                &.bg-dark {
                  background-color: #001529d9;
                }

                &.bg-light {
                  background-color: #efefef;
                }

                &.topmenu-dark::before {
                  content: "";
                  width: 100%;
                  // height: 12px;
                  height: 10px;
                  position: absolute;
                  background-color: #001529d9;
                  top: 0;
                  left: 0;
                }

                &.topmenu-light::before {
                  content: "";
                  width: 100%;
                  height: 12px;
                  position: absolute;
                  background-color: #fcfcfc;
                  top: 0;
                  left: 0;
                }

                &.sidemenu-dark::after {
                  content: "";
                  width: 15px;
                  height: 100%;
                  position: absolute;
                  background-color: #001529a6;
                  top: 0;
                  left: 0;
                }

                &.sidemenu-light::after {
                  content: "";
                  width: 15px;
                  height: 100%;
                  position: absolute;
                  background-color: #fcfcfc;
                  top: 0;
                  left: 0;
                }
              }

              .ocean-setting-check {
                color: var(--el-color-primary);
                font-size: 14px;
                font-weight: 700;
                position: absolute;
                bottom: 7px;
                right: 14px;
              }

              .ocean-setting-icon.topmenu-dark + .ocean-setting-check,
              .ocean-setting-icon.topmenu-light + .ocean-setting-check {
                // bottom: 3px;
                bottom: 0;
              }

              .ocean-setting-icon.sidemenu-dark + .ocean-setting-check,
              .ocean-setting-icon.sidemenu-light + .ocean-setting-check {
                right: 6px;
              }
            }

            // 侧边布局
            .ocean-setting-checbox-item-side {
              .sidemenu-dark::after {
                background-color: #001529 !important;
              }

              .topmenu-light::before {
                background-color: #fff !important;
              }
            }

            // 顶部布局
            .ocean-setting-checbox-item-top {
              .topmenu-dark::before {
                background-color: #001529 !important;
              }

              .ocean-setting-check {
                right: 6px;
              }
            }

            // 混合布局
            .ocean-setting-checbox-item-mix {
              .topmenu-dark::before {
                background-color: #001529 !important;
                z-index: 1;
              }
            }

            // 分栏布局
            .ocean-setting-checbox-item-column {
              .sidemenu-dark::after {
                background-color: #001529 !important;
                width: 16% !important;
              }

              .inner {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 33%;
                height: 100%;
                background-color: #fff;
                content: "";
              }
            }
          }

          .ocean-setting-components {
            width: 100%;
            height: 30px;
            margin-bottom: 20px;

            & > .setting-component > .setting-components-tag {
              margin: 0 8px;
              padding: 2px 8px;
              font-size: 12px;
              font-weight: 500;
              border-radius: 4px;
              position: relative;
              cursor: pointer;
              color: #fff;
              border-color: transparent;
            }

            & .setting-component:first-child > .setting-components-tag {
              margin-left: 3px;
            }

            & .setting-component:last-child > .setting-components-tag {
              margin-right: 3px;
            }
          }
        }

        .ocean-setting-drawer-divider {
          display: flex;
          clear: both;
          width: 100%;
          min-width: 100%;
          margin: 24px 0;
          box-sizing: border-box;
          padding: 0;
          color: rgba(0, 0, 0, 0.88);
          font-size: 14px;
          list-style: none;
          border-block-start: 1px solid rgba(5, 5, 5, 0.06);
        }
      }
    }
  }
}

.ocean-setting-drawer-handle {
  position: absolute;
  // top: 200px;
  top: 350px;
  right: 344px;
  z-index: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 16px;
  text-align: center;
  background: var(--el-color-primary);
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  pointer-events: auto;
}

.ocean-setting-drawer-handle-icon {
  font-size: 30px;
  color: #fff;
}

.ocean-drawer-header-close:hover {
  background-color: #ddd;
}

.ocean-drawer-header-close:hover .icon-close:after,
.ocean-drawer-header-close:hover .icon-close:before {
  background-color: #363636;
}

.icon-close:after,
.icon-close:before {
  position: absolute;
  top: 12px;
  left: 4px;
  width: 16px;
  height: 1px;
  content: "";
  background: #d1d4db;
  transform: rotate(45deg);
}

.icon-close:after {
  transform: rotate(-45deg);
}

.setting-item {
  margin: 13px 0 10px;
  padding: 4px 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.88);
  .item-meta {
    display: flex;
    flex: 1;
    max-width: 100%;
    align-items: center;
    .item-meta-content {
      flex: 1 0;
      width: 0;
      color: rgba(0, 0, 0, 0.88);
      align-items: center;
      display: flex;
    }
  }
  .item-action {
    flex: 0 0 auto;
    margin-inline-start: 48px;
    padding: 0;
    font-size: 0;
    list-style: none;
  }
}
</style>
