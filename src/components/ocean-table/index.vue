<template>
  <!-- :header-cell-style="{ background: '#F9F7F7', color: '#666' }" -->
  <div style="width: 100%; height: 100%" class="">
    <div class="table-container column" :style="{ height: height }">
      <div class="table">
        <el-table
          v-el-table-infinite-scroll="load"
          :infinite-scroll-disabled="infiniteScrollDisabled"
          :infinite-scroll-immediate="false"
          ref="multipleTable"
          v-loading="tableLoading"
          :data="tableData"
          element-loading-text="拼命加载中"
          :height="height"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(20, 60, 133, 0.8)"
          tooltip-effect="dark"
          style="width: 100%"
          :border="props.border"
          :row-class-name="rowClassName"
          :header-cell-style="{ background: '#fafafa', color: '#666' }"
          :stripe="stripe"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
          :show-summary="showSummary"
          :sum-text="sumText"
          :summary-method="summaryMethod"
          :row-key="rowKey"
          :tree-props="treeProps"
          :default-expand-all="defaultExpandAll"
        >
          <template v-if="isSelection">
            <el-table-column
              type="selection"
              :selectable="selectable"
              width="55"
              fixed
            />
          </template>
          <!-- :image="getImageSrc('empty.png')" -->
          <template #empty v-if="isEmpty">
            <el-empty description="暂无数据" />
          </template>

          <template v-for="(item, index) in column" :key="index">
            <el-table-column
              v-if="item.dataType && ['expand'].includes(item.dataType)"
              v-bind="item"
              type="expand"
              :align="item.align ? item.align : 'center'"
              show-overflow-tooltip
            >
              <template v-if="item.dataType == 'expand'" #default="scope">
                <slot :name="item.dataType" v-bind="scope"></slot>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :label="item.label"
              :prop="item.prop"
              :type="item.type"
              :width="item.width"
              :fixed="item.fixed"
              :sort-method="
                item.sortable
                  ? item.sortMethod
                    ? item.sortMethod
                    : null
                  : null
              "
              :sortable="item.sortable ? true : false"
              :filters="item.filters"
              :column-key="item.columnKey"
              :filtered-value="item.filteredValue"
              :filter-multiple="item.filterMultiple"
              :min-width="item.minWidth"
              :align="item.align ? item.align : 'center'"
              show-overflow-tooltip
            >
              <!-- align="center" -->
              <!-- <div class="123" v-if="item.type == ''"> -->

              <template
                v-if="item.hasOwnProperty('colunmTemplate')"
                :slot="item.colunmTemplate"
                #header="scope"
              >
                <slot
                  v-if="item.theadSlot"
                  :name="item.theadSlot"
                  :row="scope.column"
                  :index="index"
                />
              </template>
              <template #default="scope">
                <!-- 插槽 -->
                <div v-if="item.dataType == 'slot'" class="default-slot">
                  <slot
                    v-if="item.slot"
                    :name="item.slot"
                    :row="scope.row"
                    :index="scope.$index"
                  ></slot>
                </div>

                <!-- 进度条 -->
                <div v-else-if="item.dataType == 'progress'">
                  <el-progress :percentage="Number(scope.row[item.prop])" />
                </div>

                <!-- tag -->
                <!-- :title="scope.row[item.prop] | formatters(item.formatData)"
                            :type="formatType(scope.row[item.prop], item.formatType)" -->
                <div v-else-if="item.dataType == 'tag'">
                  <el-tag
                    class="1"
                    v-if="
                      typeof dataTypeFn(
                        scope.row[item.prop],
                        item.formatData
                      ) == 'string'
                    "
                  >
                    {{ formatters(item.formatData) | scope.row[item.prop] }}
                  </el-tag>
                  <el-tag
                    class="2"
                    v-for="(tag, index) in dataTypeFn(
                      scope.row[item.prop],
                      item.formatData
                    )"
                    v-else-if="
                      typeof dataTypeFn(
                        scope.row[item.prop],
                        item.formatData
                      ) == 'object'
                    "
                    :key="index"
                    :title="scope.row[item.prop] | formatters(item.formatData)"
                    :type="formatType(tag, item.formatType)"
                  >
                    {{
                      item.tagGroup
                        ? tag[item.tagGroup.label]
                          ? tag[item.tagGroup.label]
                          : tag
                        : tag
                    }}
                  </el-tag>
                  <el-tag
                    v-else
                    class="3"
                    :title="scope.row[item.prop] | formatters(item.formatData)"
                    :type="formatType(scope.row[item.prop], item.formatType)"
                  >
                    {{ scope.row[item.prop] | formatters(item.formatData) }}
                  </el-tag>
                </div>

                <!-- 按钮 -->
                <!-- <div v-else-if="item.dataType == 'option'">
                  <el-button
                    v-for="(o, key) in item.operation"
                    v-show="o.showHide ? o.showHide(scope.row) : true"
                    :key="key"
                    :icon="o.icon"
                    :disabled="o.disabled ? o.disabled(scope.row) : false"
                    :plain="o.plain"
                    :type="o.type"
                    :size="o.size"
                    :link="o.link"
                    :class="o.class"
                    @click="o.clickFun(scope.row)"
                  >
                    {{ o.name }}
                  </el-button>
                </div> -->
                <template v-else-if="item.dataType == 'option'">
                  <template v-for="(o, key) in item.operation" :key="key">
                    <template v-if="o.optionType === 'slot'">
                      <slot
                        :name="o.slot"
                        :row="scope.row"
                        :index="scope.$index"
                      ></slot>
                    </template>
                    <template v-else>
                      <el-button
                        v-if="o.showHide ? o.showHide(scope.row) : true"
                        :icon="o.icon"
                        :disabled="o.disabled ? o.disabled(scope.row) : false"
                        :plain="o.plain"
                        :type="o.type"
                        :size="o.size"
                        :link="o.link"
                        :class="o.class"
                        :danger="o.danger ? o.danger : false"
                        @click="o.clickFun(scope.row)"
                      >
                        {{ o.name }}
                      </el-button>
                    </template>
                  </template>
                </template>
                <!-- 默认纯展示数据 -->
                <span v-else class="defaulttxt">
                  <template class="overflow" v-if="!item.formatData">
                    <template v-if="scope.row[item.prop]"
                      >{{ scope.row[item.prop] }}{{ item.unit }}</template
                    >
                    <template v-else>{{ placeholderCharacter }}</template>
                  </template>
                  <template class="overflow" v-else>{{
                    scope.row[item.prop]
                  }}</template>
                </span>
              </template>
            </el-table-column>
          </template>

          <template #append>
            <slot name="append"></slot>
          </template>
        </el-table>
      </div>
      <Pagination
        v-if="showPagination"
        ref="paginationRef"
        class="table-pagination"
        placement="right"
        size="small"
        v-bind="{
          ...pagination,
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "mediaTable",
};
</script>
<script setup>
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
const props = defineProps({
  isSelection: {
    type: Boolean,
    default: false,
  },
  isEmpty: Boolean,
  emptyText: {
    type: String,
    default: "暂无数据",
  },
  emptySubtitle: {
    type: String,
    default: "",
  },
  height: {
    type: [Number, String],
    default: null,
  },
  tableLoading: {
    type: Boolean,
    default: false,
  },
  handleRowClick: {
    type: Function,
    default: () => {
      return () => {};
    },
  },
  handleSelectionChange: {
    type: Function,
    default: () => {
      return () => {};
    },
  },
  headerCellStyle: {
    type: Object,
    default: () => {
      return {};
    },
  },
  column: {
    type: Array,
    default() {
      return [];
    },
  },
  rowClassName: {
    type: Function,
    default: () => {},
  },
  tableData: {
    type: Array,
    default() {
      return [];
    },
  },
  border: Boolean,
  stripe: {
    type: Boolean,
    default: false,
  },
  showSummary: {
    type: Boolean,
    default: false,
  },
  sumText: {
    type: String,
    default: "合计",
  },
  summaryMethod: {
    type: Function,
    default: null,
  },
  load: {
    type: Function,
    default: () => {},
  },
  infiniteScrollDisabled: {
    type: Boolean,
  },
  selectable: {
    type: Function,
  },
  // 分页
  showPagination: {
    type: Boolean,
    default: true,
  },
  pageSizes: {
    type: Array,
    default: () => ["10", "20", "30", "40", "50"],
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    required: false,
    type: Number,
  },
  current: {
    type: Number,
    default: 1,
  },
  rowKey: {
    type: String,
    default: "id",
  },
  treeProps: {
    type: Object,
    default: () => {
      return {
        children: "children",
        hasChildren: "hasChildren",
      };
    },
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  placeholderCharacter: {
    type: String,
    default: "/",
  },
});
const emit = defineEmits(["change", "pagination"]);

let { pageSizes, total } = toRefs(props);

const paginationRef = ref(null);

const currentPage = computed({
  get() {
    return props.current;
  },
  set(val) {
    emit("update:page", val);
  },
});
const pageSize = computed({
  get() {
    return props.pageSize;
  },
  set(val) {
    emit("update:pageSize", val);
  },
});

// 分页配置对象
const pagination = computed(() => {
  return {
    page: currentPage.value,
    pageSize: pageSize.value,
    total: total.value,
    showSizeChanger: true,
    pageSizeOptions: pageSizes.value,
    showTotal: (total) => `共 ${total} 条`,
    onChange: (current, pageSize) => pageChange(current, pageSize), //点击页码事件
    onPageSizeChange: (current, pageSize) => sizeChange(current, pageSize), // 改变每页数量时更新显示
  };
});

const filtersIcon = (val, row) => {
  if (typeof val === "function") {
    return val(row);
  } else return val;
};
const filtersType = (val, row) => {
  if (typeof val === "function") {
    return val(row);
  } else return val;
};
const formatters = (val, format) => {
  if (typeof format === "function") {
    return format(val);
  } else return val;
};
const dataTypeFn = (val, format) => {
  if (typeof format === "function") {
    console.log(format(val), "返回");
    return format(val);
  } else return val;
};
const formatType = (val, format) => {
  if (typeof format === "function") {
    return format(val);
  } else return "";
};

// 动态导入图片
const getImageSrc = (filename) => {
  return new URL(`../../assets/images/base-image/${filename}`, import.meta.url);
};

// 改变分页数量
const sizeChange = (newCurrent, newPageSize) => {
  // console.log(newCurrent, newPageSize, "改变分页数量");
  emit("pagination", newCurrent, newPageSize);
};
// 切换页码
const pageChange = (current, pageSize) => {
  // console.log(current, pageSize, "切换页码");
  emit("pagination", current, pageSize);
};
</script>
<style scoped lang="scss">
.table {
  flex: 1;
  height: 0;
}
// 修改划过颜色
.el-table {
  // --el-table-row-hover-bg-color: rgba(249, 247, 247);
  --el-table-row-hover-bg-color: rgba(250, 250, 250);
}

.defaulttxt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // color: #262626;
  font-weight: 400;
  line-height: 26px;
  // display: inline-flex;
}

.default-slot {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 26px;
}

.table-pagination {
  margin: 16px 0;
  flex-shrink: 0;
}

:deep(.el-select--small) {
  .el-select__wrapper {
    min-height: 26px;
  }
}
</style>
