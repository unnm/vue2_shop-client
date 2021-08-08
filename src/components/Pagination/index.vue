<template>
  <div class="pagination">
    <!-- 如果当前页是第一页，则上一页按钮禁止点击 -->
    <button
      :disabled="currentPageNo === 1"
      @click="$emit('changePageNo', currentPageNo - 1)"
    >
      上一页
    </button>
    <!-- 如果连续页码刚好是1~5，那么这里的页码1就不用显示了，否则重复了 -->
    <!-- 这个1要显示，那么start就不能是1，不能是1就一定大于1 -->
    <button v-if="startEnd.start > 1" @click="$emit('changePageNo', 1)">
      1
    </button>
    <!-- 当开始页码start大于2时，三点才可以显示 -->
    <button v-if="startEnd.start > 2">...</button>

    <!-- 这里是用来显示连续页的 -->
    <!-- v-for 可以遍历数字 -->
    <!-- v-for 和 v-if 同时使用时，v-for 优先级比 v-if 高 -->
    <button
      :class="{ active: currentPageNo === page }"
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changePageNo', page)"
    >
      {{ page }}
    </button>

    <!-- 当结束页码end小于总页码减一，三点才可以显示 -->
    <button v-if="startEnd.end < totalPageNo - 1">...</button>
    <button
      v-if="startEnd.end < totalPageNo"
      @click="$emit('changePageNo', totalPageNo)"
    >
      {{ totalPageNo }}
    </button>
    <button
      :disabled="currentPageNo === totalPageNo"
      @click="$emit('changePageNo', currentPageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    // props: ['currentPageNo', 'total', 'pageSize', 'continueNo'], //当前页码，总条数，每页数量，连续页数
    props: {
      currentPageNo: Number,
      total: {
        type: Number,
        default: 0, // 这里若没有设置默认值，则会报一个错误，说total是undefined
        // 因为父组件中searchInfo是根据请求返回来的数据，而请求回来是需要时间的
        // 当searchInfo没回来时，它就是个空对象，因此传递过来就是undefined
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      continueNo: {
        type: Number,
        required: true,
      },
    },
    computed: {
      // 计算总页码
      totalPageNo() {
        let { total, pageSize } = this
        return Math.ceil(total / pageSize)
      },
      // 计算连续页的起始位置和结束位置
      startEnd() {
        let { continueNo, currentPageNo, totalPageNo } = this
        let start = 0
        let end = 0
        if (continueNo >= totalPageNo) {
          // 一、连续页数 >= 总页码
          start = 1
          end = totalPageNo
        } else {
          // 二、连续页数 < 总页码
          // 1.正常情况
          start = currentPageNo - Math.floor(continueNo / 2)
          end = currentPageNo + Math.floor(continueNo / 2)
          // 2.非正常情况（需要把计算的start和end修正一下）
          // (1)左侧非正常情况
          if (start <= 0) {
            start = 1
            end = continueNo
          }
          // (2)右侧非正常情况
          if (end >= totalPageNo) {
            end = totalPageNo
            start = totalPageNo - continueNo + 1
          }
        }
        return { start, end }
      },
    },
  }
</script>

<style scoped lang="less">
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
