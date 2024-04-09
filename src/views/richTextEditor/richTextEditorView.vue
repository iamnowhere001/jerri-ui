/****************************************************************************

所属系统: 组件库
所属模块: 组件—富文本编辑器
创建时间: 2020年03月10日 15:53
***************************************************************************/
<template>
  <div class="j-content">
    <h2 class="j-mb-20">富文本编辑器</h2>

    <p class="nav">编辑器内容</p>
    <jr-button class="j-mr-20"
               @click="getText">获取文本内容</jr-button>

    <jr-button class="j-mr-20"
               @click="getHTML">获取HTML内容</jr-button>

    <jr-button class="j-mr-20"
               @click="setHTML">设置编辑器内容</jr-button>

    <p class="nav">编辑器内容校验</p>
    <jr-button class="j-mr-20"
               @click="isEmpty">是否为空</jr-button>

    <jr-button class="j-mr-20"
               @click="isNothingAtAll">是否存在有效内容</jr-button>

    <p class="nav">禁用编辑器</p>
    <jr-button class="j-mr-20"
               @click="disabled = !disabled">禁用 {{disabled}}</jr-button>

    <p class="nav">工具栏</p>
    <jr-button class="j-mr-20"
               @click="showTools = !showTools">展示 {{showTools}}</jr-button>

    <jr-button class="j-mr-20"
               @click="fixedToolBar = !fixedToolBar">固定(吸顶) {{fixedToolBar}}</jr-button>

    <p class="nav">编辑器动态高度</p>
    <jr-button class="j-mr-20"
               @click="autoHeight = !autoHeight">启用 {{autoHeight}} </jr-button>

    <p class="nav">添加内容</p>
    <jr-button class="j-mr-20"
               @click="() => {
        $refs.richtextEditorRef.addSourceQueue([{
          name: '1.mp4',
          fileType: 'video',
          fileUrl: `http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/506705e3be325d87560df4f0a4745519/1.mov`
        }]);
      }">视频资源</jr-button>

    <jr-button class="j-mr-20"
               @click="() => {
        $refs.richtextEditorRef.addSourceQueue([{
          name: '图片',
          fileType: 'image',
          fileUrl: `http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/8401470b9f3a78e11550f4b8c77b5238/u%3D234070156%2C2704000793%26fm%3D27%26gp%3D0.jpg`
        }]);
      }">图片资源</jr-button>

    <jr-richtextEditor ref="richtextEditorRef"
                       placeholder="请输入内容"
                       :autoHeight="autoHeight"
                       :value="content"
                       :disabled="disabled"
                       :showTools="showTools"
                       :fixedToolBar="fixedToolBar"
                       :fixedDistance="fixedDistance"
                       :action='"//192.168.99.29:8200/"'
                       :businessCode='"NS2"'
                       @input="updateHTML" />

    <!-- <jr-richtextEditor ref="richtextEditorRef1"
                       placeholder="请输入"
                       :autoHeight="autoHeight"
                       :value="editorHTML"
                       :disabled="disabled"
                       :showTools="showTools"
                       :customPasteHandle="customPasteHandle"
                       :action='"//192.168.99.29:8200/"'
                       :businessCode='"NS2"'
                       :fullWidthImg="true"
                       @input="(html)=>{
                         editorHTML = html;
                       }"></jr-richtextEditor> -->

  </div>
</template>

<script>
export default {
  name: "richtextEditorView",
  label: "富文本编辑器",
  data() {
    return {
      // 富文本内容
      editorHTML: "",
      // 双向绑定内容
      content: "",
      // 是否固定工具栏
      fixedToolBar: true,
      // 固定距离
      fixedDistance: 0,
      // 是否禁用编辑器
      disabled: false,
      // 是否展示工具栏
      showTools: true,
      // 是否动态高度
      autoHeight: true
    };
  },
  computed: {},
  methods: {
    /**
     * @desc 获取编辑器文本高度
     * @author 徐勇
     * @date 2020.03.10 17:20
     */
    getText() {
      console.info(this.$refs.richtextEditorRef.getEditorVal("text"));
    },

    /**
     * @desc 获取编辑器HTML内容
     * @author 徐勇
     * @date 2020.03.10 17:20
     */
    getHTML() {
      console.info(this.$refs.richtextEditorRef.getEditorVal("html"));
    },

    /**
     * @desc 设置编辑器HTML内容
     * @author 徐勇
     * @date 2020.03.10 17:20
     */
    setHTML() {
      this.$refs.richtextEditorRef.setEditorVal("<p>俺是被设置进来的内容</p>");
    },

    /**
     * @desc 编辑器HTML内容是否为空
     * @author 徐勇
     * @date 2020.03.10 17:20
     */
    isEmpty() {
      console.info(this.$refs.richtextEditorRef.isEmpty());
    },

    /**
     * @desc 编辑器有效内容是否为空
     * @author 徐勇
     * @date 2020.03.10 15:01
     */
    isNothingAtAll() {
      console.info(this.$refs.richtextEditorRef.isEmpty());
    },

    /**
     * @desc 编辑器失焦更新HTML内容
     * @author 徐勇
     * @date 2020.03.11 16:07
     */
    updateHTML(html) {
      this.editorHTML = html;
    },

    /**
     * @desc 自定义粘贴
     * @author 徐勇
     * @date 2020.03.10 17:20
     */
    customPasteHandle({ pasteText }, editor, vueComponent) {
      // 过滤多余空格
      let text = pasteText.replace(/\r\n\r\n/g, "\n");
      editor.cmd.do("insertText", text);
    }
  }
};
</script>

<style lang="scss" scoped>
.j-content {
  padding: 20px 50px;
  .nav {
    color: #666;
    padding-bottom: 5px;
    margin: 20px 0 10px 0;
    border-bottom: 1px solid #d8d8d8;
    width: 300px;
  }
}
</style>
