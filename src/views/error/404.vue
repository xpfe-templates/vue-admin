<template>
<div class="err404">
  <div class="err404-text">404 Not Found</div>
</div>
</template>

<script>
export default {
  name: 'err404',
}
</script>

<style lang="scss" scoped>
.err404 {
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
