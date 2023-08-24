/****************************************************************************

所属系统: 组件库
所属模块: 缩略图列表混入
创建时间: 2020年07月25日 17:11:58
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
export default {
  data() {
    return {
      // 是否显示缩略图列表
      showThumb: false,
      // 是否显示翻页箭头
      showThumbArrow: false,
      // 是否禁止上一页箭头
      isDisThumbPrev: false,
      // 是否禁止下一页箭头
      isDisThumbNext: false,
    };
  },
  mounted() {
    this.resizeListener();
  },
  methods: {
    /**
     * @desc 监听缩略图窗体变化
     * @author 陈宇奇
     * @date 2020年07月27日 10:27:18
     */
    resizeListener() {
      const { thumbContainer } = this.$refs;
      //  开始监听
      this.$utils.addResizeListener(thumbContainer, this.resizeThumb);
      // 销毁组件的时候销毁事件
      this.$once("hook:beforeDestory", () => {
        //  取消监听
        this.$utils.removeResizeListener(thumbContainer, this.resizeThumb);
      });
    },
    /**
     * @desc 监听缩略图容器变化
     * @author 陈宇奇
     * @date 2020年07月25日 17:37:06
     */
    resizeThumb() {
      const { thumbContainer, thumbList } = this.$refs,
        thumbListWidth = thumbList.offsetWidth,
        preWrapWidth = thumbContainer.offsetWidth;
      this.showThumbArrow = thumbListWidth > preWrapWidth;
      // 修改翻页箭头状态
      this.changePageTurningStatus();
      this.scrollIntoView("auto", "center");
    },
    /**
     * @desc 将高亮的缩略图滚动到可视区域
     * @param {String} behavior 定义动画过渡效果
     * @param {String} inline 水平对齐方式
     * @author 陈宇奇
     * @date 2020年07月27日 13:05:42
     */
    scrollIntoView(behavior = "smooth", inline = "nearest") {
      const { thumbList } = this.$refs,
        el = thumbList.querySelector(".active");
      el &&
        el.scrollIntoView({
          behavior,
          inline,
        });
    },
    /**
     * @desc 显示隐藏缩率图列表
     * @author 陈宇奇
     * @date 2020年07月25日 10:35:26
     */
    toggleThumb() {
      this.showThumb = !this.showThumb;
    },
    /**
     * @desc 缩略图列表滚动后，改变翻页按钮的状态
     */
    changePageTurningStatus() {
      const thumbContainer = this.$refs.thumbContainer;
      const { scrollLeft, clientWidth, scrollWidth } = thumbContainer;
      if (clientWidth === scrollWidth) {
        this.isDisThumbPrev = this.isDisThumbNext = true;
        return;
      }

      if (scrollLeft === 0) {
        this.isDisThumbPrev = true;
        this.isDisThumbNext = false;
      } else if (scrollLeft + clientWidth === scrollWidth) {
        this.isDisThumbNext = true;
        this.isDisThumbPrev = false;
      } else {
        this.isDisThumbPrev = this.isDisThumbNext = false;
      }
    },
    /**
     * @desc 翻页缩略图
     * @param {Boolean} isNext 是否是下一页
     * @author 陈宇奇
     * @date 2020年07月25日 18:06:51
     */
    pageTurning(isNext = true) {
      const { thumbContainer } = this.$refs,
        { scrollLeft, clientWidth } = thumbContainer,
        left = isNext ? scrollLeft + clientWidth : scrollLeft - clientWidth;
      thumbContainer.scrollTo({ left, behavior: "smooth" });
    },
  },
};
