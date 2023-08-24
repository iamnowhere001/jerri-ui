<template>
  <div class="content">
    <h2 class="j-mb-20">文件上传组件</h2>

    <jr-button class="j-mr-40" @click="showName = !showName"
      >显示文件名 {{ showName }}</jr-button
    >

    <jr-button class="j-mr-40" @click="sumbit">校验上传状态</jr-button>

    <p class="nav">批量上传 按钮左边（最多15张）</p>
    <jr-upload-file
      :accept="acceptImg"
      :businessCode="businessCode"
      :action="action"
      :isMany="true"
      :isViewList="false"
      :disabledSort="true"
      :maxLen="15"
      :maxSize="200"
      :readFiles="readFiles"
      :showName="showName"
      uploadWord="上传图片"
      uploadDesc="我是描述"
      @preview-file="previewFile"
      @get-files="getFiles"
      ref="upload"
    >
    </jr-upload-file>

    <p class="nav">批量上传 按钮右边（最多5个）拖动文件排序</p>
    <jr-upload-file
      accept="*"
      :businessCode="businessCode"
      :action="action"
      :isMany="true"
      :isViewList="true"
      :disabledSort="false"
      :maxLen="5"
      :maxSize="2000"
      :readFiles="modelRead"
      :showName="showName"
      :isReverse="true"
      :boxWidth="80"
      :boxHeight="100"
      @preview-file="previewFile"
      @get-files="getModelFiles"
      ref="upload"
    ></jr-upload-file>

    <p class="nav">单张上传</p>
    <jr-upload-file
      accept="*"
      :isPreview="false"
      businessCode="NS2"
      :action="action"
      :isMany="true"
      :isViewList="false"
      :disabledSort="false"
      :maxLen="1"
      defaultDel
      :maxSize="2000"
      :readFiles="readFiles"
      :showName="showName"
      :boxWidth="400"
      :boxHeight="300"
      @preview-file="previewFile"
      @get-files="getFiles"
      ref="upload"
    ></jr-upload-file>

    <p class="nav">只读文件列表 禁止文件排序 第3个换行</p>
    <div style="width:264px">
      <jr-upload-file
        :bankCount="3"
        :accept="accept"
        :businessCode="businessCode"
        :action="action"
        :isMany="true"
        :isViewList="false"
        :disabledSort="true"
        :maxLen="30"
        isRead
        :maxSize="2000"
        :readFiles="readFiles2"
        :showName="showName"
        :boxWidth="80"
        :boxHeight="100"
        @preview-file="previewFile"
        @get-files="getFiles"
        :beforePreview="beforePreview"
        ref="upload"
      ></jr-upload-file>
    </div>
  </div>
</template>

<script>
export default {
  name: "uploadFileView",
  label: "文件上传操场",
  data() {
    return {
      // 上传路径
      action: "//192.168.99.29:8200/",
      // 业务代码
      businessCode: "NS",
      // 图片上传接收格式
      acceptImg: ".png,.jpg,.jpeg",
      // 文件上传接收格式
      accept:
        ".xls,.docx,.txt,.pdf,.png,.mp4,.psd,.ptt,.rar,.jpg,.avi,.wmv,.jpeg",
      // 是否显示文件名称
      showName: true,
      // 只读数组
      readFiles: [],
      modelRead: [
        {
          fileName: "视频",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/6c976aafbe0d478e0f48cc249aeaf36e/03000801005D9FF6B818403003E8808101508D-617C-4396-BE3B-5D0053D19AFA",
        },
      ],
      // 只读文件列表
      readFiles2: [
        {
          fileName: "视频",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/6c976aafbe0d478e0f48cc249aeaf36e/03000801005D9FF6B818403003E8808101508D-617C-4396-BE3B-5D0053D19AFA.mov",
        },
        {
          fileName: "1.0坐席设置",
          url:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ns2/f34dae7b082397e786037ae124c0601b/1.0%E5%9D%90%E5%B8%AD%E8%AE%BE%E7%BD%AE.psd",
        },
        {
          fileName: "1.0坐席设置",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/c728685fefc112cd06e7901db42345d2/03000801005DDFAFF31B3171897689DA3AE560-6D6D-4DD9-84F1-759DC6C5D548.mov",
        },
        {
          fileName: "桑拿",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/123.JPEG",
        },
        {
          fileName: "桑拿",
          fileType: "JPEG",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
        {
          fileName: "桑拿",
          fileType: "JPEG",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
        {
          fileName: "桑拿",
          fileType: "JPEG",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
        {
          fileName: "桑拿",
          fileType: "JPEG",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
        {
          fileName: "桑拿",
          fileType: "JPEG",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
      ],
    };
  },
  methods: {
    getModelFiles(files) {
      this.modelRead = files;
    },
    /**
     * @desc 获取上传的文件
     * @param {Array} files 对象数组
     * @author 徐勇
     * @date 2020年05月23日 09:42
     */
    getFiles(files) {
      console.log(files);
    },

    /**
     * @desc 其它预览 非图片、视频
     * @param {Object} item 预览对象
     * @author 徐勇
     * @date 2020年05月23日 09:43
     */
    previewFile(item) {
      console.log("其它预览", item);
    },

    /**
     * @desc 提交校验
     * @author 徐勇
     * @date 2020年05月23日 09:43
     */
    sumbit() {
      let refUpload = this.$refs.upload;
      if (refUpload.isExistErr) {
        this.$msg("文件上传失败 请重新上传");
      } else if (!refUpload.allComplete) {
        this.$msg("文件上传中 请等待上传完成");
      } else {
        this.$msg("上传完成");
      }
    },
    beforePreview(item) {
      console.log(item);
      // return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 50px;
  .nav {
    color: #666;
    padding-bottom: 5px;
    margin: 20px 0 10px 0;
    border-bottom: 1px solid #d8d8d8;
    width: 300px;
  }
  .left {
    display: inline-block;
  }
  .right {
    display: inline-block;
    margin-left: 50px;
  }
}
</style>
