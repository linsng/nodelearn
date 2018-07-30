// file system in node js


var fs = require('fs');


// 异步写文件
var data = 'Hello, Node js';
data = Buffer.from(data, 'utf-8');
console.log(data);
fs.writeFile('output.txt', data, function(error) {
    if(error) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
// 同步写文件
fs.writeFileSync('output2.txt', data);

// 异步读文件  文件必须在当前目录下，且文件编码为utf-8
fs.readFile('output.txt', 'utf-8', function(err, data){
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

// 同步读文件
var data = fs.readFileSync('output.txt', 'utf-8');
console.log(data);

// 获取文件或目录详细信息
fs.stat('output.txt', function(err, stat) {
    if(err) {
        console.log(err);
    } else {
        // 是否是文件
        console.log('isFile: ' + stat.isFile());
        // 是否是目录
        console.log('isDirectory: ' + stat.isDirectory());
        if(stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('create time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
})