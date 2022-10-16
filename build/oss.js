const pck = require("../package.json");
const vueConfig = require("../vue.config");
const path = require("path");
const OSS = require("ali-oss");
const colors = require("colors");
const client = new OSS({
  region: "oss-cn-beijing",
  accessKeyId: "LTAIgWswjn6Zyr8c",
  accessKeySecret: "B2hlxY9N0GJeVIGUdwVZpVpYnrNdp1",
  bucket: "vipvideoimg",
});

const UPDATE_PATH = `update`;
const UPDATE_LAST = `${UPDATE_PATH}/${pck.version}`;

function getReleasePath() {
  return vueConfig.pluginOptions.electronBuilder.builderOptions.directories
    .output;
}

async function putLatest() {
  const releasePath = getReleasePath();
  console.log(`▪  开始上传latest.yml`.green);
  try {
    const result = await client.put(
      UPDATE_PATH + "/latest.yml",
      path.normalize(`${releasePath}/latest.yml`)
    );
    console.log(`▪  上传latest.yml成功：`.green, result.url);
  } catch (e) {
    console.log(e);
  }
}

async function putExe() {
  const releasePath = getReleasePath();
  console.log(`▪  开始上传exe`.green);
  try {
    const result = await client.put(
      UPDATE_LAST + `/LeagueTool Setup ${pck.version}.exe`,
      path.normalize(`${releasePath}/LeagueTool Setup ${pck.version}.exe`)
    );
    console.log(`▪  上传exe成功：`.green, result.url);
  } catch (e) {
    console.log(e);
  }
}

async function putBlockMap() {
  const releasePath = getReleasePath();
  console.log(`▪  开始上传blockmap`.green);
  try {
    const result = await client.put(
      UPDATE_LAST + `/LeagueTool Setup ${pck.version}.exe.blockmap`,
      path.normalize(
        `${releasePath}/LeagueTool Setup ${pck.version}.exe.blockmap`
      )
    );
    console.log(`▪  上传blockmap成功：`.green, result.url);
    // console.log(`上传${releasePath}成功：`, result.url);
  } catch (e) {
    console.log(e);
  }
}
//创建一个任务队列
const taskQueue = [putLatest(), putExe(), putBlockMap()];
Promise.all(taskQueue).then(() => {
  console.log(`上传${taskQueue.length}个文件成功，发布完成~`.green);
  // console.log("\x1b[32m", `上传${taskQueue.length}个文件成功，发布完成~`);
});
