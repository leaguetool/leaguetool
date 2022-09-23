<template>
  <div class="league-content">
    <div class="league-content-line"></div>
    <div class="league-router">
      <router-view class="router-content" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.league-content {
  width: 100%;
  height: calc(100vh - 52px);
  /* padding: 0px 30px; */
  margin-top: 30px;
}

.league-content-line {
  width: 100%;
  position: absolute;
  top: 30px;
  margin-bottom: 5px;
  border-top: 0.5px solid #8888886e;
}
.league-router {
}
</style>
