<!--
 * @Copyright: 
 * @file name: File name
 * @Data: Do not edit
 * @LastEditor: 
 * @LastData: 
 * @Describe: 
-->
<template>
  <div class="common-layout">
    <el-container style="height: 100vh; width: 100vw">
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
          background-color="#b3c0d1"
        >
          <el-menu-item index="0" style="height: 60px"
            ><el-image
              :src="'../Image/icon/iconaixin.jpg'"
              style="width: 60px; height: 60px"
          /></el-menu-item>
          <div class="flex-grow" />
          <el-sub-menu index="1" style="height: 60px">
            <template #title>设置</template>
            <el-menu-item index="2-1" @click="handleCommand('logout')"
              >退出登录</el-menu-item
            >
            <el-menu-item index="2-1">其他</el-menu-item>
          </el-sub-menu>
        </el-menu>
        <div class="h-6" />
      </el-header>
      <el-container>
        <el-aside
          class="aside-container"
          :style="{ width: isCollapse ? '200px' : '0px' }"
        >
          <h5 class="mb-2">LoveLog图片库</h5>
          <el-button
            class="zoom"
            :style="{ left: isCollapse ? '160px' : '0px' }"
            @click="toggleCollapse"
            circle
            ><el-icon v-if="isCollapse">
              <ArrowLeftBold />
            </el-icon>
            <el-icon v-else>
              <ArrowRightBold />
            </el-icon>
          </el-button>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="!isCollapse"
            background-color="##d3dce6"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>相册</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="changeComponent('my-test')"
                  >恋爱日志</el-menu-item
                >
                <el-menu-item index="1-2" @click="changeComponent('image-list')"
                  >照片墙</el-menu-item
                >
                <el-menu-item index="1-3" @click="changeComponent('events')"
                  >事件时间</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <component :is="currentComponent"></component>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myTest from "./test1.vue"; // Import sub-component
import imageList from "./imagelist.vue";
import events from "./events.vue";
import Cookies from "js-cookie";
import { ref } from "vue";

export default {
  setup() {
    const isCollapse = ref(true);
    function toggleCollapse() {
      isCollapse.value = !isCollapse.value;
    }

    return {
      isCollapse, // 这样就可以在模板中使用 isCollapse
      toggleCollapse,
    };
  },
  data() {
    return {
      currentComponent: "image-list",
    };
  },
  methods: {
    changeComponent(componentName) {
      this.currentComponent = componentName;
    },
    handleCommand(command) {
      if (command === "logout") {
        // 执行退出登录的操作（如果有），如清理缓存等
        Cookies.remove("token");
        // 然后路由跳转到 '/'
        this.$router.push("/");
      }
    },
  },

  components: {
    "my-test": myTest,
    "image-list": imageList,
    events: events,
  },
};
</script>

<style scoped>
/* flex-grow属性定义了一个元素在其父容器中剩余空间的占用比例。这里设置为1，意味着该元素会尽可能地填充剩余空间 */
.flex-grow {
  flex-grow: 1;
  height: 60px;
}

/* zoom类定义了一个固定位置的元素，距离顶部70px，z-index为1000，确保它位于其他元素之上 */
.zoom {
  position: fixed;
  top: 70px;
  z-index: 1000;
}

/* el-header类定义了头部区域的背景颜色和底部边框颜色 */
.el-header {
  background-color: #b3c0d1;
  height: 60px;
  /* border-bottom: 1px solid #c9c6c6; */
}

/* el-aside类定义了侧边栏的过渡效果、内左边距、外左边距和背景颜色 */
.el-aside {
  transition: width 0.33s;

  background-color: #d3dce6;
}

/* el-main类定义了主内容区域的背景颜色 */
.el-main {
  background-color: #e5e9f2;
}

/* el-footer类定义了页脚的背景颜色 */
.el-footer {
  background-color: #b3c0d1;
}

/* settings-container类使元素浮动到右边 */
/* .settings-container {
  float: right;
}  */

/* el-dropdown-link类定义了下拉链接的宽度、高度、边框、布局方式（flex）、垂直对齐方式和水平对齐方式 */
/* .el-dropdown-link {
  width: 80px;
  height: 30px;
  border: 5px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
} */

/* el-menu-demo类定义了菜单的背景颜色 */
.el-menu-demo {
  height: 100%;
}
</style>
