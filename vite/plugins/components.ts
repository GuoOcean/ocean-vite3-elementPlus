import Components from "unplugin-vue-components/vite";
// import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default function createComponents() {
  return Components({
    dirs: ["src/components", "src/layoutsComponents"],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: "./types/components.d.ts",
    // resolvers: [AntDesignVueResolver({ importStyle: "less" })], // 这里可以配置你需要的组件库
    resolvers: [ElementPlusResolver()],
  });
}
