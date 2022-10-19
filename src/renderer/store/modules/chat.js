import * as types from "../mutation-types";
import ChatJs from "@/common/chat/chat.js";
import chatApi from "@/api/chat";

export default {
  namespaced: true,
  state: {
    chatList: [
      // {
      //   id: 1,
      //   name: "召唤师1",
      //   avatar: `https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500`,
      //   content: "test",
      //   time: "2021-01-01 12:00:00",
      //   type: "text",
      //   region: {
      //     name: "祖安",
      //     id: 2,
      //   },
      //   rank: "最强王者",
      //   isSelf: false,
      // },
    ],
    //获取英雄联盟所有电信大区名字
    regions: [
      {
        name: "电信大区",
        list: [
          { name: "艾欧尼亚", id: 1 },
          { name: "祖安", id: 3 },
          { name: "诺克萨斯", id: 4 },
          { name: "班德尔城", id: 5 },
          { name: "皮尔特沃夫", id: 7 },
          { name: "战争学院", id: 8 },
          { name: "巨神峰", id: 10 },
          { name: "雷瑟守备", id: 11 },
          { name: "裁决之地", id: 13 },
          { name: "黑色玫瑰", id: 14 },
          { name: "暗影岛", id: 15 },
          { name: "钢铁烈阳", id: 17 },
          { name: "水晶之痕", id: 18 },
          { name: "均衡教派", id: 19 },
          { name: "影流", id: 22 },
          { name: "守望之海", id: 23 },
          { name: "征服之海", id: 24 },
          { name: "卡拉曼达", id: 25 },
          { name: "皮城警备", id: 27 },
        ],
      },
      {
        name: "网通大区",
        list: [
          { name: "比尔吉沃特", id: 2 },
          { name: "德玛西亚", id: 6 },
          { name: "弗雷尔卓德", id: 9 },
          { name: "无畏先锋", id: 12 },
          { name: "恕瑞玛", id: 16 },
          { name: "扭曲丛林", id: 20 },
          { name: "巨龙之巢", id: 26 },
        ],
      },
      {
        name: "其他大区",
        list: [{ name: "教育网专区", id: 21 }],
      },
      {
        name: "全网络大区",
        list: [
          { name: "男爵领域", id: 30 },
          { name: "峡谷之巅", id: 31 },
        ],
      },
    ],
    currentRegion: {
      name: "艾欧尼亚",
      id: 1,
      //热度
      hot: 0,
    },
    emoji: {
      emojis: [],
    },
  },
  mutations: {
    [types.CHAT_ADD_MESSAGE](state, message) {
      state.chatList = [...state.chatList, message];
    },
    [types.CHAT_CHANGE_REGION](state, region) {
      state.currentRegion = region;
      //切换大区后清空聊天记录
      // state.chatList = [];
    },
    [types.CHAT_CHANGE_HOT](state, hot) {
      state.currentRegion.hot = hot;
    },
    [types.CHAT_EMOJI_EMOJIS](state, data) {
      state.emoji.emojis = data;
    },
  },
  actions: {
    init({ rootState, state }) {
      //初始化成功后创建chat开黑大厅链接，导入chatjs
      console.log(rootState);
      let chatInstance = ChatJs.getInstance().init(
        rootState.user.uid ? rootState.user.uid : "tourist",
        state.currentRegion.id
      );
      const getBaseInfo = setInterval(() => {
        if (chatInstance.tio.ws.status) {
          //获取基础信息
          chatInstance.sendOtherMsg({
            otherPakType: "BASE_DATA",
            data: {},
          });
          clearInterval(getBaseInfo);
        }
      }, 500);

      // new ChatJs().init(rootState);
    },
    //添加一条消息
    addMessage({ commit, rootState }, message) {
      message.isSelf = message.uid === rootState.user.uid;
      commit(types.CHAT_ADD_MESSAGE, message);
    },
    //发送一条消息
    sendMessage({ commit }, message) {
      ChatJs.getInstance().sendChatMsg(JSON.stringify(message));
      // commit(types.CHAT_ADD_MESSAGE, message);
    },
    //切换大区
    changeRegion({ commit, state }, regionId) {
      //根据regionId循环找到state.regions下面对应的大区对象
      let region = {};
      state.regions.forEach((item) => {
        item.list.forEach((item2) => {
          if (item2.id == regionId) {
            region = item2;
          }
        });
      });
      if (!region) {
        return;
      }
      //hot默认为0
      region.hot = 0;
      commit(types.CHAT_CHANGE_REGION, region);
      //切换大区后重新绑定到新大区的聊天组
      ChatJs.getInstance().sendOtherMsg({
        otherPakType: "CHANGE_REGION",
        data: region.id,
      });
    },
    //改变热度
    changeRegionHot({ commit }, hot) {
      commit(types.CHAT_CHANGE_HOT, hot);
    },
    //初始化基础信息
    initBaseInfo() {},
    //获取emoji表情
    getEmoji({ commit }) {
      return new Promise(() => {
        chatApi.getEmoji().then((data) => {
          commit(types.CHAT_EMOJI_EMOJIS, data);
        });
      });
    },
  },
  getters: {
    getChatList: (state) => {
      return state.chatList;
    },
  },
};
