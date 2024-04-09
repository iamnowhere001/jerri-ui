/****************************************************************************

所属系统: 组件库
所属模块: 上传组件
创建时间: 2020-01-02

***************************************************************************/
<template>
  <!-- 上传文件 -->
  <input type="file"
         ref="file"
         @change="parsingFile"
         :accept="accept"
         :multiple="isMany"
         hidden />
</template>

<script>
export default {
  name: "JrUpload",
  props: {
    // 触发图片选择
    isAdd: {
      default: 0,
      type: Number
    },
    // 重新上传文件的md5值
    reUploadId: {
      default: "",
      type: String
    },
    // 上传文件的标识
    uploadKey: {
      default: "",
      type: String
    },
    // 文件上传规则
    accept: {
      default: "",
      type: String
    },
    // 是否多选
    isMany: {
      default: false,
      type: Boolean
    },
    // 最大上传张数
    maxLen: {
      default: 1,
      type: Number
    },
    // 当前数组存在的长度
    listNum: {
      default: 0,
      type: Number
    },
    // 文件大小限制
    maxSize: {
      default: 200,
      type: Number
    },
    // 文件最小上传限制
    minSize: {
      default: 0,
      type: Number
    },
    // 删除文件MD5值
    delMd5: {
      default: "",
      type: String
    },
    // 默认系统代码
    businessCode: {
      required: true,
      type: String
    },
    // 默认上传时候是否开启loading
    isLoading: {
      default: true,
      type: Boolean
    },
    files: {
      default: ""
    },
    action: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      uploadList: {}
    };
  },
  watch: {
    /**
     * @desc 监听上传文件
     */
    files(data) {
      data && this.uploadFile(data);
    },
    /**
     * @desc 监听重新上传
     */
    reUploadId(id) {
      id && this.uploadFile(this.uploadList[id].allFile);
    },
    /**
     * @desc 删除文件
     */
    delMd5(id) {
      delete this.uploadList[id];
    }
  },
  methods: {
    /**
     * @desc 触发文件选择
     * @author 陈泽光
     */
    upload() {
      this.$refs.file.value = "";
      this.$refs.file.click();
    },
    /**
     * @desc 初始化上传的附件
     * @author 陈泽光
     */
    async parsingFile(event) {
      this.isDrag = false;
      let fileList = event.target.files;
      let fileListCp = [];
      const PIC_LIMIT = 20;
      if (this.listNum + fileList.length > this.maxLen) {
        // this.$msg("文件数量不能大于" + this.maxLen);
        this.$msg(this.$t("upload_文件数量不能大于{}", this.maxLen));
        this.$refs.file.value = "";
        return;
      }
      let farmatErrorCount = 0;
      let nameErrorCount = 0;
      let emptyCount = 0;

      for (var child of fileList) {
        let len = child.size / 1048576;
        if (child.type.includes("image") && len > PIC_LIMIT) {
          this.$msg(this.$t("upload_图片不能大于20M"), 1500, () => { }, {
            color: "dange"
          });
        } else {
          if (this.isPassName(this.accept, child)) {
            nameErrorCount++;
            continue;
          }
          //  传递参数不为 * 时，会对文件选择类型进行校验提醒
          if (
            !this.accept.includes("*") &&
            this.isPassFormat(this.accept, child)
          ) {
            farmatErrorCount++;
            continue;
          }
          if (!child.size) {
            emptyCount++;
            continue;
          }
          if (len > this.maxSize) {
            this.$msg(
              this.$t("upload_文件大小不能超过{}M", this.maxSize),
              1500,
              () => { },
              {
                color: "dange"
              }
            );
            continue;
          }
          if (this.minSize) {
            if (len < this.minSize) {
              this.$msg(
                this.$t("upload_文件大小不能小于{}M", this.minSize),
                1500,
                () => { },
                {
                  color: "dange"
                }
              );
              continue;
            }
          }
          fileListCp.push(child);
        }
      }
      // 统一格式校验提示
      farmatErrorCount &&
        this.$msg(this.$t("upload_已过滤{}个不符合格式文件", farmatErrorCount));

      // 统一空文件校验提示
      emptyCount && this.$msg(this.$t("upload_已过滤{}个空文件", emptyCount));

      // 统一命名校验提示
      nameErrorCount &&
        this.$msg(
          this.$t("upload_已过滤{}个命名超过100字符的文件", nameErrorCount)
        );
      // 校验视频编码格式
      let isFalg = false;
      for (let i = 0; i < fileListCp.length; i++) {
        let suffix = fileListCp[i].name.split(".").pop();
        isFalg = suffix === "exe" || suffix === "bat" ? true : false;
        if (!isFalg) {
          this.uploadFile(fileListCp[i]);
        }
      }
      if (isFalg) {
        this.$msg(this.$t("upload_文件格式有误"), 1500, () => { }, {
          color: "dange"
        });
      }
    },
    /**
     * 上传文件成功后
     * @res {Object} 文件的上传结果
     */
    uploadSuccess(res) {
      this.uploadList[res.fileMd5].uploadProess = 1;
      this.uploadList[res.fileMd5].url = res.fileUrl;
      setTimeout(() => {
        this.uploadList[res.fileMd5].animationClose = true;
      }, 120);
      let url = res.fileUrl;
      if (url) {
        let fileUrl =
          url.substring(0, url.lastIndexOf("/") + 1) +
          encodeURIComponent(url.substring(url.lastIndexOf("/") + 1));
        this.$emit("file-result", {
          fileMd5: res.fileMd5,
          conversionFileUrl: res.conversionFileUrl,
          fileUrl,
          key: this.uploadKey,
          suffix: res.suffix,
          fileKey: res.fileKey
        });
      } else {
        this.$emit("upload-err", {
          md5: res.fileMd5,
          key: this.uploadKey
        });
      }
    },
    /**
     * 上传文件
     * @file {Object File} 选择的本地文件File
     */
    uploadFile(file, fileKey) {
      this.isLoading && this.$loading();

      // 文件大小
      let fileSize = file.size;
      // 文件类型
      let fileType = file.name.replace(/.+\./, "").toLocaleLowerCase();
      fileType === "mp4" && (fileType = "flv");
      // 文件名称
      let fileAllName = file.name.split(".");
      let fileName = file.name.replace(`.${fileAllName.pop()}`, "");
      // 切片的序号
      let start = 0,
        end = 0;
      //切片的大小，一片1MB
      const LENGTH = 1 * 1024 * 1024;
      //建立一个空数组存放切片数据
      let list = [];
      //切片过程，存储切片内容
      while (start < fileSize) {
        end = start + LENGTH;
        //切割文件
        let chunk = file.slice(start, end);
        start = end;
        // 存放切片文件
        list.push(chunk);
      }
      new Promise(resolve => {
        //初始化第一片
        this.getMd5(list[0], resolve, fileName, fileType, file, fileKey, fileSize);
      }).then(async res => {
        if (res.type === 1) {
          this.uploadSuccess(res);
        } else {
          let completeMultipart = async () => {
            let uploadData = {
              uploadId: res.uploadId
            };
            let { data } = await this.completeMultipartUpload(
              uploadData,
              this.action
            );

            this.$emit("file-result", {
              fileMd5: res.fileMd5,
              conversionFileUrl: data.conversionFileUrl,
              fileUrl: data.fileUrl,
              key: this.uploadKey,
              fileKey: res.fileKey,
              suffix: data.suffix
            });
          };
          if (res.partList.length === list.length) {
            completeMultipart();
            return;
          }
          let num = 0;
          let upload = async i => {
            let isFalg = false,
              isNext = false;

            if (res.partList.length && i < res.partList.length) {
              isFalg = true;
              num = res.partList.length;
              upload(num);
              return;
            }

            if (!isFalg) {
              let obj = {
                formFile: list[i],
                partNumber: i + 1,
                uploadId: res.uploadId
              };
              await this.uploadPart(obj, this.action).catch(() => {
                // 抛出上传错误提示
                this.$emit("upload-err", {
                  md5: res.fileMd5,
                  key: this.uploadKey
                });
                isNext = true;
                return;
              });
              if (!isNext) {
                if (this.uploadList[res.fileMd5]) {
                  let proess = (num / list.length).toFixed(2);
                  this.uploadList[res.fileMd5].uploadProess = proess;
                  this.$emit("file-progress", {
                    proess: +proess,
                    md5: res.fileMd5,
                    key: this.uploadKey,
                    fileKey: res.fileKey
                  });
                  num++;
                  //最后一个上传完就合并
                  num === list.length ? completeMultipart() : upload(num);
                }
              }
            }
          };
          upload(0);
        }
      });
    },
    /**
     * @desc 上传合并分片数据
     */
    completeMultipartUpload(data, API_URI) {
      return this.$utils.formAjax({
        url: `${API_URI}/api/fp5/upload/v1/CompleteMultipartUpload`,
        data
      });
    },
    // 上传分片
    uploadPart(data, API_URI) {
      return this.$utils.formAjax({
        url: `${API_URI}/api/fp5/upload/v1/UploadPart`,
        data
      });
    },
    /**
     * md5解析
     * @file {Object File} 第一片File文件
     * @resolve {Object} promise resolve状态，需要触发结束
     * @fileName {String} 文件名称
     * @fileType {String} 文件类型
     * @allFile {Object File} 文件类型
     */
    async getMd5(file, resolve, fileName, fileType, allFile, fileKey, fileSize) {
      /***
       * 由于截取的是第一片的MD5，会有低概率出现，修改了文件，第一片文件的MD5值不改变
       * 所以添加文件最后一次修改时间的后四位来添加标识,确保文件修改后文件就是新的
       */
      let lastEditMD5 = allFile.lastModified.toString().substr(-4);

      // 不存在就加载第三方资源 存在则不加载
      if (!window["SparkMD5"]) {
        await this.$utils.getSource(
          "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/js-spark-md5.js",
          true
        );
      }
      //  初始化文件md5方法
      let spark = new window.SparkMD5();
      let fileReader = new FileReader();
      let falg = !!this.reUploadId;
      fileReader.readAsDataURL(file);
      //文件读取完毕之后的处理
      fileReader.onload = async e => {
        spark.appendBinary(e.target.result);
        let md5 = spark.end().substring(0, 28) + lastEditMD5;
        let fileInfo = {
          fileName,
          fileType,
          file,
          md5,
          allFile,
          fileSize,
          uploadProess: 0,
          key: this.uploadKey
        };

        this.$set(this.uploadList, md5, fileInfo);
        // 第一片MD5,初始化分片上传
        let obj = {
          fileName: fileName,
          fileMd5: md5,
          suffix: fileType,
          businessCode: this.businessCode
        };
        try {
          let data = await this.initUploadPart(obj, this.action);
          !falg && this.$emit("add-file", fileInfo);

          let parameter = {
            fileMd5: md5,
            uploadId: data.data.uploadId,
            type: data.data.resultType,
            suffix: fileType,
            partList: [],
            conversionFileUrl: data.data.conversionFileUrl,
            fileName,
            fileKey
          };
          switch (data.data.resultType) {
            //之前已经上传完成，直接返回地址
            case 1:
              parameter.fileUrl = data.data.fileUrl;
              break;
            //之前上传过但没上传完成，返回之前上传过的片数
            case 2:
              parameter.partList = data.data.partList;
              break;
          }
          resolve(parameter);
        } catch (error) {
          this.$msg(this.$t("upload_网络异常"));
          this.$emit("upload-err", {
            md5: md5,
            key: this.uploadKey
          });
          this.$loading(false);
        }
        this.$loading(false);
      };
    },

    //初始化分片上传
    initUploadPart(data, API_URI) {
      return this.$utils.formAjax({
        url: `${API_URI}api/fp5/upload/v1/InitUploadPart`,
        data
      });
    },

    /**
     * @desc 校验上传的格式是否符合要求
     * @param {String} accept 接收的格式类型
     * @param {String} target 校验的目标格式
     */
    isPassFormat(accept, target) {
      let res = false;
      if (target.name.indexOf(".")) {
        let format = target.name.replace(target.name, val => {
          let res = val.split(".");
          return `${res[res.length - 1].toLocaleLowerCase()}`;
        });
        res = accept.indexOf(format) > -1 ? false : true;
      }
      return res;
    },

    /**
     * @desc 校验上传的名字是否符合100字符
     * @param {String} accept 接收的格式类型
     * @param {String} target 校验的目标格式
     */
    isPassName(accept, target) {
      let res = false;
      if (target.name.indexOf(".")) {
        const LIMIT_LENGTH = 100;
        let name = target.name.substring(0, target.name.lastIndexOf("."));
        return name.length > LIMIT_LENGTH;
      }
      return res;
    }
  }
};
</script>
