import http from "@/http";

export default {
  getCurrentSummoner() {
    return http.get("/lol-summoner/v1/current-summoner");
  },

  getChatMe() {
    return http.get("/lol-chat/v1/me");
  },
};
