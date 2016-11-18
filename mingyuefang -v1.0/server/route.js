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
    //var myurl = url.parse(req.url,true).query;
    var myurl = path.query;
    //console.log(myurl);
    // 跨域处理
    http.get(myurl.myUrl,function(req){
        req.on("data",function(chunk){
            getData+=chunk;
        });
        req.on("end",function(){
            var str = myurl.callback +"("+JSON.stringify(getData)+")";
            res.end(str);
        });
    });

}).listen(8000,function(err){
    if(!err){
        console.log("server is running on 8000");
    }
});
