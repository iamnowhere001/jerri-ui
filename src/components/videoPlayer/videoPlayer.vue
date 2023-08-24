<!--
/**************************************************************************** 
所属系统: 组件库
所属模块: 视频播放器
创建时间: 2020-01-02
维护人: 杨文杰
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div
    class="player-box"
    :class="{ 'lang-en': isEnLang }"
    ref="videoBox"
    :style="{ width: `${boxWidth}px`, height: `${boxHeight}px` }"
  >
    <!-- 视频播放器主体 -->
    <div ref="player" class="player"></div>

    <!-- 关闭按钮 -->
    <div class="player-close" v-show="isClose">
      <span @click="closeEvent">
        <i class="icon-close-picbig"></i>
      </span>
    </div>

    <!-- 转码中的上传提示 -->
    <div class="err-box" v-show="!isNext">
      <p
        v-show="!isNext && !isShowLoad && !isNoPlay"
        @click="createdPlayer('mp4')"
      >
        <span>{{ $t("videoPlayer_视频转码中") }}</span>
        <a>{{ $t("videoPlayer_尝试播放") }}</a>
      </p>

      <p v-show="isNoPlay">
        <span>{{ $t("videoPlayer_视频无法播放，请联系【系统管理员】") }}</span>
      </p>

      <jr-loading-petal :visible="isShowLoad"></jr-loading-petal>
    </div>
  </div>
</template>
<script>
// 事件的mixin
import eventMixin from "./mixin/event.js";

export default {
  name: "JrVideoPlayer",
  mixins: [eventMixin],
  props: {
    //  字幕列表
    subtitleList: {
      default: () => [],
      type: Array,
    },
    // 容器宽度
    boxWidth: {
      default: 640,
      type: Number,
    },
    // 容器高度
    boxHeight: {
      default: 360,
      type: Number,
    },
    // 视频地址
    videoUrl: {
      default: "",
      type: String,
    },
    // 是否关闭
    isClose: {
      default: false,
      type: Boolean,
    },
    // 已经播放的时长
    playTime: {
      default: 0,
      type: Number,
    },
    // 是否可以快进
    isChange: {
      default: true,
      type: Boolean,
    },
    // 是否可以快进
    autoPlay: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      // 处理过后的字幕列表
      subList: [],
      // 播放器主体
      player: null,
      // 是否正在拖拽音量进度
      isDraggingVoiceProgress: false,
      // 当前播放时间
      currentTime: 0,
      // 是否快进
      isSeeking: true,
      // 是否学习完毕
      isOver: false,
      // 是否能进行播放（可能地址在转码中）
      isNext: true,
      // 显示加载中动画
      isShowLoad: true,
      // 是否没有权限播放
      isNoPlay: false,
      // 语言
      isEnLang: localStorage.lang === "en",
    };
  },
  watch: {
    // 初始化播放器
    videoUrl(newAddr, oldAddr) {
      // 初始化播放器
      this.createdPlayer("mp4");
    },
    // 监听字幕修改
    subtitleList: {
      handler(data) {
        const FORMAT_TIME = (time) => {
          let list = time.split(":");
          return +list[0] * 60 + +list[1];
        };
        this.subList = this.$utils.deepCopy(data);
        this.subList.forEach((el) => {
          el.startTime = FORMAT_TIME(el.startTime);
          el.endTime = FORMAT_TIME(el.endTime);
        });
      },
      immediate: true,
    },
  },
  mounted() {
    // 初始化播放器
    this.createdPlayer("mp4");
  },
  methods: {
    /**
     * @desc 视频暂停
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    pause() {
      this.player.pause();
    },
    /**
     * @desc 封装获取classDom节点方法
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    getDom(className) {
      return (
        this.$refs.videoBox &&
        this.$refs.videoBox.querySelector(`.${className}`)
      );
    },
    /**
     * @desc 测试视频地址是否能进行播放
     * @author 陈泽光
     * @date 2019年10月30日16:18:50
     */
    urlTest() {
      this.isNext = false;
      this.isShowLoad = true;
      this.isNoPlay = false;

      return new Promise((resolve) => {
        setTimeout(() => {
          let xhr = new XMLHttpRequest();
          let xhrHandler = () => {
            xhr.removeEventListener("readystatechange", xhrHandler);
            this.isShowLoad = false;
            if (xhr.status === 200) {
              this.isNext = true;
            } else if (xhr.status === 403) {
              this.isNoPlay = true;
            } else {
              this.isNext = false;
            }
            xhr.abort();
            resolve();
          };
          xhr.open("GET", this.videoUrl);
          xhr.addEventListener("readystatechange", xhrHandler);
          xhr.send();
        }, 1000);
      });
    },
    /**
     * @desc 初始化播放器
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    async createdPlayer(type) {
      if (!window["DPlayer"]) {
        this.$utils.getSource(
          "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/videoPlayer/vue-dplayer.css",
          true
        );
        await Promise.all([
          this.$utils.getSource(
            "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/videoPlayer/DPlayer.min.js",
            true
          ),
          this.$utils.getSource(
            "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/videoPlayer/flv.min.js",
            true
          ),
        ]);
      }
      if (this.videoUrl) {
        await this.urlTest();
        if (this.isNext) {
          let url = this.videoUrl;
          if (
            !url.includes(".mp4") &&
            !url.includes(".mov") &&
            !url.includes(".flv")
          ) {
            url = "";
          }
          this.player = new DPlayer({
            container: this.$refs.player,
            theme: "#54ff00",
            volume: 0.7,
            autoplay: this.autoPlay,
            lang: this.isEnLang ? "en" : "zh-cn",
            video: {
              url,
              type,
            },
          });
          // 如果有传指定的播放时间就跳到指定播放时间;
          if (this.playTime && this.isSeeking) {
            this.currentTime = this.playTime;
            this.player.seek(this.playTime);
          }

          // 如果传的时间为0 且是不可快进的情况
          if (!this.playTime && !this.isChange) {
            this.isSeeking = false;
          }

          // 添加字幕节点
          this.addSubtitle();
          // 绑定事件监听
          this.eventOn();
          // 自定义音量事件
          this.voiceEvent();
          // 视频进度条拖拽事件，为了加载对应的字幕
          this.progressEvent();
          // 全屏事件监听
          this.fullPageEvent();
        }
      }
    },
    /**
     * @desc 插入字幕节点
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    addSubtitle() {
      // 插入字幕节点
      let node = document.createElement("div");
      node.className = "subtitle";
      this.$refs.player.appendChild(node);
    },
    /**
     * @desc 拖拽播放音量进度条圆点中
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    draggingVoicePoint() {
      let conDom = this.getDom("voice-container");
      let progressDom = this.getDom("voice-progress");

      const y = event.clientY - conDom.getBoundingClientRect()["y"];
      //  超出顶部
      if (y < 0) {
        //  设置音量进度条圆点位置
        this.setVoicePointPosition(0, 1);
        //  设置音量进度条为最大

        progressDom.style.height = conDom.clientHeight;
      }

      //  超出底部
      else if (y > conDom.clientHeight) {
        //  设置播放进度圆点位置

        this.setVoicePointPosition(conDom.clientHeight, 0);

        //  设置进度条
        progressDom.style.height = 0;
      }

      //  两边均没有超出
      else {
        this.setVoicePointPosition(y);

        //  设置进度条
        progressDom.style.height = conDom.clientHeight - y + "px";
      }
    },
    /**
     * @desc 停止拖拽音量进度条圆点
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    stopDragVoicePoint() {
      //  停止拖拽音量进度
      this.isDraggingVoiceProgress = false;
      //  放开阻止文本选中
      document.onselectstart = null;
      document.onmousemove = null;
      document.onmouseup = null;
    },
    /**
     * @desc 设置音量进度圆点位置
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    setVoicePointPosition(y, isEdge) {
      if (isEdge >= 0) {
        this.player.volume(isEdge);
        return;
      }
      // 添加边界判断
      y > 85 && (y = 85);
      y < 0 && (y = 0);
      this.getDom("voice-progress-point").style.top = y + "px";
    },
    /**
     * @desc 点击设置音量大小
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    jumpVoiceProgress(event) {
      let conDom = this.getDom("voice-container");
      let progressDom = this.getDom("voice-progress");
      const y = event.clientY - conDom.getBoundingClientRect()["y"];
      this.setVoicePointPosition(y);
      const height = conDom.clientHeight - y;

      //  设置进度条
      progressDom.style.height = height + "px";
      this.player.volume(height / conDom.clientHeight, true, false);
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "videoPlayer.scss";
.lang-en [data-balloon][data-balloon-pos="up"]:hover:after {
  transform: translate(-68%);
}
</style>

<style scoped lang="scss">
.player-close {
  z-index: 1;
  position: absolute;
  right: 0px;
  top: 0px;
  span {
    width: 25px;
    height: 25px;
    background-color: rgba($--color-c1, 0.7);
    display: inline-block;
    cursor: pointer;
    &:hover {
      background-color: $--color-c11;
    }
  }
  i {
    color: $--color-c6;
    font-size: 24px;
    margin-top: 1px;
    display: inline-block;
  }
}
</style>
