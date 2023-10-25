<template>
  <div class="page-container">
    <el-upload
      class="upload-demo"
      :action="myUrl"
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
        :ref="
          (el) => {
            if (el) imageBoxRefs[url] = el;
          }
        "
        :src="'../Image/' + url"
        :zoom-rate="1.2"
        :preview-src-list="['../Image/' + url]"
        fit="cover"
        lazy
        @contextmenu="(event) => onRightClick(event, url)"
        v-click-outside="onClickOutside"
      />
      <el-popover
        :virtual-ref="() => imageBoxRefs[url]"
        trigger="contextmenu"
        title="图片操作"
        virtual-triggering
        :visible="popovershow[url]"
      >
        <el-button size="small" type="primary" @click="deleteimage"
          >删除</el-button
        >
      </el-popover>
    </div>
  </div>
</template>

<script lang="js" setup>
import Cookies from "js-cookie";
import { ElMessage,ClickOutside as vClickOutside } from 'element-plus'
import axios from "../util/axios"
import { ref, reactive } from 'vue'
import config from '../util/config';
import router from "../router";
const imageBoxRefs = reactive({})
const popovershow = reactive({})

let myUrl = `${config.server_address}/image/saveimage`;
const headersObj = {
  "Authorization": `Bearer ${Cookies.get("token")}`,    // JWT认证，携带token Bearer后面需要有一个空格
}
const urls = ref([])
let variableName = 'value';
const onRightClick = (event, url) => {
  event.preventDefault();
  variableName=url;
  console.log(variableName);
  console.log(popovershow[url]);
  for (const key in popovershow) {
    if (popovershow.hasOwnProperty(key)) {
      popovershow[key] = false; // 不论何时使得其他弹框都变为未显示
    }
  }
  popovershow[url] = true;

}
const onClickOutside = () => {
  for (const key in popovershow) {
    if (popovershow.hasOwnProperty(key)) {
      popovershow[key] = false; // 不论何时使得其他弹框都变为未显示
    }
  }
}
const deleteimage = async () => {
  const response = await axios.post(`${config.server_address}/image/deleteImage`,{
              filenewname: variableName,
            },
            { headers: { "Content-Type": "multipart/form-data" }})

  if(response.data.code==="200"){
    ElMessage({
    message: '文件删除成功',
    type: 'success',
    },
    uploadImages()
    // router.go(0)
  )
  }else{
    ElMessage.error("文件删除失败");
  }


  console.log(variableName);
}

const onSuccess = () => {
  ElMessage({
    message: '文件上传成功',
    type: 'success',
  },
  uploadImages()
  // router.go(0)
  )
}
const onError = () => {
  ElMessage.error("文件上传失败")
}
const uploadImages = async () => {
  const response = await axios.post(`${config.server_address}/image/showimage`, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })

  let filesString = response.data.data;

  if (typeof (filesString) === 'string' && filesString.startsWith('[') && filesString.endsWith(']')) {
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
  padding-top: 20px;

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
