//城市列表关闭事件
$("#GB").click(function(){
	$("#city").css("display","none");
})
//点击切换城市按钮事件
var hotCity;
var cityList;
function gitCity(){
	$("#city").css("display","block");
	$.get("http://localhost:8080/data/city.json",function(res){
		var cityObj = res.result;
		hotCity = cityObj.hotcity;
		cityList = cityObj.citylist;
		$("#hotCity").html(baidu.template("hotCityIn",{hotCity:hotCity}))
		$("#citylistTop").html(baidu.template("templist",{obj:cityList}))
		changeCity("A")
	})
}
function changeCity(key){
	var city = cityList[key];
	$("#citylistB").html(baidu.template("tempCity",{city:city}));
}
function chengshi(city){
	$("#citySS").html(city);
	$("#city").css("display","none");
}



//注册按钮点击事件
$("#zhezhao").click(function(){
	$("#mask").css("display","block");
	$("#zhuce").css("display","block");
	$("#dl").css("display","none");
})

$("#zhuce h6").click(function(){
	$("#mask").css("display","block");
	$("#dl").css("display","block");
	$("#zhuce").css("display","none");
})

$("#denglu").click(function(){
	$("#mask").css("display","block");
	$("#dl").css("display","block");
	$("#zhuce").css("display","none");
})
$("#dl h6").click(function(){
	$("#mask").css("display","block");
	$("#dl").css("display","none");
	$("#zhuce").css("display","block");
})


//划过修1事件
	$.get("http://localhost:8080/data/xiu1.json",function(res){
		var xiuObj = res.result;
		$("#li1").html(baidu.template("tempxiu1",{xiuObj:xiuObj}))
	})
//划过修2事件
	$.get("http://localhost:8080/data/xiu2.json",function(res){
		var xiuObj = res.result;
		$("#xiu2R").html(baidu.template("tempxiu2",{xiuObj:xiuObj}))
	})
//划过修3事件
	$.get("http://localhost:8080/data/xiu3.json",function(res){
		var xiuObj = res.result;
		$("#li3").html(baidu.template("tempxiu3",{xiuObj:xiuObj}))
	})
//划过修4事件
	$.get("http://localhost:8080/data/xiu4.json",function(res){
		var xiuObj = res.result;
		$("#li4").html(baidu.template("tempxiu4",{xiuObj:xiuObj}))
})
//热门手机回收
$.get("http://localhost:8080/data/shoujihuishou.json",function(res){
	var sjObj = res.result;
	$("#hotPhone .hotPhoneB").html(baidu.template("tempPhone",{sjObj:sjObj}))
})
//优品精选
$.get("http://localhost:8080/data/youpinjingxuan.json",function(res){
	var sjObj = res.result;
	$("#hotPhone .UP").html(baidu.template("tempUP",{sjObj:sjObj}))
})
//商品信息
$.get("http://localhost:8080/data/shop1.json",function(res){
	var shopObj = res;
	$("#shopBox").html(baidu.template("tempShop",{shopObj:shopObj}))
})
//分页
//var pagePlugin = new PagePlugin({
//	container:document.querySelector("#warp"),
//	contentCount:100,
//	showContentCount:5,
//	showPageCount:9,
//	activeStyle:"#FC6621",
//	
//})
//PagePlugin.init();
//商品好评榜
$.get("http://localhost:8080/data/shop5.json",function(res){
	console.log(res)
	var shopObj = res.shop_data;
	$("#shopRight ul").html(baidu.template("tempGoodShop",{shopObj:shopObj}))
})
//进入店铺函数封装
function shopOn(id){
	window.open("http://localhost:8080/html/shop.html/"+id);
}

//邮箱验证
$("#emil").blur(function(){
	var emil = $("#emil").val();
	console.log(emil)
	$.get("http://localhost:8080/emils",{emil:emil},function(res){
		if(res == 1){
			$("#cuo").css("display","none");
			$("#dui").css("display","block");
			$("#emilzc").removeAttr("disabled");
		}else{
			$("#dui").css("display","none");
			$("#cuo").css("display","block");
			$("#emilzc").attr({"disabled":"disabled"});
		}
	})
})
//邮箱关闭事件
$("#youxianggb").click(function(){
		$("#mask").css("display","none");
		$("#zhuce").css("display","none");
		$("#dl").css("display","none");
})
$("#dlgb").click(function(){
		$("#mask").css("display","none");
		$("#zhuce").css("display","none");
		$("#dl").css("display","none");
})
//密码验证
$("#emilps").blur(function(){
	var pass = $("#emilps").val();
	if(pass.length<6){
		alert("密码长度不小于6位")
	}
})
//注册按钮点击事件
$("#emilzc").click(function(){
	var emil = $("#emil").val();
	var pass = $("#emilps").val();
	if(emil.length<8||pass.length<6){
		alert("请输入正确邮箱或密码");
		return ;
	}else{
		$.get("http://localhost:8080/zhuce",{emil:emil,pass:pass},function(res){
			if(res == 1){
				$("#mask").css("display","none");
				$("#zhuce").css("display","none");
				$("#dl").css("display","none");
				alert("注册成功");
			}
		})
		
	}
})
//登录按钮点击事件
$("#emildl").click(function(){
	var emil = $("#user").val();
	var pass = $("#pass").val();
	$.get("http://localhost:8080/denglu",{emil:emil,pass:pass},function(res){
		if(res == 0){
			$("#mask").css("display","none");
			$("#zhuce").css("display","none");
			$("#dl").css("display","none");
			alert("登录成功");
		}else{
			alert("账号或密码错误");
		}
	})
})
