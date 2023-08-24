import { deepCopy } from "../../utils/data";

/**
 * @desc 筛选不同类型的列
 * @param {*} columns
 * @param {*} fixedType
 */
export const convertColumnOrder = (columns, fixedType) => {
  const obj = {
    left: [],
    other: [],
    right: []
  }

  columns.forEach((col) => {
    if (col.fixed) {
      obj[col.fixed].push(col);
    } else {
      obj.other.push(col);
    }
  });
  if (fixedType) {
    return obj[fixedType];
  } else {
    return obj.left.concat(obj.other).concat(obj.right);
  }
};

/**
 * @desc 获取全部列
 * @param {*} cols
 * @param {*} forTableHead
 */
export function getAllColumns(cols, forTableHead = false) {
  const columns = deepCopy(cols);
  const result = [];
  columns.forEach(column => {
    if (column.children) {
      if (forTableHead) {
        result.push(column);
      }
      result.push.apply(
        result,
        getAllColumns(column.children, forTableHead)
      );
    } else {
      result.push(column);
    }
  });
  return result;
}
