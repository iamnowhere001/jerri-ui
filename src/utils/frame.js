/****************************************************************************

所属系统: 组件库
所属模块: 与外框架通讯方法
创建时间: 2019年4月17日 18:05:10


***************************************************************************/
export default {
  /**
   * @desc 获取token
   * @return promise对象 成功则表示获取到token
   * @author 陈宇奇
   * @date 2019年4月17日 15:42:01
   */
  getToken() {
    return new Promise((resolve) => {
      window.parent.postMessage('{"type":"getToken"}', "*");
      let getToken = (e) => {
        if (e.data.includes && e.data.includes("token")) {
          try {
            localStorage.token = JSON.parse(e.data).token;
          } catch (err) {
            console.log(err);
          }
          resolve();
          window.removeEventListener("message", getToken);
        }
      };
      window.addEventListener("message", getToken);
    });
  },
  /**
   * @desc 获取选中校区数据
   * @return promise对象 成功则表示获取到所选校区id
   * @author 陈宇奇
   * @date 2019年4月17日 15:42:01
   */
  getSchool() {
    return new Promise((resolve) => {
      window.parent.postMessage(`{"type":"getSchool"}`, "*");
      let getSchool = (e) => {
        let data = {};
        if (e.data.includes && e.data.includes("getSchool")) {
          try {
            data = JSON.parse(e.data);
            // 选择id保存本地缓存
            localStorage.schoolId = data.schoolId ? data.schoolId : "";
          } catch (err) {
            console.log(err);
          }
          resolve(data);
          window.removeEventListener("message", getSchool);
        }
      };
      window.addEventListener("message", getSchool);
    });
  },
  /**
   * @desc 获取用户信息
   * @return promise对象 用户信息携带在resolve参数中
   * @author 陈宇奇
   * @date 2019年4月17日 18:00:13
   */
  getUserInfo() {
    return new Promise((resolve) => {
      window.parent.postMessage('{"type":"getUserInfo"}', "*");
      let getUserInfo = (e) => {
        let userInfo = {};

        if (e.data.includes && e.data.includes("getUserInfo")) {
          try {
            // 拿到权限解码
            userInfo = JSON.parse(
              decodeURIComponent(JSON.parse(e.data).userInfo)
            );
          } catch (err) {
            console.log(err);
          }
          resolve(userInfo);
          window.removeEventListener("message", getUserInfo);
        }
      };
      window.addEventListener("message", getUserInfo);
    });
  },
  /**
   * @desc 获取当前语言版本
   * @return promise对象
   * @author 陈泽光
   * @date 2019年12月3日10:40:17
   */
  getLang() {
    return new Promise((resolve) => {
      window.parent.postMessage('{"type":"getLanguage"}', "*");
      let getLang = (e) => {
        let lang = {};

        if (e.data.includes && e.data.includes("getLanguage")) {
          try {
            // 拿到权限解码
            lang = JSON.parse(e.data).language;
          } catch (err) {
            console.log(err);
          }
          resolve(lang);
          window.removeEventListener("message", getLang);
        }
      };
      window.addEventListener("message", getLang);
    });
  },
  /**
   * @desc 获取用户权限数据
   * @return promise对象 权限数据携带在resolve参数中
   * @author 陈宇奇
   * @date 2019年4月17日 18:00:13
   */
  getAuthority(url = "") {
    return new Promise((resolve) => {
      window.parent.postMessage(`{"type":"getAuthority","url":"${url}"}`, "*");
      let getAuthority = (e) => {
        let authorityInfo = {};
        if (e.data.includes && e.data.includes("authorityInfo")) {
          try {
            // 拿到权限解码
            authorityInfo = JSON.parse(e.data).authorityInfo;
            authorityInfo = authorityInfo
              ? JSON.parse(decodeURIComponent(JSON.parse(e.data).authorityInfo))
              : "";
          } catch (err) {
            console.log(err);
          }
          resolve(authorityInfo);
          window.removeEventListener("message", getAuthority);
        }
      };
      window.addEventListener("message", getAuthority);
    });
  },
  /**
   * @desc 获取菜单名称
   * @return promise对象 数据携带在resolve参数中
   * @author 陈宇奇
   * @date 2019年4月17日 18:00:13
   */
  getMenuName() {
    return new Promise((resolve) => {
      window.parent.postMessage(
        `{"type":"getMenuName","url":"${location.href}"}`,
        "*"
      );
      let getMenuName = (e) => {
        let name = "";
        if (e.data.includes && e.data.includes("getMenuName")) {
          try {
            // 拿到权限解码
            name = JSON.parse(e.data).menuName;
          } catch (err) {
            console.log(err);
          }
          resolve(name);
          window.removeEventListener("message", getMenuName);
        }
      };
      window.addEventListener("message", getMenuName);
    });
  },
  /**
   * @desc 关闭当前页签
   * @author 陈宇奇
   * @date 2019年4月17日 16:01:27
   */
  closeTab() {
    window.parent.postMessage(`{"type":"close"}`, "*");
  },
  /**
   * @desc 关闭当前页签 刷新来源页
   * @author 陈宇奇
   * @date 2019年4月17日 16:01:27
   */
  refreshOrigin() {
    window.parent.postMessage('{"type": "refresh","close": true}', "*");
  },
  /**
   * @desc 打开新页签
   * @param {String}  menuName 页签的名称
   * @param {String}  url      新页签的url(有参数则url后面拼接)
   * @param {Boolean} isSingle 是否只能打开一个
   * @param {Boolean} isClose  是否关闭上一个页面
   * @author 陈宇奇
   * @date 2019年4月17日 16:07:50
   */
  openTab(menuName, url, isSingle = false, isClose = false) {
    window.parent.postMessage(
      `{"type":"openFrame","config":{"menuName": "${menuName}","menuUrl": "${url}","single": ${isSingle}},"close": ${isClose}}`,
      "*"
    );
  },
  /**
   * @desc 获取通信录数据
   * @param {Number}  type 0为获取当前用户权限通讯录 1为获取所有通讯录 2为获取新单位通讯录
   * @param {Object}  opt 过滤通讯录内容参数 { type:'user' 'position',idList:[]}
   * @return promise对象 通信录数据携带在resolve参数中
   * @author 陈宇奇
   * @date 2019年4月24日 17:31:10
   */
  getContact(type = 0, opt) {
    let string = "";
    switch (type) {
      case 0:
        string = "getPeopleList";
        break;
      case 1:
        string = "getAllPeopleList";
        break;
      case 2:
        string = "getNewPeopleList";
        break;
      default:
        string = "getPeopleList";
        break;
    }

    return new Promise((resolve) => {
      window.parent.postMessage('{"type":' + '"' + string + '"' + "}", "*");
      let getContact = (e) => {
        let peopleList = [];
        if (e.data.includes && e.data.includes(string)) {
          try {
            peopleList = JSON.parse(e.data).data;
          } catch (err) {}

          if (Object.prototype.toString.call(opt) === "[object Object]") {
            if (
              (opt.type === "user" || opt.type === "position") &&
              opt.idList &&
              opt.idList.length
            ) {
              let singleUser = [];
              // 递归删除除了指定ID的数据
              let recursive = (data) => {
                let len = data.length;
                while (len) {
                  len--;
                  let res = data[len].childList;
                  let user = data[len].userList;
                  if (user && user.length) {
                    let userLen = user.length;
                    while (userLen) {
                      userLen--;
                      let id = user[userLen][`${opt.type}Id`];
                      if (opt.isDel) {
                        if (opt.idList.includes(id)) {
                          user.splice(userLen, 1);
                        } else {
                          singleUser.push(user[userLen]);
                        }
                      } else {
                        if (!opt.idList.includes(id)) {
                          user.splice(userLen, 1);
                        } else {
                          singleUser.push(user[userLen]);
                        }
                      }
                    }
                  }

                  res.length && recursive(res);

                  if (!res.length && (!user || !user.length)) {
                    data.splice(len, 1);
                  }
                }
              };

              //递归执行
              recursive(peopleList.data);

              if (opt.single && singleUser.length === 1) {
                peopleList.data = singleUser[0];
              }
            }

            if (opt.isPositionAll) {
              let recursion = (res) => {
                if (res.childList.length) {
                  res.childList.forEach((it) => recursion(it));
                } else {
                  res.userList.forEach((it) => {
                    it.positionName = it.positionFullName;
                  });
                }
              };
              peopleList.data.forEach((el) =>
                el.childList.forEach((it) => recursion(it))
              );
            }
          }

          resolve(peopleList);
          window.removeEventListener("message", getContact);
        }
      };
      window.addEventListener("message", getContact);
    });
  },
  /**
   * @desc 关闭指定页面
   * @author 陈宇奇
   * @date 2019年4月24日 17:31:10
   */
  closePage(url) {
    window.parent.postMessage(`{"type": "closeTab","url":${url}`, "*");
  },
  /**
   * @desc 指定页面自定义事件
   * @author 陈泽光
   * @date 2019年10月15日18:23:30
   */
  customEvent(url, content) {
    window.parent.postMessage(
      `{"type":"customEvent","url":"${url}","content":"${content}"}`,
      "*"
    );
    if (content === "reload") {
      window.parent.postMessage(`{"type":"close"}`, "*");
    }
  },
  /**
   * @desc 自定义事件回调
   * @author 陈泽光
   * @date 2020年8月11日15:30:20
   */
  customCallBack(content, callBack = () => {}) {
    const func = (e) => {
      let data = {};
      try {
        data = JSON.parse(e.data);
        if (data.data === content) {
          callBack();
        }
      } catch (err) {
        console.log(err);
      }
      window.removeEventListener("message", func);
    };
    window.addEventListener("message", func, true);
  },
  /**
   * @desc 修改指定页面的菜单名称
   * @author 陈泽光
   * @date 2019年10月15日18:23:30
   */
  setMenuName(name, url = location.href) {
    window.parent.postMessage(
      `{"type":"setMenuName","url":"${url}","menuName":"${name}"}`,
      "*"
    );
  },
  /**
   * @desc 关闭页签回调事件
   * @param {Function}  callBack 关闭时候执行的回调，可以是一个promise对象
   * @param {Boolean}  isRefresh 是否刷新来源页
   * @author 陈泽光
   * @date 2019年11月25日14:52:53
   */
  asyncClosePage(callBack, isRefresh = false) {
    window.parent.postMessage(
      `{"type":"customEvent","url":"${location.href}","content":"closePage"}`,
      "*"
    );
    let func = async (e) => {
      let data = {};
      try {
        data = JSON.parse(e.data);
        let s = await callBack();
        if (data.type === "closePage") {
          if (isRefresh) {
            window.parent.postMessage('{"type": "refresh","close": true}', "*");
          } else {
            window.parent.postMessage(`{"type":"close"}`, "*");
          }
        }
      } catch (err) {}
    };
    window.addEventListener("message", func, true);
  },
  /**
   * @desc 切换tab页时定位高度
   * @author 陈泽光
   * @date 2019年11月25日14:52:53
   */
  setScrllTop() {
    window.parent.postMessage(
      `{"type":"customEvent","url":"${location.href}","content":"getPageScroll"}`,
      "*"
    );
    let func = async (e) => {
      let data = {};
      try {
        data = JSON.parse(e.data);
        if (data.type === "getPageScroll") {
          let sTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          event.source.postMessage(
            `{"type": "setScrollTop","scrollTop": "${sTop}","url":"${location.href}"}`,
            event.origin
          );
        } else if (data.type === "setScroll") {
          setTimeout(() => {
            document.documentElement.scrollTop = +data.scrollTop;
          }, 200);
        }
      } catch (err) {}
      window.removeEventListener("message", func);
    };
    window.addEventListener("message", func, true);
  },
  /**
   * @desc 审批流页面打开全屏iframe
   * @param {Document} el 遮罩元素
   * @author 陈宇奇
   * @date 2020年5月15日 17:24:01
   */
  openFramePull(el) {
    return new Promise((resolve, reject) => {
      window.parent.postMessage(`{"type":"openFull"}`, "*");
      const func = (event) => {
        let data = {};
        try {
          data = JSON.parse(event.data);
        } catch (err) {
          reject(err);
        }
        // 父页面完成iframe全屏进行的事件
        if (data.type === "finishFull") {
          el && (el.style.backgroundColor = "#fff");
          resolve();
          window.removeEventListener("message", func);
        }
      };
      window.addEventListener("message", func);
    });
  },
  /**
   * @desc 审批流页面打开全屏iframe
   * @param {Document} el 遮罩元素
   * @author 陈宇奇
   * @date 2020年5月15日 17:24:01
   */
  reloadPage() {
    let func = async (e) => {
      let data = {};
      try {
        data = JSON.parse(e.data);
        if (data.type === "reoladPage") {
          window.location.reload();
        }
      } catch (err) {}
    };
    window.addEventListener("message", func, true);
  },
};
