/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[插槽组件]
创建时间: 2019年9月4日 11:43:50
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
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
