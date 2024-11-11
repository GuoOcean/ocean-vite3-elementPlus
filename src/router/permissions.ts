import type { Router } from "vue-router";
// 使用nprogressvueuse集成方案
import { useNProgress } from "@vueuse/integrations/useNProgress";
import "@/assets/styles/nprogress.scss"; // 修改并定制化修改颜色等样式
const { isLoading } = useNProgress();

// 不用进行token检查的白名单路径数组(不需要登陆(指没有token)就可以访问的页面是白名单)
const whiteList = ["/login", "/404", "/403"];

export function setupPermissions(router: Router) {
  router.beforeEach(async (to, from, next) => {});

  router.afterEach(() => {
    isLoading.value = false; // 关闭加载动画
  });
}
