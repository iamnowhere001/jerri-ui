/****************************************************************************

所属系统: 组件库
所属模块: 录音组件
创建时间: 2020年5月13日 14:21:06
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="jr-record-wrap">
    <div class="jr-record"
         :class="{'jr-record-end': duration}"
         @click="record">
      <i :class="[duration ?
                audioPaused ? 'pause' : 'play'
                : state === 'inactive' ?
                'inactive' : 'recording']"></i>
      <span class="stae-desc">{{describe}}</span>
    </div>
    <span v-if="!url && duration"
          class="remove"
          @click="removeRecord">删除</span>
    <audio :src="audioURL"
           hidden
           ref="audio"
           @ended="audioPaused = true"></audio>

    <!-- 上传组件 -->
    <jr-upload accept="mp3"
               v-bind="$attrs"
               @upload-err="uploadErr"
               @file-result="getResult"
               ref="jrInput" />
  </div>
</template>

<script>
// 录音未开始或者结束的状态
const INACTIVE_STATE = "inactive",
  // 录制中状态
  RECORDING_STATE = "recording",
  // 1分钟60秒
  MINUTE = 60;
export default {
  name: "JrRecord",
  inheritAttrs: false,
  components: {},
  mixins: [],
  props: {
    // 最大录音时长 单位:秒
    max: {
      type: Number,
      default: MINUTE
    },
    // 录音地址
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 录音实例
      Recorder: null,
      // 默认状态未开始
      state: INACTIVE_STATE,
      // 录音时长
      duration: 0,
      // blob对象
      blob: null,
      // audio播放地址
      audioURL: "",
      // 定时器id
      timeId: null,
      // 语言是否暂停播放
      audioPaused: true
    };
  },
  beforeDestroy() {
    this.recordEnd();
  },
  computed: {
    /**
     * @desc 根据录音状态显示文字
     * @return {String} 描述文字
     * @author 陈宇奇
     * @date 2020年5月14日 10:26:35
     */
    describe() {
      // 为开始或结束
      if (this.state === INACTIVE_STATE) {
        // 是否有录音时长
        return this.duration
          ? // 判断时长是否超过一分钟
            this.duration > MINUTE
            ? // 超过一分钟转换成分钟/秒
              `${Math.floor(this.duration / MINUTE)}分${this.duration %
                MINUTE}秒`
            : // 没超过展示秒
              `${this.duration}秒`
          : "点击录制语音评语";
      } else {
        // 录制中
        return "正在录制，点击后停止";
      }
    }
  },
  watch: {
    /**
     * @desc 监听录音地址
     * @param {String} url 后台录音地址
     * @author 陈宇奇
     * @date 2020年5月26日 10:58:41
     */
    url(url) {
      // 录音地址赋值
      this.audioURL = url;
      this.getDuration();
    }
  },
  methods: {
    /**
     * @desc 初始录音
     * @author 陈宇奇
     * @date 2020年5月13日 15:04:09
     */
    async init() {
      if (!window["Recorder"]) {
        await this.$utils.getSource(
          "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/recorder/recorder.mp3.min.js",
          true
        );
      }
      return new Promise((resolve, reject) => {
        this.Recorder = Recorder({
          type: "mp3",
          sampleRate: 16000,
          bitRate: 16 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
        });
        this.Recorder.open(
          () => {
            //打开麦克风授权获得相关资源 授权成功
            resolve();
          },
          (msg, isUserNotAllow) => {
            //用户拒绝未授权或不支持
            this.$messageBox({ tip: "麦克风授权失败" });
            // 结束录音
            this.recordEnd();
            reject();
          }
        );
      });
    },
    /**
     * @desc 点击录音
     * @author 陈宇奇
     * @date 2020年5月13日 17:52:20
     */
    async record() {
      // 没音频地址和录音实例初始化录音
      if (!this.url && !this.Recorder) {
        await this.init();
      }
      // 有录音时长播放或者暂停录音  否则录音或者停止录音
      this.duration ? this.playOrPause() : this.changeState();
    },
    /**
     * @desc 修改录音状态
     * @author 陈宇奇
     * @date 2020年5月13日 16:18:39
     */
    changeState() {
      this.state === INACTIVE_STATE
        ? // 开始录音
          this.recordStart()
        : // 停止录音
          this.recordStop();
    },
    /**
     * @desc 录音开始回调
     * @author 陈宇奇
     * @date 2020年5月14日 09:29:39
     */
    recordStart() {
      this.Recorder.start();
      // 删除录音
      this.removeRecord();
      // 修改录音中状态
      this.state = RECORDING_STATE;
      // 防止出现多个定时器 每次开始录音需要删除上一个定时器
      this.removeTimeout();
      // 判断录音时间是否超时
      this.timeId = setTimeout(() => {
        this.$messageBox({ tip: "超过最长录音时间" });
        // 超时直接停止录音
        this.recordStop();
      }, this.max * 1000);
    },
    /**
     * @desc 停止录音
     * @author 陈宇奇
     * @date 2020年5月27日 12:41:04
     */
    recordStop() {
      this.Recorder.stop(this.saveRecordingData, msg => {
        // 录音失败回调

        this.recordEnd();
      });
    },
    /**
     * @desc 结束录音
     * @author 陈宇奇
     * @date 2020年5月27日 12:41:40
     */
    recordEnd() {
      // 修改录音状态为结束
      this.state = INACTIVE_STATE;
      // 结束录音删除定时器
      this.removeTimeout();
      //释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
      this.Recorder.close();
      this.Recorder = null;
    },
    /**
     * @desc 保存录音信息
     * @param {Object} blob blob对象
     * @param {Number} duration 录音时长
     * @author 陈宇奇
     * @date 2020年5月27日 11:59:13
     */
    saveRecordingData(blob, duration) {
      this.recordEnd();
      this.blob = blob;
      // 录音时长最少一秒
      if (duration <= 1000) {
        this.$messageBox({ tip: "录音时间太短啦" });
        return;
      }
      //估算时长
      this.duration = Math.ceil(duration / 1000);
      // 生成播放地址
      this.audioURL = URL.createObjectURL(blob);
    },
    /**
     * @desc 获取录音时长
     * @author 陈宇奇
     * @date 2020年5月26日 11:05:46
     */
    getDuration() {
      let audio = this.$refs.audio;
      audio.onloadedmetadata = () => {
        // 语音时长赋值
        this.duration = Math.ceil(audio.duration);
      };
    },
    /**
     * @desc 播放或暂停录音
     * @author 陈宇奇
     * @date 2020年5月13日 17:56:01
     */
    playOrPause() {
      let audio = this.$refs.audio;
      // 存在播放时长才操作
      if (this.duration) {
        // 暂停则播放 播放则暂停并重置
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
        // 修改音频状态
        this.audioPaused = audio.paused;
      }
    },
    /**
     * @desc 删除定时器
     * @author 陈宇奇
     * @date 2020年5月14日 09:39:03
     */
    removeTimeout() {
      this.timeId && clearTimeout(this.timeId);
    },
    /**
     * @desc 删除录音
     * @author 陈宇奇
     * @date 2020年5月14日 14:55:37
     */
    removeRecord() {
      // 重置录音时长
      this.duration = 0;
    },
    /**
     * @desc 上传录音文件
     * @author 陈宇奇
     * @date 2020年5月14日 11:59:55
     */
    uploadRecord() {
      // 存在录音文件才上传
      if (this.duration) {
        let file = new File(
          [this.blob],
          `${Math.random()
            .toString(16)
            .substring(2)}.mp3`
        );
        this.$refs.jrInput.uploadFile(file);
      }
    },
    /**
     * @desc 获取上传完毕的链接
     * @param {Object} res 上传完毕的文件信息
     * @author 陈宇奇
     * @date 2020年5月14日 12:00:25
     */
    getResult(res) {
      // 上传完成 通知父组件
      this.$emit("upload-complate", {
        audioInfo: res,
        duration: this.duration
      });
    },
    /**
     * @desc 文件上传错误
     * @author 陈宇奇
     * @date 2020年5月26日 16:39:47
     */
    uploadErr() {
      this.$messageBox({ tip: "文件上传失败，请重新录制" });
      // 删除音频
      this.removeRecord();
    }
  }
};
</script>
<style scoped lang='scss'>
@import "record.scss";
</style>
