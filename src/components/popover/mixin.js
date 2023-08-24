/****************************************************************************

所属系统: 组件库
所属模块: 气泡组件-mixin
创建时间: 2020-09-01
维护人: 陈泽光
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/

const PopperMixin = {
  props: {
    // 气泡一直显示
    always: {
      type: Boolean,
      default: false,
    },
    // 触发气泡的方式
    trigger: {
      type: String,
      default: 'hover',
    },
    // 是否要插入的body内
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // 气泡内容
    content: {
      type: String,
      default: '',
    },
    // 显示的气泡的方向，会有边界碰撞校验
    placement: {
      type: String,
      default: 'top',
    },
    // 禁止气泡触发
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 气泡dom节点
      reference: null,
      // 气泡实例
      popper: null,
      // 是否显示气泡
      isShow: false
    };
  },
  watch: {
    disabled(val) {
      if (!val) {
        this.runPopper();
      } else {
        this.destroy();
      }
    },
  },
  mounted() {
    // 初始化气泡组件
    this.runPopper();
  },
  methods: {
    /**
     * @desc 显示/隐藏触发
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    toggle() {
      this.isShow = !this.isShow;
      if (!this.isShow) {
        this.timer = setTimeout(() => {
          this.popper.destroy();
          this.popper = null;
        }, 300);
      }
    },
    /**
     * @desc 隐藏气泡
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    hidePopper() {
      this.isShow = false;
      this.timer = setTimeout(() => {
        this.popper.destroy(); // destroy popper when hide
        this.popper = null;
      }, 300);
    },
    /**
     * @desc 显示气泡
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    showPopper() {
      this.isShow = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.popperTimer) {
        clearTimeout(this.popperTimer);
      }
    },
    /**
     * @desc 加载气泡实例
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    async createInstance() {
      await this.$utils.getSource(
        "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/jui/popper.js",
        true
      );
      // this.isShow = true;
      this.showPopper();
      if (this.popper) {
        this.popper.update();
        return;
      }
      const placementMapper = {
        top: 'top',
        left: 'left',
        right: 'right',
        bottom: 'bottom',
        topLeft: 'top-end',
        topRight: 'top-start',
        leftTop: 'left-end',
        leftBottom: 'left-start',
        bottomLeft: 'bottom-end',
        bottomRight: 'bottom-start',
        rightTop: 'right-end',
        rightBottom: 'right-start',
      };
      const placement = placementMapper[this.placement] ? placementMapper[this.placement] : 'bottom';

      const reference = this.reference = this.reference || this.$el.children[0];
      const popperEl = this.$refs.popper;
      const options = {
        placement,
      };
      if (this.appendToBody) {
        document.body.appendChild(popperEl);
      }
      this.popper = new Popper(reference, popperEl, options);
    },
    /**
     * @desc 点击事件绑定判断
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    handleClick(e) {
      e.stopPropagation();
      if (this.$el.contains(e.target)) {
        if (this.isShow) {
          // this.isShow = false;
          this.hidePopper();
        } else {
          this.createInstance();
        }
      } else if (this.$refs.popper.contains(e.target)) {
        // this.isShow = true;
        this.showPopper();
      } else {
        // this.isShow = false;
        /*eslint-disable */
        if (this.isShow) {
          this.hidePopper();
        }
        /*eslint-disable */
      }
    },
    /**
     * @desc 气泡实例绑定
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    bindEvent() {
      const reference = this.reference = this.reference || this.$el.children[0];
      const popper = this.$refs.popper;
      if (!reference || !popper) {
        return;
      }

      if (this.trigger === 'hover') {
        reference.addEventListener('mouseenter', this.createInstance);
        reference.addEventListener('mouseleave', this.hidePopper);
        popper.addEventListener('mouseenter', this.showPopper);
        popper.addEventListener('mouseleave', this.hidePopper);
      } else {
        reference.addEventListener('click', this.handleClick);
        popper.addEventListener('click', this.showPopper);
        document.documentElement.addEventListener('click', this.handleClick);
      }
    },
    /**
     * @desc 初始化气泡实例
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    runPopper() {
      if (this.disabled) {
        return;
      }
      if (this.always) {
        this.createInstance();
      } else {
        this.bindEvent();
      }
    },
    /**
     * @desc 销毁气泡实例
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    destroy() {
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
    },
    /**
     * @desc 清除事件
     * @author 陈泽光
     * @date 2020年09月07日 08:38:43
     */
    removeEvent() {
      if (!this.reference) {
        return;
      }
      const popper = this.$refs.popper;
      if (this.trigger === 'focus') {
        this.reference.removeEventListener('focus', this.createInstance);
        this.reference.removeEventListener('blur', this.toggle);
      } else if (this.trigger === 'click') {
        this.reference.removeEventListener('click', this.handleClick);
        popper.removeEventListener('click', this.showPopper);
        document.documentElement.removeEventListener('click', this.handleClick);
      } else {
        this.reference.removeEventListener('mouseenter', this.createInstance);
        this.reference.removeEventListener('mouseleave', this.toggle);
      }
    }
  },
  beforeDestroy() {
    this.removeEvent();
    this.$refs.popper.remove();
    this.destroy();
  },

};

export default PopperMixin;
