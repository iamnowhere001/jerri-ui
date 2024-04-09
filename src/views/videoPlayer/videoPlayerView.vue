/****************************************************************************

所属系统: 组件库
所属模块: 组件 - 视频播放组件


***************************************************************************/

<template>
  <div class="box">
    <h2 class="j-mb-20">视频播放器组件</h2>
    <JrVideoPlayer ref="video"
                   :boxWidth="640"
                   :boxHeight="360"
                   :videoUrl="url"
                   :subtitleList="sub"
                   :isClose="true"
                   :isChange="true"
                   :autoPlay="true"
                   @close="closeVideo"
                   @play-ing="playIng"
                   @on-over="over"
                   @ended="ended"
                   @duration="duration"
                   v-if="url"></JrVideoPlayer>
    <p class="j-mt-10">
      <jr-button @click="changeUrl">切换视频</jr-button>
    </p>
  </div>
</template>
<script>
export default {
  name: "videoPlayerView",
  label: "视频播放器",
  data() {
    return {
      url: "",
      url2: "",
      sub: [
        {
          content: "想想上帝为什么创造你吧想想上帝为什么创造你吧",
          contentEn:
            "Consider your origins.Are you sure a protracted war is the best way forward?",
          startTime: "00:01",
          endTime: "00:03"
        },
        {
          content: "而是要追求美德和知识",
          contentEn: "but to follow virtue and knowledge.",
          startTime: "00:08",
          endTime: "00:10"
        },
        {
          content: "让大家知道鲍里街会遵守逐出教会",
          contentEn: "Let it be known the Bowery will honor the Excommunicado.",
          startTime: "00:30",
          endTime: "00:38"
        },
        {
          content: "他们不会相信我准时停止的",
          contentEn: "They'll never believe I stopped on the hour.",
          startTime: "01:30",
          endTime: "01:38"
        },
        {
          content: "我试着劝阻他们放弃这些幼稚的想法",
          contentEn: "I try to dissuade them from these childish notions.",
          startTime: "01:40",
          endTime: "01:48"
        },
        {
          content: "你认识威克先生非常多年了",
          contentEn: "You have known Mr. Wick for a great many years.",
          startTime: "02:20",
          endTime: "02:23"
        },
        {
          content: "请享受您在大陆酒店的入住",
          contentEn: "Enjoy your stay at the Continental.",
          startTime: "03:30",
          endTime: "03:34"
        },
        {
          content: "我想看那件事没有发生的地方",
          contentEn: "I wanted to see where it didn't happen.",
          startTime: "04:50",
          endTime: "04:55"
        },
        {
          content: "那我还是不能使用相关服务吗?",
          contentEn: "Are services still off limits to me?",
          startTime: "05:10",
          endTime: "05:20"
        },
        {
          content: "我知道你觉得你可以继续这样下去",
          contentEn: "I know you believe you can keep this up.",
          startTime: "08:10",
          endTime: "08:20"
        },
        {
          content: "我建议我们谈判一下",
          contentEn: "I would like to suggest a parley.",
          startTime: "09:03",
          endTime: "09:20"
        },
        {
          content: "你确定持久战是最好的前进方式吗?",
          contentEn: "Are you sure a protracted war is the best way forward?",
          startTime: "10:10",
          endTime: "10:20"
        },
        {
          content: "如果我站在他的立场上,我也会做同样的事",
          contentEn: "I would've done the same thing if I was in his shoes.",
          startTime: "11:28",
          endTime: "11:33"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.url =
      "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/56c8ff5733f6bab5a206337ca6c9fa4f/20151001翡翠台 - 維港煙花.flv";
  },
  methods: {
    changeUrl() {
      this.url =
        "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/68ed253279e93d321ca2e6af80945911/玩具总动员4.Toy.Story.4.2019.BD1080P.X264.AAC.English&Mandarin.CHS-ENG.Mp4Ba~2.mov";
    },
    ended() {
      console.log("end");
    },
    playIng(time) {},
    over() {
      console.log(120000000);
    },
    p() {
      this.$refs.video.pause(); //暂停
      // this.$refs.video.duration;
    },
    duration(data) {
      console.log(data);
    },
    closeVideo() {},

    ended2() {
      console.log("end");
    },
    playIng2(time) {},
    over2() {
      console.log(120000000);
    },
    duration2(data) {
      console.log(data);
    },
    closeVideo2() {}
  }
};
</script>
<style scoped lang="scss">
.box {
  margin: 50px;
}
.video-detail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
