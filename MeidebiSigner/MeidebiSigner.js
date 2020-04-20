// ==UserScript==
// @name        没得比签到
// @namespace   www.himno.com
// @description 直接签到
// @include     https://www.meidebi.com/
// @require		http://cdn.bootcss.com/jquery/2.2.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

(function ($) {
	$('span[data-popup=checkin]').after('<span id="checkinBtn2" class="link orange"><i class="f-icon icon-sign"></i>每日一签</span>').remove();
	let checkin = $('#checkinBtn2');
    
    

	let doSign = function() {
		if(checkin.html() == '签到中...') {
			return;
		}
        //console.log($('#login-state a:first').text());
        if($('#login-state a:first').text().trim() === '请登录') {
            location.href = 'https://login.meidebi.com/';
            return;
        }
		checkin.html('签到中...');

		// 响应
		// jQuery1800232608705194289_1461330276457({"data":1,"info":"\u7b7e\u5230\u6210\u529f","status":1});
		$.get('https://www.meidebi.com/Sign/dosign.html', function (data) {
			//alert(data.info);
			if(data.status == 0) {
				checkin.html('<i class="f-icon icon-sign"></i>' + data.info);
				//checkin.addClass('checked');
				checkin.off('click');
            }
            else if(data.status == 0) {
                checkin.html('<i class="f-icon icon-sign"></i>' + data.info);
                checkin.off('click');
			} else {
				checkin.html('<i class="f-icon icon-sign"></i>' + data.info);
			}
			
		},
		'json');
	};

	checkin.on('click', doSign);
})(window.$);