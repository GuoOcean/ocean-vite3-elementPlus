/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-21 14:19:00
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-09 15:24:42
 * @FilePath: /ocean-vite3/vite/plugins/components.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default function createComponents() {
  return Components({
    dirs: ["src/components", "src/layoutsComponents"],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: "./types/components.d.ts",
    resolvers: [AntDesignVueResolver({ importStyle: "less" })], // 这里可以配置你需要的组件库
  });
}
