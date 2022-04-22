const path = require("path");
//导入fs
const fs = require("fs");
//插件的配置文件
const PLUGIN_NAME = "plugin.json";
//UTF-8编码常量
const UTF8 = "utf-8";

class Plugins {
  constructor() {
    this.PLUGIN_PATH = "./";
    //插件列表
    this.plugins = [];

    //创建文件处理器
    this.fileHandler = new FileHandler(this.PLUGIN_PATH);

    //扫描插件
    this.scanPlugins();
  }

  //启动插件
  start() {
    this.plugins.forEach(function (plugin) {
      plugin.start();
    });
    // console.log("The plugin was applied successfully");
  }

  //卸载插件
  end() {
    // console.log("The plugin was removed successfully");
  }

  //扫描插件
  scanPlugins() {
    console.log(this.fileHandler.getPlugins());
    this.fileHandler.getPlugins().forEach((pluginDir) => {
      //读取插件的json配置
      const plugin = this.fileHandler.readPluginConfig(pluginDir);
      //创建插件实例
      const pluginInstance = new Plugin(
        plugin.id,
        plugin.version,
        plugin.main,
        plugin.author,
        pluginDir
      );
      //装配插件
      this.plugins[pluginDir] = pluginInstance;
      this.plugins.push(pluginInstance);
    });
  }
}

class FileHandler {
  constructor(pluginsPath) {
    this.pluginsPath = pluginsPath;
    this.getPlugins = () => {
      //读取插件目录
      let pluginsDir = fs.readdirSync(path.join(__dirname, this.pluginsPath));
      return this.filterFile(pluginsDir);
    };
  }
  //文件数组里面去掉文件名带后缀的文件
  filterFile(fileList) {
    return fileList.filter((file) => {
      return file.indexOf(".") === -1;
    });
  }

  //读取插件json配置文件
  readPluginConfig(pluginName) {
    let pluginConfig = require(`./${pluginName}/${PLUGIN_NAME}`);
    // console.log(pluginConfig);
    // let pluginConfig = fs.readFileSync(
    //   path.join(__dirname, this.pluginsPath, pluginName, PLUGIN_NAME),
    //   UTF8
    // );
    return pluginConfig;
  }
}

/**
 * 基础插件类
 */
class Plugin {
  constructor(id, version, main, author, pluginPath) {
    this.id = id;
    this.version = version;
    this.main = main;
    this.author = author;
    this.pluginPath = pluginPath;
    //启动插件
    this.start = () => {
      console.log(`[${this.id}] plugin started successfully`);
    };
    //暂停插件
    this.end = () => {
      console.log(`[${this.id}] plugin paused successfully`);
    };
  }
}

new Plugins().start();
