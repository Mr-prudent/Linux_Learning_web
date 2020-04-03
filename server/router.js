//路由
const url = require('url');
const controller = require('./controller');
module.exports = {
    start:function (server) {
        server.on('request',(req,res)=>{
            var urls = url.parse(req.url,true);
            if (urls.pathname === '/'){
                controller.index(req,res);
            }
            else if(urls.pathname === '/check'){
                controller.check(req,res);
            }
            else if(urls.pathname === '/login'){
                controller.login(req,res);
            }
            else if (urls.pathname === '/addUser'){
                controller.addUser(req,res);
            }
            else if (urls.pathname === '/file'){
                controller.file(req,res);
            }
            else if (urls.pathname === '/message'){
                controller.message(req,res);
            }
            else {
                controller.other(req,res);
            }
        });
    }
};
