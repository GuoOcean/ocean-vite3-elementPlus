/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-10-07 11:18:21
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-09 00:37:16
 * @FilePath: /gc-carpool-admin/types/router.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 路由历史记录
 */
export interface RouterHistory {
  title: string;
  path: string;
  meta: Meta;
  name: string;
  [key: string]: any; // 添加索引签名，确保可以使用任意字符串作为键
}

type Meta = {
  title?: string;
  icon?: string;
  noClosable?: boolean;
  [key: string]: any; // 添加索引签名，确保可以使用任意字符串作为键
};
