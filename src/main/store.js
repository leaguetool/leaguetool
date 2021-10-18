const Store = require("electron-store");

module.exports = new Store({
  encryptionKey: "leaguetool",
  defaults: {
    versionInfo: null,
    gamePath: "",
    gameInfo: null,
  },
});
