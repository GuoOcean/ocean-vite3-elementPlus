/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-21 23:02:19
 * 布局配置
 */
// import type { AppSettings, Other, Topbar, Tabbar } from "#/settings.d";
import defaultSettings, {
  ThemeMode,
  ContentWidth,
  ComponentSize,
  LayoutMode,
  RouterTransition,
  SystemConfig,
} from "@/settings.default";
import * as DarkReader from "darkreader";
import { getLocal, removeLocal, setLocal } from "@/utils/storage";
// import { theme } from "ant-design-vue";

console.log(defaultSettings, "默认配置");

// 获取初始配置
const getInitialConfig = (): SystemConfig => {
  const storedConfig = getLocal("systemConfig") as SystemConfig;
  return storedConfig ? storedConfig : defaultSettings;
};

const initialConfig = getInitialConfig();

console.log(initialConfig, "系统配置");

export const useSettingsStore = defineStore("settings", () => {
  const themeColor = reactive({
    primaryColor: initialConfig.themeColor.primaryColor,
    warningColor: initialConfig.themeColor.warningColor,
    successColor: initialConfig.themeColor.successColor,
    errorColor: initialConfig.themeColor.errorColor,
    infoColor: initialConfig.themeColor.infoColor,
  });
  // 左侧菜单是否折叠
  const isCollapse = ref(false);

  // 以下为系统配置
  const isMobile = ref(false);
  const collapsed = ref(false);
  const multiTab = ref(initialConfig.multiTab);
  const showTabs = ref(initialConfig.showTabs);
  const showEnableTabsQuick = ref(initialConfig.showEnableTabsQuick);
  const showEnableNavSearchHotkeys = ref(
    initialConfig.showEnableNavSearchHotkeys
  );
  const themeMode = ref(initialConfig.themeMode);
  const layoutMode = ref(initialConfig.layoutMode);
  const fixedHeader = ref(initialConfig.fixedHeader);
  const fixedSidebar = ref(initialConfig.fixedSidebar);
  const fixedHeaderTab = ref(initialConfig.fixedHeaderTab);
  const componentSize = ref(initialConfig.componentSize);
  const contentWidth = ref(initialConfig.contentWidth);
  const showProgressBar = ref(initialConfig.showProgressBar);
  const routerTransition = ref(initialConfig.routerTransition);

  const isFixed = computed(() => contentWidth.value === "Fixed");
  const isFluid = computed(() => contentWidth.value === "Fluid");
  const isColumnMenu = computed(() => layoutMode.value === "column");
  const isHeadMenu = computed(() => layoutMode.value === "head");
  const isSideMenu = computed(() => layoutMode.value === "side");
  const isMixingMenu = computed(() => layoutMode.value === "mixing");
  const isdark = computed(() => themeMode.value === "dark");
  const primaryColor = computed(() => themeColor.primaryColor);
  const warningColor = computed(() => themeColor.warningColor);
  const successColor = computed(() => themeColor.successColor);
  const errorColor = computed(() => themeColor.errorColor);
  const infoColor = computed(() => themeColor.infoColor);

  const toggleMobile = (value: boolean) => {
    isMobile.value = value;
  };
  const toggleMultiTab = (value: boolean) => {
    multiTab.value = value;
    updateConfig({ multiTab: value }); // 更新配置
  };
  const toggleCollapsed = (value: boolean) => {
    collapsed.value = value;
  };
  const toggleLayoutMode = (value: LayoutMode) => {
    layoutMode.value = value;
    if (value === "mixing") {
      fixedHeader.value = true;
      updateConfig({ fixedHeader: true }); // 更新配置
    }
    updateConfig({ layoutMode: value }); // 更新配置
  };
  const toggleFixedHeader = (value: boolean) => {
    fixedHeader.value = value;
    updateConfig({ fixedHeader: value }); // 更新配置
  };
  const toggleFixedSidebar = (value: boolean) => {
    fixedSidebar.value = value;
  };
  const toggleFixedHeaderTab = (value: boolean) => {
    fixedHeaderTab.value = value;
    updateConfig({ fixedHeaderTab: value }); // 更新配置
  };
  const toggleComponentSize = (value: ComponentSize) => {
    componentSize.value = value;
    updateConfig({ componentSize: value }); // 更新配置
  };
  const toggleContentWidth = (value: ContentWidth) => {
    contentWidth.value = value;
    updateConfig({ contentWidth: value }); // 更新配置
  };
  const togglePrimaryColor = (value: string) => {
    themeColor.primaryColor = value;
    updateConfig({ themeColor: { ...themeColor, primaryColor: value } }); // 更新配置
  };
  const toggleWarningColor = (value: string) => {
    themeColor.warningColor = value;
    updateConfig({ themeColor: { ...themeColor, warningColor: value } }); // 更新配置
  };
  const toggleSuccessColor = (value: string) => {
    themeColor.successColor = value;
    updateConfig({ themeColor: { ...themeColor, successColor: value } }); // 更新配置
  };
  const toggleErrorColor = (value: string) => {
    themeColor.errorColor = value;
    updateConfig({ themeColor: { ...themeColor, errorColor: value } }); // 更新配置
  };
  const toggleInfoColor = (value: string) => {
    themeColor.infoColor = value;
    updateConfig({ themeColor: { ...themeColor, infoColor: value } }); // 更新配置
  };
  const toggleShowProgressBar = (value: boolean) => {
    showProgressBar.value = value;
    updateConfig({ showProgressBar: value }); // 更新配置
  };
  const toggleRouterTransition = (value: RouterTransition) => {
    routerTransition.value = value;
    updateConfig({ routerTransition: value }); // 更新配置
  };
  const toggleIsCollapse = (value: boolean) => {
    isCollapse.value = value;
  };
  const toggleThemeMode = (value?: ThemeMode) => {
    const isdark = value === "dark";
    const isEnabled = DarkReader.isEnabled();

    if (isdark && !isEnabled)
      DarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 });
    if (!isdark && isEnabled) DarkReader.disable();

    themeMode.value = value ?? themeMode.value;
    // updateConfig({ themeMode: themeMode.value }); // 更新配置
  };
  const toggleShowTabs = (value: boolean) => {
    showTabs.value = value;
    updateConfig({ showTabs: value }); // 更新配置
  };
  const toggleShowEnableTabsQuick = (value: boolean) => {
    showEnableTabsQuick.value = value;
    updateConfig({ showEnableTabsQuick: value }); // 更新配置
  };
  const toggleShowEnableNavSearchHotkeys = (value: boolean) => {
    showEnableNavSearchHotkeys.value = value;
    updateConfig({ showEnableNavSearchHotkeys: value }); // 更新配置
  };

  const isWindowOS = computed(() => {
    return /windows/i.test(window.navigator.userAgent);
  });

  const isMacOS = computed(() => {
    return /Macintosh/i.test(window.navigator.userAgent);
  });

  const updateConfig = (newConfig: Partial<SystemConfig>) => {
    // 获取当前配置
    const currentConfig = getInitialConfig();
    const updatedConfig = { ...currentConfig, ...newConfig };
    // 更新配置并保存本地
    setLocal("systemConfig", Object.assign(currentConfig, updatedConfig));
  };
  return {
    isFixed,
    isFluid,
    isMobile,
    multiTab,
    collapsed,
    themeMode,
    isColumnMenu,
    isHeadMenu,
    isSideMenu,
    isMixingMenu,
    isdark,
    layoutMode,
    fixedHeader,
    fixedSidebar,
    fixedHeaderTab,
    componentSize,
    contentWidth,
    primaryColor,
    warningColor,
    successColor,
    errorColor,
    infoColor,
    themeColor,
    showProgressBar,
    routerTransition,
    isCollapse,
    showTabs,
    showEnableTabsQuick,
    showEnableNavSearchHotkeys,

    toggleMobile,
    toggleMultiTab,
    toggleCollapsed,
    toggleThemeMode,
    toggleLayoutMode,
    toggleFixedHeader,
    toggleFixedSidebar,
    toggleFixedHeaderTab,
    toggleComponentSize,
    toggleContentWidth,
    togglePrimaryColor,
    toggleWarningColor,
    toggleSuccessColor,
    toggleErrorColor,
    toggleInfoColor,
    toggleShowProgressBar,
    toggleRouterTransition,
    toggleIsCollapse,
    toggleShowTabs,
    toggleShowEnableTabsQuick,
    toggleShowEnableNavSearchHotkeys,
    updateConfig,

    // layoutViewStyle,
    isWindowOS,
    isMacOS,
  };
});
