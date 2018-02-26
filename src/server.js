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
//商品详情接口
http.get("/shupOn",function(req,res){
	var id = req.query.id;
	fs.readFile("./data/shop1.json","utf-8",function(err,data){
		if(err){
			res.send(err)
		}else{
			var arr = JSON.parse(data);
			for(var i=0;i<arr.length;i++){
				if(arr[i].shop_id == id){
					res.send(arr[i])
				}
			}
		}
	})
})
//邮箱验证接口
http.get("/emils",function(req,res){
	var emil = req.query.emil;
	var bol = false;
	fs.readFile("./data/youxiang.json","utf-8",function(err,data){
		if(err){
			res.send(err)
		}else{
			var arr = JSON.parse(data);
			for(var i=0;i<arr.length;i++){
				if(arr[i].emil == emil){
					bol = true;
					res.send("0");
					break;
				}
			}
			if(!bol){
				res.send("1");
			}
		}
	})
})
//邮箱注册事件
http.get("/zhuce",function(req,res){
	var obj = req.query;
	obj.id = (new Date()).getTime();
	fs.readFile("./data/youxiang.json","utf-8",function(err,data){
		if(err){
			res.send(err)
		}else{
			var arr = JSON.parse(data);
			arr.push(obj);
			fs.writeFile("./data/youxiang.json",JSON.stringify(arr),"utf-8",function(){
				res.send("1");
			})
		}
	})
})

//登录事件
http.get("/denglu",function(req,res){
	var emil = req.query.emil;
	var pass = req.query.pass;
	var bol = false;
	fs.readFile("./data/youxiang.json","utf-8",function(err,data){
		if(err){
			res.send(err)
		}else{
			var arr = JSON.parse(data);
			for(var i=0;i<arr.length;i++){
				if(arr[i].emil == emil&&arr[i].pass == pass){
					bol = true;
					res.send("0");
					break;
				}
			}
			if(!bol){
				res.send("1");
			}
		}
	})
})











http.get("/html/shop.html/:id",function(req,res){
	console.log(req.params["id"])
	res.sendFile(__dirname+"/html/shop.html")
})




http.all("*",function(req,res){
	res.sendFile(__dirname + req.url)
})