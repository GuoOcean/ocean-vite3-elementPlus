import { AxiosRequestConfig } from "axios";
// 导入请求
import requset, { ResponseData } from "@/utils/request";

const get = <T>(url: string, params?: {}): Promise<ResponseData<T>> => {
  return requset.get(url, { params });
};

const post = <T>(
  url: string,
  data?: {},
  config?: AxiosRequestConfig
): Promise<ResponseData<T>> => {
  return requset.post(url, data, { ...config });
};

const put = <T>(
  url: string,
  data?: {},
  config?: AxiosRequestConfig
): Promise<ResponseData<T>> => {
  return requset.put(url, data, { ...config });
};

const del = <T>(
  url: string,
  data?: {},
  config?: AxiosRequestConfig
): Promise<ResponseData<T>> => {
  return requset.delete(url, { data, ...config });
};

export { get, post, put, del };
