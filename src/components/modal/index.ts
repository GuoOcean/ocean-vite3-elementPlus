/*
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-22 18:00:50
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-22 19:04:15
 * @FilePath: /ocean-vite3-elementPlus/src/components/modal/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { App, createVNode, VNode, render, CSSProperties } from "vue";
import modalContent from "./index.vue";

interface Modal {
  width?: string | number; // 模态框宽度，单位 px
  icon?: VNode; // 自定义图标
  title?: string; // 模态框标题
  titleStyle?: CSSProperties; // 自定义标题样式
  content?: string; // 模态框内容
  contentStyle?: CSSProperties; // 自定义内容样式
  bodyClass?: string; // 自定义 body 类名
  bodyStyle?: CSSProperties; // 自定义 body 样式
  cancelText?: string; // 取消按钮文字
  cancelProps?: object; // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string; // 确认按钮文字
  okType?:
    | "default"
    | "reverse"
    | "primary"
    | "danger"
    | "dashed"
    | "text"
    | "link"; // 确认按钮类型
  okProps?: object; // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  noticeText?: string; // 通知按钮文字
  noticeProps?: object; // 通知按钮 props 配置，参考 Button 组件 Props
  centered?: boolean; // 是否水平垂直居中，否则固定高度水平居中
  top?: string | number; // 固定高度水平居中时，距顶部高度，仅当 center: false 时生效，单位 px
  transformOrigin?: "mouse" | "center"; // 模态框动画出现的位置
  blockScroll?: boolean; // 是否在打开模态框时禁用背景滚动
  keyboard?: boolean; // 是否支持键盘 esc 关闭
  maskClosable?: boolean; // 点击蒙层是否允许关闭
  maskStyle?: CSSProperties; // 自定义蒙层样式
  onKnow?: Function; // 点击知道了按钮的回调
  onOk?: Function; // 点击确认按钮的回调
  onCancel?: Function; // 点击遮罩层或取消按钮的回调
}

export default {
  install(app: App) {
    const modalContainer = document.createElement("div");
    document.body.appendChild(modalContainer);
    // 将组件转换为虚拟DOM
    const Vnode: VNode = createVNode(modalContent);
    // 将虚拟DOM挂载到页面节点上
    // render(Vnode, document.body);
    render(Vnode, modalContainer);
    // 将插件的主要方法挂载到 app.config.globalProperties 上，这里的 $toast 是自定义的
    app.config.globalProperties.$modal = {
      info(data: Modal) {
        console.log("info", Vnode);
        Vnode.component?.exposed?.info(data);
      },
    };
  },
};
