<template>
  <!-- // #加上图标库里复制的名字 -->
  <svg
    class="svg-icon"
    :class="spin ? 'svg-icon-spin' : ''"
    aria-hidden="true"
    :height="height"
    :width="width"
  >
    <use :xlink:href="`#icon-${icon}`" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: "1em",
  },
  width: {
    type: String,
    default: "1em",
  },
  color: {
    type: String,
    default: "",
  },
  spin: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  width: 1em;
  height: 1em;
}

.svg-icon-spin {
  -webkit-animation: loadingCircle 3s infinite linear;
  animation: loadingCircle 3s infinite linear;
}

@keyframes loadingCircle {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
