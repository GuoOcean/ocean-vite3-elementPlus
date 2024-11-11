/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 *  @Description:该文件为系统默认配置，请勿修改！！！
 */
// 对应系统类型定义文件
// import type { all } from "#/settings.d.ts";
// import { defaultsDeep } from "lodash-es";

// const defaultSettings = {
//   appSettings: {
//     themeStyle: "OS",
//     themeColor: "#6366F1",
//     layoutMode: "side",
//     contentWidth: "fluid",
//   },
//   topbar: {
//     fixedHeader: true,
//   },
//   tabbar: {
//     showTabs: true,
//     showTabsIcon: true,
//     showTabsHotkeys: true,
//     tabsBarStyle: "card",
//   },
//   other: {
//     showProgressBar: true,
//     routerTransition: "null",
//   },
// };

// export default defaultsDeep(defaultSettings, {}) as all;
/**
 * @themeColor 主题颜色
 * @themeMode 主题风格
 * @layoutMode 整体布局方式
 * @contentWidth 内容区布局
 * @componentSize 组件尺寸
 * @multiTab 多标签页
 * @fixedHeader 固定顶部栏导航
 * @fixedSidebar 固定左侧菜单栏
 * @fixedHeaderTab 固定导航栏页签
 * @routerTransition 路由切换动画
 * @showProgressBar 是否显示全局进度条
 * @showTabs 是否显示标签页
 * @showEnableTabsQuick 是否启用标签页快捷键
 * @showEnableNavSearchHotkeys 是否启用导航搜索快捷键
 */

export type ThemeMode = "light" | "dark" | "OS";
export type LayoutMode = "side" | "head" | "column" | "mixing";
export type ContentWidth = "Fixed" | "Fluid";
export type ComponentSize = "small" | "middle" | "large" | undefined;
export type RouterTransition =
  | "null"
  | "slideUp"
  | "slideRight"
  | "fadeIn"
  | "zoom";

export interface SystemConfig {
  themeColor: {
    primaryColor?: string;
    warningColor?: string;
    successColor?: string;
    errorColor?: string;
    infoColor?: string;
  };
  themeMode: ThemeMode;
  layoutMode: LayoutMode;
  contentWidth: ContentWidth;
  componentSize: ComponentSize;
  multiTab: boolean;
  fixedHeader: boolean;
  fixedSidebar: boolean;
  fixedHeaderTab: boolean;
  showProgressBar: boolean;
  routerTransition: string;
  showTabs: boolean;
  showEnableTabsQuick: boolean;
  showEnableNavSearchHotkeys: boolean;
}

// export default {
//   themeColor: {
//     primaryColor: "#6366F1",
//     warningColor: "#faad14",
//     successColor: "#52c41a",
//     errorColor: "#ff4d4f",
//     infoColor: "#1890ff",
//   },
//   themeMode: "OS" as ThemeMode,
//   layoutMode: "column" as LayoutMode,
//   contentWidth: "Fluid" as ContentWidth,
//   componentSize: "middle" as ComponentSize,
//   multiTab: true,
//   fixedHeader: true,
//   fixedSidebar: true,
//   fixedHeaderTab: true,
//   showProgressBar: true,
//   routerTransition: "fadeIn",
//   showTabs: true,
//   showEnableTabsQuick: true,
//   showEnableNavSearchHotkeys: true,
// };

// 默认配置
const defaultConfig: SystemConfig = {
  themeColor: {
    primaryColor: "#6366F1",
    warningColor: "#faad14",
    successColor: "#52c41a",
    errorColor: "#ff4d4f",
    infoColor: "#1890ff",
  },
  themeMode: "OS",
  layoutMode: "side",
  contentWidth: "Fluid",
  componentSize: "middle",
  multiTab: true,
  fixedHeader: true,
  fixedSidebar: true,
  fixedHeaderTab: true,
  showProgressBar: true,
  routerTransition: "fadeIn",
  showTabs: true,
  showEnableTabsQuick: true,
  showEnableNavSearchHotkeys: true,
};

export default defaultConfig;
