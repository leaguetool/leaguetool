<template>
  <a-tooltip placement="bottom" arrowPointAtCenter color="white">
    <template #title>
      <div class="tooltip">
        <div>当前等级：{{ user.summonerLevel }}</div>
        <div>
          经验值：{{ user.xpSinceLastLevel }} / {{ user.xpUntilNextLevel }}
        </div>
      </div>
    </template>
    <a-avatar
      :size="60"
      :src="user.avatar"
      :title="user.displayName"
      class="head-img"
    />
  </a-tooltip>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup: () => {
    const store = useStore();
    return {
      user: computed(() => store.state.user),
    };
  },
};
</script>
<style>
.head-img {
  background-color: #fff;
  cursor: pointer;
  margin: 0px !important;
}
.tooltip {
  color: black;
}
</style>
