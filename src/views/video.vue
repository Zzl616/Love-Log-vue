<template>
  <div class="page-container">
    <el-upload
      class="upload-demo"
      :action="myUrl"
      multiple
      :limit="10"
      accept="video/*"
      :show-file-list="false"
      :headers="headersObj"
      :on-success="onSuccess"
      :on-error="onError"
      :on-exceed="handleExceed"
    >
      <el-button>点击上传视频</el-button>
    </el-upload>
  </div>
  <div class="video-container">
    <div v-for="(video, index) in videos" :key="index" class="video-item">
      <video ref="player" playsinline controls>
        <source
          v-for="(src, i) in video.sources"
          :key="i"
          :src="src.src"
          :type="src.type"
          :size="src.size"
        />
      </video>
    </div>
  </div>
</template>

<script>
import "plyr/dist/plyr.css";
import Plyr from "plyr";
import axios from "../util/axios";
import config from "../util/config";
import { ElMessage, ClickOutside as vClickOutside } from "element-plus";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      players: [],
      videos: [],
      myUrl: `${config.server_address}/video/savevideo`, // 更改为你的视频上传URL
      headersObj: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
  },
  mounted() {
    this.fetchData().then(() => {
      this.$refs.player.forEach((player, index) => {
        const video = this.videos[index];
        const options = {
          settings: ["captions", "quality", "speed", "loop"],
          quality: {
            default: 1080,
            options: [720, 1080],
          },
          previewThumbnails: {
            enabled: !!video.thumbnails,
            src: video.thumbnails || "",
          },
          i18n: {
            restart: "重新开始",
            rewind: "回退 {seektime} 秒",
            play: "播放",
            pause: "暂停",
            fastForward: "快进 {seektime} 秒",
            seek: "搜索",
            seekLabel: "{currentTime} / {duration}",
            played: "已播放",
            buffered: "已缓冲",
            currentTime: "当前时间",
            duration: "总时长",
            volume: "音量",
            mute: "静音",
            unmute: "取消静音",
            enableCaptions: "开启字幕",
            disableCaptions: "关闭字幕",
            download: "下载",
            enterFullscreen: "全屏",
            exitFullscreen: "退出全屏",
            frameTitle: "为 {title} 的播放器",
            captions: "字幕",
            settings: "设置",
            pip: "画中画",
            menuBack: "返回上一菜单",
            speed: "速度",
            normal: "正常",
            quality: "质量",
            loop: "循环",
            start: "开始",
            end: "结束",
            all: "全部",
            reset: "重置",
            disabled: "禁用",
            enabled: "启用",
            advertisement: "广告",
            qualityBadge: {
              2160: "4K",
              1440: "蓝光",
              1080: "高清+",
              720: "高清",
              576: "标清+",
              480: "标清",
            },
          },
        };
        this.players.push(new Plyr(player, options));
      });
    });
  },
  beforeDestroy() {
    this.players.forEach((player) => {
      if (player) {
        player.destroy();
      }
    });
  },
  methods: {
    fetchData() {
      return axios
        .post(`${config.server_address}/video/showvideo`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data: { code, msg, data } }) => {
          if (code === "200") {
            this.videos = data.map(
              ({ videoname, url720, url1080, url4k, vtturl, format }) => ({
                title: videoname,
                sources: [
                  { src: url720, type: format, size: 720 },
                  { src: url1080, type: format, size: 1080 },
                  { src: url4k, type: format, size: 2160 },
                ].filter((source) => source.src),
                thumbnails: vtturl ? vtturl.replace(/\\/g, "/") : null,
              })
            );
            console.log(this.videos);
          } else {
            console.error("请求失败：" + msg);
          }
        })
        .catch(console.error);
    },
    onSuccess() {
      ElMessage({
        message: "文件上传成功",
        type: "success",
      });
      // 刷新视频列表
      this.fetchData().then(() => {
    // 初始化新添加的视频元素的Plyr播放器
    this.$refs.player.forEach((player, index) => {
      if (index >= this.players.length) { // 只初始化新添加的视频元素
        const video = this.videos[index];
        const options = {
          settings: ["captions", "quality", "speed", "loop"],
          quality: {
            default: 1080,
            options: [720, 1080],
          },
          previewThumbnails: {
            enabled: !!video.thumbnails,
            src: video.thumbnails || "",
          },
          i18n: {
            restart: "重新开始",
            rewind: "回退 {seektime} 秒",
            play: "播放",
            pause: "暂停",
            fastForward: "快进 {seektime} 秒",
            seek: "搜索",
            seekLabel: "{currentTime} / {duration}",
            played: "已播放",
            buffered: "已缓冲",
            currentTime: "当前时间",
            duration: "总时长",
            volume: "音量",
            mute: "静音",
            unmute: "取消静音",
            enableCaptions: "开启字幕",
            disableCaptions: "关闭字幕",
            download: "下载",
            enterFullscreen: "全屏",
            exitFullscreen: "退出全屏",
            frameTitle: "为 {title} 的播放器",
            captions: "字幕",
            settings: "设置",
            pip: "画中画",
            menuBack: "返回上一菜单",
            speed: "速度",
            normal: "正常",
            quality: "质量",
            loop: "循环",
            start: "开始",
            end: "结束",
            all: "全部",
            reset: "重置",
            disabled: "禁用",
            enabled: "启用",
            advertisement: "广告",
            qualityBadge: {
              2160: "4K",
              1440: "蓝光",
              1080: "高清+",
              720: "高清",
              576: "标清+",
              480: "标清",
            },
          },
        }; // 和之前一样的options
        this.players.push(new Plyr(player, options));
      }
    }); 
  });
    },
    onError() {
      ElMessage.error("文件上传失败");
    },
    handleExceed() {
      ElMessage.warning(`只能最多同时上传 10 个视频`);
    },
  },
};
</script>

<style>
.video-container {
  display: flex;
  flex-wrap: wrap;
}
.video-item {
  flex: 0 0 calc(33.333% - 20px);
  margin: 10px;
}
:root {
  --plyr-focus-visible-color: #1ac266;
  --plyr-control-icon-size: 15px;
  --plyr-control-spacing: 2px;
}
</style>
