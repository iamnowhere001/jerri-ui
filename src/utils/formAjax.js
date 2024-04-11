/****************************************************************************

所属系统: 组件库
所属模块: 通用请求封装
创建时间: 2020年1月13日15:59:02

***************************************************************************/

const request = (options, method) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let uploadFormData = new FormData();
    //如果有请求的data则放入FormData内
    if (options.data) {
      let key = "key";
      for (key in options.data) {
        uploadFormData.append(key, options.data[key]);
      }
    }
    let xhrHandler = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        try {
          resolve(JSON.parse(xhr.response));
        } catch (err) {
          resolve(xhr.response);
        }
      } else {
        if (
          xhr.response &&
          xhr.response.data &&
          xhr.response.data.message &&
          xhr.response.data.message.indexOf("token") > -1
        ) {
          window.parent.postMessage(`{"type": "missToken"}`, "*");
        } else {
          reject(xhr.response);
        }
      }
    };
    xhr.open(method, options.url);
    if (options.headers) {
      for (const key in options.headers) {
        if (options.headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }
    }
    xhr.addEventListener("readystatechange", xhrHandler);

    // 提交请求
    method === "POST" ? xhr.send(uploadFormData) : xhr.send();
  });
};

export let formAjax = (res, method = "POST") => {
  return request(res, method);
};

const aleardyDownload = {};

/**
 * @desc 获取第三方依赖
 * @param {*} url 依赖地址
 * @param {*} autoInsert 自动插入
 */
export function getSource(url, autoInsert) {
  const insertNode = function(url, value) {
    if (autoInsert) {
      const suffix = url.trim().split(".").last;
      const suffixNode = {
        js: "script",
        css: "style",
      };

      if (!aleardyDownload[url]) {
        const node = document.createElement(suffixNode[suffix]);
        node.innerHTML = value;
        document.documentElement.append(node);
      }
    }
  };

  return new Promise((resolve) => {
    if (aleardyDownload[url]) {
      resolve(aleardyDownload[url]);
    } else {
      request({ url }, "get").then((value) => {
        insertNode(url, value);
        aleardyDownload[url] = value;
        resolve(value);
      });
    }
  });
}
