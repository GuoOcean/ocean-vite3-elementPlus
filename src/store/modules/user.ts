import { getLocal, removeLocal, setLocal } from "@/utils/storage";
// asyncRoutes
import { staticRoutes, asyncRoutes, anyRoute } from "@/router/routes";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getLocal("token") || "");
  const userInfo = ref<any>({}); // 用户信息

  // 登录
  const login = ({ username, password }) => {
    try {
      setLocal("token", "123");
      token.value = "123";
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // 获取用户信息
  const getUserInfo = () => {
    try {
      userInfo.value = {
        name: "admin",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      };
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // 退出登录
  const logout = () => {
    try {
      // 清除用户信息
      removeLocal("token");
      token.value = "";
      userInfo.value = {};
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    token,
    userInfo,

    login,
    logout,
    getUserInfo,
  };
});
