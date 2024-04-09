/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[插槽组件]
创建时间: 2019年9月4日 11:43:50


***************************************************************************/
export default {
  name: 'TableSlot',
  functional: true,
  inject: ['tableRoot'],
  props: {
    slotName: String,
    slotArgs: Object
  },
  render: (h, ctx) => {
    const { slotName, slotArgs } = ctx.props;
    return h('div', ctx.injections.tableRoot.$scopedSlots[slotName](slotArgs));
  }
};
