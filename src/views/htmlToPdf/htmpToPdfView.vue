/****************************************************************************

所属系统:
所属模块: 模块—[子模块]
创建时间:
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div>
    <div class="box">
      <ul>
        <li><img src="http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ymm/6a29d167b17b6f9d70a921ccdbdaf79b/20150724123538480.jpg"
               alt="">
        </li>
        <li><img src="http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ymm/6a29d167b17b6f9d70a921ccdbdaf79b/20150724123538480.jpg"
               alt="">
        </li>
      </ul>
      <jr-table-pro :theadList="theadList"
                    :tbodyList="tbodyList"></jr-table-pro>
    </div>
    <jr-button @click="download">下载pdf</jr-button>
    <jr-html-to-pdf ref="toPdf"
                    businessCode="DPC"
                    @result="getResult"
                    action="//192.168.99.29:8200/"></jr-html-to-pdf>
  </div>
</template>
<script>
export default {
  name: "htmpToPdfView",
  label: "html转pdf操场",
  components: {},
  mixins: [],
  data() {
    return {
      theadList: [
        { label: "日", props: "date" },
        { label: "时间", props: "time" },
        { label: "教室1", props: "classRoom1" },
        { label: "教室2", props: "classRoom2" },
        { label: "教室3", props: "classRoom3" }
      ],
      tbodyList: [
        {
          date: "星期一",
          time: "09:00 - 10:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "瑞兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "10:30 - 12:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    download() {
      // 生成pdf并且上传 打开loading
      this.$loading();
      this.$refs.toPdf.downloadPDF(document.querySelector(".box"), "测试");
    },
    getResult(res) {
      // 上传完毕 打开链接直接下载
      location.href = res.fileUrl;
      // 关闭loading
      this.$loading(false);
    }
  }
};
</script>
<style scoped lang='scss'>
.box {
  padding: 30px;
  img {
    height: 300px;
  }
  // /deep/ .table-wrap {
  //   thead {
  //     th {
  //     }
  //   }
  // }
}
</style>
