<template>
  <span class="noticeButton nav-info" @click="toggle">
    <svg-icon
      icon="ExpandOutlined"
      class="iconFont"
      v-if="!isFullscreen"
    ></svg-icon>
    <svg-icon icon="CompressOutlined" class="iconFont" v-else></svg-icon>
  </span>
</template>

<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen();
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

.iconFont {
  font-size: 16px;
}
</style>
