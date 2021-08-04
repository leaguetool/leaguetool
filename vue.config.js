const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      //主进程入口
      mainProcessFile: 'src/main/index.js',
      //渲染进程入口
      rendererProcessFile: 'src/renderer/main.js',
      //文件在更改时将重新编译主进程并重新启动
      // mainProcessWatch: ['src/myFile1', 'src/myFile2'],
      //输出将新目录添加到 .gitignore 文件
      // outputDir: 'release',
      //协议 确保在协议末尾添加“./”
      // customFileProtocol: 'leaguetool://./',
      customFileProtocol: './',

      builderOptions: {
        //asar包是否压缩加密
        asar: true,
        appId: "com.leaguetool.app",
        productName: "LeagueTool",
        copyright: "Copyright (C) 2021 leaguetool",
        //win相关配置
        win: {
          target: [
            {
              target: "nsis",//利用nsis制作安装程序
              arch: [
                "ia32",//打包32位64位也能使用
              ]
            }
          ]
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src/renderer")) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  publicPath: './',
  assetsDir: 'static'
  // ,pages: {
  //   index: {
  //     entry: 'src/renderer/main.js',
  //   }
  // }
}