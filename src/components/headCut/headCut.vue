
<template>
  <jr-message-box :value="visible"
                  :title="$t('headCut_上传头像')"
                  width="680px"
                  maxHeight="auto"
                  :isDefine="true"
                  @onClose="closeMask">
    <div class="cropper">
      <div class="tal j-text-left">
        <jr-button @click="selectPic"
                   type="plain"
                   :slotText="$t('headCut_选择头像')"></jr-button>
        <p class="rotate"
           @click="rotate"
           :class="{'not-pic':!this.imgUrl,'rotate-hover':this.imgUrl}">
          <i class="icon-image-rotate"></i>
          {{$t('headCut_旋转')}}
        </p>
      </div>
      <div class="pic_con">
        <vueCropper ref="cropper"
                    :autoCropHeight='364'
                    :autoCropWidth='262'
                    :autoCrop='true'
                    :fixedBox='true'
                    :outputType="'png'"
                    :canMoveBox='false'
                    :img="imgUrl"
                    :mode='"262px"'
                    v-show="imgUrl"></vueCropper>
      </div>
      <div class="preview">
        <p class='square'>
          <img :src="base64"
               v-if="base64">
          <img src='../../assets/images/common/user_header.png'
               v-show="!base64">
        </p>
        <p class='circle'
           v-show="isShowCircle">
          <span :style="{'background-image':'url('+base64+')'}"
                v-show="base64"></span>
          <img src='../../assets/images/common/user_header_circle.png'
               v-show="!base64">
        </p>
        <h5>{{$t('headCut_浏览图')}}</h5>
      </div>

      <div class="j-mt-20 j-text-center">
        <jr-button size='normal'
                   :disabled='!base64'
                   @click="save">{{$t('common_确定')}}</jr-button>
      </div>
    </div>

    <!-- 上传组件 -->
    <jr-upload accept="image/*"
               v-bind="$attrs"
               :maxSize="size"
               @add-file='getFile'
               @file-result="getResult"
               ref="jrInput">
    </jr-upload>
  </jr-message-box>

</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  name: "JrHeadCut",
  inheritAttrs: false,
  components: {
    VueCropper
  },
  props: {
    // 是否显示
    visible: {
      dafault: false,
      type: Boolean
    },
    // 是否显示圆形头像
    isShowCircle: {
      dafault: false,
      type: Boolean
    },
    // 文件大小
    size: {
      dafault: 2,
      type: Number
    }
  },
  data() {
    return {
      // 图片base64信息
      base64: "",
      // 图片url
      imgUrl: "",
      // 是否可保存
      isSave: false
    };
  },
  mounted() {
    this.cutEvent();
  },
  methods: {
    cutEvent() {
      // 监听图片属性变化  实时调用截图功能
      let MutationObserver = window.MutationObserver

      let element = document.getElementsByClassName("cropper-view-box")[0]
        .firstChild;

      let observer = new MutationObserver(mutations => {
        mutations.forEach(it => {
          if (it.type === "attributes") {
            this.cutPic();
          }
        });
      });

      observer.observe(element, {
        attributes: true // configure it to listen to attribute changes
      });
    },

    /**
     * @desc 获取文件
     * @param {Object} res 文件对象
     * @author 徐勇
     * @date 2020-1-3 17:31
     */
    getFile(res) {
      this.$loading();
    },

    /**
     * @desc 获取文件上传结果
     * @param {Object} res 文件对象
     * @author 徐勇
     * @date 2020-1-3 17:32
     */
    getResult(res) {
      this.$loading(false);
      if (!this.isSave) {
        this.imgUrl = res.fileUrl;
      } else {
        this.$emit("on-result", res);
        this.base64 = "";
        this.imgUrl = "";
        this.isSave = false;
      }
    },

    /**
     * @desc 添加图片
     * @author 徐勇
     * @date 2020-1-3 17:32
     */
    selectPic() {
      this.$refs.jrInput.upload();
    },

    /**
     * @desc 截图
     * @author 徐勇
     * @date 2020-1-3 17:35
     */
    cutPic() {
      this.$refs.cropper.getCropData(data => {
        this.base64 = data;
      });
    },

    /**
     * @desc 旋转 图片
     * @author 徐勇
     * @date 2020-1-3 17:35
     */
    rotate() {
      if (this.imgUrl) {
        this.$refs.cropper.rotateRight();
      }
    },

    /**
     * @desc 保存图片
     * @author 徐勇
     * @date 2020-1-3 17:35
     */
    save() {
      if (!this.base64) {
        return;
      }
      this.isSave = true;
      this.$refs.jrInput.uploadFile(
        this.$utils.dataURLtoFile(this.base64, "header.png")
      );
    },

    /**
     * @desc 关闭弹窗
     * @author 徐勇
     * @date 2020-1-3 17:35
     */
    closeMask() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./headCut.scss";
</style>
