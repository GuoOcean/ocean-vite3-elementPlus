/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-21 14:16:30
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-09 13:48:47
 * @FilePath: /ocean-vite3/vite/plugins/svg-icon.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// const pathSrc = resolve(__dirname, "src");
export default function createSvgIcon(isBuild: boolean) {
  return createSvgIconsPlugin({
    // iconDirs: [resolve(pathSrc, "src/assets/icons")],
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild,
  });
}
