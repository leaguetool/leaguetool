<template>
  <div class="chat-header">
    <div class="chat-title">英雄联盟开黑大厅 |</div>

    <div class="chat-region cursor-op" @click="changeRegion()">
      {{ currentRegion.name }} <SwapOutlined />
    </div>
    <div class="chat-hot">🔥32131人</div>

    <a-modal v-model:visible="visible" title="大区选择">
      <div v-for="(item, index) in regions" :key="index" class="region-sw">
        <a-col :span="4">
          <div class="region-fa">{{ item.name }}</div>
        </a-col>
        <a-col :span="20">
          <div>
            <a-tag
              class="region"
              v-for="(region, index1) in item.list"
              :key="index1"
              @click="selectRegion(region)"
              :class="currentRegion.id == region.id ? 'region-active' : ''"
              >{{ region.name }}</a-tag
            >
          </div>
        </a-col>
      </div>

      <template #footer>
        <a-button key="back" @click="visible = false">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { SwapOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { message } from "ant-design-vue";
export default {
  components: {
    SwapOutlined,
  },
  setup() {
    const visible = ref(false);
    const store = useStore();
    //创建一个切换大区的方法
    let changeRegion = () => {
      // store.state.user.displayName;
      visible.value = !visible.value;
    };

    const regions = computed(() => {
      return store.state.chat.regions;
    });

    const currentRegion = computed(() => {
      return store.state.chat.currentRegion;
    });

    const selectRegion = (region) => {
      store.dispatch("chat/changeRegion", region).then(() => {
        message.success("切换成功", 1, null);
        visible.value = false;
      });
    };
    return { changeRegion, visible, regions, currentRegion, selectRegion };
  },
};
</script>

<style>
.chat-header {
  font-size: 20px;
  font-weight: 600;
  padding-top: 5px;
}
.chat-header .chat-title,
.chat-region,
.chat-hot {
  display: inline-block;
}
.chat-hot {
  padding-left: 10px;
  font-size: 14px;
}
.chat-region {
  color: #f9cc16;
  padding-left: 5px;
}
.region {
  padding: 5px !important;
  margin: 5px !important;
}
.region-sw {
  display: flex;
  cursor: pointer;
}
.region-active {
  background-color: #f9cc16 !important;
  color: #fff;
}
</style>
