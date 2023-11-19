//文件下载
var thumb = 'https://sanyevi-1252702142.cos.ap-beijing.myqcloud.com/dmsapp/00-101-updateFile.tar.gz';
var fs = require("fs");
var path = require("path");
var request = require("request");
var proccess = require('process')
// var unzip = require("unzip");

//创建文件夹目录
var dirPath = path.join(proccess.cwd(), "file");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log("文件夹创建成功");
} else {
  console.log("文件夹已存在");
}
let i = 0;
setInterval(() => {
  i++;
  let url = thumb;
  let fileName = url.split('/').pop();
  let stream = fs.createWriteStream(path.join(dirPath, fileName));
  request(url).pipe(stream).on("close", function (err) {
    // fs.createReadStream('C://Users//test//Desktop//file//apache-tomcat-8.5.38.zip').pipe(unzip.Extract({ path: 'C://Users//test//Desktop//file' }));
    console.log("第" + i + "次文件[" + fileName + "]下载完毕");
  });
}, 10000)