<template>
<div class="errLog">
  <vue-mark class="errLog-mark" v-model="log.length" :is-dot="true" @click.native="show = true">
    <span class="errLog-icon">
      <i class="iconfont">bug_report</i>
    </span>
  </vue-mark>
  <el-dialog title="bug日志" :visible.sync="show" :modal-append-to-body="false">
    <el-table :data="log">
      <el-table-column label="message">
        <template scope="scope">
          <div>msg: {{ scope.row.err.message }}</div>
          <br/>
          <div>url: {{scope.row.url}}</div>
        </template>
      </el-table-column>
      <el-table-column label="stack">
        <template scope="scope">
          {{ scope.row.err.stack}}
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>

<script>
import { VueMark } from 'vue-mark'

export default {
  name: 'errLog',
  components: { VueMark },
  props: {
    log: {
      type: Array,
      default: () => { return [] }
    },
  },
  data () {
    return {
      show: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.errLog {
  // position: absolute;
  // right: 150px;
  // height: 100%;
  &-mark {
    width: 36px;
    height: 36px;
  }
  &-icon {
    float: left;
    box-sizing: border-box;
    line-height: 1;
    cursor: pointer;
    text-align: center;
    margin: 0;
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
    background-color: #1CCADA;
    border: 1px solid #1CCADA;
  }
}
</style>

