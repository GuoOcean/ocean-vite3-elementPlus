/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-11 14:59:35
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-11 22:01:54
 * @FilePath: /ocean-vite3-elementPlus/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { staticRoutes, asyncRoutes, anyRoute } from "./routes";
import { setupPermissions } from "./permissions";

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior: () => ({
    top: 0,
    left: 0,
    behavior: "smooth",
  }),
});
/** Setup Vue Router */
export async function setupRouter(app: App) {
  setupPermissions(router);
  app.use(router);
  return router;
}

export default router;
