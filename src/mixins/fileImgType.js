/****************************************************************************

所属系统: 组件库
所属模块: 根据文件后缀显示文件类型图片
创建时间: 2020年07月24日 19:52:07


***************************************************************************/
// 导入后缀类型数据 有图片类型后缀
import {
  videoArr,
  audioArr,
  hasImgArr,
  imgArr,
  canPreviewArr,
} from "../assets/constants/fileSuffixes";
export default {
  methods: {
    /**
     * @desc 根据文件类型展示图片
     * @param {String} fileTypes 文件类型
     * @param {String} size 大图还是小图
     * @author 陈宇奇
     * @date 2020年07月01日 09:05:00
     */
    $_fileImgType_getSrc(fileType, size = "big") {
      // 存放图片文件夹
      const folder = size === "big" ? "uploadFile" : "small-file";
      let imgName = fileType;
      // 多文件类型用同张图片
      switch (fileType) {
        case "docx":
          imgName = "doc";
          break;
        case "xlsx":
          imgName = "xls";
          break;
        case "pptx":
          imgName = "ppt";
          break;
        case "rar":
          imgName = "zip";
          break;
        default:
          if (imgArr.includes(fileType)) {
            // 图片
            imgName = "pic";
          } else if (videoArr.includes(fileType)) {
            // 视频
            imgName = "video";
            // 音频
          } else if (audioArr.includes(fileType)) {
            imgName = "voice";
          } else {
            // 不存在文件图片则是未知图片
            !hasImgArr.includes(fileType) && (imgName = "unknow");
          }
          break;
      }
      return require(`../assets/images/${folder}/i_${imgName}_${size}.png`);
    },
    /**
     * @desc 打开文件预览地址
     * @param {String} url 文件地址
     * @author 陈宇奇
     * @date 2020年07月28日 15:15:23
     */
    async $_fileImgType_openUrl(url) {
      const suffix = this.$utils.fileSuffix(url),
        { action } = this.$attrs;
      if (!action) {
        this.$msg("请配置预览路径地址");
        return;
      }
      if (canPreviewArr.includes(suffix)) {
        // 可预览文件
        this.$loading();
        try {
          let { data } = await this.$utils.formAjax(
            {
              url: `${action}api/NS2/mail/v1/PreviewOfficeFile?url=${url}`,
              headers: {
                "SSO-Token": localStorage.token,
              },
            },
            "get"
          );
          this.$loading(false);
          // 打开文件预览
          window.open(data);
        } catch (err) {
          // 请求失败关闭loading
          this.$loading(false);
          this.$messageBox({ tip: "系统错误" });
        }
      } else {
        this.$msg("无法预览此文件", 1500, () => {}, {
          color: "dange",
        });
      }
    },
  },
};
