import handler from "./handler";

let ws_protocol = "ws"; // ws 或 wss
let ip = "127.0.0.1";
let port = 10001;

let heartbeatTimeout = 5000; // 心跳超时时间，单位：毫秒
let reconnInterval = 1000; // 重连间隔时间，单位：毫秒

let binaryType = "blob"; // 'blob' or 'arraybuffer';//arraybuffer是字节
let mshandler = new handler();
let myname = "蔡龙";
export default class ChatJs {
  constructor() {
    this.instance = null;
    this.tio = null;
  }

  /**
   * 单例构造方法
   * @returns {ChatJs}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatJs();
    }
    return this.instance;
  }

  init(name, region) {
    console.log("初始化ws");
    if (this.tio == null) {
      this.tio = {};
      this.createWs();
      let queryString = "name=" + name + "&region=" + region;

      let param = "";

      this.tio.ws = new this.tio.ws(
        ws_protocol,
        ip,
        port,
        queryString,
        param,
        mshandler,
        heartbeatTimeout,
        reconnInterval,
        binaryType
      );
      this.tio.ws.connect();
    }
    return this;
  }

  createWs() {
    console.log(this.tio);
    this.tio.ws = {};
    /**
     * @param {*} ws_protocol wss or ws
     * @param {*} ip
     * @param {*} port
     * @param {*} paramStr 加在ws url后面的请求参数，形如：name=张三&id=12
     * @param {*} param 作为tio.ws对象的参数，由业务自己使用，框架不使用
     * @param {*} handler
     * @param {*} heartbeatTimeout 心跳时间 单位：毫秒
     * @param {*} reconnInterval 重连间隔时间 单位：毫秒
     * @param {*} binaryType 'blob' or 'arraybuffer';//arraybuffer是字节
     */
    this.tio.ws = function (
      ws_protocol,
      ip,
      port,
      paramStr,
      param,
      handler,
      heartbeatTimeout,
      reconnInterval,
      binaryType
    ) {
      this.ip = ip;
      this.port = port;
      //判断是否是生产环境
      if (process.env.NODE_ENV === "production") {
        this.url = "wss://lolchat.s6.design";
      } else {
        this.url = ws_protocol + "://" + ip + ":" + port;
      }
      this.binaryType = binaryType || "arraybuffer";

      if (paramStr) {
        this.url += "?" + paramStr;
        this.reconnUrl = this.url + "&";
      } else {
        this.reconnUrl = this.url + "?";
      }
      this.reconnUrl += "tiows_reconnect=true";
      this.param = param;

      this.handler = handler;
      this.heartbeatTimeout = heartbeatTimeout;
      this.reconnInterval = reconnInterval;

      this.lastInteractionTime = function () {
        if (arguments.length == 1) {
          this.lastInteractionTimeValue = arguments[0];
        }
        return this.lastInteractionTimeValue;
      };

      this.heartbeatSendInterval = heartbeatTimeout / 2;

      this.connect = function (isReconnect) {
        var _url = this.url;
        if (isReconnect) {
          _url = this.reconnUrl;
        }
        var ws = new WebSocket(_url);
        this.ws = ws;

        ws.binaryType = this.binaryType; // 'arraybuffer'; // 'blob' or 'arraybuffer';//arraybuffer是字节
        var self = this;
        ws.onopen = function (event) {
          self.handler.onopen.call(self.handler, event, ws);
          self.lastInteractionTime(new Date().getTime());

          self.pingIntervalId = setInterval(function () {
            self.ping(self);
          }, self.heartbeatSendInterval);
        };
        ws.onmessage = function (event) {
          self.handler.onmessage.call(self.handler, event, ws);
          self.lastInteractionTime(new Date().getTime());
        };
        ws.onclose = function (event) {
          clearInterval(self.pingIntervalId); // clear send heartbeat task

          try {
            self.handler.onclose.call(self.handler, event, ws);
          } catch (error) {
            console.error(error);
          }

          self.reconn(event);
        };
        ws.onerror = function (event) {
          self.handler.onerror.call(self.handler, event, ws);
        };

        return ws;
      };

      this.reconn = function () {
        var self = this;
        setTimeout(function () {
          var ws = self.connect(true);
          self.ws = ws;
        }, self.reconnInterval);
      };

      this.ping = function () {
        var iv = new Date().getTime() - this.lastInteractionTime(); // 已经多久没发消息了
        // 单位：秒
        if (this.heartbeatSendInterval + iv >= this.heartbeatTimeout) {
          this.handler.ping(this.ws);
        }
      };

      this.send = function (data) {
        this.ws.send(data);
      };
    };
  }

  //发送聊天信息
  sendChatMsg(msg) {
    this.sendMsg({
      type: "chat",
      data: msg,
    });
  }

  //发送心跳信息
  sendPingMsg() {
    this.sendMsg({
      type: "ping",
      data: null,
    });
  }

  //发送Ack信息
  sendAckMsg(msg) {
    this.sendMsg({ msg: msg, type: "ack" });
  }

  //发送other信息
  sendOtherMsg(msg) {
    this.sendMsg({
      type: "other",
      data: msg,
    });
  }

  sendMsg(msg) {
    this.tio.ws.send(JSON.stringify(msg));
  }
}
