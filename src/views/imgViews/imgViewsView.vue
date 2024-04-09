<template>
  <div class="j-container">
    <h1 style="font-size: 40px;"
        class="j-mb-10">图片查看器组件</h1>
    <jr-button @click="changeOperate('')"
               class="j-mb-10">正常打开</jr-button>
    <jr-imgView :list="list"
                :imgindex.sync='imgindex'
                :operateList='operateList'
                :isShow.sync="isShow" />

    <div class="remark proof">
      <jr-button @click="showImg(1)"
                 class="j-mr-10">打开第二个</jr-button>
      <jr-button @click="changeOperate('thumbnail')"
                 class="j-mr-10">下面的操作栏可配置(取消掉缩略图操作)</jr-button>

    </div>
  </div>
</template>

<script>
export default {
  name: "imgViewsView",
  label: "图片查看器",
  data() {
    return {
      isShow: false,
      imgindex: 0,
      list: [],
      operateListAll: [
        "thumbnail",
        "enlarge",
        "narrow",
        "rotate",
        "download",
        "delete"
      ],
      operateList: []
    };
  },
  computed: {},
  created() {
    let list = [];
    let arr = [
      {
        url:
          "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/JurisdictionUpload/2018/12/29/jq99nk9582nhg9sd5h.png",
        name: "12312312.png"
      },
      {
        url:
          "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/JurisdictionUpload/2018/12/29/jq98id73b9carnuxru8.png",
        name: "fdvdsf.jpg"
      },
      {
        url:
          "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/64546d101ce8da114c064f8e3ae943f7/u=3519956291,4147023926&fm=11&gp=0.jpg",
        name: "123213.jpg"
      },
      {
        url:
          "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/984fce6b93fc87c0447af466f584d08b/u=869807873,4205268148&fm=11&gp=0.jpg",
        name: "123123.jpg"
      },
      {
        url:
          "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/JurisdictionUpload/2019/02/16/js78mud7dg26h2ydexh.jpg",
        name: ""
      }
    ];
    Array.from({ length: 10 }, (e, i) => {
      list.push(...arr);
    });
    this.list = list;
  },
  methods: {
    showImg(i) {
      this.$set(this, "imgindex", i);
      this.isShow = true;
    },
    changeOperate(flag) {
      this.operateList = this.operateListAll.filter(ele => ele !== flag);
      this.isShow = true;
    }
  }
};
</script>

