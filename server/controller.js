//业务处理
const fs = require('fs');
const mysql = require('mysql');
const formidable = require('formidable');
const template = require('art-template');
const moment = require('moment');
template.defaults.root = './';
var userNum = 23;
module.exports = {
    index:(req,res)=>{
                res.setHeader('content-type',
                    'text/html;charset=utf-8');
                fs.readFile('./index.html','utf8',
                            (err,htmlData)=>{
                                if (!err){
                                    console.log('读取成功');

                                    res.end(htmlData);
                                }else {
                                    res.end('');
                                    console.log('读取错误！')
                                }
                         });
    },
    check:(req,res)=>{
                var d= '';
                req.on('data',function (post_data) {
                    d+=post_data;
                });
                req.on('end',function () {
                    // var obj = require('querystring').parse(d);
                    console.log(d);
                    //连接数据库，并判断是否有重名
                      const con = mysql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: '123456',
                        database: 'web'
                    });

                    con.connect((err)=>{
                        if (err){
                            console.log('err');
                        }else {
                            console.log('数据库连接成功');
                        }
                    });

                    var sql = "SELECT * from  user WHERE name= '"+ d+"'";
                    // var sql = "select * from user where name = 'xixi'";
                    con.query(sql,
                        (err,result,field)=>{
                            if (err){
                                console.log(err);
                            }else {
                                if (result[0]){
                                    res.end('1');
                                }else {
                                    res.end('0');
                                }
                            }
                        });
                    con.end();
                    console.log('数据库连接断开')
                });

    },
    addUser:(req,res)=>{
        var form = new formidable.IncomingForm();
        form.parse(req,function (err,field,file) {
            let username = field.username;
            let jiaose = field.jiaose;
            let password = field.password;
            console.log(username,jiaose,password);
            const con = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                database: 'web'
            });

            con.connect((err)=>{
                if (err){
                    console.log('err');
                }else {
                    console.log('数据库连接');
                }
            });
            var selectId = 'select id from user order by id DESC limit 1';
            con.query(selectId,
                (err,result,field)=>{
                    if (err){
                        console.log(err);
                    }else {
                        userNum=parseInt(result[0].id)+1;
                        console.log(userNum);
                        var  addSql = `INSERT INTO user(id,name,password,jiaose) VALUES('${userNum}','${username}','${password}','${jiaose}');`;
                        con.query(addSql,
                            (err,result,field)=>{
                                if (err){
                                    console.log(err);
                                }else {
                                    console.log('添加成功');
                                }
                            });
                        con.end();
                    }
                });
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<script>alert("注册完成，请登录");location.href="/"</script>');
        });
    },
    login:(req,res)=>{
        var form = new formidable.IncomingForm();
        form.parse(req,function (err,field,file) {
            let username = field.username;
            let password = field.password;
            const con = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                database: 'web'
            });
            con.connect((err)=>{
                if (err){
                    console.log('err');
                }else {
                    console.log('数据库连接');
                }
            });
            var checkSql = `select name,password from user where name = "${username}"`;
            con.query(checkSql,
                (err,result,field)=>{
                    if (err){
                        console.log(err);
                    }else {
                        if (password == result[0].password){
                            console.log('验证正确');
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

                            var userInfo = {
                                name:username
                            };
                            // res.end('<script>alert("登录成功！");location.href="Learn/student_index.html"</script>');
                            var htmls = template('Learn/student_index.html',
                                {data:userInfo});
                            console.log(userInfo);
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<script>alert("登录成功")</script>');
                            res.end(htmls);
                            con.end();
                        }
                        else {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end('<script>alert("验证错误，请重新登录");location.href="/"</script>');
                            con.end();
                        }
                    }
                });
        })
    },
    other:(req,res)=>{
        var surl = '.'+req.url;
        fs.readFile('.'+req.url,
            (err,data)=>{
                if (!err){
                    var type = surl.substr(surl.lastIndexOf(".")+1,surl.length)
                    res.writeHead(200,{'Content-type':"text/"+type});
                    res.end(data);
                }else {
                    res.end('');
                }
            });
    },
    file:(req,res)=>{
        if (req.method == 'GET'){
            function formatBytes(bytes, decimals = 2) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }
            var files = fs.readdirSync('./download');
            var file_arr = [];
            files.forEach(function(item,index){
                let stat = fs.statSync('./download/'+item);
                if(!stat.isDirectory()){
                    let file_obj = {
                        name:item,
                        size:formatBytes(stat.size),
                        mtime:moment(stat.mtime).format('YYYY-MM-DD HH:mm:ss'),
                        ctime:moment(stat.ctime).format('YYYY-MM-DD HH:mm:ss')
                    }
                    file_arr.push(file_obj);
                }else{
                    let dir_obj = {
                        name:item,
                        size:'-',
                        mtime:moment(stat.mtime).format('YYYY-MM-DD HH:mm:ss'),
                        ctime:moment(stat.ctime).format('YYYY-MM-DD HH:mm:ss'),
                        stat:stat
                    }
                    file_arr.unshift(dir_obj);
                }
            });
            var file_data = JSON.stringify(file_arr);
            res.end(file_data);
        }
        else if(req.method == 'POST'){
            var dir= '';
            req.on('data',function (post_data) {
                dir+=post_data;
            });
            req.on('end',function () {
                function formatBytes(bytes, decimals = 2) {
                    if (bytes === 0) return '0 Bytes';
                    const k = 1024;
                    const dm = decimals < 0 ? 0 : decimals;
                    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                    const i = Math.floor(Math.log(bytes) / Math.log(k));
                    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
                }
                var files = fs.readdirSync('./download/'+dir);
                var file_arr = [];
                files.forEach(function(item,index){
                    let stat = fs.statSync('./download/'+dir+'/'+item);
                    if(!stat.isDirectory()){
                        let file_obj = {
                            name:item,
                            size:formatBytes(stat.size),
                            mtime:moment(stat.mtime).format('YYYY-MM-DD HH:mm:ss'),
                            ctime:moment(stat.ctime).format('YYYY-MM-DD HH:mm:ss')
                        }
                        file_arr.push(file_obj);
                    }
                });
                var file_data = JSON.stringify(file_arr);
                res.end(file_data);
        });
        }
    },
    message:(req,res)=>{
        if (req.method == 'GET'){
            const con = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                database: 'web'
            });
            con.connect((err)=>{
                if (err){
                    console.log('err');
                }else {
                    console.log('数据库连接');
                }
            });
            let sql = 'select * from message ORDER BY add_date desc';
            con.query(sql,(err,result,field)=>{
                if (!err){
                    for (let i=0;i<result.length;i++){
                        result[i].add_date = moment(result[i].add_date).format('YYYY-MM-DD HH:mm:ss')
                    }
                    res.end(JSON.stringify(result));
                    con.end();
                }else {
                    console.log('err');
                }
            })
        }
        else if (req.method == 'POST'){

        }
    }
};


