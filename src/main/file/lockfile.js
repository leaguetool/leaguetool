const fs = require("fs");
const childProcess = require("child_process");
const store = require("../store");
const exec = childProcess.exec;

//注册表
const registryPath = "HKEY_CURRENT_USER\\SOFTWARE\\Tencent\\LOL";
const registryPathKey = "InstallPath";
const registryREG_SZ = "REG_SZ";
const command = `reg query ${registryPath} /v ${registryPathKey}`;
const leagueClient = "LeagueClient.exe";
const lockfile = "/LeagueClient/lockfile";

//"reg query HKEY_CURRENT_USER\\SOFTWARE\\Tencent\\LOL /v InstallPath"
//获取客户端路径
function viewRegistryMessage(command) {
  return new Promise(function(resolve, reject) {
    const gamePath = store.get("gamePath");
    if (gamePath) {
      //如果手动设置过路径，那么就先采用该路径
      return resolve(gamePath);
    }
    exec(command, function(err, stdout, stderr) {
      if (err) {
        reject(err);
        // return console.error(err);
      }
      leagueClientPath = stdout
        .split(/\s+/g)
        .filter((line) => {
          return (
            line &&
            ![registryPath, registryPathKey, registryREG_SZ].includes(line)
          );
        })
        .join();
      resolve(leagueClientPath);
    });
  });
}

//判断进程是否在线
function onlineLeagueClient() {
  let cmd = process.platform === "win32" ? "tasklist" : "ps aux";
  return new Promise((resolve, reject) => {
    exec(cmd, function(err, stdout, stderr) {
      if (err) {
        return console.error(err);
      }
      stdout.split("\n").filter((line) => {
        let processMessage = line.trim().split(/\s+/);
        let processName = processMessage[0];
        if (processName === leagueClient) {
          resolve(true);
        }
      });
      reject(false);
    });
  });
}

function fileRead(installPath) {
  lockfilePath = installPath + lockfile;
  let data = null;
  try {
    data = fs.readFileSync(lockfilePath, "utf-8");
  } catch (e) {
    console.error("读取文件发生错误");
  }
  return data;
}

//开始扫描
async function startScanning() {
  let data = {
    port: null,
    token: null,
    protocol: null,
    username: "riot",
    verification: "@",
  };
  return onlineLeagueClient()
    .then(() => {
      return viewRegistryMessage(command);
    })
    .then(async (leagueClientPath) => {
      console.log("获取到客户端路径：", leagueClientPath);
      const { port, token } = await getLcuToken(leagueClientPath);
      //authString = fileRead(leagueClientPath);
      if (!token) {
        //读取文件失败
        data.msg = "请稍后，可能是客户端正在启动中";
        console.log(data.msg);
      } else {
        store.set("gamePath", leagueClientPath);
        //触发给主线程事件
        data = {
          port: port,
          token: token,
          protocol: "https",
          username: "riot",
          verification: "@",
        };
        store.set("gameInfo", data);
      }
      return data;
    })
    .catch(() => {
      data.msg = "请先打开LOL客户端";
      return data;
    });
}

const getLcuToken = async (dirPath) => {
  // const appendGameToDir = config.get(`appendGameToDir`);
  // const dir = `${
  //   appendGameToDir ? `${dirPath}/Game` : dirPath
  // }/Logs/LeagueClient Logs`;
  const dir = `${dirPath}/Game/Logs/LeagueClient Logs`;
  console.log(dir);
  try {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, async (error, data) => {
        if (error) {
          console.error(error);
          return false;
        }
        const latest = data
          .filter((f) => f.includes(`renderer.log`))
          .sort((a, b) => a.localeCompare(b))
          .slice(-3)
          .shift();
        fs.readFile(`${dir}/${latest}`, "utf8", function(err, data) {
          const url = data.match(/https(.*)\/index\.html/)[1] || ``;
          const token = url.match(/riot:(.*)@/)[1] || null;
          const port = url.match(/:(\d+)/)[1] || null;
          const urlWithAuth = `https${url}`;
          resolve({ url, token, port, urlWithAuth });
        });
      });
    });
    // const latest = files
    //   .filter((f) => f.includes(`renderer.log`))
    //   .sort((a, b) => a.localeCompare(b))
    //   .pop();

    // const content = await fs.readFile(`${dir}/${latest}`, "utf8");

    // const url = content.match(/https(.*)\/index\.html/)?.[1] ?? ``;
    // const token = url.match(/riot:(.*)@/)?.[1] ?? null;
    // const port = url.match(/:(\d+)/)?.[1] ?? null;
    // const urlWithAuth = `https${url}`;
  } catch (err) {
    console.log(err);
    return [null, null, null];
  }
};

module.exports = { startScanning, onlineLeagueClient };

// const fs = require("fs");
// const childProcess = require("child_process");
// const store = require("../store");
// const exec = childProcess.exec;

// //注册表
// const registryPath = "HKEY_CURRENT_USER\\SOFTWARE\\Tencent\\LOL";
// const registryPathKey = "InstallPath";
// const registryREG_SZ = "REG_SZ";
// const command = `reg query ${registryPath} /v ${registryPathKey}`;
// const leagueClient = "LeagueClient.exe";
// const lockfile = "/LeagueClient/lockfile";

// //"reg query HKEY_CURRENT_USER\\SOFTWARE\\Tencent\\LOL /v InstallPath"
// //获取客户端路径
// function viewRegistryMessage(command) {
//   // exec(
//   //   `wmic process where name='LeagueClient.exe' GET ExecutablePath`,
//   //   function(err, stdout, stderr) {
//   //     if (err) {
//   //       return console.error(err);
//   //     }
//   //     console.log("zzzzzzzzzz>", stdout);
//   //   }
//   // );
//   return new Promise(function(resolve, reject) {
//     const gamePath = store.get("gamePath");
//     if (gamePath) {
//       //如果手动设置过路径，那么就先采用该路径
//       return resolve(gamePath);
//     }
//     exec(command, function(err, stdout, stderr) {
//       if (err) {
//         reject(err);
//         // return console.error(err);
//       }
//       leagueClientPath = stdout
//         .split(/\s+/g)
//         .filter((line) => {
//           return (
//             line &&
//             ![registryPath, registryPathKey, registryREG_SZ].includes(line)
//           );
//         })
//         .join();
//       resolve(leagueClientPath);
//     });
//   });
// }

// //判断进程是否在线
// export const onlineLeagueClient = () => {
//   let cmd = process.platform === "win32" ? "tasklist" : "ps aux";
//   return new Promise((resolve, reject) => {
//     exec(cmd, function(err, stdout, stderr) {
//       if (err) {
//         return console.error(err);
//       }
//       stdout.split("\n").filter((line) => {
//         let processMessage = line.trim().split(/\s+/);
//         let processName = processMessage[0];
//         if (processName === leagueClient) {
//           resolve(true);
//         }
//       });
//       reject(false);
//     });
//   });
// };

// function fileRead(installPath) {
//   let lockfilePath = installPath + lockfile;
//   console.log(lockfilePath);
//   let data = null;
//   try {
//     data = fs.readFileSync(lockfilePath, "utf-8");
//     console.log(data);
//   } catch (e) {
//     console.error("读取文件发生错误", e);
//   }
//   return data;
// }

// //开始扫描
// export const startScanning = async () => {
//   let data = {
//     port: null,
//     token: null,
//     protocol: null,
//     username: "riot",
//     verification: "@",
//   };
//   return await onlineLeagueClient()
//     .then(() => {
//       return viewRegistryMessage(command);
//     })
//     .then((leagueClientPath) => {
//       console.log("获取到客户端路径：", leagueClientPath);
//       authString = fileRead(leagueClientPath);
//       console.log("authString=======>", authString);
//       if (!authString) {
//         //读取文件失败
//         data.msg = "请稍后，可能是客户端正在启动中";
//         console.log(data.msg);
//       } else {
//         store.set("gamePath", leagueClientPath);
//         //以冒号分开，分别是:进程名,PID,端口号,token,协议
//         //参数放在内存中
//         let agres = authString.split(":");
//         if (agres.length >= 4) {
//           //触发给主线程事件
//           data = {
//             port: agres[2],
//             token: agres[3],
//             protocol: agres[4],
//             username: "riot",
//             verification: "@",
//           };
//           store.set("gameInfo", data);
//           // console.log(data)
//         }
//       }
//       return data;
//     })
//     .catch(() => {
//       data.msg = "请先打开LOL客户端";
//       return data;
//     });
// };
