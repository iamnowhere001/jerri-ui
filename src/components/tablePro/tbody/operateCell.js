/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[表格操作列]
创建时间: 2019年6月3日 15:30:20



***************************************************************************/
export default {
  methods: {
    /**
     * @desc 图标可选渲染
     * @param {*} iconItem
     * @param {*} attr
     * @param {*} args
     */
    iconOptionalRender(iconItem, attr, args) {
      //  隐藏时的特殊处理
      if(attr === "hidden") {
        let hidden = iconItem[attr];

        if(this.$utils.isFunction(hidden)) {
          return !hidden(args, iconItem, attr);
        } else {
          return !hidden;
        }
      }

      let result = iconItem[attr] ? iconItem[attr](args, iconItem, attr) : {};

      //  属性时的特殊处理
      if (attr === "attr") {
        let { class: className = [] } = result
        //  图标所属样式名
        const iconClassName = `j-icon icon-${iconItem.type} `

        //  class值为数组
        if (this.$utils.isArray(className)) {
          className.unshift(iconClassName)
        }
        //  class值为字符串
        else if (this.$utils.isString(className)) {
          className = iconClassName + className
        }

        result.class = className;
      }

      return result;
    }
  },
}
