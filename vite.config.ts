/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 */

import { defineConfig, loadEnv } from "vite";
import path from "node:path";
import createVitePlugins from "./vite/plugins";
import { wrapperEnv } from "./vite/utils";
import { createProxy } from "./vite/proxy";
import type { ImportMetaEnv } from "./src/vite-env";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv;
  const { VITE_APP_PORT, VITE_PROXY, VITE_OPEN_PROXY } = wrapperEnv(env);
  const isBuild: boolean = command === "build";
  return {
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
        {
          find: "~",
          replacement: path.resolve(__dirname, "."),
        },
        {
          find: "#",
          replacement: path.resolve(__dirname, "types"),
        },
      ],
      extensions: [".ts", ".vue", ".js", ".jsx", ".tsx"], // 导入时想要省略的扩展名列表。
    },
    server: {
      host: "0.0.0.0", // 服务监听地址，设置该值表示监听所有
      port: VITE_APP_PORT,
      cors: true, // 允许跨源
      open: true, //启动时自动在浏览器中打开
      proxy: createProxy(VITE_PROXY, VITE_OPEN_PROXY),
    },
    build: {
      outDir: "dist", // 相对于根目录的构建输出位置。如果目录存在，则将在构建之前删除该目录。
      sourcemap: false,
      minify: "esbuild", // 混淆器，terser 构建后文件体积更小，'boolean' | 'terser' | 'esbuild'
      reportCompressedSize: true,
      // 规定触发警告的 chunk 大小.默认500
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return (
                id
                  .toString()
                  .match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)
                  ?.groups!.moduleName ?? "vender"
              );
            }
          },
        },
      },
    },
    esbuild: {
      // 清除全局的console.log和debug
      drop: isBuild ? ["console", "debugger"] : [],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "./src/assets/styles/variables.scss" as *;
          `,
          javascriptEnabled: true,
          // 为每个组件的scss类型的style标签引入./src/bem.scss
          // additionalData: '@use "./src/styles/variables.scss" as *;'
        },
      },
    },
  };
});
