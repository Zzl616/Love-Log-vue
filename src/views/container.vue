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
      <el-header
        >lovelog照片
        <el-dropdown class="settings-container" @command="handleCommand">
          <span class="el-dropdown-link">
            设置
            <el-icon><ArrowDownBold /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <h5 class="mb-2">LoveLog图片库</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>相册</span>
              </template>
              <el-menu-item-group title="lovelog">
                <el-menu-item index="1-1" @click="changeComponent('my-test')"
                  >恋爱日志</el-menu-item
                >
                <el-menu-item index="1-2">照片墙</el-menu-item>
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
import myTest from "./test.vue"; // Import sub-component
import imageList from "./imagelist.vue";
import Cookies from "js-cookie";

export default {
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
        Cookies.remove('token');
        // 然后路由跳转到 '/'
        this.$router.push("/");
      }
    },
  },
  components: {
    "my-test": myTest,
    "image-list": imageList,
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>

<style scoped>
.el-header {
  background-color: #b3c0d1;
}
.el-aside {
  padding-left: 10px;
  margin-left: 10px;
  background-color: #d3dce6;
}
.el-main {
  background-color: #e5e9f2;
}
.el-footer {
  background-color: #b3c0d1;
}
.settings-container {
  float: right;
}

.el-dropdown-link {
  width: 80px; /* 设置宽度为50px */
  height: 30px; /* 设置高度为20px */
  border: 5px solid transparent;
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}
</style>
