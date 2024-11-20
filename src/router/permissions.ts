import pinia from "@/store";
import type { Router } from "vue-router";
// 使用nprogressvueuse集成方案
import { useNProgress } from "@vueuse/integrations/useNProgress";
import "@/assets/styles/nprogress.scss"; // 修改并定制化修改颜色等样式
import { useUserStore } from "@/store/modules/user"; // 用户仓库
import { useTabsStore } from "@/store/modules/tabs";
import { useSettingsStore } from "@/store/modules/settings";
import { useRouterStore } from "@/store/modules/router";
import type { RouterHistory } from "#/router";
const { isLoading } = useNProgress();

// 不用进行token检查的白名单路径数组(不需要登陆(指没有token)就可以访问的页面是白名单)
const whiteList = ["/login", "/404", "/403"];

export function setupPermissions(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const { routes, setRoutes } = useRouterStore();
    const userStore = useUserStore();
    const settingsStore = useSettingsStore();
    if (settingsStore.showProgressBar) {
      isLoading.value = true; // 开启加载动画
    }

    if (userStore.token) {
      if (to.path === "/login") {
        next({ path: "/", replace: true });
      } else if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        // 根据项目实际情况，可以修改
        const isUserAvatar = userStore.userInfo.avatar;
        if (isUserAvatar) {
          // 如果用户信息存在，则直接放行
          await setRoutes();
          next();
          setRouterHistory(to);
        } else {
          try {
            // 请求用户信息并放行
            await userStore.getUserInfo();
            await setRoutes();
            next(to);
          } catch (error) {
            console.log(error);
            // 获取用户信息失败, 清除token, 跳转到登陆页面
            // 重置用户信息
            await userStore.logout();
            next(`/login?redirect=${to.path}`);
          }
          // setRouterHistory(to);
        }
      }
    } else {
      // 如果目标路径在白名单中(不需要token的路径)
      if (whiteList.indexOf(to.path) !== -1) {
        // 放行
        next();
      } else {
        // 如果没在白名单中, 跳转到登陆路由携带原目标路径
        next(`/login?redirect=${to.path}`);
      }
    }
  });

  router.afterEach(() => {
    isLoading.value = false; // 关闭加载动画
  });
}

// 记录路由历史
const setRouterHistory = (to: any) => {
  let obj: RouterHistory = {
    title: to.meta.title,
    path: to.path,
    meta: to.meta,
    name: to.name,
  };
  let routerHistory = useTabsStore(pinia).routerHistory;
  routerHistory.push(obj as RouterHistory);
  //map去重，避免重复记录重复路由
  let mapArr = () => {
    let map = new Map();
    for (let item of routerHistory) {
      if (!map.has(item.path)) {
        map.set(item.path, item);
      } else {
        const existingItem = map.get(item.path);
        const updatedItem = { ...existingItem };
        for (const key in item) {
          if (
            item[key] !== undefined &&
            (existingItem![key] === undefined || existingItem![key] === null)
          ) {
            if (key === "meta") {
              for (const metaKey in item.meta) {
                if (
                  item.meta[metaKey] !== undefined &&
                  (existingItem?.meta[metaKey] === undefined ||
                    existingItem.meta[metaKey] === null)
                ) {
                  updatedItem.meta![metaKey] = item.meta[metaKey];
                }
              }
            } else {
              updatedItem[key] = item[key];
            }
          }
        }

        if (JSON.stringify(updatedItem) !== JSON.stringify(existingItem)) {
          map.set(item.path, updatedItem as RouterHistory);
        }
      }
    }
    return [...map.values()];
  };
  let newArr = mapArr(); //去重后的数组
  useTabsStore(pinia).toggleRouterHistory(newArr);
};
