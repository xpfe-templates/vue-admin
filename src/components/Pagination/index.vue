<template>
<el-pagination class="pagination" :small="small" :page-size="pageSize" :total="total"
  :page-count="pageCount" :current-page="currentPage" :layout="layout" :page-sizes="pageSizes"
  @current-change="onPageChange"
>
  <div class="el-slot" style="display: inline-block;">
    <span class="el-pagination__jump">
      前往<input class="el-pagination__editor" type="text" :min="1" v-model="jumpPage" @keyup.enter.stop="onJump">页
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
      this.jumpPage = +this.jumpPage
      let page = this.jumpPage
      if (!Number.isInteger(page)) {
        this.jumpPage = page = 1
      }
      this.onPageChange(page)
    },
    onPageChange (page) {
      if (this.currentPage === page) return // 解决多次触发
      this.$emit('update:currentPage', page)
      this.$listeners['current-change'](page)
    },
  },
}
</script>

<style>
.pagination {
  margin-top: 10px;
  text-align: right;
}
.el-pager li {
  padding: 0 4px;
  background: #fff;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 36px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  margin: 0;
}
.el-pager li:hover {
  color: #1CCADA;
}
.el-pager li.active {
  color: #1CCADA;
}
.el-pagination {
  padding: 12px 0;
  text-align: right;
}
.el-pagination__btn {
  margin-left: 12px;
  background-color: #1CCADA;
  color: #fff;
}
.el-pagination__btn:hover {
  background: #1FE1F2 !important;
  color: #fff !important;
}
.el-pagination.is-active, .el-pagination:active {
  color: #19B1BF;
}
.el-pagination__editor {
  border: 1px solid #d1dbe5;
  border-radius: 2px;
  line-height: 18px;
  padding: 4px 2px;
  width: 36px;
  text-align: center;
  margin: 0 6px;
  box-sizing: border-box;
  transition: border .3s;
}
</style>
