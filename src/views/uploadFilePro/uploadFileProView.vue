<template>
  <jr-container title="新文件上传">
    <div class="upload-wrap">
      <h2 class="j-pt-20">基本上传</h2>
      <jr-upload-file-pro
        :accept="acceptImg"
        :businessCode="businessCode"
        :action="action"
        :maxLen="10"
        :maxSize="2000"
        isMany
        :readFiles="readFiles"
        @preview-file="previewFile"
        @get-files="getFiles"
      >
      </jr-upload-file-pro>
      <h2 class="j-pt-20">只读 一行4个</h2>
      <div style="width:306px">
        <jr-upload-file-pro
          :accept="acceptImg"
          :businessCode="businessCode"
          :action="action"
          :maxLen="10"
          :maxSize="2000"
          :bankCount="4"
          isMany
          isRead
          :isDownload="false"
          :readFiles="readFiles2"
          @preview-file="previewFile"
          @get-files="getFiles"
        ></jr-upload-file-pro>
      </div>
      <h2 class="j-pt-20">所有文件向上排 这就是插槽</h2>
      <div class="slot-box">
        <jr-upload-file-pro
          :accept="acceptImg"
          :businessCode="businessCode"
          :action="action"
          :maxLen="10"
          :maxSize="2000"
          isMany
          allFilesUpSort
          :readFiles="readFiles"
          @preview-file="previewFile"
          @get-files="getFiles"
        >
          <template #file-name-after="{index,item}">
            <div class="j-pl-20">
              文件名后面插槽：{{ index }}{{ item.fileNmae }}
            </div>
          </template>
          <template #file-after="{index,item}">
            <div class="file-after">文件后面插槽：{{ index }}{{ item }}</div>
          </template>
          <template #file-del>
            <i class="j-icon icon-del"></i>
          </template>
        </jr-upload-file-pro>
      </div>

      <h2 class="j-pt-20">最多上传1个文件</h2>
      <jr-upload-file-pro
        :accept="acceptImg"
        :businessCode="businessCode"
        :action="action"
        :maxLen="1"
        :maxSize="2000"
        isMany
        :readFiles="readFiles3"
        @preview-file="previewFile"
        @get-files="getFiles"
      ></jr-upload-file-pro>

      <h2 class="j-pt-20">可下载文件</h2>
      <jr-upload-file-pro
        :accept="acceptImg"
        :businessCode="businessCode"
        :action="action"
        :maxLen="10"
        :maxSize="2000"
        isMany
        isRead
        :beforePreview="beforePreview"
        :readFiles="readFiles2"
        @preview-file="previewFile"
        @get-files="getFiles"
      ></jr-upload-file-pro>
    </div>
  </jr-container>
</template>

<script>
export default {
  name: "uploadFileProView",
  label: "新文件上传操场",
  data() {
    return {
      // 上传路径
      action: "//192.168.99.29:8200/",
      // 业务代码
      businessCode: "NS",
      // 图片上传接收格式
      acceptImg: "*",
      // 文件上传接收格式
      accept:
        ".xls,.docx,.txt,.pdf,.png,.mp4,.psd,.ptt,.rar,.jpg,.avi,.wmv,.jpeg",
      // 是否显示文件名称
      showName: true,
      // 只读数组
      readFiles: [],
      // 只读文件列表
      readFiles2: [
        {
          fileName: "视频",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/6c976aafbe0d478e0f48cc249aeaf36e/03000801005D9FF6B818403003E8808101508D-617C-4396-BE3B-5D0053D19AFA.mov",
        },
        {
          fileName: "桑拿",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/810d3c7f3cce3fe9aa34db88c0ec8080/6dc1761ed21b0ef4b9c0ffecd0c451da81cb3e5f.jpg",
        },
        {
          fileName: "1.0坐席设置",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/c728685fefc112cd06e7901db42345d2/03000801005DDFAFF31B3171897689DA3AE560-6D6D-4DD9-84F1-759DC6C5D548.mov",
        },
        {
          fileName: "视频",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/6c976aafbe0d478e0f48cc249aeaf36e/03000801005D9FF6B818403003E8808101508D-617C-4396-BE3B-5D0053D19AFA.mov",
        },
        {
          fileName: "桑拿",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/123.JPEG",
        },
        {
          fileName: "汇总",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com//ns/22a1dbe55b6ceec84edfdf88a5c24315/权限api汇总.txt",
        },
        {
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com//ns/f799f5ace554ba1284fbca53b4e82838/杨梅红画院任务分解表-V1.0.xlsx",
          fileName: "分解表",
        },
      ],
      readFiles3: [],
    };
  },
  methods: {
    /**
     * @desc 获取上传的文件
     * @param {Array} files 对象数组
     * @author 徐勇
     * @date 2020年05月23日 09:42
     */
    getFiles(files) {
      console.log(files);
      this.readFiles = files;
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
    beforePreview() {
      // return false;
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
  },
};
</script>

<style lang="scss" scoped>
.upload-wrap {
  width: 900px;

  // 插槽样式
  .slot-box {
    /deep/.jr-upload-file-pro {
      .up-sort-files {
        li {
          padding: 20px;
          border: 1px solid $--color-c3;
          border-radius: 3px;
          background-color: $--color-c6;
          &.up-sort-item-err {
            border: 1px solid $--color-c11;
          }
          .icon-del {
            color: $--color-c18;
            &:hover {
              color: $--color-c9;
            }
          }
        }
      }
      .file-after {
        margin-top: 20px;
      }
    }
  }
}
</style>
