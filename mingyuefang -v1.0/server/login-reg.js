/**
 * Created by lx on 2016/11/12.
 */
/**
 * Created by lx on 2016/10/17.
 */


var http = require("http");
var url = require("url");
var fs=require("fs");
//var util = require('util');
var querystring = require("querystring");

http.createServer(function(req,res){
    var getData="";
    var path = {};
    path = url.parse(req.url, true);
    var myurl = path.query;
    //console.log("aaaa==="+path.pathname);
    //禁用
    if(path.pathname === "/favicon.ico" ){
        return;
    }

    //
    var reg = /\/api\/login/i;
    var reg2 = /\/api\/reg/i;
    var reg3 = /\/api\/comment/i;
    var reg4 = /\/api\/msg/i;
    var a = reg.test(path.pathname);
    var b = reg2.test(path.pathname);
    var c= reg3.test(path.pathname);
    var d= reg4.test(path.pathname);
    console.log("aaa=="+a);
    console.log("bbb=="+b);
    console.log("ccc=="+c);
    console.log("ccc=="+d);
    //  登录处理
    if(a){
        console.log("login");
        var login_data="";
        req.on("data",function(chunk){
            login_data+=chunk;
        });
        req.on("end",function(err){
            if(err){
                console.log(err.stack);
            }else {

                //读取用户信息
                var users=[];
                var resinfo="用户不存在";
                fs.readFile("./db/db.txt",function(err,data){
                    if(!err){
                        users=data.toString().match(/\{"user":".*?","psd":".*?"\}/ig);
                        //console.log(users);
                        for(var x in users){
                            //console.log("1111111111");
                            //console.log(users[x]);
                            //console.log("22222222222");
                            //console.log(login_data);
                            if(users[x] == login_data){
                                resinfo="用户存在";
                                res.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':"*"},{"Access-Control-Allow-Methods":"POST"},{"Access-Control-Allow-Headers":"x-requested-with,content-type"});
                                res.end(login_data);
                            }
                        }
                    }
                });
            }
        });
    }
    //注册处理
    if(b){
        var reg_data="";
        req.on("data",function(chunk){
            reg_data+=chunk;
        });
        req.on("end",function(err){
            if(err){
                console.log(err.stack);
            }else {
                res.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':"*"},{"Access-Control-Allow-Methods":"POST"},{"Access-Control-Allow-Headers":"x-requested-with,content-type"});
                res.end(reg_data);
                console.log(reg_data);
                reg_data=","+reg_data;
                fs.appendFile("./db/db.txt",reg_data,function(err){
                    if(err){
                        console.log("注册信息追加出错。");
                    }else {
                        console.log("信息追加成功。");
                    }
                });
            }
        });
    }


    //  评论处理
    if(c){
        console.log("comment");
        var comment_data="";
        req.on("data",function(chunk){
            comment_data+=chunk;
        });
        req.on("end",function(err){
            if(err){
                console.log(err.stack);
            }else {
                //读取评论信息
                fs.readFile("./db/comment.json",function(err,data){
                    if(!err){
                        //console.log(JSON.parse(data));
                        ////获取评论所在新闻的id
                        var index = JSON.parse(comment_data).id;
                        ////读取该id所在的所有评论，
                        var getdata = JSON.parse(comment_data);
                        var newcomment={
                            name:getdata.name,
                            time:getdata.time,
                            contence:getdata.contence,
                            imgsrc:getdata.imgsrc
                        };
                        //和当前的评论拼接
                       var catcom= JSON.parse(data).commentinfo[index].info.concat(newcomment);

                        //成一个新的评论对象
                        var sigobj={
                            id:index,
                            info:catcom
                        };
                        //创建一个新的评论对象集合
                        var getarray=[];
                        JSON.parse(data).commentinfo.forEach(function(v,i){
                            if(i==index){
                                getarray.push(sigobj);
                            }else{
                                getarray.push(v);
                            }
                        });
                        var obj={
                            commentinfo:getarray
                        };
                        //console.log(getarray);
                        //console.log(obj);
                        obj=JSON.stringify(obj);
                        //重新写入json文件
                        fs.writeFile("./db/comment.json",obj,function(err){
                            if(!err){
                                console.log("写入成功");
                                res.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':"*"},{"Access-Control-Allow-Methods":"POST"},{"Access-Control-Allow-Headers":"x-requested-with,content-type"});
                                res.end("1");
                            }else{
                                res.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':"*"},{"Access-Control-Allow-Methods":"POST"},{"Access-Control-Allow-Headers":"x-requested-with,content-type"});
                                res.end("-1");
                            }
                        });

                    }
                });
            }
        });
    }
    //用户提交留言信息处理
    if(d){
        console.log("msg");
        var msg_data="";
        req.on("data",function(chunk){
            msg_data+=chunk;
        });
        req.on("end",function(err){
            if(err){
                console.log(err.stack);
            }else {
                //读取用户留言信息
                fs.readFile("./db/userinfo.json",function(err,data){
                    if(!err){
                        var currentdata=JSON.parse(data).info;
                        //当前信息和原有信息拼接
                         var newdata= currentdata.concat(JSON.parse(msg_data));
                        //console.log(newdata);
                        //创建一个新的对象
                        var infoobj={
                            info:newdata
                        };
                        //转化成json字符串格式，并读入json数据文件中
                        infoobj=JSON.stringify(infoobj);
                        fs.writeFile("./db/userinfo.json",infoobj,function(err){
                            if(!err){
                                console.log(JSON.parse(infoobj));
                                res.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':"*"},{"Access-Control-Allow-Methods":"POST"},{"Access-Control-Allow-Headers":"x-requested-with,content-type"});
                                res.end("1");
                            }else{
                                res.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':"*"},{"Access-Control-Allow-Methods":"POST"},{"Access-Control-Allow-Headers":"x-requested-with,content-type"});
                                res.end("-1");
                            }
                        });

                    }
                });//读取用户留言信息
            }
        });
    }
}).listen(8888,function(err){
    if(!err){
        console.log("server is running on 8888");
    }
});
