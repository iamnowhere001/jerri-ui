export default function formatHtml2Value(editorDOM) {
  const domTree = [].slice.call(editorDOM.children);
  //  需要发送的消息队列
  const queue = [];
  //  用于记录文本信息的对象
  let textObj = {
    type: "text",
    params: {}
  };

  /**
   * 尝试推入值到对象的某个数组属性
   * @param {String} attr 属性
   * @param {any} value 值
   */
  function try2Push(attr, value) {
    textObj.params[attr] ? textObj.params[attr].push(value) : textObj.params[attr] = [value];
  }

  /**
   * 存在，且是数组，且不为空字符串。的正确数组内容
   * @param {*} content 内容
   */
  function isRightContent(content) {
    return content && Array.isArray(content) && content.join("").trim().length;
  }

  domTree.forEach((p, index) => {
    const childrenNodes = [].slice.call(p.childNodes);
    childrenNodes.filter(node => node).forEach(node => {
      const nodeName = node.nodeName;

      //  @人input标签
      if (nodeName === "INPUT") {
        try2Push("content", "input");
      }
      //  标签是图片
      else if (nodeName === "IMG") {
        try2Push("content", "img");
      }
      //  如果不是 input 或 img，一律当做普通文本接收
      else {
        //  简单标签，文本
        try2Push("content", node.textContent);
      }
    });
    //  如果不是最后一行，追加换行符
    index !== domTree.length - 1 && try2Push("content", "\n");
  });
  const content = textObj.params.content;
  //  存在内容时，才收集数据
  if (isRightContent(content)) {
    queue.push(textObj);
  }
  //  将队列中的文本内容数组内容变为字符串
  queue.forEach(item => {
    const content = item.params.content;
    if (item.type === "text" && isRightContent(content)) {
      item.params.content = content.join("");
    }
  });
  return queue;
}
