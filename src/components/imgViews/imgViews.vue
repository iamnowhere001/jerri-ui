/****************************************************************************

所属系统: 组件库
所属模块: 图片查看器
创建时间: 2020-01-02
维护人: 杨文杰
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="j-mask"
       v-show="isShow">
    <div class="pic-content"
         ref="picContent"
         :style="picContentStyle"
         @click.stop=""
         @mouseover="isOperate(true)"
         @mouseout="isOperate(false)">

      <!-- 加载进度 -->
      <jr-loading-petal :visible="isLoading"></jr-loading-petal>
      <!-- 加载进度 -->

      <!-- 上一张按钮 -->
      <div class="pic-left-wrap"
           @mouseover="showLeftBtn = true"
           @mouseout="showLeftBtn = false">
        <span class="pic-left icon-image-arrow"
              :class="{'pic-disabled': !index || isLoading}"
              v-show="showLeftBtn && list.length > 1"
              @click.stop="switchPage(index - 1)"
              :title="index === 0 ? $t('imgViews_已是第一张') :$t('imgViews_上一张')"></span>
      </div>
      <!-- 上一张按钮 -->
      <!-- 主体内容 -->
      <div class="pic-box"
           @mousedown="(event) =>{
             !(this.scale > 1) && this.handleMouseDown(event)
           }"
           @touchstart="(event)=> {
             !(this.scale > 1) && this.handleTouchStart(event)
            }"
           :class="{'move': scale > 1}">
        <!-- 图片 -->
        <img v-show="showImg"
             :src="imgUrl"
             :style="{...imgStyle, ...preViewStyle }"
             :class="{'move': scale > 1}"
             ref="img"
             @load="successLoadImg">
        <!-- 图片 -->
        <!-- 移动容器 -->
        <div class="img-box"
             @mousedown="handleDragImg"
             :class="{'move': scale > 1}"
             :style="imgStyle">
        </div>
        <!-- 移动容器 -->
        <!-- 缩放进度 -->
        <span class="pic-scale"
              v-show="showTips">{{scale * 100}}%</span>
        <!-- 缩放进度 -->
      </div>
      <!-- 主体内容 -->

      <!-- 图片预览 -->
      <div class="pre-list"
           ref="preWrap"
           v-show="isPreView">

        <!-- 上一页 -->
        <span @mousedown="pageTurning('prev')"
              :class="{'pageTurning-disabled': disabledPageTurningLeft }"
              class="icon-wes2-more"></span>
        <!-- 上一页 -->

        <!-- 缩略图列表 -->
        <div ref="preList"
             @scroll="changePageTurningStatus">
          <ul class="clearfix">
            <li v-for="(item, i) in list"
                ref="li"
                :class="{'selected-border': i === index}"
                :key="i"
                @click="switchPage(i)">
              <img :src="item.url" />
            </li>
          </ul>
        </div>
        <!-- 缩略图列表 -->

        <!-- 下一页 -->
        <span @mousedown="pageTurning('next')"
              :class="{'pageTurning-disabled': disabledPageTurningRight}"
              class="icon-wes2-more"></span>
        <!-- 下一页 -->
      </div>
      <!-- 图片预览 -->

      <!-- 底部操作 -->
      <section class="pic-info"
               ref="picinfo"
               @mousedown="(event) =>{
                 event.target.tagName !== 'SPAN' && this.handleMouseDown(event)
               }">
        <!-- 图片名称 -->
        <span v-if="list.length && currentImg.name && viewWidth > 400"
              :title="currentImg.name">{{currentImg.name}}</span>
        <!-- 图片名称 -->
        <!-- 右侧按钮集合 -->
        <p v-if="list.length"
           :class="{operate: !currentImg.name}">
          <!-- 切换显示预览列表 -->
          <span v-if="hasOperate('thumbnail')"
                :title="isPreView ? $t('imgViews_隐藏预览') :$t('imgViews_显示预览') "
                @click="togglePreView"
                :class="[isPreView ? 'icon-image-full': 'icon-image-thumbnail']"></span>
          <!-- 切换显示预览列表 -->
          <!-- 放大图片 -->
          <span v-if="hasOperate('enlarge')"
                class="icon-image-big icon-hover"
                :title="$t('imgViews_放大图片')"
                :class="{gray: scale >= 5}"
                @click="enlarge(true)"></span>
          <!-- 放大图片 -->
          <!-- 缩小图片 -->
          <span v-if="hasOperate('narrow')"
                class="icon-image-small icon-hover"
                :title="$t('imgViews_缩小图片')"
                :class="{gray: scale === 0.25}"
                @click="enlarge(false)"></span>
          <!-- 缩小图片 -->
          <!-- 向右旋转 -->
          <span v-if="hasOperate('rotate')"
                class="icon-image-rotate icon-hover"
                :title="$t('imgViews_向右旋转')"
                @click="rotate"></span>
          <!-- 向右旋转 -->
          <!-- 下载按钮 -->
          <span v-if="hasOperate('download')"
                class="icon-image-download icon-hover"
                :title="$t('imgViews_下载')"
                @click="download(currentImg.url)"></span>
          <!-- 下载按钮 -->
          <!-- 删除按钮 -->
          <span class="icon-image-delete mr_0"
                :title="$t('common_删除')"
                @click="del"
                v-if="isdel && hasOperate('delete')"></span>
          <!-- 删除按钮 -->
          <!-- 图片下标 -->
          <i class="pic-num"
             v-if="list.length"
             :class="{'page-count': !currentImg.name}">{{index + 1}} <span class="gray">/ {{list.length}}</span></i>
          <!-- 图片下标 -->
        </p>
        <!-- 右侧按钮集合 -->
      </section>
      <!-- 底部操作 -->

      <!-- 下一张按钮 -->
      <div class="pic-right-wrap"
           @mouseover="showRightBtn = true"
           @mouseout="showRightBtn = false">
        <span class="pic-right icon-image-arrow"
              v-show="showRightBtn && this.list.length > 1"
              :title="index === this.list.length - 1 ? $t('imgViews_已是最后一张') :$t('imgViews_下一张')"
              :class="{'pic-disabled': index === this.list.length - 1}"
              @click.stop="switchPage(index + 1)"></span>
      </div>
      <!-- 下一张按钮 -->

      <!-- 右上角关闭按钮 -->
      <span class="pic-close icon-close-picbig"
            :title="$t('common_关闭')"
            @click="closeImgView"></span>
      <!-- 右上角关闭按钮 -->

    </div>
  </div>
</template>
<script>
//  窗体拖拽
import drag from "./drag.js";
//  缩略图工具栏
import thumbnail from "./thumbnail.js";

//  图片展示的最小宽度
const minWidth = 525;
//  图片展示的最小高度
const minHeight = 550;

export default {
  name: "JrImgView",
  props: {
    //  图片列表
    list: {
      required: true,
      type: Array
    },
    //  展示图片下标
    imgindex: {
      type: Number,
      default: 0
    },
    //  存在删除按钮
    isdel: {
      type: Boolean,
      default: true
    },
    //  是否展示图片查看器
    isShow: {
      type: Boolean,
      default: false
    },
    //  是否存在预览列表
    isViewList: {
      type: Boolean,
      default: true
    },
    //  是否存在操作列表
    operateList: {
      type: Array
    },
    //  工作区域宽度
    workAreaWidth: {
      type: Number,
      default: 0
    },
    //  工作区域高度
    workAreaHeight: {
      type: Number,
      default: 0
    },
    //  固定宽度
    fixedWidth: {
      type: Number,
      default: 800
    },
    //  固定高度
    fixedHeight: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      //  图片查看器样式
      picContentStyle: {},
      //  当前显示图片下标
      index: 0,

      //  显示加载动画
      isLoading: false,
      //  显示放大倍率
      showTips: false,

      //  展示图片
      showImg: true,
      //  展示的图片路径
      imgUrl: "",
      //  图片样式（用于在窗口内偏移及旋转）
      imgStyle: {
        top: 0,
        left: 0,
        transform: ""
      },

      //  图片查看器最小宽度
      minWidth,
      //  图片查看器最小高度
      minHeight,

      //  查看器容器宽度
      viewWidth: minWidth,
      //  查看器容器高度
      viewHeight: minHeight,
      //  显示操作按钮
      showOperate: false,
      //  展示左侧按钮
      showLeftBtn: false,
      //  展示右侧按钮
      showRightBtn: false,

      //  放大倍数
      scale: 1,
      //  旋转度数
      deg: 0
    };
  },
  mixins: [drag, thumbnail],
  computed: {
    //  拥有此类型
    hasOperate(name) {
      return name => {
        return this.operateAllList.includes(name);
      };
    },
    //  可以显示的全部操作类型
    operateAllList() {
      return (
        this.operateList || [
          "thumbnail",
          "enlarge",
          "narrow",
          "rotate",
          "download",
          "delete"
        ]
      );
    },
    //  当前展示图片
    currentImg() {
      return this.list[this.index];
    }
  },
  watch: {
    /**
     * @desc 观察图片下标改变，并修改内部管理下标变量，挂载图片
     */
    imgindex: {
      handler(imgindex) {
        //  新坐标配置与内部管理变量不相同
        if (this.index !== imgindex) {
          //  传入坐标配置，存在列表范围中时，内部变量才会被赋值新坐标
          if (this.inListRange("imgindex")) {
            this.index = imgindex;
          }
          //  如果为正在打开状态
          if (this.isShow) {
            this.$nextTick(() => {
              this.mountImg();
            });
          }
        }
      }
    },
    /**
     * @desc 观察图片查看器打开关闭，并监听或取消监听事件及挂载图片
     */
    isShow(isShow) {
      if (isShow) {
        //  不存在传递图片下标配置时
        if (!this.$props["imgindex"]) {
          //  检查此时的下标是否存在列表范围中
          if (!this.inListRange("index")) {
            this.index = 0;
          }
        }
        this.onEvent();
        this.resetPicContentStyle();
        this.$nextTick(() => {
          this.mountImg();
        });
      } else {
        this.picContentStyle = {};
        this.offEvent();
      }
    },
    /**
     * @desc 观察列表改变，并在下标不能够获取实际图片时进行下标修正
     * @param {Array} list 当前图片列表
     */
    "list.length"(list) {
      const bigThan = this.index > list.length - 1;
      const smallThan = this.index < 0;
      if (bigThan) {
        this.index = list.length - 1;
        this.mountImg();
      } else if (smallThan) {
        this.index = 0;
        this.mountImg();
      }
      //  如果为正在打开状态
      if (this.isShow) {
        this.$nextTick(() => {
          this.mountImg();
        });
      }
    },
    /**
     * @desc 同步更新外部配置下标
     */
    index(index) {
      this.$emit("update:imgindex", index);
    }
  },
  beforeDestroy() {
    this.offEvent();
  },
  mounted() {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.mountImg();
      }, 0);
    });
  },
  methods: {
    /**
     * @desc 还原图片容器大小
     */
    resetPicContentStyle() {
      this.picContentStyle = {
        left: ((this.workAreaWidth || document.documentElement.clientWidth) - minWidth) / 2 + "px",
        top: ((this.workAreaHeight || document.documentElement.clientHeight) - minHeight) / 2 + "px",
        width: minWidth + "px",
        height: minHeight + "px"
      };
    },
    /**
     * @desc 取消监听事件
     */
    offEvent() {
      //  取消监听事件
      this.$utils.off(this.$refs.writeBox, "keydown", this.writeBoxKeydown);
      this.$utils.off(document, "scroll", this.toggleFixedToolbar);
    },
    /**
     * @desc 判断传入坐标配置，是否存在列表范围中
     */
    inListRange(indexName) {
      //  超出范围
      if (this[indexName] > this.list.length - 1 || this[indexName] < 0) {
        return false;
      }
      return true;
    },
    /**
     * @desc 监听键盘事件
     * @author 杨文杰
     * @date 2019年5月8日09:15:38
     */
    onEvent() {
      this.$utils.on(document, "keydown", event => {
        if (!this.isShow) {
          return;
        }
        let keyCode = event.keyCode;
        //  ESC（关闭图片查看器）
        if (keyCode === 27) {
          this.closeImgView();
        }
        //  左按键（上一张图片）
        else if (keyCode === 37) {
          this.switchPage(this.index - 1);
        }
        //  右按键（下一张图片）
        else if (keyCode === 39) {
          this.switchPage(this.index + 1);
        }
      });

      //  滚轮移动事件
      this.$utils.on(this.$refs.picContent, "mousewheel", event => {
        if (!this.isShow) {
          return;
        }
        let deltaY = event.deltaY;
        //  滚轮向下（缩小图片）
        if (deltaY > 0) {
          this.enlarge(false);
        }
        //  滚轮向上（放大图片）
        else {
          this.enlarge(true);
        }
      });
    },
    /**
     * @desc 根据屏幕尺寸与图片大小，设置图片查看器的尺寸
     * @param {Boolean} cover 当大于之前的最大尺寸时，覆盖新的最大尺寸
     * @author 杨文杰
     * @date 2019年7月11日 15:42:44
     */
    setImgViewSize(cover) {
      const workAreaSize = {
        width: this.workAreaWidth || document.documentElement.clientWidth,
        height: this.workAreaHeight || document.documentElement.clientHeight
      };

      return new Promise(async resolve => {
        //  允许展示的最大宽度
        const maxWidth = workAreaSize.width - 120;
        //  允许展示的最大高度
        const maxHeight = workAreaSize.height - 60;
        //  当前图
        const currentImg = this.currentImg;
        //  宽高
        let { width, height } = currentImg;
        //  若不存在图片宽高
        if (!currentImg.width || !currentImg.height) {
          let size = await this.$utils.getImgRealSize(currentImg.url);
          currentImg.width = width = size.width;
          currentImg.height = height = size.height;
        }

        //  超出高度后，以最大高度计算的缩放后宽度
        const scaleWidth = width * (maxHeight / height);
        //  超出宽度后，以最大宽度计算的缩放后高度
        const scaleHeight = height * (maxWidth / width);

        //  如果图片宽度大于容器最大宽度 且 缩放后的高度小于等于允许展示的最大高度
        if (width >= maxWidth && scaleHeight <= maxHeight) {
          width = maxWidth;
          height = scaleHeight;
        }
        //  如果图片高度大于容器最大高度 且 缩放后的宽度小于等于允许展示的最大宽度
        else if (height >= maxHeight && scaleWidth <= maxWidth) {
          height = maxHeight;
          width = scaleWidth;
        }
        //  如果图片宽高均超过容器最大尺寸
        else if (width >= maxWidth && height >= maxHeight) {
          width = maxWidth;
          height = maxHeight;
        }

        //  图片宽度小于等于最小宽度
        if (width <= this.minWidth) {
          width = this.minWidth;
        }

        //  图片高度小于等于最小高度
        if (height <= this.minHeight) {
          height = this.minHeight;
        }

        //  如设置了固定宽度
        if (this.fixedWidth) {
          width = this.fixedWidth;
        }

        //  如设置了固定高度
        if (this.fixedHeight) {
          height = this.fixedHeight;
        }

        //  窗体必须是整数的宽高
        const round = number => Math.round(number);
        const roundWidth = round(width);
        const roundHeight = round(height);

        //  计算容器最终宽高
        //  如需要覆盖，需要判断本次图片的宽高是否大于上次的容器宽高
        if (cover) {
          this.viewWidth =
            roundWidth > this.viewWidth ? roundWidth : this.viewWidth;
          this.viewHeight =
            roundHeight > this.viewHeight ? roundHeight : this.viewHeight;
        } else {
          this.viewWidth = roundWidth;
          this.viewHeight = roundHeight;
        }

        const picContentStyle = this.picContentStyle;

        //  设置窗体的坐标及大小
        picContentStyle.left =
          round((workAreaSize.width - this.viewWidth) / 2) + "px";
        picContentStyle.top =
          round(
            (workAreaSize.height -
              this.viewHeight -
              this.$refs.picinfo.clientHeight) /
              2
          ) + "px";
        picContentStyle.width = this.viewWidth + "px";
        picContentStyle.height = this.viewHeight + "px";
        resolve(true);
      });
    },
    /**
     * @desc 处理图片与容器显示逻辑，并挂载图片
     * @author 杨文杰
     * @date 2019年5月8日16:15:38
     */
    mountImg() {
      let img = this.currentImg;
      this.isLoading = true;
      this.showImg = false;

      if (!this.list.length) {
        return;
      }

      this.$nextTick(() => {
        this.setImgViewSize(true).then(() => {
          //  如打开是同一个图片，直接关闭加载状态
          if (this.imgUrl == img.url) {
            this.isLoading = false;
            this.showImg = true;
          }
          //  打开的是一张新图
          else {
            //  设置图片在查看器中的默认居中位置
            this.setImgCenterPosition();
            this.imgUrl = img.url;
          }
        });
      });
    },
    /**
     * @desc 图片加载完成后回调
     * @param {Object} event 默认事件参数
     * @author 杨文杰
     * @date 2019年5月8日15:15:38
     */
    successLoadImg(event) {
      let node = event.target;
      this.resetPic();
      node.complete && (this.isLoading = false);
      this.showImg = true;
      this.calcPreViewStyle();
    },
    /**
     * @desc 设置图片在查看器中的默认居中位置
     * @author 杨文杰
     * @date 2019年6月25日 10:23:06
     */
    setImgCenterPosition() {
      let { width, height } = this.currentImg;
      //  容器宽度
      let viewWidth = this.viewWidth;
      //  容器高度
      let viewHeight = this.viewHeight;

      if (this.isPreView) {
        viewHeight -= this.$refs.preWrap.clientHeight;
      }

      //  图片距离容器左侧的距离
      let left = 0;
      //  图片距离容器顶部的距离
      let top = 0;

      //  超出高度后，以高度为最大高度计算的缩放后宽度
      let scaleWidth = width * (viewHeight / height);
      //  超出宽度后，以宽度为最大宽度计算的缩放后高度
      let scaleHeight = height * (viewWidth / width);

      // 图片宽度超过容器宽度时，且容器高度大于等于缩放后的高度
      if (width > viewWidth && viewHeight >= scaleHeight) {
        top = (viewHeight - scaleHeight) / 2;
      }
      //  图片高度超过容器高度时，且容器宽度大于等于缩放后的宽度
      else if (height > viewHeight && viewWidth >= scaleWidth) {
        left = (viewWidth - scaleWidth) / 2;
      }
      //  以上条件均未满足
      else {
        left = (viewWidth - width) / 2;
        top = (viewHeight - height) / 2;
      }

      //  设置图片显示位置
      this.imgStyle.left = left + "px";
      this.imgStyle.top = top + "px";
    },
    /**
     * @desc 显示操作栏
     * @param {Boolean} show 显示
     * @author 杨文杰
     * @date 2019年5月8日16:21:23
     */
    isOperate(show) {
      return (this.showOperate = show);
    },
    /**
     * @desc 重置图片样式
     * @author 杨文杰
     * @date 2019年5月8日16:21:23
     */
    resetPic() {
      //  重置放大倍数
      this.scale = 1;
      //  重置旋转角度
      this.deg = 0;
      //  清空旋转属性
      this.imgStyle.transform = "";
    },
    /**
     * @desc 拖动图片在查看器内的位置
     * @param {Object} e 默认事件对象
     * @author 杨文杰
     * @date 2019年5月8日16:21:23
     */
    handleDragImg(e) {
      if (this.scale === 1) {
        return false;
      }
      //获取目标元素
      let odiv = e.target;
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        //移动图片
        if (this.scale > 1) {
          this.imgStyle.left = `${left}px`;
          this.imgStyle.top = `${top}px`;
        }

        e.preventDefault();
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    /**
     * @desc 展示缩放倍数提示
     * @author 杨文杰
     * @date 2019年6月25日 14:55:46
     */
    showScaleTips() {
      //  显示放大倍数
      this.showTips = true;
      //  清除时间事件
      clearTimeout(this.timer);
      //  隐藏放大倍数
      this.timer = setTimeout(() => {
        this.showTips = false;
      }, 1000);
    },
    /**
     * @desc 缩略图切换图片
     * @param {Number} 图片下标
     */
    switchPage(index) {
      if (this.isLoading) return;
      if (index === -1 || index === this.list.length) {
        return;
      }
      this.scrollThumbnailList(index);
      this.index = index;
      //  挂载图片
      this.mountImg();
    },
    /**
     * @desc 图片放大,缩小
     * @param {Boolean} enlarge 放大
     * @author 杨文杰
     * @date 2019年5月8日16:21:23
     */
    enlarge(enlarge) {
      if ((enlarge && this.scale >= 5) || (!enlarge && this.scale === 0.25)) {
        return;
      }
      this.showScaleTips();
      //  放大或缩小
      enlarge ? (this.scale += 0.25) : (this.scale -= 0.25);

      //  当缩放为1时，图片回归正中央
      if (this.scale === 1) {
        //  设置图片在查看器中的默认居中位置
        this.setImgCenterPosition();
      }
      //  操作图片
      this.transformImg();
    },
    /**
     * @desc 旋转图片
     * @author 杨文杰
     * @date 2019年5月8日16:21:23
     */
    transformImg() {
      this.$set(
        this.imgStyle,
        "transform",
        `scale(${this.scale}) rotate(${this.deg}deg)`
      );
    },
    /**
     * @desc 图片旋转
     * @author 杨文杰
     * @date 2019年5月8日16:21:23
     */
    rotate() {
      this.deg += 90;
      //  操作图片
      this.transformImg();
    },
    /**
     * @desc 关闭查看图片器
     * @author 杨文杰
     * @date 2019年5月8日16:21:23
     */
    closeImgView() {
      this.$emit("update:isShow", false);
      this.$emit("close", false);
    },
    /**
     * @desc 下载图片
     * @author 杨文杰
     * @date 2019年6月25日 14:29:19
     */
    download(url, filename = "") {
      fetch(url, {
        mode: "cors"
      })
        .then(res => res.blob())
        .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.download = filename;
          a.href = blobUrl;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(blobUrl);
        });
    },
    /**
     * @desc 删除图片
     * @date 2019年9月29日 10:27:26
     */
    del() {
      this.$emit("delimg", this.index);
    }
  }
};
</script>
<style scoped lang='scss'>
@import "./index.scss";
</style>
