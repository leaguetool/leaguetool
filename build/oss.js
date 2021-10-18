const pck = require("../package.json");
const vueConfig = require("../vue.config");
const path = require("path");
const OSS = require("ali-oss");
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
  try {
    const result = await client.put(
      UPDATE_PATH + "/latest.yml",
      path.normalize(`${releasePath}/latest.yml`)
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

async function putExe() {
  const releasePath = getReleasePath();
  try {
    const result = await client.put(
      UPDATE_LAST + `/LeagueTool Setup ${pck.version}.exe`,
      path.normalize(`${releasePath}/LeagueTool Setup ${pck.version}.exe`)
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

async function putBlockMap() {
  const releasePath = getReleasePath();
  try {
    const result = await client.put(
      UPDATE_LAST + `/LeagueTool Setup ${pck.version}.exe.blockmap`,
      path.normalize(
        `${releasePath}/LeagueTool Setup ${pck.version}.exe.blockmap`
      )
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

putLatest();
putExe();
putBlockMap();
