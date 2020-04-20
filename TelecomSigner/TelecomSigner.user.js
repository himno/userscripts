// ==UserScript==
// @name        欢Go签到移动到首页
// @namespace   www.himno.com
// @include     https://www.189.cn/dqmh/my189/initMy189home.do
// @require     https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require     https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @version     1.0.0.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({
	url: 'https://m.sc.189.cn/handlecloud-page/point/index01.html',
	
});

$('.my_set').after('<a id="ttt_sign" href="javascript:void(0);">签到</a>');
const signButton = $('#ttt_sign');

const ajax = function (req, url, callback) {
	/*
	$.ajax({
		url: 'https://m.sc.189.cn/handlecloud/' + url ,
		type:'POST',
		datatype:'jsonp',
		contentType:'application/json',
		data: JSON.stringify(req),
		success:function(res){
		    callback(res);
		}
	});
	*/
	GM_xmlhttpRequest({
		url: 'https://m.sc.189.cn/handlecloud/' + url,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		responseType: 'json',
		data: JSON.stringify(req),
		onload(res) {
			callback(res.responseText);
		}
	});
};

const req = {
        head: {},
        body: {
        	
          
        }
      };


signButton.on('click', () => {
	ajax(req, 'point/isljfToday', (e) => {
		console.info(e);
	});
});