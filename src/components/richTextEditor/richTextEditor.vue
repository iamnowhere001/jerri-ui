<!--
/****************************************************************************

所属系统: 组件库
所属模块: 富文本编辑器

***************************************************************************/
-->
<template>
  <div class="content" :style="{ width: editorWidth }">
    <!-- 富文本编辑框内容 -->
    <div class="write-wrap" ref="writeWrap">
      <div :id="editorName + '-toolbar'" ref="toolbar" v-show="showTools"></div>
      <div
        :id="editorName + '-write'"
        class="write-box"
        :class="{ 'auto-height': autoHeight }"
        ref="writeBox"
        @click="showPlaceholder = false"
        v-clickoutside="togglePlaceholder"
        :style="{ height: editorHeight }"
      >
        <div class="w-e-placeholder" v-if="placeholder && showPlaceholder">
          {{ placeholder }}
        </div>
      </div>
    </div>
    <!-- 富文本编辑框内容 -->

    <!-- 上传组件 -->
    <jr-upload
      ref="jrUpload"
      accept=".jpg,.jpeg,.png"
      :isMany="true"
      :maxLen="6"
      :listNum="0"
      :maxSize="20"
      :businessCode="businessCode"
      :action="action"
      @file-result="getResult"
      @file-progress="getProgress"
      @upload-err="uploadError"
    >
    </jr-upload>
  </div>
</template>
<script>
//  上传队列弹窗
import uploadQueue from "./uploadQueue/index";
//  格式化HTML为内容
import formatHtml2Value from "./formatHtml2Value";
// 多语言转换方法
import { translate } from "../../assets/constants/lang";
export default {
  name: "JrRichtextEditor",
  data() {
    return {
      //  编辑器名称
      editorName:
        new Date().getTime().toString(36) +
        Math.random()
          .toString(36)
          .substring(2),
      //  展示placeholder
      showPlaceholder: false,
      //  编辑区DOM节点
      editorDOM: "",
      // 工具栏是否已经吸顶
      isFixedToolBar: false,
      //  额外高度
      additionalHeight: 0,
      //  上一个活动区域是本编辑器
      lastActiveElementIsMe: false,
      //  上传队列组件
      uploadQueueComponent: uploadQueue(),
      translate
    };
  },
  props: {
    // 上传地址参数
    action: {
      type: String,
    },
    // 上传地址参数
    businessCode: {
      type: String,
    },
    //  展示工具栏
    showTools: {
      type: Boolean,
      default: true,
    },
    //  禁用编辑器
    disabled: {
      type: Boolean,
      default: false,
    },
    //  编辑器宽度
    width: {
      type: String,
      default: "100%",
    },
    //  编辑器高度
    height: {
      type: String,
      default: "450px",
    },
    //  是否需要动态设置编辑器高度
    autoHeight: Boolean,
    //  双向绑定接收参数
    value: {
      type: String,
      default: "",
    },
    //  粘贴后是否过滤样式
    pasteFilterStyle: {
      type: Boolean,
      default: true,
    },
    //  自定义粘贴
    customPasteHandle: {
      type: [Function, Object],
    },
    //  placeholder
    placeholder: String,
    //  图片最大宽度
    imgMaxWidth: String,
    //  图片最大高度
    imgMaxHeight: String,
    //  全宽图片
    fullWidthImg: Boolean,
    //  默认不聚焦在编辑器内
    noFocusInEditor: Boolean,
    //  固定工具栏
    fixedToolBar: {
      type: Boolean,
      default: true,
    },
    //  固定距离
    fixedDistance: {
      type: Number,
      default: 0,
    },
    //  默认菜单
    menus: {
      type: Array,
      default() {
        return [
          //  标题
          "head",
          //  行高
          "lineHeight",
          //  粗体
          "bold",
          //  字号
          "fontSize",
          //  字体
          "fontName",
          //  斜体
          "italic",
          //  下划线
          "underline",
          //  删除线
          "strikeThrough",
          //  文字颜色
          "foreColor",
          //  背景颜色
          "backColor",
          //  列表
          "list",
          //  对齐方式
          "justify",
          //  引用
          "quote",
          //  插入素材
          "source",
          //  表格
          "table",
          //  撤销
          "undo",
          //  重复
          "redo",
        ];
      },
    },
  },
  computed: {
    //  编辑器宽度
    editorWidth() {
      const width = this.width;
      return isNaN(width) ? width : width + "px";
    },
    //  编辑器高度
    editorHeight() {
      const height = this.getNumber(this.height);
      return this.additionalHeight + height + "px";
    },
  },
  watch: {
    //  禁用编辑器
    disabled: {
      immediate: true,
      handler(disabled) {
        this.$nextTick(() => {
          // this.editor.$textElem.attr("contenteditable", !disabled);
        });
      },
    },
  },
  mounted() {
    //  初始化编辑器
    this.createEditor();
    //  监听富文本编辑器键盘输入事件
    this.$utils.on(this.$refs.writeBox, "keydown", this.writeBoxKeydown);

    //  粘贴内容后需要自动撑开高度
    this.$utils.on(this.$refs.writeBox, "paste", this.toggleAutoHeight);

    //  监听 滚动 事件
    this.$utils.on(document, "scroll", this.toggleFixedToolbar);

    //  监听 全局点击 事件
    this.$utils.on(document, "click", this.blurFocus);

    //  记录默认编辑器距离页面顶部偏移量
    this.recordEditorOffset2Body();
  },
  destroyed() {
    //  取消监听事件
    this.$utils.off(this.$refs.writeBox, "keydown", this.writeBoxKeydown);
    this.$utils.off(this.$refs.writeBox, "paste", this.toggleAutoHeight);
    this.$utils.off(document, "scroll", this.toggleFixedToolbar);
    this.$utils.off(document, "click", this.blurFocus);
  },
  methods: {
    /**
     * @desc 判断编辑器聚焦或失焦
     */
    blurFocus() {
      //  点击元素非自身编辑区域
      if (
        window.document.activeElement !== this.editorDOM &&
        this.lastActiveElementIsMe
      ) {
        this.lastActiveElementIsMe = false;
        this.$emit("jr-blur");
      }
      //  点击元素为自身编辑区域
      else if (
        window.document.activeElement === this.editorDOM &&
        !this.lastActiveElementIsMe
      ) {
        this.uploadQueueComponent.changeActiveVM(this);
        this.lastActiveElementIsMe = true;
        this.$emit("jr-focus");
      }
    },
    /**
     * @desc 记录编辑器到页面顶部的实际偏移量
     */
    recordEditorOffset2Body() {
      this.editorOffset2Body = this.$refs.writeWrap.getBoundingClientRect().top;
    },
    /**
     * @desc 编辑区域输入事件
     * @param {Event} event 事件
     */
    writeBoxKeydown(event) {
      if (event.key !== "Backspace") {
        this.showPlaceholder = false;
      }
      //  需要动态高度？
      this.toggleAutoHeight(false, event.key);
    },
    /**
     * @desc 追加素材队列
     * @param {Array} list 素材队列
     */
    addSourceQueue(list) {
      const sourceList = this.$utils.deepCopy(list);
      sourceList.forEach((source) => {
        if (source.fileUrl) {
          source.progress = 1;
          switch (source.fileType) {
            case "image":
              source.snapshotUrl = source.fileUrl;
              break;

            case "video":
              source.decoded = true;
              source.snapshotUrl =
                source.fileUrl +
                `?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast,ar_auto`;
              break;
          }
        }
      });
      this.uploadQueueComponent.sourceQueue.list = [
        ...this.uploadQueueComponent.sourceQueue.list,
        ...sourceList,
      ];
    },
    /**
     * @desc 获取确切的数值
     */
    getNumber(height) {
      return +(isNaN(height) ? height.split("px")[0] : height);
    },
    /**
     * @desc 初始化编辑器
     * @author 陈泽光
     */
    async createEditor() {
      if (!window["wangEditor"]) {
        this.$utils.getSource(
          "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/wangEditor/wangEditor.css",
          true
        );
        await this.$utils.getSource(
          "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/wangEditor/wangEditor.js",
          true
        );
      }

      //  实例化wangEditor
      this.editor = new wangEditor(
        `#${this.editorName}-toolbar`,
        `#${this.editorName}-write`
      );

      //  上传图片展示为base64
      this.editor.customConfig.uploadImgShowBase64 = true;

      //  富文本编辑器z-index
      this.editor.customConfig.zIndex = 1;

      //  存在自定义粘贴配置
      if (this.customPasteHandle) {
        this.editor.customConfig.customPasteHandle = (...args) => {
          this.customPasteHandle.apply(this, [...args, this]);
        };
      }

      this.editor.customConfig.pasteFilterStyle = this.pasteFilterStyle;

      //  默认菜单项
      this.editor.customConfig.menus = this.menus;

      //  触发改变事件间隔
      this.editor.customConfig.onchangeTimeout = 0;

      //  改变事件回调
      this.editor.customConfig.onchange = (html) => {
        //  需要展示placeholder？
        this.togglePlaceholder();
        //  双向绑定更新事件
        this.$emit("input", html);
      };

      //  素材上传事件回调
      this.editor.customConfig.customUploadSource = this.customUploadSource;
      //  在配置中挂载此组件实例
      this.editor.customConfig.vm = this;
      //  创建实例
      this.editor.create();

      //  保存编辑区域DOM节点
      this.editorDOM = this.editor.$textElem[0];

      //  编辑区域DOM节点挂载此组件实例
      this.editorDOM.vm = this;

      //  存在内容，设置默认内容，但首次设置内容不需要自动滚动，所以 setEditorVal 第二个参为true
      if (this.value) {
        this.setEditorVal(this.value, true, true);
      }

      //  切换展示placeholder
      this.togglePlaceholder();

      //  注册此组件实例到上传队列弹窗
      this.uploadQueueComponent.register(this, this.editorName);

      //  如设置不自动聚焦在编辑器
      setTimeout(() => {
        //  且页面进来后，当前活动区域刚好为此编辑器
        if (
          this.noFocusInEditor &&
          window.document.activeElement === this.editorDOM
        ) {
          //  取消聚焦在编辑器内
          document.activeElement.blur();
        }
      }, 0);
    },
    
    /**
     * @desc 素材上传事件回调
     * @param {Array} files 文件集合
     */
    customUploadSource(files) {
      let uploadTime = new Date().getTime();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = file.type.split("/")[0];
        const mSize = file.size / 1024 / 1024;

        switch (fileType) {
          case "image":
            //  大于20M
            if (mSize > 20) {
              return this.$msg(this.translate("richTextEditor_图片大小不能超过20M"));
            }
            break;

          case "video":
            //  大于1G
            if (mSize > 1024) {
              return this.$msg(this.translate("richTextEditor_视频大小不能超过1G"));
            }
            break;
        }

        uploadTime++;

        /**
         * 用getTime作为此上传对象的标记
         * 有一个好处是，还能顺便拿这个值在每次的进度回调进行减去，计算上传速度
         */
        const sourceItem = {
          //  文件名称
          name: file.name,
          //  上传的时间
          uploadTime,
          //  此文件的类型
          fileType,
          //  文件大小，以KB为单位
          megabyte: file.size / 1024,
          //  进度
          progress: 0,
          //  文件地址
          fileUrl: "",
          //  快照地址
          snapshotUrl: "",
          //  上传速度
          speed: 0,
          //  上传速度单位
          speedUnit: "KB/s",
          //  上传进度计时器
          timer: setInterval(() => {
            let currentTime = new Date().getTime();
            let currentByte = sourceItem.progress * sourceItem.megabyte;
            let useTime = currentTime - sourceItem.uploadTime;

            if (currentByte / 1024 > 0) {
              sourceItem.speedUnit = `MB/s`;
            } else {
              sourceItem.speedUnit = `KB/s`;
            }

            this.$set(sourceItem, "speed", (currentByte / useTime).toFixed(2));
          }, 1000),
        };
        if (this.uploadQueueComponent.sourceQueue.list.length < 50) {
          this.uploadQueueComponent.sourceQueue.list.push(sourceItem);
          this.$refs.jrUpload.uploadFile(file, { uploadTime, fileType });
        } else {
          this.$msg(this.translate("richTextEditor_上传素材不得大于50条"));
          break;
        }
      }
    },
    /**
     * @desc 动态设置编辑区高度
     * 触发条件：
     * 1. 在输入内容后
     * 2. 在粘贴事件触发后
     * 3. 在设置编辑器内容后
     *
     * 会进行的操作：
     * 1. 自动撑开编辑器高度
     * 2. 滚动到光标所处位置
     *
     * 滚动到光标所处位置的条件：
     * 光标处于非可视区域中
     *
     * 如光标处于 屏幕上方，滚动位置应该以页面顶部与文本行平齐
     * 如光标处于 屏幕下方，滚动位置应该以页面底部与文本行平齐
     *
     * @param {Boolean} setValueNotScroll 设置内容后不滚动
     * @param {String} key 按键/输入类型
     */
    toggleAutoHeight(setValueNotScroll, key) {
      //  未设置自动高度 或 不存在内容标签
      if (!this.autoHeight || !this.editorDOM.childElementCount) {
        return;
      }

      //  @Mark: August - 因contenteditable特殊性，必须要等待界面更新完毕才能正确计算编辑区高度
      setTimeout(() => {
        //  编辑区最后一行
        const lastChild = this.$utils.getBlockLastChild(this.editorDOM);
        //  编辑区
        const writeBox = this.$refs.writeBox;
        //  编辑区的内边距
        const writeBoxPadding = 20;
        //  编辑器高度
        const height = this.getNumber(this.height);
        //  编辑器最后一行距离编辑区顶部的偏移量
        const lastChildOffset = lastChild.offsetTop + lastChild.offsetHeight;

        //  如最后一行节点距离编辑区顶部的偏移量 加 内边距 大于 设置的编辑器高度，说明需要增加额外高度
        if (lastChildOffset > height) {
          this.additionalHeight = lastChildOffset + writeBoxPadding - height;
        }
        //  否则不需要额外高度
        else {
          this.additionalHeight = 0;
        }

        //  @Todo: August - 此处手动执行ctrl事件，触发高度更新
        setTimeout(() => {
          this.editorDOM.pressKey("ctrl");
        }, 0);
        //  @Todo: August - 下面的光标定位代码暂时不使用
        return false;

        //  当前输入位置着落点
        const currentPositionNode = document.createElement("span");
        //  插入临时标签到输入位置着落点
        this.editor.selection.getRange().insertNode(currentPositionNode);
        //  当前内容行
        const currentRow = currentPositionNode.parentElement;
        //  当前输入位置距离页面顶部距离
        let currentPositionNodeTop = currentRow.getBoundingClientRect().top;
        //  当前输入位置距离父级标签顶部距离
        let currentPositionNodeOffsetTop = currentRow.offsetTop;
        //  特殊键位——回车时，需要手动切换为下一行标签的间隔距离
        if (key === "Enter") {
          const nextElementSibling = currentRow.nextElementSibling;
          if (nextElementSibling) {
            currentPositionNodeOffsetTop = nextElementSibling.offsetTop;
            currentPositionNodeTop = nextElementSibling.getBoundingClientRect()
              .top;
          }
        }
        //  页面高度
        const documentClientHeight = document.documentElement.clientHeight;
        //  光标距离页面底部舒服保留距离（在visual studio code 里最后一行敲几个字就明白了）
        const comfortableDistance = 40;
        //  工具栏
        const toolbar = this.$refs.toolbar;

        //  马上移除标签，防止影响输入顺序
        currentPositionNode.remove();

        //  输入位置着落点处于屏幕可见区域中时：
        //  屏幕顶部下方：currentPositionNodeTop > toolbar.getBoundingClientRect().bottom
        //  屏幕底部上方，加部分距离： currentPositionNodeTop < documentClientHeight - comfortableDistance
        //  说明在可视区域中编辑内容，不需要自动滚动
        if (
          currentPositionNodeTop > toolbar.getBoundingClientRect().bottom &&
          currentPositionNodeTop < documentClientHeight - comfortableDistance
        ) {
          setValueNotScroll = true;
        }

        //  如存在设置内容后不需要滚动的情况，返回
        if (setValueNotScroll) {
          return;
        }

        //  编辑器组件外壳距离页面顶部的距离
        const writeWrapOffsetTop = this.$refs.writeWrap.offsetTop;

        //  此时输入位置着落点处于工具栏上方
        if (currentPositionNodeTop < toolbar.getBoundingClientRect().bottom) {
          document.documentElement.scrollTop = this.editorOffset2Body;
        }
        //  已经超出屏幕高度，自动滚动到输入位置着落点的坐标
        else {
          document.documentElement.scrollTop =
            //  编辑器到页面顶部的实际偏移量
            this.editorOffset2Body +
            //  工具栏高度
            toolbar.clientHeight +
            //  当前输入位置距离父级标签顶部距离
            currentPositionNodeOffsetTop -
            //  页面高度
            documentClientHeight +
            //  舒服的保留距离
            comfortableDistance;
        }
      }, 0);
    },
    /**
     * @desc 上传进度
     * @author 陈泽光
     * @date 2019年9月17日10:53:08
     */
    getProgress(res) {
      this.uploadQueueComponent.sourceQueue.list.some((source) => {
        if (source.uploadTime === res.fileKey.uploadTime) {
          //  @Mark: August - 组件内返回的字段名称拼写错误为 proess
          this.$set(source, "progress", res.proess);
          return true;
        }
      });
    },
    /**
     * @desc 上传完成
     * @author 陈泽光
     * @date 2019年9月17日10:53:08
     */
    getResult(res) {
      const fileType = res.fileKey.fileType;

      this.uploadQueueComponent.sourceQueue.list.some((source) => {
        if (source.uploadTime === res.fileKey.uploadTime) {
          source.progress = 1;

          switch (fileType) {
            case "image":
              source.fileUrl = res.fileUrl;
              source.snapshotUrl = res.conversionFileUrl || res.fileUrl;
              break;

            case "video":
              source.fileUrl = res.conversionFileUrl;
              source.snapshotUrl =
                res.fileUrl +
                `?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast,ar_auto`;
              source.decodeTimer = setInterval(() => {
                this.urlTest(res.conversionFileUrl)
                  .then(() => {
                    this.$set(source, "decoded", true);
                    clearInterval(source.decodeTimer);
                  })
                  .catch(() => {
                    this.$set(source, "decoded", false);
                  });
              }, 2000);
              break;
          }
          clearInterval(source.timer);
          this.$emit("on-upload-success", source);
          return true;
        }
      });
    },
    /**
     * @desc 测试地址是否加载完成
     */
    urlTest(url) {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let xhrHandler = () => {
          xhr.removeEventListener("readystatechange", xhrHandler);
          if (xhr.status === 200) {
            resolve(true);
          } else if (xhr.status === 403) {
            reject(true);
          } else {
            reject(true);
          }
          xhr.abort();
        };
        xhr.open("GET", url);
        xhr.addEventListener("readystatechange", xhrHandler);
        xhr.send();
      });
    },
    /**
     * @desc 上传错误就关闭loading
     * @author 陈泽光
     * @date 2019年9月17日10:53:08
     */
    uploadError(res) {},
    /**
     * @desc 设置编辑器内容
     * @param {String} html html内容
     * @param {Boolean} setValueNotScroll 设置内容后不需要自动滚动
     */
    setEditorVal(html, setValueNotScroll = false, setValueNotChange = false) {
      //  如设置内容后不需要滚动，为加载完成方法增加第二参数，用于加载完毕后传递给自动计算高度函数
      if (setValueNotScroll) {
        html = html.replace(
          /"sourceLoaded\(event\)"/g,
          `"sourceLoaded(event, true)"`
        );
      }
      //  赋值富文本编辑器
      this.editor && this.editor.txt.html(html, setValueNotChange);
      //  计算自动撑开的高度
      this.toggleAutoHeight(setValueNotScroll);
    },
    /**
     * @desc 富文本组件内容为空吗？
     */
    isEmpty() {
      return this.editor.txt["html"]() === "<p><br></p>";
    },
    /**
     * @desc 富文本完全没有合法的内容
     * 回车，空格也算是无内容的值
     * 但图片标签，input标签算是合法的内容
     */
    isNothingAtAll() {
      return formatHtml2Value(this.editorDOM).length ? false : true;
    },
    /**
     * @desc 获取编辑器内容
     * @param {String} type 获取内容 html 或 text
     */
    getEditorVal(type = "html") {
      const result = this.editor.txt[type]();
      if (type === "html") {
        return [
          `<div class="w-e-content">`,
          result,
          `<style>.w-e-content p{ line-height: 2 }</style></div>`,
        ].join("");
      } else if (type === "text") {
        return result;
      }
    },
    /**
     * @desc 是否允许切换展示placeholder
     */
    togglePlaceholder() {
      this.showPlaceholder = this.isEmpty();
    },
    /**
     * @desc 切换固定顶部工具栏
     */
    toggleFixedToolbar(event) {
      if (!this.fixedToolBar) {
        return;
      }
      const toolbar = this.$refs.toolbar;
      const toolbarHeight = toolbar.clientHeight;
      const writeBox = this.$refs.writeBox;
      const writeBoxRect = writeBox.getBoundingClientRect();

      //  滚动距离为0时，总是记录一下编辑器距离页面顶部的实际偏移量
      if (document.scrollTop === 0) {
        //  记录编辑器到页面顶部的实际偏移量
        this.recordEditorOffset2Body();
      }

      //  取消固定
      const cancelFixed = () => {
        this.isFixedToolBar = false;
        toolbar.style.position = "";
        writeBox.style.marginTop = "";
      };

      //  如编辑区域距离屏幕顶部的距离 减去 工具栏高度 小于等于 吸顶距离，说明需要吸顶
      if (writeBoxRect.top - toolbarHeight <= this.fixedDistance) {
        toolbar.style.top = "0px";
        toolbar.style.position = "fixed";
        toolbar.style.background = "white";
        toolbar.style.width = writeBox.clientWidth + "px";
        toolbar.style.zIndex = 2;

        writeBox.style.marginTop = toolbarHeight + "px";
        this.isFixedToolBar = true;
      }
      //  取消固定
      else {
        cancelFixed();
      }
      //  如果输入区域底部距离 小于 工具栏高度
      if (writeBoxRect.bottom < toolbarHeight) {
        cancelFixed();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

<style lang="scss">
.write-wrap {
  background-color: #fff;
  border: 1px solid #dee4ec;

  .w-e-toolbar {
    padding: 5px;
    border-bottom: 1px solid #dee4ec;

    .w-e-menu i {
      color: #5d5d5d;
    }
  }

  .write-box {
    z-index: 1;
    padding: 10px;
    // transition: height 0.3s ease 0s;

    &.auto-height {
      .w-e-text {
        overflow: hidden !important;
      }
    }

    .w-e-placeholder {
      color: #999;
      padding: 0px 10px;
      position: absolute;
      margin: 0 !important;
      line-height: 2 !important;
    }

    .w-e-text {
      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #d9e0e9;

        &:hover {
          background-color: #c4cdda;
        }
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-button {
        width: 3px;
        height: 0px;
      }

      p {
        line-height: 2;
      }
    }
  }
}
</style>
