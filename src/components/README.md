# 组件库组件目录

##  新增须知

在组件库组件目录新增组件时，要遵循以下规则，可参考 `button` 组件例子

1.  目录规则及命名必须与其他组件命名规则相同
2.  通过 `组件名/index.js` 导出组件

##  文件用途

`components/index.js` 为全量组件导出文件，允许业务系统通过如下方式全量引入组件库。

```js
import jrUI from "jerri-ui";
import "jerri-ui/lib/index/style.css";

Vue.use(jrUI);
```

`components/base/index.js` 为基础组件导出文件，允许业务系统通过以下方式只引入基础组件。
此时按需引入的组件，需要自行引入。

```js
import jrUI_base from "jerri-ui/lib/base";
import "jerri-ui/lib/base/style.css";

import { JrMusicPlayer } from "jerri-ui";
Vue.use(JrMusicPlayer);
```
