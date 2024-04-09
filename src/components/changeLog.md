# 新版本组件库改动

## 公共样式调整

1. 删除`.j-ft-green`
2. 删除`.j-ft-green-hover`
3. 删除`.j-ft-darkgray` 深色灰色字体
4. 删除`.j-bg-darkgray` 深色灰色背景
5. 删除`.j-add-btn`和`.j-del-icon`类名 通过按钮组件控制
6. `.j-scroll-bar`调整为使用公共滚动条样式，以后不存在细滚动条样式
7. `.j-mask`背景色调整为白色数透明度60%
8. `.j-container`的`padding: 40px 50px;`调整为`padding:0 50px 300px;`最小高度为屏幕高度
9. 新增`.j-window-center`根据整个窗口居中
10. 新增`.j-pre-wrap`保留文本格式

## 工具类添加

1. 新增 `getSource` 方法，用于获取外部依赖资源

## button

1. 新增type判断按钮类型`["success", "plain", "danger",'delete']`

2. 删除`plain`参数，采用`type="plain"`替代

3. 删除`slotText`为空的判断按钮显示为正方形的`+`号图片，修改为slotText为`'+'`号的时候显示

4. 删除`isDel`参数，修改为`type="delete"`

5. 新增`slotText`为`'-'`号的时候显示减号按钮

6. 新增`shape="circle"`参数控制`'+'`号按钮是否是圆形按钮 `size`控制圆按钮大小 默认`22*22` 大按钮`28*28`

## jrSuperSetp

* 组件更名为 `jrStepBar`

## tablePro

* 默认使用新边框模式，如需要使用旧边框模式，可设置 `oldBorder` 为 true，进行降级

* 表格行高度调整为 46 px

## upload

* `input` 标签拼写错误的id `inpt` 移除

## select

1. 删除`isError`参数，必填项请用公共样式或者表单组件来显示

2. 下拉选项级输入框高度由`26`调整为`32`可能会影响业务系统的布局样式

## chooseDistrict

* 修改拼写错误的方法名 `cancle` 为 `cancel`


## htmlToPdf

* `actionUrl`参数调整为`action`

## htmlToImg

* 组件名字`htmlToImg`修改成`JrHtmlToImg`


## preview

* 删除参数`imgViewConfig`，图片查看器配置参数根据图片查看器传即可


## switch

* 新增`type`参数`["success", "danger"]`对应绿色和红色开关

## input

1. 输入框默认高度修改 `26px` => `32px`

2. 设置`readonly = true`时，  光标修改为手势

3. 新ui交互效果

4. `surplusVisibilityConfig` 文本域右下角 可输入字数 的显示控制，接收 `Number`类型， 默认 10， <= 10 ， 显示 可输入字数

## load

1. 定义有识别度的name `load` => `loadingPetal`

2. 是否显示属性变动   `isShow` => `visible`

## loading

* 定义有识别度的name `loading` => `loadingStep`

## newupload

1. 组件更名为 `uploadFile`
2. 删除参数`imgViewConfig`，按照图片查看器的参数进行传参即可

## searchBar

1. 删除`btns`参数
2. 修改`searchList`中的日历范围开始日期绑定的key值`starKey`，调整为`startKey`
3. 查询组件距离底部`16px`
4. 新增`isShowQuery`参数 是否隐藏查询按钮
5. `searchList`参数调整,删除每项中对应的参数有:`list`、`inputType`、`dateType`、`minStart`、`maxStart`
6. 删除事件`handleInput`、`handleBlur`、`iconClick`、`inputFocus`、`watchItem`

```javascript
searchList = [
  // 下拉组件
  {
    // 渲染组件类型
    type: 'select',
    label: "水果大王：",
    bindKey: 'one',
    flex: "0 0 25%",
    // 绑定的值
    val: '',
    // 下拉组件属性配置
    attrConfig:{
      items: ["杨梅红艺术教育集团", "杰人软件", "邓肯舞蹈"]
    },
    watch: true,
    // 监听值变化 配合watch:true使用
    onChange(newVal,oldVal) {},
    // 下拉组件事件配置
    eventConfig: {
      change() {}
    }
  },
  // 输入框组件
  {
    type: 'input',
    // 输入框组件属性配置
    attrConfig:{},
    // 输入框组件事件配置
    eventConfig: {}
  },
  // 日历选择组件
  {
    type: 'datePicker',
    // 日历选择组件属性配置
    attrConfig:{},
    // 日历选择组件事件配置
    eventConfig: {}
  },
  // 日历范围组件
  {
    type: 'datePicker',
    val: [],
    // 开始时间对应的key值
    startKey: 'start',
    // 结束时间对应的key值
    endKey: 'end',
    // 开始日历组件属性配置
    startAttrConfig: {},
    // 开始日历组件事件配置
    startEventConfig: {},
    // 结束日历组件属性配置
    endArrtConfig: {},
    // 结束日历组件事件配置
    endEventConfig: {}
  }
]
```

## treeItemBox

1. 删除`scrollViewConfig`参数，调整为根据滚动加载更多组件传参
2. 删除`showBtns`参数，由业务系统自己控制是否显示插槽按钮

## headCut

1. 修改组件名`headCut`为`JrHeadCut`
2. 删除`actionUrl`参数,按照上传组件`action`进行传参
3. 新增`visible`参数控制显示隐藏,删除`on-close`方法,采用`visible.sync`同步关闭

## head

1. 边距调整

## page

1. 分页下拉调整为`[15, 30, 50, 100]`
2. 默认分页容量选择`15`

## form-item

1. 默认必填项`top`值调整为`4px`,字体大小调整为`14px`
2. 表单每行之间距离从`22px`调整为`16px`
3. 表单label 后生成冒号
4. `labelPositon` 为 `justify` `时，label` 文字后面会自动跟一个 `冒号`

## tableFile

1. 调整组件名为`tableFileUpload`
2. 删除`uploadUrl`参数,调整为上传组件对应`action`参数

## checkbox-group

1. 新增max限制最大选中数量

## 未参与搬家的旧组件 更新新版组件库需要替换成新查询组件和新表格组件

1. `headerSearch`
2. `table`
3. `advancedQuery`
4. `waterMark`

## 新增组件

1. `container`组件,和`j-container`样式一样,可通过参数控制标题组件是否显示及标题显示内容
