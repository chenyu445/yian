const express = require('express');
const path = require('path');
var app = express(); // 实例express框架
var router = express.Router();
console.log('__dirname', path.join(__dirname, '../'));
var base = path.join(__dirname, '../');
router.all('/', function (req, res, next) {
    res.sendfile(path.join(base, 'dist', 'index.html'));
});
app.use(express.static(path.join(base, 'dist')));
// app.use(express.static('../dist/dist'));

// app.use(express.static(path.join(__dirname, '/views')));

// 监听3000端口
app.listen(3000, () => {
    console.log('listen 127.0.0.1:3000');
});
