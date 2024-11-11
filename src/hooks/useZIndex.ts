import { ref, getCurrentInstance, inject, computed, unref } from "vue";
import { isClient } from "@vueuse/core";
const isNumber = (val: any) => typeof val === "number";

const initial = {
  current: 0,
};
const zIndex = ref(0);
const defaultInitialZIndex = 2e3; // 2000
const ZINDEX_INJECTION_KEY = Symbol("elZIndexContextKey");
const zIndexContextKey = Symbol("zIndexContextKey");
const useZIndex = (zIndexOverrides?: Ref<number> | undefined) => {
  const increasingInjection = getCurrentInstance()
    ? inject(ZINDEX_INJECTION_KEY, initial)
    : initial;
  const zIndexInjection =
    zIndexOverrides ||
    (getCurrentInstance() ? inject(zIndexContextKey, void 0) : void 0);
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection);
    return isNumber(zIndexFromInjection)
      ? zIndexFromInjection
      : defaultInitialZIndex;
  });
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);
  const nextZIndex = () => {
    increasingInjection.current++;
    zIndex.value = increasingInjection.current;
    return currentZIndex.value;
  };
  if (!isClient && !inject(ZINDEX_INJECTION_KEY)) {
    //         debugWarn("ZIndexInjection", `Looks like you are using server rendering, you must provide a z-index provider to ensure the hydration process to be succeed
    //   usage: app.provide(ZINDEX_INJECTION_KEY, { current: 0 })`);
  }
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  };
};

export {
  ZINDEX_INJECTION_KEY,
  defaultInitialZIndex,
  useZIndex,
  zIndexContextKey,
};
