<template>
<section class="app-main">
  <transition name="fade" mode="out-in">
    <router-view :key="key"></router-view>
  </transition>
</section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + Date.now() : this.$route + Date.now()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: absolute;
  top: 60px;
  left: 180px;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  & > div {
    min-height: calc(100% - 60px);
    padding: 20px;
  }
}
</style>
