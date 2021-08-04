<template>
  <div class="league-content">
    <div class="league-router"><router-view class="router-content" /></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.league-content {
  width: 100%;
  height: 100%;
  padding: 30px 10px 10px 10px;
}
.league-content .league-router {
  border-top: 0.5px solid #e0e0e0;
}
</style>
