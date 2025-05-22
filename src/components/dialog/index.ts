/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-22 19:40:28
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-22 19:41:46
 * @FilePath: /gc-home-MiddlePlatform/src/components/dialog/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { App, createVNode, VNode, render } from "vue";
import dialogContent from "./Dialog.vue";

export default {
  install(app: App) {
    const dialogContainer = document.createElement("div");
    document.body.appendChild(dialogContainer);
    // 将组件转换为虚拟DOM
    const Vnode: VNode = createVNode(dialogContent);
    // 将虚拟DOM挂载到页面节点上
    // render(Vnode, document.body);
    render(Vnode, dialogContainer);
  },
};
