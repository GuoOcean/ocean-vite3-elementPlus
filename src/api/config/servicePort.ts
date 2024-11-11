// * 后端接口请求地址1服务
const BASEURL1: any = {
  dev: "/dev",
  test: "/dev",
  sit: "",
  prod: "/dev",
};
// * 后端接口请求地址2服务(中台服务)
const BASEURL2: any = {
  dev: "/mock",
  test: "/mock",
  sit: "",
  prod: "/mock",
};
export const PORT = BASEURL1[import.meta.env.VITE_APP_MODE];
export const PORT2 = BASEURL2[import.meta.env.VITE_APP_MODE];
