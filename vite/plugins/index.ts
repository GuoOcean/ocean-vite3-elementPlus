/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-21 14:09:31
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-09 13:47:41
 * @FilePath: /ocean-vite3/vite/plugins/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 插件ts类型
import type { PluginOption } from "vite";
import type { ImportMetaEnv } from "../../src/vite-env";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

import appInfo from "./app-info";
import createAutoImport from "./auto-import";
import createSvgIcon from "./svg-icon";
import createComponents from "./components";

export default function createVitePlugins(
  viteEnv: ImportMetaEnv,
  isBuild = true
) {
  // console.log("viteEnv", viteEnv);
  const vitePlugins: PluginOption | PluginOption[] = [
    appInfo(),
    vue(),
    vueJsx(),
    VueSetupExtend(),
  ];

  vitePlugins.push(createAutoImport());
  vitePlugins.push(createComponents());
  vitePlugins.push(createSvgIcon(isBuild));
  return vitePlugins;
}
