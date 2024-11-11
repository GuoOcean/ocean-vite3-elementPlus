/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-24 16:25:07
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-11 15:10:31
 * @FilePath: /ocean-vite3/src/utils/globalMethods/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/globalMethods.js
import type { App } from "vue";
// import { message } from "ant-design-vue";

// import { messageConfig, messageConfigType } from "#/globalTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalMethods: { [key: string]: (...args: any[]) => void } = {
  /**
   * @description 全局Message
   * @param {object} config 配置对象
   */
  // $message: (type: messageConfigType, config: messageConfig) => {
  //   message[type](config);
  // },
};

export function setupGlobalMethods(app: App): void {
  for (const key in globalMethods) {
    app.config.globalProperties[key] = globalMethods[key]; // 将方法挂载到全局属性上
  }
}
