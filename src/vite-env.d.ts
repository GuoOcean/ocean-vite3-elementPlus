// <reference types="vite/client" />
export interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_PORT: string;
  readonly VITE_PROXY: string;
  readonly VITE_OPEN_PROXY: string;
}

export interface EnvConfig {
  VITE_APP_PORT: string;
  VITE_APP_BASE_API: string;
}

declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
