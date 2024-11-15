import type { RouterHistory } from "#/router";

export const useTabsStore = defineStore("tabs", () => {
  const routerHistory = ref<RouterHistory[]>([
    {
      path: "/index",
      title: "工作台",
      name: "Index",
      meta: {
        noClosable: true,
      },
    },
  ]);
  const nowRouter = ref("");
  // 切换路由历史
  const toggleRouterHistory = (tabRouterHistory: RouterHistory[]) => {
    routerHistory.value = tabRouterHistory;
  };
  // 设置当前路由
  const setNowRouter = (tabRouterHistory: string) => {
    nowRouter.value = tabRouterHistory;
  };

  /**
   * @description 删除当前标签页以外其它全部标签页
   * @param {*} path
   * @returns
   */
  const delOthersVisitedRoutes = (path: string) => {
    routerHistory.value = routerHistory.value.filter(
      (item: RouterHistory) => item.meta.noClosable || item.path === path
    );
  };
  /**
   * @description 删除当前标签页左边全部标签页
   * @param {*} path
   * @returns
   */
  const delLeftVisitedRoutes = (path: string) => {
    let found = false;
    routerHistory.value = routerHistory.value.filter((item: RouterHistory) => {
      if (item.path === path) found = true;
      return item.meta.noClosable || found;
    });
  };
  /**
   * @description 删除当前标签页右边全部标签页
   * @param {*} path
   * @returns
   */
  const delRightVisitedRoutes = (path: string) => {
    let found = false;
    routerHistory.value = routerHistory.value.filter((item: RouterHistory) => {
      const close = found;
      if (item.path === path) found = true;
      return item.meta.noClosable || !close;
    });
  };
  /**
   * @description 删除全部标签页
   * @returns
   */
  const delAllVisitedRoutes = () => {
    routerHistory.value = routerHistory.value.filter(
      (item: RouterHistory) => item.meta.noClosable
    );
  };
  return {
    routerHistory,
    nowRouter,

    toggleRouterHistory,
    setNowRouter,
    delOthersVisitedRoutes,
    delLeftVisitedRoutes,
    delRightVisitedRoutes,
    delAllVisitedRoutes,
  };
});
