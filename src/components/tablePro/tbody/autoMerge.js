/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[表格自动合并]
创建时间: 2019年6月3日 15:30:20
维护人: August

代码思路：

初始化配置
1.  可合并的列
2.  可合并的列其他一系列参数

合并逻辑
1.  按照配置或默认的合并顺序进行执行合并
2.  从右侧寻找，或从下方开始寻找

*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
export default {
  props: {
    autoMerge: Boolean,
  },
  watch: {
    tbodyList: {
      immediate: true,
      deep: true,
      handler() {
        //  合并配置
        const mergeConfig = {}
        //  已使用的坐标
        const alreadyUseRect = new Set()

        //  收集使用自动合并配置的行列数据
        const valueArr = this.tbodyList
          .reduce((prev, current) => {
            prev.push([
              ...this.cloneTheadList
                .filter((col) =>
                  this.$utils.hasAttr(col, 'autoMerge')
                    ? col.autoMerge
                    : this.autoMerge
                )
                .map((col) => {
                  let {
                    props,
                    autoMergeDirection,
                    autoMergePreferDirection = 'x',
                  } = col
                  let _autoMergeDirectionX
                  let _autoMergeDirectionY

                  if (!['x', 'y'].includes(autoMergePreferDirection)) {
                    console.error(
                      `配置：首选合并方向 "autoMergePreferDirection" 必须为x 或 y其中之一，已还原到默认首选横向合并`
                    )
                    autoMergePreferDirection = 'x'
                  }

                  if (autoMergeDirection) {
                    if (
                      !this.$utils.isArray(autoMergeDirection) &&
                      !this.$utils.isString(autoMergeDirection)
                    ) {
                      console.error(
                        `配置：自动合并方向 "autoMergeDirection" 必须为数组或字符串`
                      )
                    }

                    _autoMergeDirectionX = autoMergeDirection.includes('x')
                    _autoMergeDirectionY = autoMergeDirection.includes('y')
                  } else {
                    _autoMergeDirectionX = _autoMergeDirectionY = true
                  }

                  return {
                    props,
                    value: current[props],
                    _autoMergeDirectionX,
                    _autoMergeDirectionY,
                    autoMergePreferDirection,
                  }
                }),
            ])
            return prev
          }, [])
          .filter((row) => Object.keys(row).length)

        if (!valueArr.length) {
          return false
        }

        //  内容行遍历
        valueArr.forEach((row, rowIndex) => {
          //  行遍历
          row.forEach(
            (
              {
                value,
                props,
                _autoMergeDirectionX,
                _autoMergeDirectionY,
                autoMergePreferDirection,
              },
              colIndex
            ) => {
              //  在合并配置中，所有的合并下标都需要加一
              const mergeRowIndex = rowIndex + 1
              const mergeColIndex = colIndex + 1
              const alreadyUseRectArr = Array.from(alreadyUseRect)

              //  值为空字符串 或者 坐标已被使用
              if (
                value === '' ||
                alreadyUseRectArr.includes(`${mergeRowIndex}.${mergeColIndex}`)
              ) {
                return
              }

              //  此列右侧合并规则名
              const mergeXPath = `${mergeRowIndex}.${props}.x`
              //  此列下方合并规则名
              const mergeYPath = `${mergeRowIndex}.${props}.y`

              //  往右合并逻辑函数
              const mergeToX = () => {
                //  允许往右合并
                if (_autoMergeDirectionX) {
                  //  本行此列单元格已使用的Y合并长度
                  const alreadyMergeYLength = this.$utils.safeGet(
                    mergeConfig,
                    mergeYPath
                  )
                  //  下一列下标
                  let nextColIndex = colIndex + 1

                  //  存在右侧下一列
                  while (row[nextColIndex]) {
                    let { value: nextValue } = row[nextColIndex]

                    //  下一列的合并下标，在合并配置中，所有的合并下标都需要加一
                    let nextColMergeIndex = nextColIndex + 1

                    //  本行此列单元格未使用下方合并，并且存在下一列的值，并且下一列的值与本次对比列值相同，并且下一列单元格未被使用合并
                    if (
                      !alreadyMergeYLength &&
                      nextValue &&
                      value === nextValue &&
                      !alreadyUseRectArr.includes(
                        `${mergeRowIndex}.${nextColMergeIndex}`
                      )
                    ) {
                      //  保存已使用坐标
                      alreadyUseRect
                        .add(`${mergeRowIndex}.${mergeColIndex}`)
                        .add(`${mergeRowIndex}.${nextColMergeIndex}`)

                      //  设置合并的距离
                      this.$utils.safeSet(
                        mergeConfig,
                        mergeXPath,
                        nextColMergeIndex - colIndex
                      )

                      //  继续循环
                      nextColIndex++
                    }
                    //  不符合时，设置一个不存在的属性，跳出右侧循环合并
                    else {
                      nextColIndex = 'none'
                    }
                  }
                }
              }

              //  往下合并逻辑函数
              const mergeToY = () => {
                //  允许向下合并
                if (_autoMergeDirectionY) {
                  //  本行此列单元格已使用的X合并长度
                  const alreadyMergeXLength = this.$utils.safeGet(
                    mergeConfig,
                    mergeXPath
                  )
                  //  下一行下标
                  let nextRowIndex = rowIndex + 1
                  //  允许横向合并的最大长度
                  let maxMergeXLength

                  //  存在下一行，尝试合并
                  while (valueArr[nextRowIndex]) {
                    //  下一行
                    const nextRow = valueArr[nextRowIndex]
                    //  下一行此列的内容
                    const { value: nextRowSameColValue } = nextRow[colIndex]
                    //  下一行的合并下标，在合并配置中，所有的合并下标都需要加一
                    const nextRowMergeIndex = nextRowIndex + 1

                    //  本行此列相同内容的数量
                    let sameLength = 0
                    //  这里使用for循环是为了累加相同数量，并且发现内容不相同时，马上跳出循环停止累加
                    for (let i = colIndex; i < row.length; i++) {
                      //  内容相同，并且单元格的坐标未被使用
                      if (
                        row[i].value === nextRowSameColValue &&
                        !alreadyUseRectArr.includes(`${rowIndex + 1}.${i + 1}`)
                      ) {
                        sameLength++
                      } else {
                        break
                      }
                    }

                    //  下一行此列相同内容的数量
                    let nextRowSameLength = 0
                    //  这里使用for循环是为了累加相同数量，并且发现内容不相同时，马上跳出循环停止累加
                    for (let i = colIndex; i < nextRow.length; i++) {
                      //  内容相同，并且单元格的坐标未被使用
                      if (
                        nextRow[i].value === nextRowSameColValue &&
                        !alreadyUseRectArr.includes(
                          `${nextRowIndex + 1}.${i + 1}`
                        )
                      ) {
                        nextRowSameLength++
                      } else {
                        break
                      }
                    }

                    //  如果是首次往下寻找，要记录能够横向合并的最大距离
                    if (maxMergeXLength === undefined) {
                      //  允许横向合并的最大长度
                      maxMergeXLength =
                        nextRowSameLength > sameLength
                          ? sameLength
                          : nextRowSameLength

                      //  如不允许横向合并，限制只能横向合并长度为1
                      if (!_autoMergeDirectionX) {
                        maxMergeXLength = 1
                      }
                    }

                    //  下一行的此列内容与本行此列内容相同
                    if (nextRowSameColValue === value && maxMergeXLength) {
                      /**
                       * 此处逻辑较为复杂，如理解不清楚，请找August获取流程说明图辅助理解
                       */

                      //  允许横向合并的最大长度大于一，而且存在本行此列的右侧，而且本行此列的右侧内容等于下一行此列的内容，而且本行中相同内容数量大于允许横向合并的最大长度
                      if (
                        maxMergeXLength > 1 &&
                        row[colIndex + 1] &&
                        nextRowSameColValue === row[colIndex + 1].value &&
                        nextRowSameLength >= maxMergeXLength
                      ) {
                        //  存在本行此列单元格已使用的横向合并长度，同时本行此列单元格已使用的横向合并长度等于允许合并的最大横向合并长度，说明允许横纵向合并
                        if (
                          alreadyMergeXLength &&
                          alreadyMergeXLength === maxMergeXLength
                        ) {
                          //  保存已使用的纵横向坐标
                          for (
                            let x = mergeRowIndex;
                            x <= nextRowMergeIndex;
                            x++
                          ) {
                            for (
                              let y = mergeColIndex;
                              y <= colIndex + maxMergeXLength;
                              y++
                            ) {
                              alreadyUseRect.add(`${x}.${y}`)
                            }
                          }

                          //  设置横向合并的距离
                          this.$utils.safeSet(
                            mergeConfig,
                            mergeXPath,
                            maxMergeXLength
                          )
                          //  设置竖向合并的距离
                          this.$utils.safeSet(
                            mergeConfig,
                            mergeYPath,
                            nextRowMergeIndex - rowIndex
                          )

                          //  下一行的下标加一
                          nextRowIndex++
                        }
                        //  不符合要求，跳出往下合并循环
                        else {
                          nextRowIndex = 'none'
                        }
                      }
                      //  当本行此列的右侧不存在同样内容
                      else {
                        //  本行此列单元格未使用横向合并
                        if (!alreadyMergeXLength) {
                          //  保存已使用坐标
                          alreadyUseRect
                            .add(`${mergeRowIndex}.${mergeColIndex}`)
                            .add(`${nextRowMergeIndex}.${mergeColIndex}`)

                          //  设置合并的距离
                          this.$utils.safeSet(
                            mergeConfig,
                            mergeYPath,
                            nextRowMergeIndex - rowIndex
                          )
                          //  继续往下寻找
                          nextRowIndex++
                        }
                        //  已使用横向合并，跳出循环
                        else {
                          nextRowIndex = 'none'
                        }
                      }
                    }
                    //  不相同时，跳出循环合并
                    else {
                      nextRowIndex = 'none'
                    }
                  }
                }
              }

              //  合并方法执行顺序
              let execQueue = [mergeToY]

              //  自动合并首选方向为横向
              if (autoMergePreferDirection === 'x') {
                execQueue.unshift(mergeToX)
              }
              //  自动合并首席方向为竖向
              else {
                execQueue.push(mergeToX)
              }

              execQueue.forEach((fn) => fn())
            }
          )
        })

        this.$nextTick(() => {
          setTimeout(() => {
            this.parseMergeConfig(mergeConfig)
          }, 0)
        })
      },
    },
  },
}
