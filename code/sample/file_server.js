
// 实现一个文件服务器, 当url是目录时(http://localhost:8080/code/sample/html)，访问index.html文件，
// 当url是文件时(http://localhost:8080/code/sample/html/index.html)，直接访问

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
// 输出404
var out_404 = function(request, response) {
    console.log('404 ' + request.url);
    // 发送404响应:
    response.writeHead(404);
    response.end('404 Not Found');
}
// 返回正确结果
var out_result = function(request, response, data) {
    console.log('200 ' + request.url)
    response.writeHead(200, {'Content-Type': 'text/html'});
    // fs.createReadStream(filePath).pipe(response);
    response.write(data);
    response.end();
}

// 从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);
// 创建服务器:
var server = http.createServer(function(request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件夹路径，类似 '/srv/www/css/':
    var dirPath = path.join(root, pathname);
    var filePath;
    // 获取文件状态:
    fs.stat(dirPath, function(err, stat) {
        // 读取文件或文件夹成功
        if(!err) {
            // 判断是否是目录
            if(stat.isDirectory()) {
                // 查找index.html
                filePath = path.join(dirPath, 'index.html');
                console.log(filePath);
                fs.readFile(filePath, 'utf-8', function(err, data) {
                    if(!err){
                        // 没有出错并且文件存在:
                        out_result(request, response, data);
                    } else {
                        out_404(request, response);
                    }
                });
            }else { // 直接读取文件
                filePath = path.join(dirPath);
                console.log(filePath);
                fs.readFile(filePath, 'utf-8', function(err_file, data_file){
                    if(!err_file){
                        // 没有出错并且文件存在:
                        out_result(request, response, data_file);
                    } else {
                        out_404(request, response);
                    }
                })
            }
        }  else {
            // 出错了或者文件不存在:
            out_404(request, response);
        }
    });
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');