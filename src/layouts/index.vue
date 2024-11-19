<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-11 21:45:40
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-15 15:03:28
 * @FilePath: /ocean-vite3-elementPlus/src/layouts/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="ocean-admin-vite-ts-el-elementPlus-vue-wrapper">
    <!-- 动态加载布局 -->
    <component :is="'ocean-layout-' + layoutMode"></component>
    <!-- 右边主题配置组件 -->
    <setting-drawer />
    <!-- search -->
    <ocean-search />
  </div>
</template>

<script lang="ts">
import pinia from "@/store";
// 导入系统设置仓库
import { useSettingsStore } from "@/store/modules/settings";
// 动态导入所有 .vue 文件
const componentsContext = import.meta.glob("./**/*.vue", { eager: false });
type ComponentValue = { default: any };
const components: Record<string, any> = {};
Object.keys(componentsContext).forEach(async (key) => {
  try {
    const componentKey = key.replace(/(\/|\.|index.vue)/g, "");
    components[componentKey] = markRaw(
      defineAsyncComponent(componentsContext[key] as any)
      // defineAsyncComponent(() => import(`${key}`))
    );
  } catch (error) {
    console.error(`Failed to import component from ${key}:`, error);
  }
});

export default {
  name: "Layouts",
  components,
  setup() {
    const settingsStore = useSettingsStore(pinia);
    const layoutMode = computed(() => settingsStore.layoutMode);

    const mobile = ref(false);
    console.log(components, "components");
    return {
      // appSettings,
      layoutMode,
      mobile,
    };
  },
};
</script>

<style scoped lang="scss">
.ocean-admin-vite-ts-el-elementPlus-vue-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
