import server from "@/http/server";

export default {
  getNotice() {
    return server.get("/getNotice");
  },
};
