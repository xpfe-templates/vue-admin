<template>
<div class="app-wrap u-clearfix">
  <sidebar></sidebar>
  <navbar></navbar>
  <app-main></app-main>
</div>
</template>

<script>
// 注意：是否需要sidebar和navbar根据实际需要选择
import { AppMain, Navbar, Sidebar } from 'views/layout'
// import { Sidebar, Navbar, AppMain } from 'views/layout'

export default {
  name: 'Layout',
  components: { AppMain, Navbar, Sidebar }
}
</script>

<style lang="scss" scoped>
.app-wrap {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
