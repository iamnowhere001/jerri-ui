/****************************************************************************

所属系统: KPC
所属模块: chatInfo—[拖拽窗体功能]
创建时间: 2019年6月3日 15:30:20
维护人: August
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/

export default {
  data() {
    return {
      //  打开图片预览列表
      isPreView: false,
      //  图片预览时的样式
      preViewStyle: {},
      //  图片预览翻页左侧按钮禁用
      disabledPageTurningLeft: false,
      //  图片预览翻页右侧按钮禁用
      disabledPageTurningRight: false
    }
  },
  watch: {
    //  切换预览时
    isPreView: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.calcPreViewStyle();
          this.changePageTurningStatus();
        });
      }
    }
  },
  methods: {
    /**
     * @desc 计算预览时的样式，预览时需要将图片的高度进行缩减
     */
    calcPreViewStyle() {
      this.preViewStyle = {};
      this.$nextTick(() => {
        //  正在预览，且存在图片标签，且图片高度已经超出容器高度
        if (
          this.isPreView &&
          this.$refs.img &&
          this.$refs.img.clientHeight >= this.viewHeight
        ) {
          this.preViewStyle = {
            left: `0px`,
            right: `0px`,
            margin: `auto`,
            height: `calc(${this.$refs.img.clientHeight}px - ${this.$refs.preWrap.clientHeight}px)`
          };
        }
      });
    },
    /**
     * @desc 缩略图列表滚动后，改变翻页按钮的状态
     */
    changePageTurningStatus() {
      const preList = this.$refs.preList;
      const { scrollLeft, clientWidth, scrollWidth} = preList;

      if (clientWidth === scrollWidth) {
        this.disabledPageTurningLeft = this.disabledPageTurningRight = true;
        return;
      }

      if (scrollLeft === 0) {
        this.disabledPageTurningLeft = true;
        this.disabledPageTurningRight = false;
      }
      else if ((scrollLeft + clientWidth) === scrollWidth) {
        this.disabledPageTurningRight = true;
        this.disabledPageTurningLeft = false;
      } else {
        this.disabledPageTurningLeft = this.disabledPageTurningRight = false;
      }
    },

    /**
     * @desc 翻页
     * @param {String} type 翻页类型
     */
    pageTurning(type) {
      const preList = this.$refs.preList;
      const length = preList.clientWidth / 2;
      const afterScrollWidth = () => type === "next" ? preList.scrollLeft + length : preList.scrollLeft - length;

      this.comfortableScroll(preList, afterScrollWidth());
      this.pageTurnTimer = setInterval(() => {
        this.comfortableScroll(preList, afterScrollWidth());
      }, 100);

      this.$utils.on(document, "mouseup", this.clearPageTurnTimer);
    },

    /**
     * @desc 清除翻页定时器
     */
    clearPageTurnTimer() {
      clearInterval(this.pageTurnTimer);
      this.$utils.off(document, "mouseup", this.clearPageTurnTimer);
    },

    /**
     * @desc 舒服的滚动
     * @param {HTMLElement} scrollTarget 滚动目标
     * @param {Number} afterScrollWidth 滚动后的宽度
     * @param {Number} stepDistant 每次步骤的滚动距离
     */
    comfortableScroll(scrollTarget, afterScrollWidth, stepDistant = 30) {
      //  当前滚动滚动宽度
      let scrollLeft = scrollTarget.scrollLeft;
      //  总滚动距离
      let scrollDistant = Math.abs(afterScrollWidth - scrollLeft);
      //  如滚动距离最大必须为50
      if (stepDistant > 50) {
        stepDistant = 50;
      }
      //  每次滚动的距离
      let step = (scrollDistant / stepDistant);
      //  如果是倒退滚动
      if (afterScrollWidth < scrollLeft) {
        step = -step;
      }

      ; (function jump() {
        if (scrollDistant > 0) {
          //  加上此次滚动距离后的滚动宽度
          scrollLeft += step;
          //  仍需滚动距离需要减少
          scrollDistant -= Math.abs(step);
          scrollTarget.scrollTo(scrollLeft, 0);
          setTimeout(jump, 10);
        }
      })();
    },

    /**
     * @desc 判断当前图片在缩略图列表中是否需要滚动
     * @param {Number} 图片下标
     */
    scrollThumbnailList(index) {
      const currentThumb = this.$refs.li[index];
      const currentThumbRect = currentThumb.getBoundingClientRect();
      const preList = this.$refs.preList;
      const preWrapRect = preList.getBoundingClientRect();

      //  先计算出，缩略图接近缩略图列表的哪一侧（左还是右）
      const isNearLeft = preWrapRect.left > currentThumbRect.left
        ?
        true
        :
        (currentThumbRect.left - preWrapRect.left) < (preList.clientWidth / 2);
      //  每张图片都有6像素的左边距
      const marginLeft = 6;

      /**
       * @desc 差点接近你
       */
      const alreadyNearYou = (direction) => Math.abs(currentThumbRect[direction] - preWrapRect[direction]) < 10;

      //  根据不同方向函数来判断，当前缩略图有无超出边界
      if (isNearLeft) {
        //  缩略图跑到左侧边界了
        if (currentThumbRect.left < preWrapRect.left || alreadyNearYou("left")) {
          this.comfortableScroll(preList, currentThumb.offsetLeft - currentThumb.clientWidth - marginLeft);
        }
      } else {
        //  缩略图跑到右侧边界了
        if (currentThumbRect.right > preWrapRect.right || alreadyNearYou("right")) {
          this.comfortableScroll(preList, currentThumb.offsetLeft - preList.clientWidth + (currentThumb.clientWidth * 2) + marginLeft);
        }
      }
    },
    /**
     * @desc 切换打开预览
     */
    togglePreView() {
      this.isPreView = !this.isPreView;
      this.setImgCenterPosition();
    }
  }
}
