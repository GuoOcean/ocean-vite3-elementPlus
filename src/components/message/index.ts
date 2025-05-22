/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-22 17:14:48
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2025-05-22 15:51:34
 * @FilePath: /ocean-vite3-elementPlus/src/components/message/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { App, createVNode, VNode, render } from "vue";
import messageContent from "./index.vue";
import {Message as messageType} from './index.vue'

export default {
  install(app: App) {
    const messageContainer = document.createElement("div");
    document.body.appendChild(messageContainer);
    // 将组件转换为虚拟DOM
    const Vnode: VNode = createVNode(messageContent);
    // 将虚拟DOM挂载到页面节点上
    // render(Vnode, document.body);
    render(Vnode, messageContainer);
    // 将插件的主要方法挂载到 app.config.globalProperties 上，这里的 $message 是自定义的
    app.config.globalProperties.$message = {
      open(message: string | messageType) {
        Vnode.component?.exposed?.open(message);
      },
      info(message: string | messageType) {
        console.log("info", Vnode);
        Vnode.component?.exposed?.info(message);
      },
      success(message: string | messageType) {
        Vnode.component?.exposed?.success(message);
      },
      error(message: string | messageType) {
        Vnode.component?.exposed?.error(message);
      },
      warning(message: string | messageType) {
        Vnode.component?.exposed?.warning(message);
      }
    };
  },
};
