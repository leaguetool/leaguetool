const fs = require("fs");
const yaml = require("js-yaml");
const vueConfig = require("../vue.config");
const pck = require("../package.json");
const path = require("path");

const DEFAULT_NOTES_CONFIG = [
  "1、修复若干问题，提升产品体验",
  "2、优化系统体验",
  `3、如果遇到其他问题需要帮助，请与我联系 ${pck.author}`,
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

function readPackageNotes() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve, reject) => {
    rl.question(
      "即将打包完成,需要添加更新日志? [留空表示不填写/多条请用,分割]",
      (answer) => {
        // 对答案进行处理
        rl.close();
        answer
          ? resolve(answer.indexOf(",") ? answer.split(",") : [answer])
          : resolve();
      }
    );
  });
}

//用于处理electron-updater内不支持添加更新日志的操作
(() => {
  readPackageNotes().then((answer) => {
    let release_path = path.resolve(
      __dirname,
      "../" + getReleasePath() + "/latest.yml"
    );
    let yamlconfig = getYamlConfig(release_path);

    yamlconfig.releaseNotes = answer || DEFAULT_NOTES_CONFIG;

    //处理好后重新写回
    writeYamlConfig(release_path, yamlconfig);
  });
})();
