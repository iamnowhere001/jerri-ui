/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[树状表格]
创建时间: 2019年6月3日 15:30:20
维护人: August

监听配置改变，生成树状数组

根据树状数组，拆分成表格

提供新增API，新增时往对应的树下插入新数据

*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
export default {
  data() {
    return {
    }
  },
  props: {
    treeConfig: Array,
  },
  watch: {
    // //  监听列表变动
    // tbodyList: {
    //   immediate: true,
    //   deep: true,
    //   handler() {
    //     this.$nextTick(() => {
    //       //  存在树状配置 且 拥有长度
    //       if (this.treeConfig && this.tbodyList.length) {
    //         this.treeConfigPraseMergeConfig();
    //       }
    //     });
    //   }
    // }
  },
  created() {
    // //  传入了配置
    // if (this.treeConfig) {
    //   //  往父组件挂载新增树状行方法
    //   this.$parent.addTreeRow = this.addTreeRow;

    //   //  未存在行数据，需要对行数据初始化
    //   if (!this.tbodyList.length) {
    //     this.parseTreeConfigToRow();
    //   }
    // }
  },
  methods: {
    // /**
    //  * @desc 树状配置结合当前列表数据生成合并配置
    //  */
    // treeConfigPraseMergeConfig() {
    //   const mergeConfig = {};

    //   /**
    //    * 合并Y轴的字段目标
    //    * 结构：
    //    *
    //    * [name]: {
    //    *  startRowIndex: 0,
    //    *  length: 1
    //    * }
    //    */
    //   const mergeYTarget = {}

    //   /**
    //    * @desc 筛选出需要合并的列
    //    * @param {String} _treeProps 列字段
    //    * @param {String} type 新增类型
    //    */
    //   const filterMergeProp = (_treeProps, type) => {
    //     mergeYTarget[_treeProps] = {};

    //     this.tbodyList.forEach((row, rowIndex) => {
    //       let targetProps = row._treeProps;
    //       if (type === "add" && !row._treeAddColBtn) {
    //         targetProps = row._treeAddColProps
    //       }

    //       //  此行为需要筛选的行
    //       if (_treeProps === targetProps) {
    //         //  此树已经在合并目标中
    //         if (mergeYTarget[targetProps]["length"]) {
    //           mergeYTarget[targetProps]["length"]++
    //         }
    //         //  新增配置
    //         else {
    //           mergeYTarget[targetProps] = {
    //             startRowIndex: rowIndex + 1,
    //             length: 1
    //           }
    //         }
    //       }

    //       //  如果当前行属于新增行
    //       if (row._treeAddColBtn) {
    //         //  新增按钮所属表头列配置项
    //         const thObj = this.cloneTheadList.find(item => item.props === row._treeAddColProps);

    //         //  添加新合并选项，内容为新增行的合并起始列，往右合并全部
    //         mergeConfig[rowIndex + 1] = {
    //           [row._treeAddColProps]: { x: "all" }
    //         };

    //         //  设置新增按钮列的渲染方法
    //         thObj.jsxRender = (h, row) => {
    //           const { tr, trIndex, th, thIndex, props, value } = row;

    //           //  新增行，生成新增按钮
    //           if (tr._treeAddColBtn) {
    //             return (
    //               <div class="j-text-left">
    //                 <jr-button
    //                   plain
    //                   slotText={thObj.label}
    //                   onClick={() => {
    //                     this.$parent.$emit("on-treeRow-click", tr)
    //                   }} />
    //               </div>
    //             )
    //           }
    //           //  非新增行
    //           else {
    //             return <div>{value}</div>
    //           }
    //         }
    //       }
    //     });
    //   }

    //   //  循环合并配置，根据情况筛选出需要合并的列
    //   this.treeConfig.forEach(({ _treeProps, _treeAddColProps, children }) => {
    //     filterMergeProp(_treeProps);
    //     if (children) {

    //     } else {
    //       filterMergeProp(_treeAddColProps, "add");
    //     }
    //   });

    //   for (let i in mergeYTarget) {
    //     const treeItem = mergeYTarget[i];
    //     const _treeProps = i;
    //     const { startRowIndex, length } = treeItem;

    //     //  树下的子树数量低于2条时，不需要追加合并项
    //     if (length < 2) {
    //       continue;
    //     }
    //     //  不存在此行合并
    //     if (!mergeConfig[startRowIndex]) {
    //       mergeConfig[startRowIndex] = {};
    //     }
    //     //  不存在此行的列合并
    //     if (!mergeConfig[startRowIndex][_treeProps]) {
    //       mergeConfig[startRowIndex][_treeProps] = {};
    //     }

    //     //  追加竖向列合并配置
    //     mergeConfig[startRowIndex][_treeProps]["y"] = length;
    //   }

    //   //  解析合并配置，并渲染合并界面
    //   this.parseMergeConfig(mergeConfig);
    // },
    // /**
    //  * @desc 解析树状表格配置为每一行
    //  */
    // parseTreeConfigToRow() {
    //   const treeList = this.deepEachList(this.treeConfig);
    //   treeList.forEach(row => this.tbodyList.push(row));
    // },
    // /**
    //  * @desc 深度遍历生成列表
    //  * mergeConfig: [
    //  *  {
    //  *    label: "教务指导评分",
    //  *    props: "assessment"
    //  *  }
    //  * ]
    //  *
    //  * to
    //  *
    //  * tbodyList: [
    //  *  //  此行为带有新增按钮行
    //  *  [
    //  *    {
    //  *      assessment: "教务指导评分"
    //  *    }
    //  *  ]
    //  * ]
    //  */
    // deepEachList(arr, index = 0) {
    //   return arr.reduce((prev, current) => {
    //     //  表单列表
    //     let formList = [];
    //     //  附加新增行
    //     let additionList = [];
    //     //  当前等级树对应的列字段
    //     const _treeProps = this.cloneTheadList[index].props;
    //     //  横向合并的起点列字段
    //     const _treeAddColProps = this.cloneTheadList[this.getFiledColIndex(_treeProps) + 1].props;

    //     //  为treeConfig增加新属性，为当前等级树对应的列字段
    //     current._treeProps = _treeProps;
    //     //  为treeConfig增加新属性，为当前等级树横向合并的起点列字段
    //     current._treeAddColProps = _treeAddColProps;

    //     const row = {
    //       //  当前列字段的值
    //       [_treeProps]: current.label,
    //       //  当前等级树对应的列字段
    //       _treeProps,
    //       //  树状行所属的label文本
    //       _treeLabel: current.label,
    //       //  横向合并的起点列字段
    //       _treeAddColProps,
    //       //  当前行为新增行，所以拥有新增按钮
    //       _treeAddColBtn: true
    //     };
    //     additionList.push(row);

    //     //  如存在子列表
    //     // if(current.children) {
    //     //   formList = [...this.deepEachList(current.children, index + 1)].map(list => {
    //     //     list[current.props] = current.label;
    //     //     return list;
    //     //   });
    //     // }

    //     return [...prev, ...formList, ...additionList];
    //   }, []);
    // },
    // /**
    //  * @desc 添加树状行
    //  */
    // addTreeRow({ _treeLabel, _treeAddColProps }, row) {
    //   //  同类型行的总数
    //   const labelSameCount = this.tbodyList.filter(item => item._treeLabel === _treeLabel).length;
    //   //  首个同类型行下标
    //   const firstSameIndex = this.tbodyList.findIndex(item => item._treeLabel === _treeLabel);
    //   //  首个同同类型行
    //   const firstSameRow = this.tbodyList[firstSameIndex];
    //   //  插入坐标 = 首个同类型行下标 + 同类型行的总数 - 新增行
    //   const insertIndx = firstSameIndex + labelSameCount - 1;

    //   this.tbodyList.splice(insertIndx, 0, {
    //     //  当前行依始的列字段，值为该列的文本
    //     [firstSameRow._treeProps]: _treeLabel,
    //     //  当前行依始的列字段
    //     _treeProps: firstSameRow._treeProps,
    //     //  当前行依始的列文本
    //     _treeLabel: firstSameRow._treeLabel,
    //     //  当前行开始横向合并的字段
    //     _treeAddColProps,
    //     //  当前行不为新增行，所以没有新增按钮
    //     _treeAddColBtn: false,
    //     ...row
    //   });
    // }
  }
}
