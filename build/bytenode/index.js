const main = require("./bytenode_main");
const render = require("./bytenode_render");
const colors = require("colors");

exports.default = async function (context) {
  console.log("\n▪  prepare to bytenode compiling".green);
  await main.compileMain();
  await render.compileRender();
  console.log("▪  bytenode compile all complete!\n".green);
};
