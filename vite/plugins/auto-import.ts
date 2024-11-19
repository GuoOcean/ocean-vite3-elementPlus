/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-21 14:11:42
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-15 14:55:29
 * @FilePath: /ocean-vite3/vite/plugins/auto-import.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default function createAutoImport() {
  return AutoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia",
      "@vueuse/core",
      {
        "element-plus": [
          "useZIndex", // 自动导入 useZIndex
          // 你可以在这里添加其他需要自动导入的 Element Plus 组件或功能
        ],
      },
    ],
    dts: "./types/auto-imports.d.ts",
    dirs: ["./src/hooks/**"],
    // 会自动生成eslint规则，防止eslint报错
    eslintrc: {
      enabled: true,
    },
    resolvers: [ElementPlusResolver()],
  });
}
