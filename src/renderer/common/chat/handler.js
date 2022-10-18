import store from "@/store/index.js";
import ChatJs from "@/common/chat/chat.js";
import { message } from "ant-design-vue";
//定义一个key
const key = "chatConnect";
let Handler = function () {
  this.onopen = function (event, ws) {
    message.destroy();
    // message.success({
    //   content: "连接到开黑大厅成功",
    //   key,
    //   duration: 2,
    //   style: {
    //     marginTop: "30px",
    //   },
    // });
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
          case "AREA_HOT": {
            store.dispatch("chat/changeRegionHot", msgBody.data.data);
            break;
          }
          case "BASE_DATA": {
            let baseInfo = JSON.parse(msgBody.data.data);
            //处理基础信息
            console.log("基础信息", baseInfo);
            if (baseInfo.admins) {
              store.dispatch("system/setAdminUser", baseInfo.admins);
            }
          }
        }
        break;
      }
    }
  };

  this.onclose = function (e, ws) {
    // error(e, ws)
  };

  this.onerror = function (e, ws) {
    // error(e, ws)
    // message.error("连接到开黑大厅服务器失败，重试中...", 1, null);\
    console.log("连接ws失败~");
    // if (loading) {
    //   return;
    // }
    message.loading({
      content: "连接到开黑大厅服务器失败，重试中...",
      key,
      style: {
        marginTop: "30px",
      },
      duration: 0,
    });
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

export default Handler;
