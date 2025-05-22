/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-22 17:14:48
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-22 19:03:34
 * @FilePath: /ocean-vite3-elementPlus/src/components/message/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { App, createVNode, VNode, render } from "vue";
import messageContent from "./index.vue";

export default {
  install(app: App) {
    const messageContainer = document.createElement("div");
    document.body.appendChild(messageContainer);
    // 将组件转换为虚拟DOM
    const Vnode: VNode = createVNode(messageContent);
    // 将虚拟DOM挂载到页面节点上
    // render(Vnode, document.body);
    render(Vnode, messageContainer);
    // 将插件的主要方法挂载到 app.config.globalProperties 上，这里的 $toast 是自定义的
    app.config.globalProperties.$message = {
      info(message: string) {
        console.log("info", Vnode);
        Vnode.component?.exposed?.info(message);
      },
    };
  },
};
