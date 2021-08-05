const schedule = require("node-schedule");
const { onlineLeagueClient } = require("../file/lockfile");

//创建一个定时任务 10秒钟检测game进程是否存活
function gameClientRunnerTesting(send) {
  let rule = new schedule.RecurrenceRule();

  rule.second = [0, 10, 20, 30, 40, 50];

  schedule.scheduleJob(rule, function() {
    onlineLeagueClient()
      .then(() => {
        //game在线
        send("game-online");
      })
      .catch(() => {
        //game离线
        send("game-kill");
      });
  });
}

module.exports = {
  gameClientRunnerTesting,
};
