<template>
  <div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <a-form-item name="radio-group" label="关闭软件">
        <a-radio-group v-model:value="formState['radio-group']">
          <a-radio value="exit">退出应用</a-radio>
          <a-radio value="b">最小化</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const formState = reactive({
      "radio-group": "exit",
    });
    return { formState };
  },
};
</script>

<style></style>
