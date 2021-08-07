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
  width: 800px;
  height: 100%;
  padding: 30px 10px 10px 10px;
}
.league-content-line {
  width: 100%;
  position: absolute;
  top: 30px;
  margin-bottom: 5px;
  border-top: 0.5px solid #777777;
}
.league-content .league-router {
  /* position: relative; */
}
</style>
