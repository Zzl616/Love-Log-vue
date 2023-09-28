<template>
  <div class="login">
    <el-form @submit.prevent="login" class="login-form">
      <h1 class="title">LoveLog</h1>

      <div class="input-box">
        <el-input
          type="text"
          v-model="username"
          placeholder="用户名"
          clearable
          :minlength="4"
          :maxlength="20"
        />
      </div>

      <div class="input-box">
        <el-input
          type="password"
          v-model="password"
          placeholder="密码"
          clearable
          show-password
          :minlength="6"
          :maxlength="20"
        />
      </div>
      <div>
        <el-button
          color="#3c6382"
          :disabled="!isValid"
          native-type="submit"
          class="login-btn"
          round
          >登录</el-button
        >
      </div>

      <div>
        <el-button
          @click="register"
          class="registered-btn"
          round
          color="#3c6382"
          >注册</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "../util/axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const username = ref("");
    const password = ref("");

    const router = useRouter();

    const isValid = computed(() => {
      return username.value && password.value;
    });

    const login = async () => {
      if (isValid.value) {
        try {
          const response = await axios.post(
            "http://localhost:8080/user/login",
            {
              name: username.value,
              password: password.value,
            },
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          // 打印响应头以捕获 authorization 字段
          // console.log(response.headers);

          // 从 http 响应头中获取 token。
          let token = response.headers["authorization"];
          if (token && token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
          }

          // 打印切割后的 token
          // console.log(token);

          // 将 token 存储在 cookie 中。
          Cookies.set("token", token);

          // 检查 token 是否已存储在 cookie 中
          // checkTokenInCookie();

          // 如果我们成功得到了一个令牌，表示登录成功。
          if (response.data.code === "200") {
            ElMessage({
              message: "登录成功",
              type: "success",
            });
            router.push("/container");
          } else {
            ElMessage.error("登录失败");
          }
        } catch (error) {
          console.error(error);
          ElMessage.error("提交表单出现错误");
        }
      }
    };

    const register = () => {
      router.push("/registered");
    };


    onMounted(() => {
      if (Cookies.get("token")) {
        
        router.push("/container");
      }
      document.title = "登录界面";
    });

    return { username, password, isValid, login, register };
  },
};
</script>

<style>
body {
  display: flex;
  justify-content: center; /* 水平方向居中 */
  align-items: center; /* 垂直方向居中 */
  height: 100vh; /* 视口高度的100% */
  margin: 0;
  padding: 0;
  background-color: #f0f0f5;
}

.login-form {
  background-color: white;
  padding: 50px;
  box-shadow: 0px 10px 10px 0px rgba(10, 10, 10, 0.1);
  border-radius: 5px;
  animation: arrive 2000ms ease-out;
}

.login-btn {
  cursor: pointer;
  border: none;
  padding: 5px;
  width: 100%;
  transition: background-color 250ms;
  margin-bottom: 10px;
  display: block;
}

.registered-btn {
  cursor: pointer;
  border: none;
  padding: 5px;
  width: 100%;
  transition: background-color 250ms;
  margin-bottom: 10px;
  display: block;
}

/* Add some animations */
@keyframes arrive {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
