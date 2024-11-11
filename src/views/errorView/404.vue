<!--
 * @Author: guohaiyang 1517366319@qq.com
 * @Date: 2024-09-27 22:04:19
 * @LastEditors: guohaiyang 1517366319@qq.com
 * @LastEditTime: 2024-11-11 21:45:20
 * @FilePath: /ocean-vite3/src/views/errorView/404.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="error404 column">
    <svg-icon icon="404" class="error404-icon"></svg-icon>
    <div class="error404-content column">
      <h1>404</h1>
      <div class="desc">您访问的页面不存在</div>
      <el-button type="primary" @click="goBack">
        {{ data.countdown }} 秒后，返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const data = ref({
  inter: Number.NaN,
  countdown: 5,
});

onMounted(() => {
  // data.value.inter = window.setInterval(() => {
  //   data.value.countdown--;
  //   if (data.value.countdown === 0) {
  //     data.value.inter && window.clearInterval(data.value.inter);
  //     goBack();
  //   }
  // }, 1000);
});

function goBack() {
  router.push("/");
}
</script>

<style scoped lang="scss">
.error404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  .error404-icon {
    font-size: 300px;
  }
  .error404-content {
    align-items: center;
    h1 {
      font-size: 3.75rem;
      line-height: 1;
      font-weight: 700;
      margin-bottom: 0.2em;
      font-family:
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        "Helvetica Neue",
        Arial,
        "Noto Sans",
        sans-serif,
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji";
    }
    .desc {
      margin-bottom: 1em;
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.75rem;
      color: rgb(120 113 108);
    }
  }
}
</style>
