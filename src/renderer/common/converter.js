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

  /**
   * 时间转换 不带秒位
   * @param {Object} time
   */
  dateformatNotsecond(time) {
    let now = new Date(time); //创建一个指定的日期对象
    var year = now.getFullYear(); //取得4位数的年份
    var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
    var date = now.getDate(); //返回日期月份中的天数（1到31）
    var hour = now.getHours(); //返回日期中的小时数（0到23）
    var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
    //一位要补零
    if (minute <= 9) {
      minute = "0" + minute;
    }
    if (hour <= 9) {
      hour = "0" + hour;
    }
    return year + "年" + month + "月" + date + "日 " + hour + ":" + minute;
  },
  dateMinute(time) {
    let now = new Date(time); //创建一个指定的日期对象
    var hour = now.getHours(); //返回日期中的小时数（0到23）
    var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
    var second = now.getSeconds(); //返回日期中的秒数（0到59）
    //一位要补零
    if (hour <= 9) {
      hour = "0" + hour;
    }
    if (minute <= 9) {
      minute = "0" + minute;
    }
    return hour + ":" + minute;
  },

  /**
   * 传入时间戳 获得星期几
   * @param {Object} time 时间戳
   */
  getToday(time) {
    return "星期" + "日一二三四五六".charAt(new Date(time).getDay());
  },
};
