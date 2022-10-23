<template>
  <div style="padding: 0px 0px 0px 20px">
    <!-- <a-page-header style="padding: 0px" title="应用设置" />
    <a-form :model="formState" name="validate_other">
      <a-form-item name="radio-group" label="关闭大厅：">
        <a-radio-group v-model:value="formState['radio-group']">
          <a-radio value="a">退出大厅</a-radio>
          <a-radio value="b">最小化大厅</a-radio>
        </a-radio-group>
      </a-form-item> -->

    <!-- <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" html-type="submit">应用</a-button>
      </a-form-item> -->
    <!-- </a-form> -->

    <a-modal
      v-model:visible="modal2Visible"
      centered
      @ok="modal2Visible = false"
    >
      <template #title>
        <div>应用设置</div>
      </template>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </a-modal>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const formState = reactive({
      "input-number": 3,
      "checkbox-group": ["A", "B"],
      rate: 3.5,
    });
    return {
      formState,
      modal2Visible: ref(true),
    };
  },
};
</script>

<style></style>
