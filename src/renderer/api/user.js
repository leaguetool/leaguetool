import http from "@/http";
import server from "@/http/server";

export default {
  getCurrentSummoner() {
    return http.get("/lol-summoner/v1/current-summoner");
  },

  getChatMe() {
    return http.get("/lol-chat/v1/me");
  },

  login(data) {
    return server.post("/userinfo/leagueUserInfoEntity/login", data);
  },
};
