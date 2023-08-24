/****************************************************************************

所属系统: 组件库
所属模块: 路由自动导出文件
创建时间: 2019年4月24日 14:51:53
维护人: August
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/

const requireView = require.context(
  '.',
  true,
  /.vue$/
);

export default requireView.keys().reduce((prev, modulePath) => {
  const value = requireView(modulePath);
  const viewModal = value.default;
  const { name, label } = viewModal;

  return [...prev,
  {
    path: `/${name}`,
    name,
    label,
    component: viewModal
  }];
}, []);
