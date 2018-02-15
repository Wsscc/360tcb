$("#GB").click(function(){
	$("#city").css("display","none");
})
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
