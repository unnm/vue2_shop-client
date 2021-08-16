<template>
  <div>
    小明的爸爸现在有{{ money }}元

    <!-- 不使用sync修改符 -->
    <Child :money="money" @update:money="money = $event"></Child>

    <!-- 使用sync修改符 -->
    <Child :money.sync="money"></Child>

    <!-- 不使用v-model指令 -->
    <Child2 :value="money" @input="money = $event"></Child2>

    <!-- 使用v-model指令 -->
    <Child2 v-model="money"></Child2>

    <!-- .sync和v-model用在组件标签上，都可以实现父子组件数据同步
    区别：
      .sync实现数据同步： 子组件内部不是表单类元素
      v-model实现数据同步：子组件内部一定是表单类元素
    -->
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',
    data() {
      return {
        money: 1000,
      }
    },
    components: {
      Child,
      Child2,
    },
  }
</script>
