export default {
  methods: {
    /**
     * @desc 绑定事件监听
     * @author 陈泽光
     * @date 2019年8月28日08:37:19
     */
    eventOn() {
      // 返回视频总时长
      this.player.on("canplay", () => {
        this.$emit("duration", this.player.video.duration);
      });

      // 视频结束
      this.player.on("ended", () => {
        this.$emit("ended", true);
      });

      // 返回 视频的实际宽高
      this.player.on("loadedmetadata", () => {
        let video = this.player.video;
        const obj = {
          width: video.videoWidth,
          height: video.videoHeight,
        };
        this.$emit("getVideoSize", obj);
      });

      // 错误监听
      this.player.on("error", () => {
        if (this.player) {
          this.player.destroy();
          this.player = null;
        }
        setTimeout(() => {
          this.createdPlayer("auto");
        });
      });

      // 返回 视频的实际宽高
      this.player.on("loadedmetadata", () => {
        let video = this.player.video;
        const obj = {
          width: video.videoWidth,
          height: video.videoHeight,
        };
        this.$emit("getVideoSize", obj);
      });

      // 监听视频是否快进
      this.player.on("seeking", () => {
        if (this.player.video.currentTime) {
          if (this.isSeeking) {
            this.isSeeking = false;
          } else {
            if (
              this.player.video.currentTime > this.currentTime &&
              !this.isChange
            ) {
              this.player.seek(this.currentTime);
              this.player.notice(this.$t("videoPlayer_无法快进"));
              this.isSeeking = true;
            }
          }
        }
      });
    },
    /**
     * @desc 关闭事件
     * @author 陈泽光
     * @date 2019年8月7日11:56:55
     */
    closeEvent() {
      this.$emit("close", true);
    },
    /**
     * @desc 全屏事件切换
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    fullPageEvent() {
      let dom = this.getDom("dplayer-full-icon");
      // 全屏事件
      dom.onclick = () => {
        dom.setAttribute("data-balloon", this.$t("videoPlayer_取消全屏"));
        this.getDom("subtitle").classList.add("full");
        dom.children[0].classList.add("player-full");
      };

      // 取消全屏
      this.player.on("fullscreen_cancel", () => {
        dom.setAttribute("data-balloon", this.$t("videoPlayer_全屏"));
        this.getDom("subtitle").classList.remove("full");
        dom.children[0].classList.remove("player-full");
      });
    },
    /**
     * @desc 重写播放器的音量事件
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    voiceEvent() {
      // 添加音量按钮节点
      let voiceDom = this.getDom("dplayer-setting");
      if (voiceDom) {
        voiceDom.innerHTML = "";

        // 添加音量调节节点
        this.getDom("dplayer-comment").innerHTML =
          '<div class="vocie-change"><div class="voice-box"><div class="voice-container"><div class="voice-progress"/></div><div class="voice-progress-point"></div></div>';

        // 绑定点击事件，点击显示\隐藏调节音量滚动条
        voiceDom.onclick = () => {
          let dom = this.getDom("vocie-change");
          dom.style.display =
            dom.style.display && dom.style.display === "block"
              ? "none"
              : "block";
        };

        // 音量拖拽调节事件
        this.getDom("voice-progress-point").onmousedown = (e) => {
          this.isDraggingVoiceProgress = true;
          //  阻止文本选中
          document.onselectstart = () => false;

          document.onmousemove = this.draggingVoicePoint;
          document.onmouseup = this.stopDragVoicePoint;
        };

        // 点击设置音量大小
        this.getDom("voice-container").onclick = (e) =>
          this.jumpVoiceProgress(e);
      }
    },
    /**
     * @desc 视频进度拖拽
     * @author 陈泽光
     * @date 2019年8月7日08:08:27
     */
    progressEvent() {
      this.player.on("timeupdate", () => {
        if (this.player) {
          let time = Math.floor(this.player.video.currentTime);

          // 如果播放时间大于记录的已播放时间，就更新已经播放时间
          if (this.currentTime < this.player.video.currentTime) {
            this.currentTime = this.player.video.currentTime;
          }
          if (
            this.currentTime > this.player.video.duration * 0.95 &&
            !this.isOver
          ) {
            this.$emit("on-over", true);
            this.isOver = true;
          }
          this.$emit("play-ing", this.player.video.currentTime);

          //如果存在某个区间，则显示这个区间的字幕
          let falg = false;
          let dom = this.getDom("subtitle");
          if (this.subList && this.subList.length) {
            this.subList.some((it) => {
              if (time <= it.endTime && time >= it.startTime) {
                falg = true;
                dom.innerHTML = `${it.content}<div class="en-sub">${it.contentEn}</div>`;
                return falg;
              }
            });
            if (!falg) {
              dom.innerHTML = "";
            }
          }
        }
      });
    },
  },
};
