/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-28 19:51:50
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-11 21:55:27
 * @FilePath: /gc-carpool-admin/src/router/routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layouts/index.vue";
/**
 * 静态路由 (无需权限)
 */
export const staticRoutes = [
  {
    path: "/",
    name: "Root",
    redirect: "/index",
    component: Layout,
    meta: {
      title: "首页",
      icon: "HomeFilled",
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index.vue"),
        meta: {
          title: "工作台",
          icon: "home-2-line",
          noClosable: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
];

/**
 * 动态路由 (需要权限)
 */
export const asyncRoutes = [];

/**
 * 任意路由 (404)
 */
export const anyRoute = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/errorView/403.vue"),
    meta: {
      hidden: true,
      isRecord: false,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/errorView/404.vue"),
    meta: {
      hidden: true,
      isRecord: false,
    },
  },
  {
    path: "/:all(.*)*",
    name: "notFound",
    component: () => import("@/views/errorView/404.vue"),
    meta: {
      title: "找不到页面",
      hidden: true,
      isRecord: false,
    },
  },
];
