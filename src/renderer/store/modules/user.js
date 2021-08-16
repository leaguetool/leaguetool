import * as types from "../mutation-types";
import { convertProfileIcon } from "@/common/converter";
import userApi from "@/api/user";

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
    displayName: "召唤师",
    profileIconId: 29,
    summonerId: 0,
    summonerLevel: 0,
    xpSinceLastLevel: 0,
    xpUntilNextLevel: 0,
    avatar: "",
    onlineStatus: "",
    onlineStatusEnum,
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
  },
  getters: {
    getUser: (state) => {
      return state;
    },
  },
};
