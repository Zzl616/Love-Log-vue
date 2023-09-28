<template>
    <el-button plain @click="openFilePicker">添加图片</el-button>
    
    <!-- 隐藏的文件输入字段，用户可以使用此字段选择文件 -->
    <input 
      type="file" 
      ref="fileInput" 
      hidden 
      @change="uploadImage">
    <!-- 创建图片画廊，为每一张图片创建一个链接 -->
    <div :id="galleryID">
      <!-- 使用 v-for 循环来生成画廊中的所有图片并分配给他们 key -->
      <a
        v-for="(image, key) in imagesData"
        :key="key"
        :href="'/Image/' + image.filename"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        target="_blank"
        rel="noreferrer"
        class="thumbnail-link"
      >
        <!-- 显示缩略图 -->
        <img
          :src="'/Image/' + image.filename"
          alt=""
          class="thumbnail"
        />
      </a>
    </div>
  </template>
  
  <script>
  import PhotoSwipeLightbox from "photoswipe/lightbox";
  import "photoswipe/style.css";
  import axios from "../util/axios";
  
  export default {
    name: "SimpleGallery",
    // 接收 props 属性：galleryID 和 images
    props: {
      galleryID: {
        type: String,
        default: "gallery",
      },
      images: {
        type: Array,
        default: () => [
          { filename: "1.jpg", width: 1000, height: 800 },
          { filename: "2.jpg", width: 1200, height: 900 },
          // ... add more images as needed
        ],
      },
    },
    setup(props) {
      // 返回图片数据，由父组件通过 props 传入 或者 预设值
      return {
        imagesData: props.images,
      };
    },
    mounted() {
      // 当组件挂载完成后，初始化 PhotoSwipe 幻灯片库
      if (!this.lightbox) {
        this.lightbox = new PhotoSwipeLightbox({
          gallery: "#" + this.$props.galleryID, // 指定画廊的元素 ID
          children: "a", // 指定画廊中的子元素
          pswpModule: () => import("photoswipe"), // 动态导入 photoswipe 属性
        });
        this.lightbox.init(); // 初始化幻灯片库
      }
    },
    unmounted() {
      // 当组件即将被销毁时，销毁 PhotoSwipe 幻灯片库
      if (this.lightbox) {
        this.lightbox.destroy();
        this.lightbox = null;
      }
    },
    methods: {
      openFilePicker () {
        // 触发隐藏的 input file 选择器的点击事件
        this.$refs.fileInput.click();
      },
  
      async uploadImage(event) {
        const file = event.target.files[0];
        if (!file) {
          return;
        }
        
        let formData = new FormData();
        formData.append("file", file);
  
        try {
          const response = await axios.post("http://localhost:8080/image/saveimage", formData, {
            headers: {            
              'Content-Type': 'multipart/form-data'
            },
          });
          console.log(response);
          /*上传成功后调用相应的处理函数如添加图片到画廊等*/
        } catch (error) {
          console.error(error);
          /*上传失败后处理错误*/
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .thumbnail-link {
    margin: 0 5px; /* Add a 5px margin on left and right side of each link (that's 10px between two adjacent images)*/
  }
  
  .thumbnail {
    max-height: 150px;
  }
  </style>
  