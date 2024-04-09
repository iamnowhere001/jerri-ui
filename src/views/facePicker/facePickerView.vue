<template>
  <div class="j-pt-30 j-pl-30">
    <h2 class="j-mb-20">表情选择器</h2>

    <p>
      表情选择打开 {{show}}
    </p>

    <p>在需要呼出表情选择器的按钮标签内，放置自定义标签。</p>
    <p>注意：包裹标签必须要添加 position: relative; 属性</p>

    <strong>输入框输入的标签展示如下：</strong>
    <p v-html="$utils.faceFilter(text)"></p>

    <div class="j-center j-mb-20">
      <strong style="flex:0 0 130px;">输入框输入表情</strong>
      <jr-input v-model="text" />
    </div>


    <p class="j-pt-20">
      <jr-button @click="show = !show"
                 style="position: relative;">
        打开表情选择器
        <jr-face-picker ref="facePicker"
                        :show="show"
                        @on-confirm="confirm"
                        @on-close="show = false"></jr-face-picker>
      </jr-button>
    </p>
    <p>
    </p>
  </div>
</template>

<script>
export default {
  name: "facePickerView",
  label: "表情选择器",
  data() {
    return {
      text: "早上好[呲牙]",
      show: false
    };
  },
  methods: {
    confirm(faceText, faceObj) {
      this.text += faceText;
      window["console"].info(faceText, faceObj);
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 20px 0;
}
</style>
