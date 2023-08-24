/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[对角线计算]
创建时间: 2019年6月3日 15:30:20
维护人: August

*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
export default {
  methods: {
    /**
     * @desc 对角线长度
     * @param {*} th
     */
    diagonalStyles(th) {
      //  单元格高度(单元格高度 * 行数) - 2像素边框
      const height = (this.thRowHeight * th.rowSpan) - 2;
      //  单元格宽度（单元格宽度 * 列数）
      const width = th.width * th.colSpan;
      //  对角线长度
      const diagonal = this.$utils.countDiagonal(width, height);
      //  对角线旋转角度
      const angle = 270 + (Math.asin(height / diagonal) / Math.PI * 180);

      return {
        height: diagonal + "px",
        transform: `rotate(${angle}deg)`,
      };
    }
  }
}
