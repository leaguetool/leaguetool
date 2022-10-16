import * as types from "../mutation-types";
import { convertProfileIcon } from "@/common/converter";
import systemApi from "@/api/system";

export default {
  namespaced: true,
  state: {
    //公告
    notice: "",
    adminUser: [],
  },
  mutations: {
    [types.SYSTEM_SET_NOTICE](state, notice) {
      state.notice = notice;
    },
    [types.SYSTEM_SET_ADMINUSER](state, adminUser) {
      state.adminUser = adminUser;
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
  },
};
