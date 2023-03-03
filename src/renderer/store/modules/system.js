import * as types from "../mutation-types";
import { ipcRenderer } from "electron";
import { convertProfileIcon } from "@/common/converter";
import systemApi from "@/api/system";

export default {
  namespaced: true,
  state: {
    //公告
    notice: "",
    adminUser: [],
    settings: {
      //是否启动时自动启动 true表示开机自动启动 false表示关闭开机自动启动
      autoStart: true,
      //当关闭按钮应该退出应用还是隐藏到托盘 exit退出 hide隐藏到托盘
      closeToTray: "hide",
    },
  },
  mutations: {
    [types.SYSTEM_SET_NOTICE](state, notice) {
      state.notice = notice;
    },
    [types.SYSTEM_SET_ADMINUSER](state, adminUser) {
      state.adminUser = adminUser;
    },
    [types.SYSTEM_SET_SETTINGS](state, settings) {
      state.settings = { ...state.settings, ...settings };
    },
  },
  actions: {
    //
    getNotice({ commit }) {
      return new Promise(() => {
        systemApi.getNotice().then((data) => {
          console.log(data.data);
          commit(types.SYSTEM_SET_NOTICE, data.data);
        });
      });
    },
    setAdminUser({ commit }, adminUser) {
      commit(types.SYSTEM_SET_ADMINUSER, adminUser);
    },
    //设置开机自动启动
    setAutoStart({ commit }, autoStart) {
      ipcRenderer.send("autoStartApp", autoStart);
      commit(types.SYSTEM_SET_SETTINGS, { autoStart });
    },
    //设置关闭按钮
    setCloseToTray({ commit }, closeToTray) {
      commit(types.SYSTEM_SET_SETTINGS, { closeToTray });
    },
  },
};
