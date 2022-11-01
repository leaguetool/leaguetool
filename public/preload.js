const { ipcRenderer } = require("electron");

const sendMessage = (data) => {
  ipcRenderer.send("console", data);
};

const sendIpcMessage = (eventName, data) => {
  ipcRenderer.send(eventName, data);
};

//定义一个第一次创建的变量
var loginEnd = true;
var AreaEnd = true;
var userInfoOk = false;

const checkReady = () => {
  return new Promise((resolve, reject) => {
    if (T_Login && T_Login.checkReady()) {
      resolve(T_Login);
    }
  });
};
const isLogin = (T_Login) => {
  return T_Login.LoginManager.isLogin();
};

const assemblyData = (data) => {
  //组装数据
  let sendData = {
    //掌上
    mobilePlayerInfo: {},
    //战斗信息
    playerBattleSummary: {},
    //荣誉信息
    playerHonor: {},
    //基本信息
    playerInfo: {},
    //排位信息
    playerRankInfo: {},

    infoData: data.infoData,
  };

  //数据结构
  /**
   * 
   * "MobilePlayerInfo": {
        "msg": {
          "code": 0,
          "msg": "success",
          "res": {
            "result": 0,
            "uuid_prifle_list": [{
              "gender": 1,
              "logo_url": "http://p.qlogo.cn/qtl_user/7502824e1909ba63ca671b99a231413524a9a40b551b39f7687d340dfbe20102/0/0",
              "nick": "lemon",
              "urltime": 1562585286,
              "uuid": "63517712-845a-4624-ab70-46d2542b10f3"
            }]
          },
          "result": 0
        },
        "status": 0
      },
   * 
   * 
   */
  if (
    +data.MobilePlayerInfo.status === 0 &&
    data.MobilePlayerInfo.msg.code === 0 &&
    data.MobilePlayerInfo.msg.res.result === 0
  ) {
    if (
      data.MobilePlayerInfo.msg.res.uuid_prifle_list &&
      data.MobilePlayerInfo.msg.res.uuid_prifle_list.length > 0
    ) {
      sendData.mobilePlayerInfo =
        data.MobilePlayerInfo.msg.res.uuid_prifle_list[0];
      sendMessage("用户信息:" + JSON.stringify(sendData.mobilePlayerInfo));
    }
  }

  /**
   * "PlayerInfo": {
        "msg": {
          "exp": 747,
          "icon_id": 29,
          "level": 523,
          "msg": "",
          "name": "风车车的猫尾饼",
          "retCode": 0
        },
        "status": 0
      },
   */
  if (+data.PlayerInfo.status === 0 && data.PlayerInfo.msg.retCode === 0) {
    sendData.playerInfo = data.PlayerInfo.msg;
    sendMessage("PlayerInfo信息:" + JSON.stringify(sendData.playerInfo));
  }

  /**
   * "PlayerBattleSummary": {
        "msg": {
          "data": {
            "item_list": [{
              "battle_type": 4,
              "last_battle_time": 1664770573,
              "leave_num": 2,
              "lose_num": 87,
              "win_num": 86
            }, {
              "battle_type": 3,
              "last_battle_time": 1664770573,
              "leave_num": 1,
              "lose_num": 256,
              "win_num": 286
            }, {
              "battle_type": 7,
              "last_battle_time": 0,
              "leave_num": 3,
              "lose_num": 164,
              "win_num": 151
            }, {
              "battle_type": 6,
              "last_battle_time": 0,
              "leave_num": 7,
              "lose_num": 1736,
              "win_num": 1790
            }, {
              "battle_type": 1,
              "last_battle_time": 0,
              "leave_num": 0,
              "lose_num": 179,
              "win_num": 194
            }],
            "item_num": 5
          },
          "msg": "",
          "retCode": 0
        },
        "status": 0
      },
   */
  if (
    +data.PlayerBattleSummary.status === 0 &&
    data.PlayerBattleSummary.msg.retCode === 0
  ) {
    sendData.playerBattleSummary = data.PlayerBattleSummary.msg.data.item_list;
    sendMessage(
      "PlayerBattleSummary信息:" + JSON.stringify(sendData.playerBattleSummary)
    );
  }

  /**
   * "PlayerHonor": {
        "msg": {
          "data": {
            "continue_loss": 10,
            "continue_wins": 11,
            "honors": {
              "assists_total": 16864,
              "god_like_num": 598,
              "kills_total": 18150,
              "penta_kills": 10,
              "quadra_kills": 48,
              "total_match_loss_mvps": 58,
              "total_match_mvps": 57,
              "total_rank_loss_mvps": 242,
              "total_rank_mvps": 195,
              "triple_kills": 269,
              "ward_placed_total": 19176
            },
            "tops": {
              "top_num": 11,
              "top_records": [{
                "champion_id": 517,
                "game_id": 2692698793,
                "value": 1670
              }, {
                "champion_id": 246,
                "game_id": 3209886757,
                "value": 35
              }, {
                "champion_id": 412,
                "game_id": 3228844760,
                "value": 38
              }, {
                "champion_id": 84,
                "game_id": 3204293227,
                "value": 20
              }, {
                "champion_id": 498,
                "game_id": 3208078079,
                "value": 71329
              }, {
                "champion_id": 64,
                "game_id": 3156551063,
                "value": 74027
              }, {
                "champion_id": 60,
                "game_id": 3120809618,
                "value": 24333
              }, {
                "champion_id": 39,
                "game_id": 3148757444,
                "value": 345
              }, {
                "champion_id": 131,
                "game_id": 2752680999,
                "value": 8
              }, {
                "champion_id": 517,
                "game_id": 2678253631,
                "value": 3073
              }, {
                "champion_id": 84,
                "game_id": 3186933683,
                "value": 717
              }]
            }
          },
          "msg": "",
          "retCode": 0
        },
        "status": 0
      },
   */
  if (+data.PlayerHonor.status === 0 && data.PlayerHonor.msg.retCode === 0) {
    sendData.playerHonor = data.PlayerHonor.msg.data;
    sendMessage("PlayerHonor信息:" + JSON.stringify(sendData.playerHonor));
  }

  /**
   * "PlayerRankInfo": {
        "msg": {
          "data": {
            "item_list": [{
              "battle_type": 4,
              "leave_num": 2,
              "lose_num": 87,
              "queue": 2,
              "tier": 2,
              "win_num": 86,
              "win_point": 7
            }, {
              "battle_type": 3,
              "leave_num": 1,
              "lose_num": 256,
              "queue": 0,
              "tier": 2,
              "win_num": 286,
              "win_point": 41
            }],
            "item_num": 2
          },
          "msg": "",
          "retCode": 0
        },
        "status": 0
      }
   */
  if (
    +data.PlayerRankInfo.status === 0 &&
    data.PlayerRankInfo.msg.retCode === 0
  ) {
    sendData.playerRankInfo = data.PlayerRankInfo.msg.data.item_list;
    sendMessage(
      "PlayerRankInfo信息:" + JSON.stringify(sendData.playerRankInfo)
    );
  }
  sendMessage("sendData:" + JSON.stringify(sendData));

  sendIpcMessage("proFileData", sendData);
};

const moerInfo = (infoData) => {
  new T_RequestApi({
    apiUrl: `https://lol.ams.game.qq.com/lol/autocms/v1/transit/LOL/LOLWeb/Official/MobilePlayerInfo,PlayerInfo,PlayerBattleSummary,PlayerHonor,PlayerRankInfo?use=zm,uid,acc&area=${infoData.area}&season=current`,
    attach: this,
    successBack: function (data) {
      if (+data.MobilePlayerInfo.status === 0) {
        sendMessage("用户信息:" + JSON.stringify(data.MobilePlayerInfo.msg));
      }
      if (+data.PlayerInfo.status === 0) {
        sendMessage("PlayerInfo信息:" + JSON.stringify(data.PlayerInfo.msg));
      }

      if (+data.PlayerBattleSummary.status === 0) {
        sendMessage(
          "PlayerBattleSummary信息:" +
            JSON.stringify(data.PlayerBattleSummary.msg)
        );
      }

      if (+data.PlayerHonor.status === 0) {
        sendMessage("PlayerHonor信息:" + JSON.stringify(data.PlayerHonor.msg));
      }

      if (+data.PlayerRankInfo.status === 0) {
        sendMessage(
          "PlayerRankInfo信息:" + JSON.stringify(data.PlayerRankInfo.msg)
        );
      }

      data.infoData = infoData;
      //组装数据
      assemblyData(data);
      userInfoOk = true;
    },
    failBack: function (e) {
      sendMessage("failBack:" + JSON.stringify(e));
    },
  });
};

const useAccountData = (data) => {
  let PlayerRankInfo = { tier: data.tier, queue: data.queue };
  var rankList = T_Login.getTierText(PlayerRankInfo);
  const infoData = {
    displayName: data.nickName,
    rank:
      rankList.extended_tier +
      (data.tier != 255 ? rankList.extended_queue : ""),
    avatar: data.headImg,
    //胜率
    winRate: data.winRate,
    uid: data.uid,
    area: data.area,
    areaName: data.areaName,
  };
  userInfoOk = true;
  sendMessage(infoData);
  moerInfo(infoData);
  // sendIpcMessage("proFileData", infoData);
  // extended_queue: "Ⅰ"extended_tier: "华贵铂金"extended_tier_url: "//ossweb-img.qq.com/images/lol/space/rank/2019pre/season_2019_platinum_1.png"
};

window.addEventListener("DOMContentLoaded", () => {
  //   setTimeout(() => {
  //     if (T_Login && T_Login.gAccountData) {
  //       alert("你好：" + T_Login.gAccountData.data.nickName);
  //     }
  //   }, 2000);
  //T_Login.checkReady()
  let inter = setInterval(() => {
    if (userInfoOk) {
      clearInterval(inter);
      return;
    }
    initSummoner();
  }, 1000);
});

const initSummoner = () => {
  checkReady().then((T_Login) => {
    var isLoginState = isLogin(T_Login);
    if (!isLoginState) {
      //   alert("未登录请登陆");
      sendMessage("未登录请登陆");
      if (loginEnd) {
        T_Login.login();
        loginEnd = false;
        sendMessage("拉取登陆框");
      }
      return;
    }
    //登陆后是否绑定大区
    var isArea = T_Login.gAccountArea;
    if (!isArea) {
      sendMessage("未绑定大区");
      //   alert("未绑定大区");
      if (AreaEnd) {
        T_Login.changeArea();
        AreaEnd = false;
        sendMessage("拉取绑定大区框");
      }
      return;
    }
    if (T_Login.gAccountData && T_Login.gAccountData.data) {
      T_Login.gAccountData.data.uid = T_Login.gAccountId;
      T_Login.gAccountData.data.area = T_Login.gAccountArea;
      T_Login.gAccountData.data.areaName = T_Login.getAreaById(
        T_Login.gAccountArea
      );
      useAccountData(T_Login.gAccountData.data);
    }
  });
};

// contextBridge.exposeInMainWorld("api", {
//   send: (channel, data) => ipcRenderer.invoke(channel, data),
//   handle: (channel, callable, event, data) =>
//     ipcRenderer.on(channel, callable(event, data)),
// });
