const fs = require("fs");
const yaml = require("js-yaml");
const vueConfig = require("../vue.config");
const pck = require("../package.json");
const path = require("path");

const DEFAULT_NOTES_CONFIG = [
  "1、修复若干问题，提升产品体验",
  "2、优化系统体验",
  `3、如果遇到其他问题需要帮助，请与我联系 ${pck.author.email}`,
];
/**
 * 打包后进行更新版本的日志添加
 */

function getYamlConfig(release_path) {
  // Get document, or throw exception on error
  try {
    return yaml.safeLoad(fs.readFileSync(release_path, "utf8"));
  } catch (e) {
    console.log(e);
  }
}

function getReleasePath() {
  return vueConfig.pluginOptions.electronBuilder.builderOptions.directories
    .output;
}

function writeYamlConfig(release_path, config) {
  fs.writeFile(release_path, yaml.safeDump(config), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function createLineNote(note) {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve, reject) => {
    rl.question(note, (answer) => {
      // 对答案进行处理
      rl.close();
      answer ? resolve(answer) : resolve();
    });
  });
}

function readPackageNotes() {
  return createLineNote(
    "即将打包完成,需要添加更新日志? [留空表示不填写/多条请用,分割]"
  );
}

//用于处理electron-updater内不支持添加更新日志的操作
(() => {
  readPackageNotes()
    .then((answer) => {
      answer = answer
        ? answer.indexOf(",")
          ? answer.split(",")
          : [answer]
        : null;
      let release_path = path.resolve(
        __dirname,
        "../" + getReleasePath() + "/latest.yml"
      );
      let yamlconfig = getYamlConfig(release_path);

      yamlconfig.releaseNotes = answer || DEFAULT_NOTES_CONFIG;
      yamlconfig.path = `./${yamlconfig.version}/LeagueTool Setup ${yamlconfig.version}.exe`;
      yamlconfig.files[0].url = yamlconfig.path;
      //处理好后重新写回
      writeYamlConfig(release_path, yamlconfig);
    })
    .finally(() => {
      createLineNote(
        `是否上传[${pck.version}]版本到阿里云OSS发布? [任意字符表示上传/留空不上传]`
      ).then((answer) => {
        answer && require("./oss.js");
      });
    });
})();
