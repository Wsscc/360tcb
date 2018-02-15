var express = require("express");
var fs = require("fs");
var http = express();
http.listen(8080,function(){
	console.log("服务已开启")
})
http.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	next();
})
http.all("*",function(req,res){
	res.sendFile(__dirname + req.url)
})