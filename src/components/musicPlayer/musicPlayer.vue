/****************************************************************************

所属系统: 组件库
所属模块: 音乐播放器


***************************************************************************/

<template>
  <div>
    <div class="audio-container"
         :class="[private_type]">

      <!-- 播放列表 -->
      <div class="audio-list"
           v-if="private_type === 'window'">
        <h4>
          {{$t('musicPlayer_播放列表')}}
          <button type="button"
                  class="close"
                  :title="$t('common_关闭')"
                  @click="$emit('on-close')"></button>
          <button v-if="showMin"
                  type="button"
                  class="min"
                  :title="$t('musicPlayer_最小化')"
                  @click="changeType"></button>
        </h4>
        <main>
          <ul>
            <li v-for="(music, index) in audioList"
                @click="changeMusic(index)"
                :key="index"
                :class="{'active': private_currentIndex === index, 'disabled': !currentMusicLoadSuccess && private_currentIndex === index }">

              <span class="index">
                <template v-if="private_currentIndex === index">
                  <img v-if="isPlaying"
                       src="../../assets/images/musicPlayer/i_wave_active.gif">
                  <img v-else
                       src="../../assets/images/musicPlayer/i_wave_nor.png">
                </template>
                <template v-else>
                  {{index + 1}}
                </template>
              </span>
              <span class="name">{{music.fileName}}</span>
              <span class="duration">{{ formatTime(music.duration) }}</span>
            </li>
          </ul>
        </main>
      </div>
      <!-- 播放列表 -->

      <!-- 底部操作栏 -->
      <section class="audio-section">

        <!-- 操作区域 -->
        <div class="audio-section__btn-container">
          <!-- 上一首按钮 -->
          <button type="button"
                  :title="$t('musicPlayer_上一首')"
                  v-show="showPrevButton"
                  class="audio-section__btn previous"
                  :class="{ disable: !private_isLoopList && private_currentIndex === 0 }"
                  @click="playPrev">
          </button>
          <!-- 上一首按钮 -->
          <!-- 播放按钮 -->
          <button type="button"
                  :title="$t('musicPlayer_播放')"
                  v-if="!isPlaying && showPlayButton"
                  :disabled="!currentMusicLoadSuccess"
                  @click="play"
                  class="audio-section__btn start">
          </button>
          <!-- 播放按钮 -->
          <!-- 暂停按钮 -->
          <button type="button"
                  :title="$t('musicPlayer_暂停')"
                  v-else-if="showPlayButton"
                  @click="pause"
                  class="audio-section__btn pause">
          </button>
          <!-- 暂停按钮 -->
          <!-- 下一首按钮 -->
          <button type="button"
                  :title="$t('musicPlayer_下一首')"
                  v-show="showNextButton"
                  class="audio-section__btn next"
                  :class="{ disable: !private_isLoopList && private_currentIndex === audioList.length - 1 }"
                  @click="playNext">
          </button>
          <!-- 下一首按钮 -->
          <!-- 秽土转生的实体 -->
          <audio ref="audio"
                 class="audio-section__player"
                 :src="currentMusic.filePath"
                 @ended="onEnded"
                 @loadstart="onLoadstart"
                 @loadedmetadata="onLoadedmetadata">
          </audio>
          <!-- 秽土转生的实体 -->
        </div>
        <!-- 操作区域 -->

        <!-- 进度条 -->
        <div v-show="showProgressBar"
             class="audio-section__progress-container"
             :class="{disabled: !currentMusicLoadSuccess}"
             ref="audioProgressContainer"
             @click="jumpProgress">
          <!-- 播放时间 -->
          <div class="audio-section__time"
               @click.stop="">
            {{ currentTimeAfterFormat }} / {{ formatTime(currentMusic.duration) }}
          </div>
          <!-- 播放时间 -->
          <!-- 音乐名称 -->
          <div class="audio-section__name"
               @click.stop="">
            {{ currentMusic.fileName }}
          </div>
          <!-- 音乐名称 -->
          <!-- 进度条 -->
          <div :style="{width: timeProgressWidth + 'px'}"
               class="audio-section__progress" />
          <!-- 进度条 -->
          <!-- 进度圆点 -->
          <div class="audio-section__progress__point"
               @mousedown="startDragTimePoint"
               ref="audioProgressPoint" />
          <!-- 进度圆点 -->
        </div>
        <!-- 进度条 -->

        <!-- 声音调节及循环播放 -->
        <div v-show="showProgressBar"
             class="audio-section__btn-container">

          <!-- 音量调节按钮 -->
          <button type="button"
                  class="audio-section__btn voice"
                  :title="$t('musicPlayer_音量调节')"
                  @click="(event) => {
                    event.target.tagName === 'BUTTON' && (isShowVoiceForm = !isShowVoiceForm);
                  }">
            <!-- 音量调节条 -->
            <div class="audio-section__voice-wrap"
                 v-clickoutside="() => {
                  isShowVoiceForm && (isShowVoiceForm = false)
                }"
                 v-show="isShowVoiceForm">
              <!-- 音量调节背景 -->
              <div class="audio-section__voice-container"
                   ref="audioVoiceContainer"
                   @click="jumpVoiceProgress">
                <!-- 音量进度条 -->
                <div class="audio-section__voice-progress"
                     ref="audioVoiceProgress" />
                <!-- 音量进度条 -->
                <!-- 音量进度圆点 -->
                <div class="audio-section__voice-progress__point"
                     @mousedown="startDragVoicePoint"
                     ref="audioVoiceProgressPoint" />
                <!-- 音量进度圆点 -->
              </div>
              <!-- 音量调节背景 -->
            </div>
            <!-- 音量调节条 -->
          </button>
          <!-- 音量调节按钮 -->

          <!-- 循环播放 -->
          <button type="button"
                  class="audio-section__btn loop"
                  :class="{'loopCurrent': !private_isLoopList}"
                  :title="private_isLoopList ? $t('musicPlayer_当前为列表循环') : $t('musicPlayer_当前为单曲循环')"
                  @click="changeLoopType">
          </button>
          <!-- 循环播放 -->

          <!-- 播放列表 -->
          <button type="button"
                  class="audio-section__btn list"
                  v-if="private_type === 'min'"
                  @click="changeType">
            {{audioList.length}}
          </button>
          <!-- 播放列表 -->
        </div>
        <!-- 声音调节及循环播放 -->

      </section>
      <!-- 底部操作栏 -->
    </div>
    <transition name="fade">
      <div class="audio-shade"
           v-if="private_type === 'window'"></div>
    </transition>
  </div>
</template>

<script>
import playTime from "./mixins/playTime";
import voice from "./mixins/voice";

export default {
  name: "JrMusicPlayer",
  mixins: [playTime, voice],
  props: {
    //  播放器类型
    type: {
      default: "window",
      type: String,
      validator: val => {
        let res = ["window", "min"].indexOf(val) === -1;
        res &&
          window["console"].error(
            new RangeError("the optional value of selection is window or min")
          );
        return !res;
      }
    },
    //  音频播放列表
    audioList: {
      default: null,
      type: Array
    },
    //  当前播放下标
    currentIndex: {
      default: 0,
      type: Number
    },
    //  显示播放按钮
    showPlayButton: {
      default: true,
      type: Boolean
    },
    //  显示上一首按钮
    showPrevButton: {
      default: true,
      type: Boolean
    },
    //  显示下一首按钮
    showNextButton: {
      default: true,
      type: Boolean
    },
    //  显示进度条
    showProgressBar: {
      default: true,
      type: Boolean
    },
    //  播放前的回调函数
    beforePlay: {
      default: null,
      type: Function
    },
    //  上一首前的回调函数
    beforePrev: {
      default: null,
      type: Function
    },
    //  下一首前的回调函数
    beforeNext: {
      default: null,
      type: Function
    },
    //  是否自动播放
    isAutoPlay: {
      default: false,
      type: Boolean
    },
    //  是否列表循环播放
    isLoopList: {
      default: true,
      type: Boolean
    },
    //  播放进度更新间隔
    progressInterval: {
      default: 1000,
      type: Number
    },
    //  播放器声音大小
    volume: {
      default: 100,
      type: Number,
      validator: val => {
        if (val > 100 || 0 > val) {
          window["console"].error(
            new RangeError("volume must be small than 100 or bigger than 0")
          );
          return false;
        }
        return true;
      }
    },
    // 是否显示最小化按钮
    showMin: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //  播放器类型
      private_type: this.type,
      //  定时器
      timer: null,
      //  当前播放下标
      private_currentIndex: this.currentIndex,
      //  音频是否正在播放
      isPlaying: false,
      //  当前音乐加载成功
      currentMusicLoadSuccess: false,

      //  音频当前播放时间
      currentTime: "",
      //  播放时间进度宽度
      timeProgressWidth: "",
      //  是否循环列表
      private_isLoopList: this.isLoopList,
      //  音量大小
      private_volume: this.volume,

      //  音频当时播放时间（格式化后）
      currentTimeAfterFormat: "00:00"
    };
  },
  watch: {
    //  传入的播放器类型
    type(value) {
      this.private_type = value;
    },
    //  传入的循环类型
    isLoopList(value) {
      this.private_isLoopList = value;
    },
    //  传入的音量大小
    volume(value) {
      this.private_volume = value;
    },
    //  传入的当前播放歌曲下标
    currentIndex(value) {
      this.changeMusic(value);
    },
    /**
     * @desc 观察私有音量大小
     * 在发生改变时，实时调整音量大小及音量圆点及音量进度条的位置
     */
    private_volume(value) {
      this.$refs.audioVoiceProgress.style.height =
        this.$refs.audioVoiceContainer.clientHeight * (value / 100) + "px";

      //  除2是为了让鼠标在圆点中间
      this.$refs.audioVoiceProgressPoint.style.top =
        this.$refs.audioVoiceContainer.clientHeight * ((100 - value) / 100) -
        ([100, 0].includes(value)
          ? 0
          : this.$refs.audioVoiceProgressPoint.clientHeight / 2) +
        "px";

      this.$refs.audio.volume = value / 100;
    }
  },
  created() {
    this.recordMusicDuration();
  },
  computed: {
    //  当前播放音乐
    currentMusic() {
      return this.audioList[this.private_currentIndex];
    }
  },
  beforeDestroy() {
    this.pause();
  },
  methods: {
    /**
     * @desc 重设音乐信息
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    resetMusieInfo() {
      this.timeProgressWidth = 0;
      this.currentTime = "";
      this.setTimePointPosition(0);
    },
    /**
     * @desc 记录每个音乐的总时长
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    recordMusicDuration() {
      for (let i = 0; i < this.audioList.length; i++) {
        const music = this.audioList[i];
        if (!music.duration) {
          const $audio = new Audio(music.filePath);

          //  同步读取音乐的时长
          new Promise(resolve => {
            $audio.onloadedmetadata = () => {
              music.duration = $audio.duration;
              this.$forceUpdate();
              resolve();
            };
            $audio.onerror = () => {
              music.loadFail = true;
              this.$forceUpdate();
              resolve();
            };
          });
        }
      }
    },
    /**
     * @desc 音频标签开始加载时
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    onLoadstart() {
      this.currentMusicLoadSuccess = false;
    },
    /**
     * @desc 音频标签加载完毕时
     * @param {Event} event 事件
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    onLoadedmetadata(event) {
      this.isAutoPlay &&
        !this.alreadyLoad &&
        this.$nextTick(() => {
          this.play();
          this.alreadyLoad = true;
        });

      this.currentMusicLoadSuccess = true;
      this.$refs.audio.volume = this.volume / 100;
      this.$emit("on-loadedmetadata", event);
    },
    /**
     * @desc 音频标签播放完毕
     * @param {Event} event 事件
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    async onEnded(event) {
      await this.pause();
      this.currentTimeAfterFormat = this.formatTime(
        this.$refs.audio.currentTime
      );
      if (this.private_isLoopList) {
        this.playNext();
      } else {
        this.resetMusieInfo();
        this.play();
      }
      this.$emit("on-ended", event);
    },

    /**
     * @desc 格式化秒为分
     * @param {Number} second 秒
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    formatTime(second) {
      return isNaN(second)
        ? "---"
        : [parseInt((second / 60) % 60), parseInt(second % 60)]
            .join(":")
            .replace(/\b(\d)\b/g, "0$1");
    },

    /**
     * @desc 播放中
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    playing() {
      //  正在拖拽时间进度
      if (this.isDraggingTimeProgress) {
        return;
      }

      this.currentTimeAfterFormat = this.formatTime(
        this.$refs.audio.currentTime
      );

      //  根据当前播放时间 除于 音频总时长，乘于 总滚动条总长度，得出进度条的长度
      this.timeProgressWidth =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) *
        this.$refs.audioProgressContainer.offsetWidth;

      //  设置播放进度拖拽圆点位置
      this.setTimePointPosition(this.timeProgressWidth);

      this.$emit("on-playing");
    },
    /**
     * @desc 开始播放
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    play() {
      return new Promise(resolve => {
        const playHandle = () => {
          this.$refs.audio.play();
          this.$nextTick(() => {
            this.playing();
            //  定时器循环执行播放逻辑
            this.timer = setInterval(this.playing, this.progressInterval);
            this.isPlaying = true;
            this.$emit("on-play");
            resolve(true);
          });
        };
        //  如存在播放前的回调
        if (this.beforePlay) {
          this.beforePlay(canPlay => {
            canPlay !== false && playHandle();
          });
        } else {
          playHandle();
        }
      });
    },
    /**
     * @desc 暂停播放
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    pause() {
      return new Promise(resolve => {
        this.$refs.audio.pause();
        this.$nextTick(() => {
          clearInterval(this.timer);
          this.isPlaying = false;
          this.$emit("on-pause");
          resolve(true);
        });
      });
    },
    /**
     * @desc 播放上一首
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    async playPrev() {
      this.resetMusieInfo();
      !this.isPlaying && (await this.play());

      let prevHandle = () => {
        if (this.private_currentIndex <= 0) {
          // 列表循环
          this.private_currentIndex = this.audioList.length - 1;
        } else {
          this.private_currentIndex--;
        }

        this.$nextTick(() => {
          this.$refs.audio.play();
          this.isPlaying = true;
          this.$emit("on-play-prev");
        });
      };

      if (this.beforePrev) {
        this.beforePrev(state => {
          if (state !== false) {
            prevHandle();
          }
        });
      } else {
        prevHandle();
      }
    },
    /**
     * @desc 播放下一首
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    async playNext() {
      this.resetMusieInfo();
      !this.isPlaying && (await this.play());

      let nextHandle = () => {
        if (this.private_currentIndex + 1 >= this.audioList.length) {
          // 列表循环
          this.private_currentIndex = 0;
        } else {
          this.private_currentIndex++;
        }
        this.$nextTick(() => {
          this.$refs.audio.play();
          this.isPlaying = true;
          this.$emit("on-play-next");
        });
      };

      if (this.beforeNext) {
        this.beforeNext(state => {
          if (state !== false) {
            nextHandle();
          }
        });
      } else {
        nextHandle();
      }
    },
    /**
     * @desc 切换音乐
     * @param {Number} index 音乐下标
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    async changeMusic(index) {
      if (this.private_currentIndex === index) {
        if (!this.currentMusicLoadSuccess) {
          return false;
        }
        this.isPlaying ? this.pause() : this.play();
      } else {
        this.resetMusieInfo();
        !this.isPlaying && (await this.play());

        this.private_currentIndex = index;

        this.$nextTick(() => {
          this.$refs.audio.play();
          this.isPlaying = true;
          this.$emit("on-play-prev");
        });
      }
    },
    /**
     * @desc 改变播放器类型
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    changeType() {
      this.private_type = this.private_type === "window" ? "min" : "window";
      this.$emit("update:type", this.private_type);
    },
    /**
     * @desc 改变播放循环类型
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    changeLoopType() {
      this.private_isLoopList = !this.private_isLoopList;
      this.$emit("update:isLoopList", this.private_isLoopList);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
