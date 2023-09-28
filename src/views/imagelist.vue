<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:8080/image/saveimage"
      multiple
      :limit="10"
      accept="image/*"
      :show-file-list="false"
      :headers="headersObj"
      :on-success="onSuccess"
      :on-error="onError"
    >
      <el-button>点击上传</el-button>
    </el-upload>
  </div>
  <div class="waterfall-width-column">
    <div class="image-box" v-for="url in urls" :key="url">
      <el-image
        :src="'../Image/' + url"
        :zoom-rate="1.2"
        :preview-src-list="['../Image/' + url]"
        fit="cover"
        lazy
      />
    </div>
  </div>
</template>

<script lang="js" setup>
import Cookies from "js-cookie";
import { ElMessage } from 'element-plus'
import axios from "../util/axios"
import { ref } from 'vue'
const headersObj = {
  "Authorization": `Bearer ${Cookies.get("token")}`,    // JWT认证，携带token Bearer后面需要有一个空格
}
const urls = ref([])
// const urls = [
//   '../Image/1.jpg',
//   '../Image/2.jpg',
//   '../Image/3.jpg',
//   '../Image/4.jpg',
// ]
const onSuccess = () => {
  ElMessage({
    message: '文件上传成功',
    type: 'success',
  })
}
const onError = () => {
  ElMessage.error("文件上传失败")
}
const uploadImages = async () => {
  const response = await axios.post('http://localhost:8080/image/showimage',{
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          })

  let filesString = response.data.data;
  
  if (typeof(filesString) === 'string' && filesString.startsWith('[') && filesString.endsWith(']')) {
      let filesArray = filesString.slice(1, -1).split(',').map(file => file.trim());
      urls.value = filesArray; 
  }

  console.log(urls.value);
}

uploadImages()
</script>

<style scoped>
.waterfall-width-column {
  column-gap: 15px;
  .image-box {
    margin-bottom: 15px;
    el-image {
      display: block;
      width: 100%;
    }
  }
}
@media (min-width: 0px) {
  .waterfall-width-column {
    column-count: 1;
  }
}
@media (min-width: 350px) {
  .waterfall-width-column {
    column-count: 2;
  }
}
@media (min-width: 700px) {
  .waterfall-width-column {
    column-count: 3;
  }
}
@media (min-width: 1050px) {
  .waterfall-width-column {
    column-count: 4;
  }
}
@media (min-width: 1400px) {
  .waterfall-width-column {
    column-count: 5;
  }
}
</style>
