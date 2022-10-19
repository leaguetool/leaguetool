import server from "@/http/server";

export default {
  getEmoji() {
    return server.get("/emoji/emoji.json");
  },
};
