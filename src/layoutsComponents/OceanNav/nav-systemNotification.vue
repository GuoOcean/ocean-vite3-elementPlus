<template>
  <el-dropdown placement="bottom-end" trigger="click">
    <span class="noticeButton nav-info notice">
      <svg-icon icon="BellOutlined" class="icon anticon"></svg-icon>
      <span class="notice-count">
        <span>6</span>
      </span>
    </span>
    <template #dropdown> 12345654321 </template>
  </el-dropdown>
</template>

<script setup lang="ts">
const noticeListRef = ref(null);
const loading = ref(false);
const tabActiveKey = ref("1");

// 分页数据参数对象
const queryParamsNum = ref({
  pageNum: 1,
  pageSize: 10,
});
const tabsList = ref([
  {
    key: "1",
    title: "新消息",
    dataSourceList: [
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
      {
        title: "审核",
        description: "8月04日",
      },
    ],
  },
  {
    key: "2",
    title: "系统消息",
    dataSourceList: [],
  },
  {
    key: "3",
    title: "代办任务",
    dataSourceList: [],
  },
  {
    key: "4",
    title: "公告",
    dataSourceList: [],
  },
]);

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target!.scrollTop + target.clientHeight >= target.scrollHeight) {
    console.log("触底了");
    // loadMore()
  }
};

const loadMore = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    tabsList.value[0].dataSourceList.push({
      title: "审核1111",
      description: "8月04日",
    });
  }, 2000);
};

onMounted(() => {});
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
.icon {
  // padding: 4px;
  // vertical-align: middle;
  font-size: 18px;
}
.noticeTabs {
  border-radius: 12px;
}
.noticeList {
  max-height: 300px;
  overflow: hidden auto;
  .noticeItem:last-child {
    border: none !important;
  }
  .notice-img {
    padding: 4px;
    width: 36px;
    height: 36px;
  }
}

.bottomBar {
  height: 46px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 46px;
  text-align: center;
  border-top: 1px solid rgba(5, 5, 5, 0.06);
  border-radius: 0 0 6px 6px;
  transition: all 0.3s;
  cursor: pointer;
}

.notFound {
  text-align: center;

  img {
    width: 76px;
    height: 76px;
    margin-bottom: 16px;
    display: inline-block;
  }

  div {
    color: #606266;
  }
}

.notice {
  position: relative;
  display: inline-block;
  .notice-count {
    display: inline-block;
    position: absolute;
    background: #fe574a;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    z-index: 1;
    font-weight: 400;
    padding: 0 4px;
    font-size: 12px;
    min-width: 16px;
    line-height: 16px;
    border-radius: 12px;
    height: 16px;
    // top: 2px;
    left: 22px;
    right: auto;
    top: 4px;
    // right: 4px;

    span {
      display: inline-block;
    }
  }
}
</style>

<style>
/* .noticeTabs .ant-dropdown-menu-nav {
  padding: 0 40px;
} */
</style>
