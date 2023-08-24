import FilePreview from "./filePreview.vue";

FilePreview.install = function(Vue) {
  Vue.component(FilePreview.name, FilePreview);
};

export default FilePreview;
