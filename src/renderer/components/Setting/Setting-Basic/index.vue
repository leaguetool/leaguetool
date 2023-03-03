<template>
  <div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <a-divider orientation="left">开启与关闭</a-divider>
      <a-form-item label="">
        <a-checkbox v-model:checked="formState['autoStart']"
          >开机时自动启动</a-checkbox
        >
      </a-form-item>

      <a-divider orientation="left">当点击关闭按钮后</a-divider>
      <a-form-item name="radio-group" label="">
        <a-radio-group v-model:value="formState['closeToTray']">
          <a-radio value="exit">退出应用</a-radio>
          <a-radio value="hide">最小化</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const settings = computed(() => {
      return store.state.system.settings;
    });
    // console.log("设置界面,settings:", settings.value);
    const formState = reactive({
      closeToTray: settings.value.closeToTray,
      autoStart: settings.value.autoStart,
    });

    watch(
      () => [formState.closeToTray, formState.autoStart],
      ([closeToTray, autoStart]) => {
        console.log("设置界面,watch:", closeToTray, autoStart);
        store.dispatch("system/setAutoStart", autoStart);
        store.dispatch("system/setCloseToTray", closeToTray);
      },
      { deep: true, flush: "sync" }
    );

    return { formState };
  },
};
</script>

<style></style>
