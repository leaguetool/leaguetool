import store from "@/store/index.js";
import ChatJs from "@/common/chat/chat.js";

let Handler = function () {
  this.onopen = function (event, ws) {
    // ws.send("hello 连上了哦");
    //document.getElementById('contentId').innerHTML += 'hello 连上了哦<br>';
  };

  /**
   * 收到服务器发来的消息
   * @param {*} event
   * @param {*} ws
   */
  this.onmessage = function (event, ws) {
    let data = event.data;
    let msgBody = eval("(" + data + ")");
    console.log(msgBody);

    switch (msgBody.type) {
      case "CHAT": {
        store.dispatch("chat/addMessage", JSON.parse(msgBody.data));
        break;
      }
      //其他的消息
      case "OTHER": {
        console.log("OTHER");
        msgBody.data = JSON.parse(msgBody.data);

        switch (msgBody.data.otherPakType) {
          case "SEND_TOKEN": {
            store.dispatch("user/setToken", msgBody.data.data);
            break;
          }
        }
        break;
      }
    }

    this.onclose = function (e, ws) {
      // error(e, ws)
    };

    this.onerror = function (e, ws) {
      // error(e, ws)
    };

    /**
     * 发送心跳，本框架会自动定时调用该方法，请在该方法中发送心跳
     * @param {*} ws
     */
    this.ping = function (ws) {
      // log("发心跳了")
      // ws.send("心跳内容");
      ChatJs.getInstance().sendPingMsg();
    };
  };
};

export default Handler;
