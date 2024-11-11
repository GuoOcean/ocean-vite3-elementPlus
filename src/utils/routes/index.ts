/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-30 09:49:09
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-09-30 09:57:13
 * @FilePath: /gc-carpool-admin/src/utils/routes/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 获取当前跳转登录页的Route
 * @param currentPath 当前页面地址
 */
export function toLoginRoute(currentPath: string) {
  if (currentPath !== '/') {
    return {
      path: '/login',
      query: { redirect: currentPath },
      replace: true,
    }
  } else return { path: '/login', replace: true }
}