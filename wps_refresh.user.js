// ==UserScript==
// @name       WPS
// @namespace  http://jimbray.org
// @version    0.1
// @description  enter something useful
// @match      http://t.wondershare.cn/dashboard
// @copyright  2014+, Jimbray
// ==/UserScript==

var list = $(".textarea-wrap textarea")

$(".feed-navigation").append("<li id='my_date'></li>");
var timeLen = 500;
var date = new Date();

window.my_time ='';

var timer = setInterval(function(){
	var date = new Date();
    var year = date.getFullYear();
	var month = date.getMonth() + 1;
    var time_date = date.getDate();
	var localTime = date.toLocaleTimeString();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    
    if(hour < 10) {
    	hour = "0" + hour;
    }
    
    if(minute < 10) {
    	minute = "0" + minute;
    }
    
    if(seconds < 10) {
    	seconds = "0" + seconds;
    }
    
    my_time = year + "��" + month + "��" + time_date + "�� " + hour + ":" + minute + ":" + seconds;
    
    $("#my_date").html("<li id='my_date'>" + my_time + "</li>");
	$(list[0]).val("#����ʮ������� �����Ǳ���ʱ�䣺" + my_time);
    if(minute === "00" ){
		$(".post-btn span").html("���˸�00��");
		$(".post-btn").click();
    }
    if(minute === "15" ){
		$(".post-btn span").html("���˸�15��");
		$(".post-btn").click();
    }
    
    if(minute === "30" ){
		$(".post-btn span").html("���˸�30��");
		$(".post-btn").click();
    }
    
    if(minute === "45" ){
		$(".post-btn span").html("���˸�45��");
		$(".post-btn").click();
    }
    
},timeLen);
