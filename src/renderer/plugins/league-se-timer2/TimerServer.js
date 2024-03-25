export default class TimerServer {
  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  /**
   * 插件入口
   */
  start(context) {
    console.log("插件入口", context);
  }

  /**
   * 插件出口
   */
  stop(context) {
    console.log("插件出口", context);
  }
}
