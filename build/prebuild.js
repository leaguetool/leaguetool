const pck = require("../package.json");
const fs = require("fs");

//获取当前版本号
let version = pck.version;

//获取提升后新的版本号
const getNewVersion = (version) => {
  let versionArr = version.split(".");
  for (let index = versionArr.length - 1; index >= 0; --index) {
    let thatIndex = index;
    let element = versionArr[thatIndex];
    if (index === versionArr.length - 1) {
      let number = parseInt(versionArr[thatIndex]);
      versionArr[thatIndex] = ++number;
      element = parseInt(element);
      ++element;
    }
    if (judgeTen(element)) {
      versionArr[thatIndex] = 0;
      let number = parseInt(versionArr[--thatIndex]);
      versionArr[thatIndex] = ++number;
    }
  }
  return versionArr.join(".");
};

//判断是否大于10
const judgeTen = (number) => parseInt(number) >= 10;

(() => {
  //自动提升版本号
  const newVersion = getNewVersion(version);
  let pkg = fs.readFileSync("package.json");
  pkg = JSON.parse(pkg);
  pkg.version = newVersion;
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
  console.log("\x1b[91m", `已自动提升版本号为[${pkg.version}]`);
})();
