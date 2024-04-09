/****************************************************************************

所属系统: 组件库
所属模块: 工具模块—[Vue指令，v-title]
创建时间: 2019年4月24日 14:51:53

***************************************************************************/
/**
 * 获取文本在DOM中的长度
 * @param {*} word 文本
 */
function getWordInDOMWidth(word) {
  let temp = document.createElement("div");
  temp.style.visibility = "hidden";
  temp.style.position = "absolute";
  temp.style.top = "-9999px";
  temp.innerText = word;
  document.body.appendChild(temp);
  let len = temp.clientWidth;
  temp.parentNode.removeChild(temp);
  return len;
}

/**
 * @desc 寻找节点中溢出的内容节点，并设置节点溢出属性
 * @param {*} node
 */
function setOverflowAttr(node) {
  [].slice.call(node.childNodes).forEach(childNode => {
    if (childNode.scrollWidth > node.clientWidth) {
      childNode.style.overflow = "hidden";
      childNode.style.textOverflow = "ellipsis";
    }
  });
}

/**
 * @desc 设置标题
 * @param {*} el
 */
function setTitle(el, { value }) {
  //  明确指定为false时，不执行
  if (!value && Object.prototype.toString.call(value) === "[object Boolean]") {
    return;
  }

  el.setAttribute("title", "");

  //  无内容，不执行
  if (!el.childNodes.length) {
    return;
  }

  setTimeout(() => {
    const style = getComputedStyle(el);

    const sumPadding = (paddingType) => {
      return paddingType.reduce((prev, attr) => {
        prev += parseInt(style[`padding-${attr}`]);
        return prev;
      }, 0)
    }

    const padding = {
      offsetHeight: sumPadding(['top', 'bottom']),
      offsetWidth: sumPadding(['left', 'right']),
    };
    const offsetType = ["offsetHeight", "offsetWidth"];
    const scrollType = ["scrollHeight", "scrollWidth"];

    const childNode = el.childNodes[0];

    let outof;

    outof = offsetType.some((offsetName, index) => {
      if (childNode.nodeName === "#text" && offsetName === "offsetWidth") {
        if (el.scrollWidth > el.clientWidth) {
          return true;
        }
      } else {
        if (childNode[scrollType[index]] > childNode[offsetName]) {
          return true;
        }

        if (childNode[offsetName] > (el[offsetName] - padding[offsetName])) {
          return true;
        }
      }
    });

    if (outof) {
      el.setAttribute("title", el.innerText);
    }
  });
}


/**
 * v-title
 * @desc 目标元素的内容被看不完全时，会给此元素增加title属性，值为元素的内容
 * @example
 * ```vue
 * <div v-title>我是一段很长很长的文本，至于有多长呢？就像我和你的距离一样这么长</div>
 * ```
 */
export default {
  bind: setTitle,
  update: setTitle
};
