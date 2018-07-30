// stream in node js

var fs = require('fs');
// 用流的方式读取, data事件表示流的数据已经可以读取了，end事件表示这个流已经到末尾了，没有数据可以读取了，error事件表示出错了
var rs = fs.createReadStream('output.txt', 'utf-8');

rs.on('data', function(chunk) {
    console.log('DATA:');
    console.log(chunk);
});

rs.on('end', function() {
    console.log('END');
})

rs.on('error', function(err) {
    console.log('ERROR: ' + err);
})

// 以流的形式写入文件
var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt', 'utf-8');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();

// pipe管道示例
var rs_from = fs.createReadStream('output1.txt', 'utf-8');
var ws_to = fs.createWriteStream('copied.txt', 'utf-8');
rs_from.pipe(ws_to);