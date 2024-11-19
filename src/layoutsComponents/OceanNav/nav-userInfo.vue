<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-11-13 23:28:19
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-19 15:19:51
 * @FilePath: /ocean-vite3-elementPlus/src/layoutsComponents/OceanNav/nav-userInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-dropdown placement="bottom-end" :show-arrow="false">
    <span
      class="noticeButton nav-info"
      style="display: flex; flex-flow: row; align-items: center"
    >
      <span class="userInfo-avatar">
        <img
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          alt=""
        />
      </span>
      <span class="userInfo-name">Admin</span>
    </span>

    <template #dropdown>
      <el-dropdown-menu class="nav-info-menu">
        <el-dropdown-item>
          <span class="nav-info-icon anticon row">
            <svg-icon icon="UserOutlined" class="icon"></svg-icon>
          </span>
          <span class="nav-info-title">个人中心</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="nav-info-icon anticon row">
            <svg-icon icon="SettingOutlined" class="icon"></svg-icon>
          </span>
          <span class="nav-info-title">个人设置</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <span class="nav-info-icon anticon row">
            <svg-icon icon="LogoutOutlined" class="icon"></svg-icon>
          </span>
          <span class="nav-info-title">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { toLoginRoute } from "@/utils/routes/index";
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const logout = async () => {
  console.log("退出登录", router, route);
  await userStore.logout();
  router.push(toLoginRoute(route.fullPath));
};
</script>

<style scoped lang="scss">
.noticeButton {
  cursor: pointer;
  transition: all 0.3s;
}

.nav-info {
  padding: 0 12px;
  display: inline-block;
  height: $ocean-header-height;
  line-height: $ocean-header-height;
  vertical-align: top;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.userInfo-avatar {
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  margin-right: 6px;
  display: inline-block;
  line-height: 48px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0%;
    border-radius: 50%;
  }
}

.icon {
  font-size: 16px;
}
:deep(.el-dropdown-menu__item) {
  min-width: 160px;
  display: flex;
}
</style>
