module.exports = {
  //头像转换
  convertProfileIcon(profileIcon) {
    return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/${profileIcon}.png`;
  },
  //文件大小转换
  convertFileSize(size) {
    let kb = 1024;
    let unit = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let i = Math.floor(Math.log(size) / Math.log(kb));
    // let unit = size < 1024 ? 'KB' : size < 1024*1024 ? 'MB'
    return (size / Math.pow(kb, i)).toPrecision(3) + " " + unit[i];
  },
  //时间中间带T的转换
  convertDateFormat(time, format = "YYYY-MM-DD hh:mm:ss") {
    if (!time) return "";
    var datetime = new Date(time);
    var o = {
      "Y+": datetime.getFullYear(),
      "M+": datetime.getMonth() + 1,
      "D+": datetime.getDate(),
      "h+": datetime.getHours(),
      "m+": datetime.getMinutes(),
      "s+": datetime.getSeconds(),
      "q+": Math.floor((datetime.getMonth() + 3) / 3),
      S: datetime.getMilliseconds(),
    };
    if (/(Y+)/.test(format))
      format = format.replace(
        RegExp.$1,
        (datetime.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    return format;
  },
};
