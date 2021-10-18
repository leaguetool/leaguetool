const path = require("path");
const pkg = require("./package.json");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      //主进程入口
      mainProcessFile: "src/main/index.js",
      //渲染进程入口
      rendererProcessFile: "src/renderer/main.js",
      //文件在更改时将重新编译主进程并重新启动
      // mainProcessWatch: ['src/myFile1', 'src/myFile2'],
      //输出将新目录添加到 .gitignore 文件
      outputDir: "./dist_electron/output",
      //协议 确保在协议末尾添加“./”
      // customFileProtocol: 'leaguetool://./',
      customFileProtocol: "./",

      builderOptions: {
        //asar包是否压缩加密
        asar: true,
        appId: "com.leaguetool.app",
        productName: "LeagueTool",
        copyright: "Copyright (C) 2021 leaguetool",
        //win相关配置
        win: {
          requestedExecutionLevel: "requireAdministrator",
          target: [
            {
              target: "nsis", //利用nsis制作安装程序
              arch: [
                "ia32", //打包32位64位也能使用
              ],
            },
          ],
        },
        nsis: {
          language: "2052",
          uninstallDisplayName: "LeagueTool",
        },
        publish: [
          {
            provider: "generic",
            url: "http://static.s6.design/update",
          },
        ],
        directories: {
          output: `./dist_electron/release/${pkg.version}`, // 输出文件路径
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src/renderer"))
      .set("~", resolve("src/main"));
  },
  publicPath: "./",
  assetsDir: "static",

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#f9cc16",
            "text-color-secondary": "#f5f5f5",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  // ,pages: {
  //   index: {
  //     entry: 'src/renderer/main.js',
  //   }
  // }
};
