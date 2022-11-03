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
      emojis: [
        {
          title: "#icon--scared",
          data: [
            { emoji: "#icon--astonished", text: "中毒" },
            { emoji: "#icon--angel", text: "天使" },
            // { emoji: "#icon--astonished-", text: "中毒-1" },
            { emoji: "#icon--cool", text: "酷" },
            { emoji: "#icon--confused", text: "迷茫" },
            { emoji: "#icon--angry", text: "生气" },
            // { emoji: "#icon--cool-", text: "酷-1" },
            { emoji: "#icon--dizzy", text: "头晕" },
            { emoji: "#icon--cry", text: "哭" },
            // { emoji: "#icon--cry-", text: "哭-1" },
            { emoji: "#icon--expressionless", text: "面无表情" },
            { emoji: "#icon--devil", text: "魔鬼" },
            { emoji: "#icon--flushed", text: "懵B" },
            // { emoji: "#icon--happy-", text: "开心-1" },
            // { emoji: "#icon--happy-1", text: "开心-2" },
            { emoji: "#icon--happy", text: "开心" },
            { emoji: "#icon--injury", text: "受伤" },
            { emoji: "#icon--joy", text: "笑哭" },
            { emoji: "#icon--in-love", text: "热恋" },
            { emoji: "#icon--kiss", text: "亲吻" },
            // { emoji: "#icon--kiss-", text: "亲吻-2" },
            // { emoji: "#icon--kiss-1", text: "亲吻-1" },
            { emoji: "#icon--mask", text: "口罩" },
            // { emoji: "#icon--neutral", text: "面无表情-1" },
            { emoji: "#icon--mute", text: "静音" },
            { emoji: "#icon--sad", text: "难过" },
            // { emoji: "#icon--sad-", text: "难过-1" },
            { emoji: "#icon--scared", text: "害怕" },
            { emoji: "#icon--secret", text: "闭嘴" },
            // { emoji: "#icon--scared-", text: "害怕-1" },
            // { emoji: "#icon--shocked", text: "震惊-1" },
            { emoji: "#icon--sick", text: "生病" },
            { emoji: "#icon--smile", text: "笑" },
            // { emoji: "#icon--smile-", text: "笑-1" },
            { emoji: "#icon--sleeping", text: "睡觉" },
            // { emoji: "#icon--smiling-", text: "微笑-1" },
            { emoji: "#icon--smiling", text: "眼红" },
            { emoji: "#icon--sweat", text: "流汗" },
            { emoji: "#icon--surprised", text: "震惊" },
            { emoji: "#icon--smirking", text: "奸笑" },
            { emoji: "#icon--thinking", text: "思考" },
            { emoji: "#icon--tired", text: "疲惫" },
            { emoji: "#icon--tongue", text: "吐舌" },
            // { emoji: "#icon--tongue-", text: "吐舌-1" },
            // { emoji: "#icon--tongue-1", text: "吐舌-2" },
            { emoji: "#icon--unamused", text: "斜眼" },
            { emoji: "#icon--wink", text: "眨眼" },
            { emoji: "#icon--vomiting", text: "呕吐" },
            { emoji: "#icon--zombie", text: "僵尸" },
            // { emoji: "#icon--vomiting-", text: "呕吐-1" },
          ],
        },
      ],
    },
    hotWords: [
      "大乱斗快来人加我",
      "求大腿有麦会躺",
      "有妹妹来大佬能C的",
      "灵活4=1，来人秒开",
    ],
    //连接状态 true:已连接 false:未连接
    connectStatus: false,
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
    [types.SET_HOTWORDS](state, hotWords) {
      state.hotWords = hotWords;
    },
    [types.CHAT_CHANGE_CONNECT_STATUS](state, status) {
      state.connectStatus = status;
    },
    [types.SET_CHAT_HISTORY](state, chatHistory) {
      state.chatList = chatHistory || [];
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
          commit(types.CHAT_EMOJI_EMOJIS, data.data);
        });
      });
    },
    setHotWords({ commit }, hotWords) {
      commit(types.SET_HOTWORDS, hotWords);
    },
    //修改连接状态
    changeConnectStatus({ commit }, status) {
      commit(types.CHAT_CHANGE_CONNECT_STATUS, status);
    },
    //聊天历史记录
    setChatHistory({ commit, rootState }, chatHistory) {
      chatHistory.map((message) => {
        // message.region = {
        //   id: message.userArea,
        //   name: message.userAreaName,
        // };
        message.isSelf = message.uid == rootState.user.uid;
        // message.time = message.createTime;
        return message;
      });
      commit(types.SET_CHAT_HISTORY, chatHistory);
    },
  },
  getters: {
    getChatList: (state) => {
      return state.chatList;
    },
  },
};
