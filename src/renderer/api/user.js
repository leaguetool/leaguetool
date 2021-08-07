import http from "@/http";

export default {
  getCurrentSummoner() {
    return http.get("/lol-summoner/v1/current-summoner");
  },
};
