//服务器模块
const router = require('./router');
const http = require('http');
const server = http.createServer();



server.listen(8080,()=>{
    console.log('服务启动，请访问:127.0.0.1:8080');
});
router.start(server);

