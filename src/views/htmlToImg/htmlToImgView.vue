
<template>
  <div class="content">
    <h2 class="j-mb-20">HTML生成IMG</h2>

    <jr-button @click="getImg">生成图片</jr-button>

    <div class="mask">
      <div class="m1">
        <h3>广东五年创建全国校园足球特色校1540所</h3>
      </div>
      <div class="m2">
        12月29日，广东省青少年校园足球总结系列活动在广州体育学院隆重举行。本次活动由广东省青少年校园足球工作领导小组办公室主办，广州体育学院和广东省青少年校园足球专家委员会承办。活动对5年来广东省青少年校园足球发展的成绩和经验进行了阶段性总结，对长期耕耘在青少年校园足球领域的各界人士予以表彰与鼓励。

        广东省青少年校园足球工作领导小组组长，省委教育工委书记，省教育厅党组书记、厅长景李虎说，五年来，广东省基本建立并不断完善了一整套校园足球制度体系，初步形成了具有广东特色的校园足球发展路径。
      </div>
      <div class="m3">
        此次总结活动还评选出3个优秀试点县（区），1名优秀试点县（区）长，20所优秀特色学校 ，38名优秀特色学校校长，44名优秀校园足球教师，24名优秀校园足球教练员，9名优秀校园足球裁判员， 24名校园足球“未来之星“，4个优秀媒体合作伙伴、 1个优秀企业合作伙伴，6个优秀组织奖、3个校园足球“感动人物”奖。
      </div>
      <div class="m4">
        景李虎强调，中国足球改革是习近平总书记亲自发动、亲自部署的一项重大改革行动。在接下来的校园足球推进工作中希望大家继续守初心、担使命，加快校园足球治理体系建设和治理能力提升，在发挥校园足球组织力量、加强内外交流、强化师资队伍建设、加大教体融合力度、提高普及水平和竞赛水平、引领学校体育综合改革发展等方面，谱写广东校园足球改革发展新篇章。
      </div>
    </div>

    <jr-html-to-img actionUrl='//192.168.99.29:8200/'
                    businessCode='NS2'
                    ref="htmlToImg"
                    @result="getResult"></jr-html-to-img>

  </div>
</template>
<script>
export default {
  name: "htmlToImgView",
  label: "HTML转图片",
  methods: {
    getImg() {
      this.$loading();
      this.$refs.htmlToImg.domToImg(
        document.getElementsByClassName("mask")[0],
        "sdsda"
      );
    },
    getResult(res) {
      this.$loading(false);
      console.log(res);
    }
  }
};
</script>
<style scoped lang='scss'>
.mask {
  width: 1000px;
  height: 2000px;
  background-color: #abcdef;
  .m1 {
    width: 500px;
    margin-top: 50px;
    height: 200px;
    background-color: blue;
  }
  .m2 {
    width: 800px;
    margin-top: 50px;
    height: 300px;
    background-color: yellow;
  }
  .m3 {
    width: 400px;
    margin-top: 50px;
    height: 300px;
    background-color: plum;
  }
  .m3 {
    margin-top: 50px;
    width: 700px;
    height: 200px;
    background-color: seagreen;
  }
}
</style>
