// asyncRoutes
import { staticRoutes, asyncRoutes, anyRoute } from "@/router/routes";
import { cloneDeep } from "lodash";
import router from "@/router/index";

// router动态注册路由
const arrRoutes = (allRoutes: any[]) => {
  allRoutes.forEach((route) => {
    // route 参数是每一个路由
    router.addRoute(route); // 动态注册路由, 这个方法是vue-router提供的,只能动态添加一个路由
  });
};

// 设置父级路由的 redirect 属性
const setRedirectForParentRoutes = (routes: any[]) => {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.redirect = route.children[0].path;
    }
  });
};

export const useRouterStore = defineStore("router", () => {
  const routes = ref<any[]>([]); // 所有路由
  const partialRoutes = ref<any[]>([]); // 部分路由
  const parentRoute = ref<any>(""); // 父级路由
  const childrenRoute = ref<string[]>([]); // 子路由
  const allTwoLevelRoutes = ref<any[]>([]); // 所有二级路由
  const twoLevelActiveRoute = ref<string>(""); // 二级路由激活
  // 处理路由信息，并动态添加路由
  // 如不需要可将 arrRoutes 注释并将router/index.ts中的routes全部路由合并即可
  const setRoutes = async () => {
    routes.value = [...staticRoutes, ...asyncRoutes, ...anyRoute];

    arrRoutes(asyncRoutes);
  };

  // 过滤并扁平化处理子路由
  const filterAndFlattenChildren = (children: any[]) => {
    const recursiveFilter = (routes: any[]) => {
      return routes.reduce((acc, route) => {
        // 如果当前路由不是隐藏的，才考虑添加到结果集中
        if (!route.meta.hidden) {
          // 创建一个新的路由对象，避免直接操作原对象
          const newRoute = { ...route };

          // 如果当前路由有子路由，则递归处理其子路由
          if (newRoute.children && newRoute.children.length > 0) {
            newRoute.children = recursiveFilter(newRoute.children);
            // 如果经过过滤后，子路由为空数组，可以选择是否保留这个父级路由
            if (newRoute.children.length === 0) {
              delete newRoute.children; // 或者选择不删除，取决于你的需求
            }
          }
          acc.push(newRoute);
        }
        return acc;
      }, []);
    };

    return recursiveFilter(children);
  };
  // 扁平化处理路由
  const flattenRoutes = (routes: any[]) => {
    let flatRoutes: any[] = [];
    routes.forEach((route) => {
      if (!route.children || route.children.length === 0) {
        flatRoutes.push(route);
      }
      if (route.children && route.children.length > 0) {
        flatRoutes = flatRoutes.concat(flattenRoutes(route.children));
      }
    });

    return flatRoutes;
  };
  // 根据点击的路由key来设置子路由并扁平化处理
  const setMenuChildrenRoutes = (routeKey: string) => {
    routes.value.forEach((item: any) => {
      if (item.path === routeKey) {
        const filteredChildren = filterAndFlattenChildren(item.children);
        // console.log(filteredChildren, "二级路由");
        if (filteredChildren.length > 1) {
          allTwoLevelRoutes.value = filteredChildren;
        } else {
          allTwoLevelRoutes.value = [];
        }
        const flattenedRoutes = flattenRoutes(filteredChildren);
        // 只有在返回的数组长度大于1时才赋值
        if (flattenedRoutes.length > 1) {
          partialRoutes.value = flattenedRoutes;
        } else {
          partialRoutes.value = [];
        }
        // 如果当前项有子项，则将父节点的选中高亮进行赋值
        // 这是为了防止某一个路由下有多个字节点，但是其中只有一个字节点进行了展示，其他子节点被隐藏了
        // 在路由递归的时候，会将这一个展示的字节点当成单独节点进行展示
        // 但是父节点的高亮选中状态会不同，导致页面父节点高亮显示不正确
        // if(item.children.length == 1){
        //     parentRoute.value = [flattenedRoutes[0].path]
        //     // console.log(parentRoute.value,'parentRoute.value')
        // }
      }
    });
  };
  // 查找路由的顶级父节点
  const findTopLevelParent = (targetPath: string) => {
    // 辅助函数，用于递归查找
    function findParentRecursively(
      targetPath: string,
      array: any[],
      parentChain: any = []
    ): any {
      for (let i = 0; i < array.length; i++) {
        const item = array[i];
        // 检查当前项是否是目标
        if (item.path === targetPath) {
          // 如果当前项就是目标，返回父节点链
          return parentChain;
        }
        // 如果当前项有子项，则递归搜索子项
        if (item.children && item.children.length > 0) {
          const result = findParentRecursively(targetPath, item.children, [
            ...parentChain,
            item,
          ]);
          // 如果在子项中找到了目标，返回结果
          if (result) {
            return result;
          }
        }
      }
      // 如果没有找到，返回 null
      return null;
    }
    // 调用辅助函数并获取父节点链
    const parentChain = findParentRecursively(targetPath, routes.value);
    // 返回最顶层的父节点
    if (parentChain && parentChain.length > 0) {
      // 从二级路由开始包含后续的子路由
      const filteredChildren = filterAndFlattenChildren(
        parentChain[0].children
      );
      // 从三级路由开始包含后续的子路由
      const filteredThreeChildren = filterAndFlattenChildren(
        parentChain[1] ? parentChain[1].children : []
      );
      let flattenedRoutes = [];
      let flattenedThreeRoutes = [];
      if (filteredChildren.length > 0) {
        if (filteredChildren.length > 1) {
          allTwoLevelRoutes.value = filteredChildren;
        } else {
          allTwoLevelRoutes.value = [];
        }
        // 全部的二级后的所有的路由（包含二级）
        flattenedRoutes = flattenRoutes(filteredChildren);
        if (flattenedRoutes.length > 1) {
          partialRoutes.value = flattenedRoutes;
        } else {
          partialRoutes.value = [];
        }
      } else {
        allTwoLevelRoutes.value = [];
        partialRoutes.value = [];
      }

      // 三级路由 -- 暂时不会使用
      // if (filteredThreeChildren.length > 0) {
      //   // 全部的二级后的所有的路由（包含二级）
      //   flattenedThreeRoutes = flattenRoutes(filteredThreeChildren);
      //   if (flattenedThreeRoutes.length > 1) {
      //     partialThreeRoutes.value = flattenedThreeRoutes;
      //   } else {
      //     partialThreeRoutes.value = [];
      //   }
      // } else {
      //   partialThreeRoutes.value = [];
      // }

      // 这里就是父节点下多个字节点，这时父节点的高亮就是自己本身
      // 控制一级路由高亮
      // if (parentChain[0].children.length > 1) {
      //   parentRoute.value = parentChain[0].path;
      //   // twoLevelActiveRoute.value = parentChain[0].redirect;
      // } else if (parentChain[0].children.length == 1) {
      //   parentRoute.value = flattenedRoutes[0].path;
      // }
      if (parentChain.length > 1) {
        // 如果 parentChain 长度大于1，则意味着有多个层级，取最后一个作为高亮的父级路由。
        // parentRoute.value = parentChain[parentChain.length - 1].path;
        parentRoute.value = parentChain.map((item: any) => item.path);
      } else if (
        parentChain.length === 1 &&
        parentChain[0].children.length > 1
      ) {
        // 如果 parentChain 只有一个元素且它有多个子路由，则设置为这个父级路由。

        parentRoute.value = [parentChain[0].path];
      } else if (
        parentChain.length === 1 &&
        parentChain[0].children.length === 1
      ) {
        // 如果 parentChain 只有一个元素且它只有一个子路由，则设置为该子路由。
        const flattenedRoutes = flattenRoutes(parentChain[0].children);
        parentRoute.value = flattenedRoutes.length
          ? [flattenedRoutes[0].path]
          : [];
      }

      // 设置二级路由的高亮
      if (parentChain[1]) {
        if (parentChain[1].children.length > 1) {
          twoLevelActiveRoute.value = parentChain[1].path;
        } else if (parentChain[1].children.length == 1) {
          twoLevelActiveRoute.value = flattenedThreeRoutes[0].path;
        }
      } else {
        twoLevelActiveRoute.value = "";
      }
      // return parentChain[0];
    } else {
      parentRoute.value = [];
      twoLevelActiveRoute.value = "";
      return null;
    }
  };
  // 遍历后台传来的路由字符串，转换为组件对象
  const filterRoutesHandler = (userRoutes: any[], localRoutes: any[]) => {
    const matchedRoutes: any[] = [];
    userRoutes.forEach((userRoute) => {
      const localRoute = localRoutes.find(
        (localRoute) => localRoute.path === userRoute.path
      );

      if (localRoute) {
        if (userRoute.children && localRoute.children) {
          localRoute.children = filterRoutesHandler(
            userRoute.children,
            localRoute.children
          );
        }
        matchedRoutes.push(localRoute);
      }
    });

    return matchedRoutes;
  };

  return {
    routes,
    partialRoutes,
    parentRoute,
    childrenRoute,
    allTwoLevelRoutes, // 获取所有的二级路由
    twoLevelActiveRoute, // 二级路由高亮

    setRoutes,
    setMenuChildrenRoutes,
    findTopLevelParent,
    filterAndFlattenChildren,
    flattenRoutes,
  };
});
