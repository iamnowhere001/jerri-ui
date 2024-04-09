<template>
  <div class="content">
    <div class="gif">
      <img src="../../assets/images/common/timg.gif" />
    </div>

    <h1>组件库演示</h1>
    <ul class="playground ">
      <template v-for="(view, index) in viewRouter">
        <li v-if="view.label"
            class="shadowMove"
            :key="index">
          <router-link :to="'/' + view.name">{{ view.label }}</router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import viewRouter from "../index";

export default {
  name: "home",
  data() {
    return {
      viewRouter
    };
  },
  async mounted() {
    let { data } = await this.$frame.getContact(0, {
      type: "position", // 岗位：position 用户：user
      idList: ["00000importbyjierenstation000021"], // id 集合
      isDel: true, //传此字段，为过滤掉集合内的人
      single: true // 当筛选结果仅有一人的时候只返回这个人的数据而不是通讯录数据结构
    });
  }
};
</script>

<style lang="scss" scoped>
.shadowMove {
  color: #fff;
  border: 1px solid #498394d4;
  overflow: hidden;

  &:hover {
    text-shadow: 0 0 20px rgba(58, 145, 220, 0.5);
    box-shadow: inset 0 0 20px rgba(67, 103, 183, 0.5),
      0 0 20px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    height: 200px;
    width: 20px;
    background: rgba(60, 115, 216, 0.5);
    transform: translate(-50%, -30%) rotate(45deg);
    transition: 0.5s all cubic-bezier(0.2, 1, 0.25, 1);
    left: -70%;
  }

  &:hover::before {
    left: 135%;
  }
  padding-left: 30px;
}

.content {
  background-color: #fff;
  height: 100%;
  padding-top: 50px;
  .gif {
    position: fixed;
    top: 0;
  }
  h1 {
    font-size: 40px;
    color: #000;
    text-align: center;
  }
}

.playground {
  text-align: left;
  padding: 80px 50px 0;
  li {
    display: inline-block;
    height: 55px;
    width: 155px;
    text-align: center;
    margin-bottom: 10px;
    color: #883b3b;
    border-radius: 3px;
    margin-right: 20px;
    margin-top: 20px;
    cursor: pointer;
    position: relative;
    font-size: 16px;
    font-weight: normal;
    transition: 0.2s all;
    a {
      color: #000;
      position: absolute;
      width: 100%;
      left: 0;
      height: 100%;
      line-height: 55px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.content {
  padding: 20px 50px;
  .nav {
    color: #666;
    padding-bottom: 5px;
    margin: 20px 0 10px 0;
    border-bottom: 1px solid #d8d8d8;
    width: 300px;
  }
  .left {
    display: inline-block;
  }

  .right {
    display: inline-block;
    vertical-align: top;
    margin-left: 50px;
  }
}
</style>
