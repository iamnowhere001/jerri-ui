/****************************************************************************

所属系统: 组件库
所属模块: 后缀类型数据
创建时间: 2019年12月27日 11:10:55
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

// 图片类型
export let imgArr = ["png", "jpg", "bmp", "webp", "gif", "jpeg"];
// 视频类型
export let videoArr = ["mp4", "avi", "rmvb", "mkv", "flv", "wmv", "mov"];
// 音频类型
export let audioArr = ["mp3", "wav"];
// 可预览其他文件后缀
export let canPreviewArr = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
];
// 有图片的文件类型
export let hasImgArr = [
  ...canPreviewArr,
  "ai",
  "cdr",
  "psd",
  "id",
  "rar",
  "zip",
];