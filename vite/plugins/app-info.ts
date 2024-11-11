/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-21 15:56:48
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-11 11:45:35
 * @FilePath: /ocean-vite3/vite/plugins/app-info.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import boxen from "boxen";
import picocolors from "picocolors";
import type { Plugin } from "vite";

export default function appInfo(): Plugin {
  return {
    name: "appInfo",
    apply: "serve",
    async buildStart() {
      const { bold, green, bgGreen, underline } = picocolors;
      console.log(
        boxen(
          `${bold(green(`由 ${bgGreen("ocean-admin")} 驱动`))}\n\n${underline("https://github.com/GuoOcean/ocean-vite3")}`,
          {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            textAlignment: "center",
          }
        )
      );
    },
  };
}
