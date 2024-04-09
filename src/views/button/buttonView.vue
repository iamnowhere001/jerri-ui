
<template>
  <div class="content">
    <h2 class="j-mb-20">按钮组件</h2>

    <!-- 常规按钮高度 -->
    <div class="left">
      <p class="nav">常规样式 32px高</p>
      <jr-button @click="deleteBtn">确定</jr-button>
      <jr-button class="j-ml-10">OK</jr-button>
      <jr-button class="j-ml-10">提交审核</jr-button>

      <p class="nav">幽灵按钮</p>
      <jr-button type="plain" @click="deleteBtn">取消</jr-button>
      <jr-button class="j-ml-10" type="plain">Cancel</jr-button>
      <jr-button class="j-ml-10" type="plain"
        ><i class="j-icon icon-write-btn"></i>修改</jr-button
      >

      <p class="nav">红色按钮</p>
      <jr-button type="danger" @click="deleteBtn">删除</jr-button>

      <jr-button type="danger" class="j-ml-10">Delete</jr-button>

      <p class="nav">禁用按钮</p>
      <jr-button disabled @click="deleteBtn">禁用按钮</jr-button>
      <jr-button class="j-ml-10" type="danger" disabled>红色禁用</jr-button>

      <p class="nav">幽灵按钮禁用</p>
      <jr-button type="plain" disabled @click="deleteBtn">禁用按钮</jr-button>
      <jr-button type="plain" class="j-ml-10" disabled>Disabled</jr-button>

      <p class="nav">删除按钮</p>
      <jr-button type="delete" disabled @click="deleteBtn"
        >深圳百花校区</jr-button
      >
      <jr-button type="delete" class="j-ml-10" @click="deleteBtn"
        >School</jr-button
      >

      <p class="nav">带加号按钮</p>
      <jr-button slotText="新增" disabled type="plain" />
      <jr-button slotText="添加图片" class="j-ml-10" type="plain" />
      <jr-button slotText="Add" class="j-ml-10" type="plain" />

      <p class="nav">+号 -号 圆形加号小 大按钮</p>
      <jr-button class="j-pr-20" slotText="+" type="plain" />
      <jr-button class="j-pr-20" disabled slotText="+" type="plain" />

      <jr-button class="j-pr-20" slotText="-" type="plain" />
      <jr-button class="j-pr-20" disabled slotText="-" type="plain" />

      <jr-button class="j-pr-20" slotText="+" shape="circle" type="plain" />
      <jr-button
        class="j-pr-20"
        slotText="+"
        disabled
        shape="circle"
        type="plain"
      />

      <jr-button slotText="+" shape="circle" size="normal" type="plain" />
    </div>

    <!-- 弹窗按钮高度 -->
    <div class="right">
      <p class="nav">大按钮 36px高</p>
      <jr-button size="normal">确定</jr-button>
      <jr-button class="j-ml-10" size="normal">OK</jr-button>

      <p class="nav">幽灵按钮</p>
      <jr-button size="normal" type="plain">取消</jr-button>
      <jr-button size="normal" class="j-ml-10" type="plain">Cancel</jr-button>

      <p class="nav">禁用按钮</p>
      <jr-button size="normal" disabled>禁用按钮</jr-button>
      <jr-button size="normal" class="j-ml-10" disabled>Disabled</jr-button>

      <p class="nav">幽灵按钮禁用</p>
      <jr-button size="normal" type="plain" disabled>禁用按钮</jr-button>
      <jr-button size="normal" type="plain" class="j-ml-10" disabled
        >Disabled</jr-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "buttonView",
  label: "按钮",
  methods: {
    deleteBtn() {
      console.log("删除");
    },
  },
};
</script>
