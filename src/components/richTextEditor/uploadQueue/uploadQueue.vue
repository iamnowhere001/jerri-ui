/****************************************************************************

所属系统: 组件库
所属模块: 富文本编辑器—[上传队列]
创建时间: 2019年11月25日 09:17:24

***************************************************************************/
<template>
  <!-- 素材上传队列 -->
  <div v-show="hasSource && show"
       class="source-upload-wrap">
    <h3 class="source-upload-title">
      {{translate('richTextEditor_选择素材')}}
      （
      <span v-if="uploadAllCompleted">{{translate('richTextEditor_上传完成')}}</span>
      <span v-else>{{translate('richTextEditor_正在上传')}} {{complateLen}}/{{sourceQueue.list.length}}</span>
      ）
      <span class="scale"
            :class="sourceQueue.isExtra ? 'close' : 'open'"
            @click="$set(sourceQueue, 'isExtra', !sourceQueue.isExtra)"></span>
    </h3>
    <div v-show="sourceQueue.isExtra">
      <p class="source-upload-tip">{{translate('richTextEditor_素材上传完成后，请在文章中选择任意位置插入')}}</p>
      <ul class="source-upload-list"
          :style="{
            maxHeight: uploadListMaxHeight + 'px'
          }">
        <!-- 单个上传项 -->
        <li v-for="(source, i) in sourceQueue.list"
            :key="i">
          <div class="upload-item-thumbnail"
               :class="{
                  video: source.fileType === 'video',
                  shade: (source.progress < 1 || source.imgError)
                }">
            <div class="img-wrap">
              <img v-show="source.snapshotUrl && !source.imgError"
                   @error="$set(source, 'imgError', true)"
                   @load="$set(source, 'imgError', false)"
                   :src="source.snapshotUrl" />
            </div>
          </div>
          <div class="upload-item-info">
            <!-- 文件名称 -->
            <span class="file-name">
              {{source.name}}
            </span>
            <!-- 文件名称 -->
            <div v-if="source.progress !== 1">
              <!-- 上传进度 -->
              <p class="progress">
                <span class="progress-bar"
                      :style="{ width: (source.progress * 100) + `%`}"></span>
              </p>
              <!-- 上传进度 -->
              <!-- 上传速度 -->
              <p class="upload-speed">
                上传速度：{{source.speed}}{{source.speedUnit}}
                <span class="percent">
                  {{~~(source.progress * 100)}}%
                </span>
              </p>
              <!-- 上传速度 -->
            </div>
            <div class="upload-item-operate"
                 v-else>
              <span class="success"
                    v-if="canInsert(source)"
                    @click="editorInsertSource(source)">
                {{translate('richTextEditor_插入文中')}}
              </span>
              <span v-if="showDecoding(source)"
                    class="fail text">
                {{translate('richTextEditor_视频解码中...')}}
              </span>
              <span class="fail"
                    @click="delSource(source)">
                {{translate('richTextEditor_从列表删除')}}
              </span>
            </div>
            <!-- 上传速度 -->
          </div>
        </li>
        <!-- 单个上传项 -->
      </ul>
    </div>
  </div>
  <!-- 素材上传队列 -->
</template>

<script>
import { safeGet } from "../../../utils/data";
// 多语言转换方法
import { translate } from "../../../assets/constants/lang";
window.videoLoadSuccessQueue = [];

/**
 * @desc 资源加载完毕事件
 * 为兼容旧项目 保存两个方法名称
 * sourceLoaded
 * videoLoadedmetadata
 *
 * @param {Event} event 响应事件
 * @param {Boolean} setValueNotScroll 设置内容不滚动
 */
window.sourceLoaded = window.videoLoadedmetadata = function(event, setValueNotScroll) {
  const $target = event.target;
  //  视频标签，设置封面属性
  if ($target.tagName === "VIDEO") {
    const width = $target.videoWidth || $target.clientWidth;
    $target.poster = `${$target.src}?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_1000,f_jpg,w_${width},m_fast`;
  }
  window.videoLoadSuccessQueue.push({
    vm: safeGet($target, "parentNode.parentNode.vm"),
    setValueNotScroll
  });
};

export default {
  data() {
    return {
      //  展示
      show: true,
      //  素材队列
      sourceQueue: {
        list: [],
        isExtra: true
      },
      //  加载成功视频数组
      videoLoadSuccessQueue,
      //  已注册的编辑器们
      registerVMs: {},
      translate
    };
  },
  computed: {
    //  允许插入
    canInsert(source) {
      return source => {
        if (source.fileType === "video") {
          return source.progress === 1 && source.decoded;
        } else {
          return source.progress === 1;
        }
      };
    },
    //  展示解码中
    showDecoding(source) {
      return source => {
        return source.fileType === "video" && !source.decoded;
      };
    },
    //  上传列表最大高度
    uploadListMaxHeight() {
      return document.documentElement.clientHeight - 150;
    },
    //  存在素材
    hasSource() {
      return this.sourceQueue.list.length;
    },
    //  上传成功的数量
    complateLen() {
      return this.sourceQueue.list.filter(source => source.progress === 1)
        .length;
    },
    //  全部上传完成
    uploadAllCompleted() {
      return !this.sourceQueue.list.some(source => source.progress !== 1);
    },
    //  已注册组件实例
    registerVms() {
      return Object.values(this.registerVMs);
    }
  },
  watch: {
    /**
     * @desc 观察资源队列长度的变化，并执行编辑器高度计算方法
     */
    videoLoadSuccessQueue(videoLoadSuccessQueue) {
      let { vm, setValueNotScroll } = videoLoadSuccessQueue.last;

      const vms = this.registerVms;
      //  如找不到实例，说明内容插入的标签层级不符合规则，但此时为保险起见，默认选择第一个注册的实例执行高度计算方法
      if (!vm) {
        vm = vms[0];
      }
      //  如带入了不自动滚动参数，也一并传递过去
      const args = setValueNotScroll ? [setValueNotScroll] : [];
      vm.toggleAutoHeight.apply(this, args);
    }
  },
  created() {
    window.uploadQueueComponent = this;
  },
  methods: {
    /**
     * @desc 注册组件实例
     * @param {Object} vm 组件实例
     * @param {String} editorName 编辑器名称
     */
    register(vm, editorName) {
      this.registerVMs[editorName || instance.$options.name] = vm;
    },
    /**
     * @desc 改变当前激活的组件实例
     * @param {Object} vm 组件实例
     */
    changeActiveVM(vm) {
      this.activeVM = vm;
    },
    /**
     * @desc 获取当前活动的组件实例
     */
    getActiveEditor() {
      const vms = this.registerVms;
      const vm = this.activeVM || vms[0];
      return vm;
    },
    /**
     * @desc 编辑器插入资源
     * @param {Object} source 资源
     */
    editorInsertSource({ fileUrl, fileType }) {
      const vm = this.getActiveEditor();
      switch (fileType) {
        case "image":
          this.editorInsertImg(vm, fileUrl);
          break;

        case "video":
          this.editorInsertVideo(vm, fileUrl);
          break;
      }
    },
    /**
     * @desc 富文本内插入图片
     * @param {String} url 图片地址
     */
    editorInsertImg(vm, url) {
      const styles = [
        vm.imgMaxWidth ? `max-width:${vm.imgMaxWidth}` : "",
        vm.imgMaxHeight ? `max-height:${vm.imgMaxHeight}` : "",
        vm.fullWidthImg ? `width: 100%` : ""
      ]
        .filter(style => style)
        .join(";");

      const html = `<p><img src="${url}" style="max-width:100%;${styles}" onload="sourceLoaded(event)"/></p>`;
      vm.editor.cmd.do("insertHTML", html);
    },
    /**
     * @desc 富文本内插入视频
     * @param {String} url 视频地址
     */
    editorInsertVideo(vm, url) {
      const styles = [
        vm.imgMaxWidth ? `max-width:${vm.imgMaxWidth}` : "",
        vm.imgMaxHeight ? `max-height:${vm.imgMaxHeight}` : "",
        vm.fullWidthImg ? `width: 100%` : ""
      ]
        .filter(style => style)
        .join(";");

      const html = `<p><video src="${url}" webkit-playsinline="true" controlslist="nodownload" playsinline="true" onloadedmetadata="sourceLoaded(event)" controls="controls" style="max-width:100%; object-fit: fill;${styles}">您的浏览器不支持 video 标签</video><br></p>`;
      vm.editor.cmd.do("insertHTML", html);
    },
    /**
     * @desc 素材队列中删除素材
     * @param {Object} source 素材
     */
    delSource(source) {
      this.sourceQueue.list.some((videoItem, index, arr) => {
        if (source.uploadTime === videoItem.uploadTime) {
          arr.splice(index, 1);
          return true;
        }
      });
    }
  }
};
</script>
<style scoped lang='scss'>
@import "./uploadQueue.scss";
</style>
