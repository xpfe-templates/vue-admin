<template>
<el-pagination class="pagination" :small="small" :page-size="pageSize" :total="total"
  :page-count="pageCount" :current-page="currentPage" :layout="layout" :page-sizes="pageSizes"
  @current-change="onPageChange"
>
  <div class="el-slot" style="display: inline-block;">
    <span class="el-pagination__jump">
      前往<input class="el-pagination__editor" type="text" :min="1" v-model="jumpPage">页
    </span>
    <el-button class="el-pagination__btn" type="primary" @click="onJump">Go</el-button>
  </div>
</el-pagination>
</template>

<script>

export default {
  name: 'pagination',
  props: ['small', 'pageSize', 'total', 'pageCount', 'currentPage', 'layout', 'pageSizes'],
  data () {
    return {
      jumpPage: 1,
    }
  },

  methods: {
    onJump () {
      let jumpPage = Number(this.jumpPage)
      if (!Number.isInteger(jumpPage)) {
        this.jumpPage = jumpPage = 1
      }
      this.$emit('jump-change', jumpPage)
    },
    onPageChange (page) {
      this.$emit('update:currentPage', page)
      this.$listeners['current-change'](page)
    },
  },
}
</script>
