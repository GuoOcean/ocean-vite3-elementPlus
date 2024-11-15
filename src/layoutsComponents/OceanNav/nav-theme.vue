<template>
  <span class="noticeButton nav-info" @click="toggleColorScheme">
    <div class="theme-icon">
      <svg-icon
        icon="dark-icon"
        color="#cfd3dc"
        class="dark-icon"
        v-if="settingsStore.isdark"
      ></svg-icon>
      <svg-icon icon="light-icon" class="light-icon" v-else></svg-icon>
    </div>
  </span>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/modules/settings";
const settingsStore = useSettingsStore();
// 切换主题动画
const toggleColorScheme = (event: MouseEvent) => {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );
  const { startViewTransition } = useViewTransition(() => {
    if (settingsStore.themeMode === "dark") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    settingsStore.themeMode &&
      settingsStore.toggleThemeMode(
        settingsStore.themeMode === "dark" ? "light" : "dark"
      );
  });

  // DarkReader.setFetchMethod(window.fetch);
  // DarkReader.disable();
  startViewTransition()?.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    const animationKeyframes = {
      clipPath:
        settingsStore.themeMode === "dark" ? [...clipPath].reverse() : clipPath,
    };

    const animationOptions = {
      duration: 500,
      easing: "ease-out",
      pseudoElement:
        settingsStore.themeMode !== "dark"
          ? "::view-transition-new(root)"
          : "::view-transition-old(root)",
    };

    document.documentElement.animate(animationKeyframes, animationOptions);
  });
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

.dark-icon {
  font-size: 16px;
  color: #cfd3dc;
  background-color: #141414;
  border-radius: 50%;
}

.light-icon {
  color: #606266;
  font-size: 16px;
}
</style>
