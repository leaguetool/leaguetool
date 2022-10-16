const fs = require("fs");
const path = require("path");
const bytenode = require("bytenode");
const v8 = require("v8");
const { compile } = require("@vue/compiler-dom");
const vueConfig = require("../../vue.config");

v8.setFlagsFromString("--no-lazy");
const pathName = path.join(
  __dirname,
  "../../",
  vueConfig.pluginOptions.electronBuilder.outputDir,
  "/bundled/background.js"
);
const loadContent =
  "'use strict';const bytenode = require('bytenode');const fs = require('fs');const v8 = require('v8');const path = require('path');v8.setFlagsFromString('--no-lazy');";
async function compileMain() {
  try {
    console.log("▪  bytenode compiling background.js".green);
    await bytenode.compileFile(
      {
        filename: pathName,
        electron: true, // electron的项目这个参数一定要加上
        compileAsModule: true,
      },
      `${pathName}c`
    );
    // 将原来的js文件里面的内容替换成下面的内容
    const backgroundContent = `${loadContent}require('./background.jsc')`;
    fs.writeFileSync(pathName, backgroundContent, "utf8");
    console.log("▪  bytenode compile background.js complete!".green);
  } catch (e) {
    console.error(`run_bytenode_err: ${e}`.error);
  }
}
exports.compileMain = compileMain;
