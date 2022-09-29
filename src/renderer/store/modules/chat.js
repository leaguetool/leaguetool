import * as types from "../mutation-types";

export default {
  namespaced: true,
  state: {
    chatList: [
      {
        id: 1,
        name: "召唤师1",
        avatar: `https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500`,
        content: "test",
        time: "2021-01-01 12:00:00",
        type: "text",
        region: "祖安",
        rank: "最强王者",
        isSelf: false,
      },
      {
        id: 2,
        name: "风车车的猫尾饼",
        avatar: `https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500`,
        content: "大乱斗2=3，来人啊我靠",
        time: "2021-01-01 12:00:00",
        type: "text",
        region: "祖安",
        rank: "最强王者",
        isSelf: true,
      },
      {
        id: 1,
        name: "召唤师1",
        avatar: `https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500`,
        content: "test",
        time: "2021-01-01 12:00:00",
        type: "text",
        region: "祖安",
        rank: "最强王者",
        isSelf: false,
      },
      {
        id: 2,
        name: "风车车的猫尾饼",
        avatar: `https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500`,
        content: "大乱斗2=3，来人啊我靠",
        time: "2021-01-01 12:00:00",
        type: "text",
        region: "祖安",
        rank: "最强王者",
        isSelf: true,
      },
      {
        id: 1,
        name: "召唤师1",
        avatar: `https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500`,
        content: "test",
        time: "2021-01-01 12:00:00",
        type: "text",
        region: "祖安",
        rank: "最强王者",
        isSelf: false,
      },
      {
        id: 2,
        name: "风车车的猫尾饼",
        avatar: `https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500`,
        content: "大乱斗2=3，来人啊我靠",
        time: "2021-01-01 12:00:00",
        type: "text",
        region: "祖安",
        rank: "最强王者",
        isSelf: true,
      },
      {
        id: 1,
        name: "召唤师1",
        avatar: `https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500`,
        content: "test",
        time: "2021-01-01 12:00:00",
        type: "text",
        region: "祖安",
        rank: "最强王者",
        isSelf: false,
      },
    ],
  },
  mutations: {
    [types.CHAT_ADD_MESSAGE](state, message) {
      state.chatList.push(message);
    },
  },
  actions: {
    //添加一条消息
    addMessage({ commit }, message) {
      commit(types.CHAT_ADD_MESSAGE, message);
    },
  },
  getters: {
    getChatList: (state) => {
      return state.chatList;
    },
  },
};
