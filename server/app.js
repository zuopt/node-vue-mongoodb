//文件下载
var thumb = 'https://data-1252702142.cos.ap-beijing.myqcloud.com/dms/EnergyBureau/carInfo.tar.gz';
var fs = require("fs");
var path = require("path");
var request = require("request");
var compressing = require("compressing");
// var proccess = require('process')

//创建文件夹目录
var dirPath = path.join('D://NYJDATA//203');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log("文件夹创建成功");
} else {
  console.log("准备下载中~");
}
let i = 0;
setInterval(() => {
  i++;
  let url = thumb;
  let fileName = url.split('/').pop();
  let stream = fs.createWriteStream(path.join(dirPath, fileName));
  request(url).pipe(stream).on("close", function (err) {
    let nowFilePath = dirPath + '\\' + fileName //当前目录下解压的文件名
    console.log(nowFilePath);
    let positionFilePath = dirPath//需要解压到当前目录下的目录名
    console.log("第" + i + "次文件[" + fileName + "]下载完毕");
    compressing.tgz.uncompress(nowFilePath, positionFilePath)
      .then(() => {
        console.log(nowFilePath + "解压完成")
      })
      .catch(err => {
        console.log("解压失败：" + err);
      })
  });
}, 10000)




