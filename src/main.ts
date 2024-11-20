/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-11 14:23:31
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-20 16:17:50
 * @FilePath: /ocean-vite3-elementPlus/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑     永不宕机     永无BUG
 */
import { createApp } from "vue";
// import "./style.css";
import "@/assets/styles/index.scss"; // 全局样式
import App from "./App.vue";
import { setupStore } from "@/store";
import { setupRouter } from "@/router"; // 引入router
import { setupDirectives } from "@/ocean-directives";
import "overlayscrollbars/overlayscrollbars.css";
import "element-plus/dist/index.css"; // 引入element-plus样式

// 控制主题模式是否跟随系统
// 不需要可注释
import useTheme from "@/utils/useTheme/index";

// 全局loading
import { setupLoading } from "@/plugins/loading";

//svg插件需要配置代码
import "virtual:svg-icons-register";

async function setupApp() {
  setupLoading();
  const oceanApp = createApp(App);
  // 挂载store
  setupStore(oceanApp);
  // 挂载指令
  setupDirectives(oceanApp);
  // 挂载router
  (await setupRouter(oceanApp)).isReady().then(() => {
    // 挂载App
    oceanApp.mount("#oceanApp");
    useTheme();
  });
}

setupApp();
