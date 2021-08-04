const { shell } = require("electron");

const config = {
  bug: "https://www.github.com",
  github: "https://www.github.com",
};

//默认浏览器打开网站
function openUrl(url) {
  shell.openExternal(url);
}

module.exports = {
  //打开反馈Bug
  openBugreport() {
    openUrl(config.bug);
  },
  //打开开源社区
  openGithub() {
    openUrl(config.github);
  },
};
