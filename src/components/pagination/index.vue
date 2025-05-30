<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
// import Input from "../input";
// import Select from "../select";
interface Props {
  page?: number; // (v-model) 当前页数
  pageSize?: number; // (v-model) 每页条数
  total?: number; // 数据总数
  disabled?: boolean; // 是否禁用
  pageAmount?: number; // 显示的页码数
  hideOnSinglePage?: boolean; // 只有一页时是否隐藏分页
  showQuickJumper?: boolean; // 是否可以快速跳转至某页
  showSizeChanger?: boolean; // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
  pageSizeOptions?: string[] | number[]; // 设置每页可以显示多少条
  showTotal?: boolean | ((total: number, range: number[]) => string); // 用于显示数据总量和当前数据顺序
  placement?: "left" | "center" | "right"; // 分页展示位置，靠左 left，居中 center，靠右 right
  size?: "large" | "middle" | "small"; // 分页按钮大小
}
const props = withDefaults(defineProps<Props>(), {
  page: 1,
  pageSize: 10,
  total: 0,
  disabled: false,
  pageAmount: 5,
  hideOnSinglePage: false,
  showQuickJumper: false,
  showSizeChanger: undefined,
  pageSizeOptions: () => [10, 20, 50, 100],
  showTotal: false,
  placement: "center",
  size: "large",
});
const currentPage = ref(props.page); // 当前页数
console.log("currentPage", props);
const currentPageSize = ref(props.pageSize); // 每页条数
const jumpNumber = ref(); // 跳转的页码
const forwardMore = ref(false); // 左省略号展示
const backwardMore = ref(false); // 右省略号展示
const emits = defineEmits([
  "update:page",
  "update:pageSize",
  "change",
  "pageSizeChange",
]);
const totalPage = computed(() => {
  // 总页数
  return Math.ceil(props.total / currentPageSize.value); // 向上取整
});
const totalText = computed(() => {
  if (typeof props.showTotal === "boolean") {
    if (props.showTotal) {
      return `共 ${props.total} 条`;
    }
  } else {
    const first = (currentPage.value - 1) * currentPageSize.value + 1;
    const last =
      currentPage.value * currentPageSize.value > props.total
        ? props.total
        : currentPage.value * currentPageSize.value;
    return props.showTotal(props.total, [first, last]);
  }
  return null;
});
const pageList = computed(() => {
  // 获取显示的页码数组
  return dealPageList(currentPage.value).filter(
    (n) => n !== 1 && n !== totalPage.value
  );
});
const showPageSizeChanger = computed(() => {
  if (typeof props.showSizeChanger === "boolean") {
    return props.showSizeChanger;
  } else {
    // undefined
    return props.total > 50;
  }
});
const selectOptions = computed(() => {
  const pageSizeOptipns = [currentPageSize.value, ...props.pageSizeOptions].map(
    (pageSize: number | string) => Number(pageSize)
  );
  return Array.from(new Set(pageSizeOptipns))
    .sort((a: number, b: number) => a - b)
    .map((pageSize: number) => {
      return {
        label: `${pageSize} 条/页`,
        value: pageSize,
      };
    });
});
const selectHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 28,
    large: 32,
  };
  return heightMap[props.size] || heightMap["large"];
});
const optionsSize = computed(() => {
  if (props.size === "small") {
    return "small";
  }
  return "middle";
});
watch(
  () => props.page,
  (to: number) => {
    currentPage.value = to;
  }
);
watch(
  () => props.pageSize,
  (to: number) => {
    currentPageSize.value = to;
  }
);
function dealPageList(curPage: number): number[] {
  var resList = [];
  var offset = Math.floor(props.pageAmount / 2); // 向下取整
  var pager = {
    start: curPage - offset,
    end: curPage + offset,
  };
  if (pager.start < 1) {
    pager.end = pager.end + (1 - pager.start);
    pager.start = 1;
  }
  if (pager.end > totalPage.value) {
    pager.start = pager.start - (pager.end - totalPage.value);
    pager.end = totalPage.value;
  }
  if (pager.start < 1) {
    pager.start = 1;
  }
  if (pager.start > 1) {
    forwardMore.value = true;
  } else {
    forwardMore.value = false;
  }
  if (pager.end < totalPage.value) {
    backwardMore.value = true;
  } else {
    backwardMore.value = false;
  }
  // 生成要显示的页码数组
  for (let i = pager.start; i <= pager.end; i++) {
    resList.push(i);
  }
  return resList;
}
function onPageForward(): void {
  currentPage.value =
    currentPage.value - props.pageAmount > 0
      ? currentPage.value - props.pageAmount
      : 1;
  emits("update:page", currentPage.value);
  emits("change", currentPage.value, currentPageSize.value);
}
function onPageBackward(): void {
  currentPage.value =
    currentPage.value + props.pageAmount < totalPage.value
      ? currentPage.value + props.pageAmount
      : totalPage.value;
  emits("update:page", currentPage.value);
  emits("change", currentPage.value, currentPageSize.value);
}
async function onPageJump() {
  let num = Number(jumpNumber.value); // 转换为数字
  if (jumpNumber.value && Number.isInteger(num)) {
    // 是否为整数
    if (num < 1) {
      num = 1;
    }
    if (num > totalPage.value) {
      num = totalPage.value;
    }
    onPageChange(num);
  }
  await nextTick();
  jumpNumber.value = undefined; // 清空跳转输入框
}
function onPageChange(page: number): boolean | void {
  if (page === 0 || page === totalPage.value + 1) {
    return false;
  }
  if (currentPage.value !== page) {
    // 点击的页码不是当前页码
    currentPage.value = page;
    emits("update:page", currentPage.value);
    emits("change", currentPage.value, currentPageSize.value);
  }
}
function onPageSizeChange(pageSize: number) {
  currentPageSize.value = pageSize;
  const maxPage = Math.ceil(props.total / pageSize);
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage;
  }
  emits("update:page", currentPage.value);
  emits("update:pageSize", currentPageSize.value);
  emits("pageSizeChange", currentPage.value, currentPageSize.value);
  // emits("change", currentPage.value, currentPageSize.value);
}
</script>
<template>
  <div
    class="m-pagination"
    :class="[
      `pagination-${placement}`,
      {
        'pagination-small': size === 'small',
        'pagination-middle': size === 'middle',
        'pagination-disabled': disabled,
        'pagination-hidden':
          !total || (hideOnSinglePage && total <= currentPageSize),
      },
    ]"
  >
    <span class="pagination-total-text pagination-right-gap" v-if="totalText">{{
      totalText
    }}</span>
    <span
      tabindex="0"
      class="pagination-prev pagination-right-gap"
      :class="{ 'pagination-item-disabled': currentPage === 1 }"
      @keydown.enter.prevent="
        disabled ? () => false : onPageChange(currentPage - 1)
      "
      @click="
        disabled || currentPage === 1
          ? () => false
          : onPageChange(currentPage - 1)
      "
    >
      <svg
        class="arrow-svg"
        viewBox="64 64 896 896"
        data-icon="left"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
        ></path>
      </svg>
    </span>
    <span
      tabindex="0"
      :class="[
        'pagination-item pagination-right-gap',
        { 'pagination-item-active': currentPage === 1 },
      ]"
      @click="disabled ? () => false : onPageChange(1)"
    >
      1
    </span>
    <span
      v-show="forwardMore && pageList[0] - 1 > 1"
      tabindex="0"
      ref="forward"
      class="pagintion-item-link pagination-right-gap"
      @click="disabled ? () => false : onPageForward()"
    >
      <span class="ellipsis-character">•••</span>
      <svg
        class="icon-svg"
        focusable="false"
        data-icon="double-right"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
        ></path>
      </svg>
    </span>
    <span
      tabindex="0"
      :class="[
        'pagination-item pagination-right-gap',
        { 'pagination-item-active': currentPage === page },
      ]"
      v-for="(page, index) in pageList"
      :key="index"
      @click="disabled ? () => false : onPageChange(page)"
    >
      {{ page }}
    </span>
    <span
      v-show="backwardMore && pageList[pageList.length - 1] + 1 < totalPage"
      tabindex="0"
      ref="backward"
      class="pagintion-item-link pagination-right-gap"
      @click="disabled ? () => false : onPageBackward()"
    >
      <span class="ellipsis-character">•••</span>
      <svg
        class="icon-svg"
        focusable="false"
        data-icon="double-right"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
        ></path>
      </svg>
    </span>
    <span
      v-show="totalPage !== 1"
      tabindex="0"
      :class="[
        'pagination-item pagination-right-gap',
        { 'pagination-item-active': currentPage === totalPage },
      ]"
      @click="disabled ? () => false : onPageChange(totalPage)"
    >
      {{ totalPage }}
    </span>
    <span
      tabindex="0"
      class="pagination-next"
      :class="{ 'pagination-item-disabled': currentPage === totalPage }"
      @keydown.enter.prevent="
        disabled ? () => false : onPageChange(currentPage + 1)
      "
      @click="
        disabled || currentPage === totalPage
          ? () => false
          : onPageChange(currentPage + 1)
      "
    >
      <svg
        class="arrow-svg"
        viewBox="64 64 896 896"
        data-icon="right"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"
        ></path>
      </svg>
    </span>
    <span
      class="pagination-options"
      v-if="showPageSizeChanger || showQuickJumper"
    >
      <!-- <Select
        v-if="showPageSizeChanger"
        :size="optionsSize"
        :height="selectHeight"
        :disabled="disabled"
        :options="selectOptions"
        @change="onPageSizeChange"
        v-model="currentPageSize"
      /> -->
      <el-select
        v-model="currentPageSize"
        :disabled="disabled"
        :size="optionsSize"
        :height="selectHeight"
        @change="onPageSizeChange"
        style="min-width: 92px; font-size: 14px"
        :show-arrow="false"
        :offset="5"
        popper-class="ocean-setting-drawer-select"
      >
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- <span class="pagination-jump-page" v-if="showQuickJumper">
        跳至<Input
          :width="50"
          :size="optionsSize"
          :disabled="disabled"
          v-model:value.lazy="jumpNumber"
          @change="onPageJump"
          @enter="onPageJump"
        />页
      </span> -->
    </span>
  </div>
</template>
<style lang="scss" scoped>
.m-pagination {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  .pagination-total-text {
    display: inline-block;
    height: 32px;
    line-height: 32px;
  }
  .pagination-item {
    display: inline-block;
    text-align: center;
    min-width: 32px;
    height: 32px;
    line-height: 30px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    outline: none;
    user-select: none; // 禁止选取文本
    transition: all 0.2s;
    &:hover {
      background: #f0f0f0;
      // 悬浮/选中样式
      // font-weight: 600;
      // color: var(--el-color-primary);
      // border-color: var(--el-color-primary);
    }
  }
  .pagination-prev,
  .pagination-next {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    line-height: 30px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    outline: none;
    user-select: none; // 禁止选取文本
    transition: all 0.2s;
    .arrow-svg {
      display: inline-block;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      fill: currentColor;
      transition: color 0.2s;
    }
    &:hover {
      // border-color: var(--el-color-primary);
      background: #f0f0f0;
      .arrow-svg {
        // color: var(--el-color-primary);
      }
    }
  }
  .pagination-item-active {
    // 悬浮/选中样式
    font-weight: 600;
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
  }
  .pagination-item-disabled {
    color: rgba(0, 0, 0, 0.25);
    background: #fff;
    cursor: not-allowed;
    &:hover {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      background: transparent;
      // border-color: #d9d9d9;
      .arrow-svg {
        color: rgba(0, 0, 0, 0.25);
      }
    }
    .arrow-svg {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  .pagintion-item-link {
    position: relative;
    display: inline-block;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    outline: none;
    .ellipsis-character {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      color: rgba(0, 0, 0, 0.25);
      font-family: Arial, Helvetica, sans-serif;
      line-height: 32px;
      letter-spacing: 2px;
      text-align: center;
      text-indent: 0.13em;
      opacity: 1;
      transition: all 0.2s;
    }
    .icon-svg {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      display: inline-block;
      font-size: 12px;
      color: var(--el-color-primary);
      fill: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s;
    }
    &:hover {
      .ellipsis-character {
        opacity: 0;
        pointer-events: none;
      }
      .icon-svg {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
  .pagination-options {
    display: inline-block;
    margin-left: 16px;
    .pagination-jump-page {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      margin-left: 8px;
      .m-input-wrap {
        margin: 0 8px;
      }
    }
  }
  .pagination-right-gap {
    margin-right: 8px;
  }
}
.pagination-left {
  justify-content: flex-start;
}
.pagination-center {
  justify-content: center;
}
.pagination-right {
  justify-content: flex-end;
}
.pagination-small {
  font-size: 14px;
  .pagination-total-text {
    height: 24px;
    line-height: 24px;
  }
  .pagination-item {
    min-width: 24px;
    height: 24px;
    line-height: 22px;
  }
  .pagination-prev,
  .pagination-next {
    min-width: 24px;
    height: 24px;
    line-height: 22px;
  }
  .pagintion-item-link {
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    .ellipsis-character {
      line-height: 24px;
    }
  }
  .pagination-options {
    display: inline-block;
    margin-left: 8px;
    .pagination-jump-page {
      display: inline-block;
      height: 24px;
      line-height: 24px;
    }
  }
  .pagination-right-gap {
    margin-right: 2px;
  }
}
.pagination-middle {
  font-size: 14px;
  .pagination-total-text {
    height: 28px;
    line-height: 28px;
  }
  .pagination-item {
    min-width: 28px;
    height: 28px;
    line-height: 26px;
  }
  .pagination-prev,
  .pagination-next {
    min-width: 28px;
    height: 28px;
    line-height: 26px;
  }
  .pagintion-item-link {
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    .ellipsis-character {
      line-height: 28px;
    }
  }
  .pagination-options {
    display: inline-block;
    margin-left: 12px;
    .pagination-jump-page {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      :deep(.m-input-wrap) {
        .m-input {
          padding: 2px 11px;
        }
      }
    }
  }
  .pagination-right-gap {
    margin-right: 6px;
  }
}
.pagination-disabled {
  .pagination-prev,
  .pagination-next {
    color: rgba(0, 0, 0, 0.25);
    border-color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    .arrow-svg {
      color: rgba(0, 0, 0, 0.25);
    }
    &:hover {
      border-color: rgba(0, 0, 0, 0.25);
      .arrow-svg {
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }
  .pagination-item {
    color: rgba(0, 0, 0, 0.25);
    border-color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    &:hover {
      font-weight: normal;
      color: rgba(0, 0, 0, 0.25);
      border-color: rgba(0, 0, 0, 0.25);
    }
  }
  .pagination-item-active {
    border-color: #d9d9d9;
    background-color: rgba(0, 0, 0, 0.15);
    &:hover {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.25);
      border-color: #d9d9d9;
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
  .pagintion-item-link {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    &:hover {
      .ellipsis-character {
        opacity: 1;
        pointer-events: none;
      }
      .icon-svg {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
  .pagination-options {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
}
.pagination-hidden {
  display: none;
}
</style>
