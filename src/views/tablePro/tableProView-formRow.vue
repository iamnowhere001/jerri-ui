<template>
  <div>
    <div class="cell">
      <h1 style="font-size: 40px;">表格表单行案例操场</h1>
      <h3>展示表格行需要额外操作的案例代码</h3>
      <h3>查看案例代码，请在操场中查看 tablePro-formRow.vue 文件</h3>
    </div>

    <div class="cell">
      <h2>可编辑单元格表格</h2>
      <br>
      <p>
        <strong>cellEdit（可编辑单元格）</strong>，类型为布尔值或函数
      </p>
      <p>
        当值布尔值为真时，或函数返回值为真时，该列下的单元格，都会变成（可编辑单元格）
      </p>
      <p>
        如不指定组件类型，可编辑单元格默认类型为文本框，所有组件均为双向绑定更新效果
      </p>
      <p>
        组件被表单校验组件包裹着，你可以通过配置表单校验规则来校验此组件
      </p>
      <br>
      <p>
        <strong>cellEditName（编辑单元格名称）</strong>，类型为字符串或函数
      </p>
      <p>
        默认值为 "input"，对应的值会渲染成对应的组件，或取函数返回值。
      </p>
      <div class="cell">
        <p>cellEditName目前完美支持的类型</p>
        <br>
        <ul>
          <li>input<strong>文本框</strong></li>
          <li>input<strong>文本域</strong></li>
          <li>select<strong>下拉选择</strong></li>
          <li>date-picker<strong>日期选择</strong></li>
        </ul>
      </div>
      <br>
      <p>
        <strong>cellEditRules（可编辑单元格组件校验规则）</strong>，类型为对象或函数
      </p>
      <p>
        <strong>cellEditAttr（可编辑单元格组件属性配置）</strong>，类型为对象或函数
      </p>
      <p>
        <strong>cellEditEvent（可编辑单元格组件事件配置）</strong>，类型为对象或函数
      </p>

      <strong>
        <p>
          以上配置当值为函数时，会返回 th, thIndex, tr, trIndex, value 等参数给到函数中
        </p>
        <p>
          以上属性均在theadList的列配置中
        </p>
      </strong>

      <jr-table-pro ref="tablePro"
                    :theadList="theadList"
                    :tbodyList="tbodyList">
      </jr-table-pro>

      <br>

      <p class="j-text-center">
        <jr-button @click="submit">校验表格表单</jr-button>
        <jr-button @click="() => {
          $refs.tablePro.resetForm();
          }">重置表单</jr-button>
        <jr-input style="width: 160px; transform: translate(10px, 1px);" v-model="specificRowIndex" placeholder="指定校验特定行（下标）" />
        <jr-input style="width: 160px; transform: translate(10px, 1px);" v-model="specificColIndex" placeholder="指定校验特定列（下标）" />
      </p>
    </div>

    <div class="cell">
      <h2>行或单元格外观</h2>
      <br>
      <p>
        <strong>表格配置：rowStyles（行样式）rowClassName（行样式名）cellStyles（单元格样式）cellClassName（单元格样式名）</strong>，类型均为函数
      </p>
      <p>
        在配置函数中自行编写逻辑，给指定行，或单元格返回边框的样式，即可修改外观
      </p>
      <p>
        如实现触摸效果，追加带hover属性的样式名即可，建议直接使用组件库内嵌样式名 j-green-bd-hover
      </p>

      <jr-table-pro :theadList="theadList"
                    :tbodyList="tbodyList"
                    :rowStyles="({trIndex}) => {
                      return {
                        0: {
                          'border': '1px solid red'
                        },
                        4: {
                          'border': '1px solid blue'
                        }
                      }[trIndex]
                    }"
                    :cellStyles="({trIndex, thIndex}) => {
                      return {
                        '22': {
                          'border': '1px solid green'
                        }
                      }[trIndex + '' + thIndex]
                    }"
                    :cellClassName="() => {
                      return 'j-green-bd-hover'
                    }">
      </jr-table-pro>
    </div>

  </div>
</template>

<script>
export default {
  name: "tableProFormRow",
  squareLabel: "表格表单行",
  data() {
    return {
      //  特定校验行号
      specificRowIndex: "",
      //  特定校验列号
      specificColIndex: "",
      theadList: [
        {
          label: "日",
          props: "date",
          width: `300`,
          // 当值为基础类型值时，直接渲染该列下的单元格是否为可编辑单元格
          cellEdit: true,
          cellEditAlignCenter: true,
          // 当值为函数时，取当次执行的返回值来渲染该单元格是否为可编辑单元格
          cellEdit({ trIndex }) {
            return {
              0: true,
              1: true,
              2: true,
              3: true
            }[trIndex];
          },
          // 当值为函数时，取当次执行的返回值来决定组件的校验规则
          cellEditRules({ trIndex }) {
            return {
              0: {
                date: [
                  {
                    required: true,
                    message: "必填项",
                    trigger: "blur"
                  }
                ]
              },
              1: {
                date: [
                  {
                    required: true,
                    message: "必填项",
                    trigger: "blur"
                  },
                  { min: 10, message: "最少10个字符", trigger: "blur" }
                ]
              },
              2: {
                date: [
                  { required: true, message: "选择一款皮肤", trigger: "change" }
                ]
              },
              3: {
                date: [
                  { required: true, message: "请选择日期", trigger: "change" }
                ]
              }
            }[trIndex];
          },
          //  当值为字符串时，直接渲染该列下的单元格组件为字符串名组件
          cellEditName: "input",
          // 当值为函数时，取当次执行的返回值来渲染该单元格组件
          cellEditName({ trIndex }) {
            return { 0: "input", 1: "input", 2: "select", 3: "date-picker" }[
              trIndex
            ];
          },
          // 当值为对象时，会让该列下的可编辑单元格都使用此属性配置
          cellEditAttr: {
            type: "textarea"
          },
          // 当值为函数时，取当次执行的返回值来作用该单元格组件属性配置
          cellEditAttr({ trIndex }) {
            return {
              0: "",
              1: {
                type: "textarea",
                maxlength: 400
              },
              2: {
                items: [
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017"
                ]
              }
            }[trIndex];
          },
          // 当值为对象时，会让该列下的可编辑单元格都使用此事件配置
          cellEditEvent: {
            change() {
              console.info(`change`);
            }
          },
          // 当值为函数时，取当次执行的返回值来作用该单元格组件事件配置
          cellEditEvent({ trIndex }) {
            return {
              0: {},
              1: {},
              2: {
                change() {
                  console.info(`change`);
                }
              }
            }[trIndex];
          }
        },
        { label: "时间", props: "time" },
        { label: "教室1", props: "classRoom1" },
        { label: "教室2", props: "classRoom2" },
        { label: "教室3", props: "classRoom3", noWrap: false }
      ],
      tbodyList: [
        {
          date: "星期一",
          time: "09:00 - 10:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "伊泽瑞尔老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "10:30 - 12:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "伊泽瑞尔老师",
          classRoom3: "瑞兹老师",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "18:00 - 19:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          temp1: "",
          temp2: "",
          temp3: "",
          classRoom3: "菲奥娜老师"
        }
      ]
    };
  },
  computed: {},
  methods: {
    submit() {
      this.$refs.tablePro.validate(valid => {
        if (valid) {
          console.info("校验通过");
        } else {
          console.info("校验失败");
        }
      }, {
        trIndex: this.specificRowIndex,
        thIndex: this.specificColIndex
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  margin: 50px;
}
.fuck {
  color: red;
}
h2,
p {
  margin-bottom: 15px;
}
</style>
