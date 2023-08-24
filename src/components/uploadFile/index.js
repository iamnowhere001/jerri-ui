import UploadFile from './uploadFile.vue'

UploadFile.install = function (Vue) {
  Vue.component(UploadFile.name, UploadFile)
}

export default UploadFile;
