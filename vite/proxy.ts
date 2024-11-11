/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-28 19:51:50
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-09 13:49:06
 * @FilePath: /gc-carpool-admin/vite/proxy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ProxyOptions } from "vite";

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

/**
 * 创建代理配置对象
 * @param list 代理列表，是一个键为前缀、值为目标地址的键值对数组，默认为空数组
 * @param VITE_OPEN_PROXY 环境变量，用于控制是否开启代理，字符串值，默认为字符串形式的 'true' 或其他非 'true' 值
 * @returns 返回一个对象，键为前缀，值为代理配置对象
 */
export function createProxy(list: ProxyList = [], VITE_OPEN_PROXY: boolean) {
  console.log("list", VITE_OPEN_PROXY);
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    console.log("prefix", prefix);
    const isHttps = httpsRE.test(target);
    // 根据代理目标地址配置代理选项
    ret[prefix] = {
      target,
      changeOrigin: VITE_OPEN_PROXY == true,
      // 如果环境变量 VITE_OPEN_PROXY 为 'true'，则重写路径，否则移除路径中的 '/proxy'
      rewrite: (path) =>
        VITE_OPEN_PROXY === true
          ? path.replace(new RegExp(`^${prefix}`), "")
          : path.replace(/^\/proxy/, ""),
      // 如果目标地址是 HTTPS，则设置 secure 为 false
      ...(isHttps ? { secure: false } : {}),
      // rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
    };
  }
  console.log("ret", ret);
  return ret;
}
