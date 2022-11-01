import * as types from "../mutation-types";
import { convertProfileIcon } from "@/common/converter";
import userApi from "@/api/user";
import ChatJs from "@/common/chat/chat.js";

const onlineStatusEnum = {
  chat: "在线",
  away: "离开",
  dnd: "游戏中",
  offline: "离线",
  mobile: "手机在线",
};

export default {
  namespaced: true,
  state: {
    //头像
    displayName: "请登陆",
    profileIconId: 29,
    summonerId: 0,
    summonerLevel: 0,
    xpSinceLastLevel: 0,
    xpUntilNextLevel: 0,
    avatar: "https://game.gtimg.cn/images/lol/act/img/profileicon/29.png",
    onlineStatus: "",
    onlineStatusEnum,
    rank: "",
    uid: "",
    token: "",
  },
  mutations: {
    [types.USER_CURRENT_SUMMONER](state, user) {
      Object.assign(state, user);
    },
    [types.USER_SET_SUMMONER_AVATAR](state, profileIconId) {
      state.avatar = convertProfileIcon(profileIconId);
    },
    [types.USER_SET_SUMMONER_STATUS](state, userStatus) {
      state.onlineStatus = userStatus;
    },
    [types.USER_SET_TOKEN](state, token) {
      state.token = token;
    },
    [types.USER_LOGOUT](state) {
      state.token = "";
      state.displayName = "请登陆";
      state.profileIconId = 29;
      state.summonerId = 0;
      state.summonerLevel = 0;
      state.xpSinceLastLevel = 0;
      state.xpUntilNextLevel = 0;
      state.avatar =
        "https://game.gtimg.cn/images/lol/act/img/profileicon/29.png";
      state.onlineStatus = "";
      state.rank = "";
      state.uid = "";
      ChatJs.getInstance().logout();
    },
  },
  actions: {
    //初始化召唤师信息
    initSummoner({ commit }) {
      return new Promise(() => {
        userApi.getCurrentSummoner().then((user) => {
          commit(types.USER_CURRENT_SUMMONER, user);
          commit(types.USER_SET_SUMMONER_AVATAR, user.profileIconId);
        });
        userApi.getChatMe().then((user) => {
          commit(types.USER_SET_SUMMONER_STATUS, user.availability);
        });
      });
    },
    //设置用户头像
    setAvatar({ commit }, profileIconId) {
      commit(types.USER_SET_SUMMONER_AVATAR, profileIconId);
    },
    //设置用户TOKEN
    setToken({ commit }, token) {
      commit(types.USER_SET_TOKEN, token);
    },
    //设置用户
    setUser({ commit }, userInfo) {
      //赋值等级
      if (userInfo.playerInfo.level) {
        userInfo.infoData.summonerLevel = userInfo.playerInfo.level;
      }
      //当前经验
      if (userInfo.playerInfo.exp) {
        userInfo.infoData.xpSinceLastLevel = userInfo.playerInfo.exp;
      }

      if (userInfo.infoData) {
        let sendData = {};
        for (let key in userInfo) {
          sendData[key] = JSON.stringify(userInfo[key]);
        }
        //调用保存接口后创建login
        userApi.login(sendData).then(() => {
          commit(types.USER_CURRENT_SUMMONER, userInfo.infoData);
          ChatJs.getInstance().login(
            userInfo.infoData.uid,
            userInfo.infoData.area
          );
        });
      }
    },
    //退出登陆
    logout({ commit, rootState }) {
      commit(types.USER_LOGOUT);
    },
  },
  getters: {
    getUser: (state) => {
      return state;
    },
  },
};
