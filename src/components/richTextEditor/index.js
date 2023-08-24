import RichTextEditor from './richTextEditor.vue';

RichTextEditor.install = function (Vue) {
  Vue.component(RichTextEditor.name, RichTextEditor);
};

export default RichTextEditor;
