import * as types from "../mutation-types";
import { convertProfileIcon } from "@/common/converter";
import systemApi from "@/api/system";

export default {
  namespaced: true,
  state: {
    //公告
    notice: "",
  },
  mutations: {
    [types.SYSTEM_SET_NOTICE](state, notice) {
      state.notice = notice;
    },
  },
  actions: {
    //
    getNotice({ commit }) {
      return new Promise(() => {
        systemApi.getNotice().then((data) => {
          console.log(data);
          commit(types.SYSTEM_SET_NOTICE, data);
        });
      });
    },
  },
};
