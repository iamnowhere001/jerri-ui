/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[表格合并]
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
      //  合并范围数组集合
      mergeRangeArr: [],
      //  合并范围起点坐标集合
      mergeRangeStartMap: [],
      //  全部合并范围坐标数组
      allMergeRectArr: []
    }
  },
  props: {
    mergeConfig: Object
  },
  watch: {
    /**
     * @desc 观察列配置改变
     */
    cloneTheadList: {
      deep: true,
      handler() {
        this.mergeConfig && this.parseMergeConfig(this.mergeConfig);
      }
    },
    /**
     * @desc 观察合并规则改变
     */
    mergeConfig: {
      immediate: true,
      deep: true,
      handler() {
        this.mergeConfig && this.parseMergeConfig(this.mergeConfig);
      }
    }
  },
  methods: {
    /**
     * @desc 合并单元格
     * @param {Number} x
     * @param {Number} y
     */
    mergeCell(x, y) {
      const range = this.isMergeStart(x, y);
      const attr = {
        "data-rect": `${x}.${y}`
      };
      if (range) {
        attr["colspan"] = range.x;
        attr["rowspan"] = range.y;
      }
      return attr;
    },
    /**
     * @desc 解析合并配置
     * @param {Object} mergeConfig 合并配置
     */
    parseMergeConfig(mergeConfig) {
      //  字段下标集合
      const fieldsIndex = this.cloneTheadList.reduce((prev, current, currentIndex) => {
        //  currentIndex 是从 0 开始计算
        prev[current.props] = currentIndex + 1;
        return prev;
      }, {});

      //  合并范围数组
      const mergeRangeArr = [];
      //  跳出循环
      let breakLoop;

      /**
       * mergeConfig = {
       *   行序号：{ 需要扩张的字段所处列: { y: 纵向长度, x: 横向长度}}
       *   1: { date: { y: 2 } }
       * }
       */
      for (let rowIndex in mergeConfig) {
        rowIndex = +rowIndex;
        //  存在不合法的配置，跳出循环
        if (breakLoop) {
          break;
        }
        const row = mergeConfig[rowIndex];

        for (let props in row) {
          //  此行的合并配置
          const mergeOpt = row[props];
          //  开始的列序号
          const startColIndex = fieldsIndex[props];

          //  校验是否正确的合并范围
          if (
            this.checkMerge && !this.isCorrectMergeRange(props, {
              mergeOpt,
              colIndex: startColIndex,
              rowIndex
            })
          ) {
            breakLoop = true;
            break;
          }

          const { x, y } = mergeOpt;
          //  结束的列序号（去除本身需要减一）
          const endColIndex = x ? startColIndex + x - 1 : startColIndex;
          //  开始的行序号
          const startRowIndex = rowIndex;
          //  结束的行序号（去除本身需要减一）
          const endRowIndex = y ? startRowIndex + y - 1 : startRowIndex;
          //  本次合并的起始坐标和结束坐标
          const range = {
            props,
            mergeOpt,
            start: { x: startColIndex, y: startRowIndex },
            end: { x: endColIndex, y: endRowIndex },
            rowIndex,
            xLen: x,
            yLen: y
          };

          //  本次合并范围中的所有坐标字符串数组
          range.rangeRectArr = this.parseRangeRect(range.start, range.end);

          //  如需要检查合并配置，校验本次的合并范围与之前的配置是否重复
          if (
            this.checkMerge && this.isRepeatMergeRange(mergeRangeArr, range)
          ) {
            breakLoop = true;
            break;
          } else {
            mergeRangeArr.push(range);
          }
        }
      }

      //  保存经过解析的合并配置
      this.mergeRangeArr = mergeRangeArr;

      //  合并范围起点坐标集合
      this.mergeRangeStartMap = mergeRangeArr.reduce((prev, { start, xLen, yLen }) => {
          prev[`${start.x}.${start.y}`] = { x: xLen, y: yLen }
          return prev;
        }, {});

      //  全部合并范围坐标数组
      this.allMergeRectArr = mergeRangeArr.reduce((prev, current) => {
          prev = [...prev, ...current.rangeRectArr]
          return prev;
        }, []);
    },
    /**
     * @desc 检查是否正确的合并范围
     * @param {String} props 字段名称
     * @param {Object} arg2 合并配置，行号，列号
     */
    isCorrectMergeRange(props, { mergeOpt, colIndex, rowIndex }) {
      const has = Object.hasOwnProperty;
      const errorPrint = msg => {
        const errorTip = [
          [`第${rowIndex}行合并配置错误，字段：${props}, 配置为：`, mergeOpt],
          msg
        ];
        errorTip.forEach(msg =>
          window["console"].error.apply(window, msg.filter(item => item))
        );
        throw new Error("请检查表格合并单元格配置");
      };

      if (!has.call(mergeOpt, "x") && !has.call(mergeOpt, "y")) {
        errorPrint(["如传递了合并范围，请确保传入了 x 或 y 至少其中之一参数"]);
      }
      let { x, y } = mergeOpt;
      if (x && typeof x !== "number") {
        if (x === "all") {
          mergeOpt.x = this.cloneTheadList.length - colIndex + 1;
        } else {
          errorPrint(["合并的 x 配置必须是数字或 'all'"]);
        }
      }
      if (y && typeof y !== "number") {
        if (y === "all") {
          mergeOpt.y = this.tbodyList.length - rowIndex + 1;
        } else {
          errorPrint(["合并的 y 配置必须是数字或 'all'"]);
        }
      }
      // if (x && x <= 1) {
      //   errorPrint(["合并的 x 长度最小为2"]);
      // } else if (y && y <= 1) {
      //   errorPrint(["合并的 y 长度最小为2"]);
      // }
      //  判断合并后的内容是否超出表格范围
      if (x && colIndex + x - 1 > this.cloneTheadList.length) {
        errorPrint(["合并的 x 长度不得超出表格列数"]);
      }
      //  判断合并后的内容是否超出表格范围
      if (y && rowIndex + y - 1 > this.tbodyList.length) {
        errorPrint(["合并的 y 长度不得超出表格行数"]);
      }
      return true;
    },
    /**
     * @desc 校验本次的合并区域与之前的合并区域是否重复
     * @param {Array} mergeRangeArr 已经保存的坐标集合
     * @param {Object} range 需要校验的坐标集合
     */
    isRepeatMergeRange(mergeRangeArr, range) {
      let errorPrint = conflict => {
        window["console"].error(
          `第${range.rowIndex}行字段为：${range.props}合并配置重复，当前配置为`,
          {
            [range.props]: range.mergeOpt
          },
          `冲突配置为`,
          conflict
        );
        throw new Error("请检查表格合并单元格配置");
      };
      return mergeRangeArr.length
        ? mergeRangeArr.some(item => {
          let rangeStr = item.rangeRectArr.join(",");
          return range.rangeRectArr.some(nowRect => {
            if (rangeStr.includes(nowRect)) {
              errorPrint({
                [item.props]: item.mergeOpt
              });
              return true;
            }
          });
        })
        : false;
    },
    /**
     * @desc 解析范围内的所有坐标
     * @param {Object} start 开始坐标系
     * @param {Object} end 结束坐标系
     */
    parseRangeRect(start, end) {
      const rectArr = [];
      for (let x = start.x; x <= end.x; x++) {
        for (let y = start.y; y <= end.y; y++) {
          rectArr.push({
            x,
            y
          });
        }
      }
      return rectArr.map(({ x, y }) => `${x}.${y}`);
    },
    /**
     * @desc 是否允许渲染
     * @param {Object} td 单元格
     * @param {Number} x x坐标
     * @param {Number} y y坐标
     */
    canRender(x, y) {
      let answer = true;
      if (this.allMergeRectArr.length) {
        //  不是合并开始，且 包含在合并范围中
        if (!this.isMergeStart(x, y) && this.inMergeRange(x, y)) {
          answer = false;
        }
      }
      return answer;
    },
    /**
     * @desc 判断坐标是否某个合并范围的起点
     * @param {*} x
     * @param {*} y
     */
    isMergeStart(x, y) {
      return this.mergeRangeStartMap[`${x}.${y}`] || null;
    },
    /**
     * @desc 判断坐标是否在合并坐标范围字符串中
     */
    inMergeRange(x, y) {
      return this.allMergeRectArr.includes(`${x}.${y}`);
    }
  }
}
