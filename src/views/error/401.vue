<template>
<div class="err401">
  <div class="err401-text">401 没有权限</div>
</div>
</template>

<script>
export default {
  name: 'err401',
}
</script>

<style lang="scss" scoped>
.err401 {
  height: 100vh;
  color: #fff;
  background-color: #2d3a4b;
  &-text {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 200px;
    margin-top: -100px;
    color: #fff;
    font-size: 72px;
    text-align: center;
  }
}
</style>
