module.exports = {
  pluginOptions: {
    electronBuilder: {
      //主进程入口
      mainProcessFile: 'src/main/index.js',
      //渲染进程入口
      rendererProcessFile: 'src/renderer/main.js',
      //文件在更改时将重新编译主进程并重新启动
      // mainProcessWatch: ['src/myFile1', 'src/myFile2'],
      //输出将新目录添加到 .gitignore 文件
      outputDir: 'release',
      //协议 确保在协议末尾添加“./”
      // customFileProtocol: 'leaguetool://./',
      customFileProtocol: './'
    }
  },
  publicPath: './',
  assetsDir: 'static'
  // ,pages: {
  //   index: {
  //     entry: 'src/renderer/main.js',
  //   }
  // }
}