// ==UserScript==
// @name       获取煎蛋图片列表
// @namespace  http://jimbray.org
// @version    0.1
// @description  enter something useful
// @match      http://jandan.net/pic
// @match      http://jandan.net/pic/*
// @copyright  2014+, Jimbray
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// ==/UserScript==

//alert($(".imgs").length);

var datas = [];

var imgs_list = $(".imgs");
var img_list_size = imgs_list.length;

for(var i = 0 ; i < img_list_size; i++) {
	var data = {};
	data["src"] = $(imgs_list[i]).attr("src");
	datas.push(data);
}


//var json = $.toJSON(datas);
var jsonString = JSON.stringify(datas);
var epc = eval("("+jsonString+")");  

alert(jsonString);
