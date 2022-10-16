const path = require("path");
const pkg = require("./package.json");
const CopyPlugin = require("copy-webpack-plugin");

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
        beforePack: "build/bytenode/index.js",
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
              // arch: [
              //   "ia32", //打包32位64位也能使用
              // ],
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
      preload: "public/preload.js",
      externals: ["bytenode"],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src/renderer"))
      .set("~", resolve("src/main"));
  },
  publicPath: "./",
  assetsDir: "static",
  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new CopyPlugin([
        {
          from: path.resolve(__dirname, "dist_electron/output/plugins"),
          to: path.resolve(__dirname, "dist_electron/output/bundled/plugins"),
        },
      ]),
    ],
  },
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
