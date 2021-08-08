import mitt from "mitt";
/**
 * Vue3 完全移除了 $on、$off 和 $once 方法。$emit 仍然包含于现有的 API 中，因为它用于触发由父组件声明式添加的事件处理函数。
 * Event bus 模式可以被替换为实现了事件触发器接口的外部库，例如 mitt 或 tiny-emitter。
 * https://v3.cn.vuejs.org/guide/migration/events-api.html#event-bus
 * */
export default mitt();
