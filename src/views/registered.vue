<!--
 * @Copyright: 
 * @file name: File name
 * @Data: Do not edit
 * @LastEditor: 
 * @LastData: 
 * @Describe: 
-->
<template>
  <div id="app">
    <form @submit.prevent="register" class="register-form">
      <h1 class="title">注册新用户</h1>

      <div class="input-box">
        <el-input
          type="text"
          v-model="username"
          placeholder="用户名"
          :minlength="4"
          :maxlength="20"
          clearable
        />
      </div>

      <div class="input-box">
        <el-input
          type="email"
          v-model="email"
          placeholder="电子邮箱"
          clearable
        />
      </div>

      <div class="input-box">
        <el-input
          type="password"
          v-model="password"
          placeholder="密码"
          show-password
          :minlength="6"
          :maxlength="20"
          clearable
        />
      </div>

      <div class="input-box">
        <label for="sex">性别:</label>
        <el-select placeholder="请选择" id="sex" v-model="sex" clearable>
          <el-option value="男" />
          <el-option value="女" />
        </el-select>
      </div>

      <div class="input-box">
        <label for="birthdate">出生日期:</label>
        <el-input
          id="birthdate"
          type="date"
          v-model="birthdate"
          max="2100-12-31"
          min="1900-01-01"
        />
      </div>

      <el-button
        :disabled="!isValid"
        native-type="submit"
        class="register-btn"
        color="#3c6382"
        round
      >
        注册
      </el-button>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const router = useRouter();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const sex = ref("");
    const birthdate = ref("2000-01-01");

    const isValid = computed(() => {
      return username.value && email.value && password.value && sex.value;
    });

    const register = async () => {
      if (isValid.value) {
        try {
          const response = await axios.post(
            "http://localhost:8080/user/register",
            {
              name: username.value,
              email: email.value,
              password: password.value,
              sex: sex.value,
              birthdate: birthdate.value,
            },
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          if (response.data.code === "200") {
            ElMessage({
              message: "注册成功",
              type: "success",
            });
            router.push("/");
          } else {
            ElMessage.error("登录失败:"+response.data.msg);
          }
        } catch (error) {
          console.error(error);
          ElMessage.error("提交表单出现错误");
        }
      }
    };

    onMounted(() => {
      document.title = "注册界面";
    });

    return { username, email, password, sex, birthdate, isValid, register };
  },
};
</script>
<style>
body {
  background-color: #f0f0f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.register-form {
  background-color: white;
  padding: 50px;
  box-shadow: 0px 10px 10px 0px rgba(10, 10, 10, 0.1);
  border-radius: 5px;
  animation: arrive 2000ms ease-out;
}

.input-box {
  display: block;
  width: 200px;
  margin-bottom: 20px;
}

.input-box input {
  width: 100%;
}

.title {
  margin-bottom: 40px;
}

.register-btn {
  cursor: pointer;
  background-color: #3c6382;
  color: white;
  border: none;
  padding: 5px;
  width: 100%;
  transition: background-color 250ms;
}

.register-btn:disabled {
  background-color: #a6b1e1;
}

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
