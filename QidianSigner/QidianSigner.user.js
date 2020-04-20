// ==UserScript==
// @name        起点自动领经验
// @namespace   www.himno.com
// @include     https://my.qidian.com/level*
// @require     https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require     https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @version     1.0.0.1
// @grant       none
// ==/UserScript==

const signButton = $('.elGetExp');
const token = $.cookie('_csrfToken');


const getExp = function (num) {
	$.ajax({
		url: "/ajax/Score/Receive",
	    data: {
	    	referObject: num,
			_csrfToken: token
	    },
	    success(result) {
		    if(result && result.code == 0) {	// 成功
		    	setTimeout('location.reload()', 500);
	    	}
	    	else {
		    	console.log('失败');
	    	}
	    }
	});
};

if(signButton.length > 0) {
	const num = parseInt(signButton.data('num'));
	//const vip = signButton.data('vip');
	//const nextButton = signButton.parent().next()
	getExp(num);
}
else {		// 未到可领取的时间
	const currentButton = $('.elIsCurrent');
	if(currentButton.length > 0) {
		const timeleft = parseInt(currentButton.data('timeleft'));
		setTimeout('location.reload()', timeleft * 1000);
	}
}

/*
function() {
  var elBtn = $(this);
  var num = parseInt(elBtn.data("num"));
  var vip = elBtn.attr("data-vip");
  var elNext = elBtn.parent().next().find("a");
  var timeLeft = elNext.attr("data-timeLeft");
  $.ajax({
    url: "/ajax/Score/Receive",
    data: {
      referObject: num
    },
    success: function(json) {
      $.ajaxSuccess(json, function() {
        $.lightTip.success("成功领取");
        setTimeout(function() {
          location.reload();
        }, 500);
        if (num == 6 && vip == 0) {
          return;
        }
        elNext.addClass("ui-button ui-button-small").removeClass("award-task-strong");
        var timer = setInterval(function() {
          timeLeft = timeLeft - 1;
          var timeStr = self.initTimeCount(timeLeft);
          elNext.html(timeStr[0] + ":" + timeStr[1]);
          if (timeStr[0] == 0 && timeStr[1] == 0) {
            clearInterval(timer);
            elNext.html("领取").addClass("elGetExp");
          }
        }, 1e3);
      });
    }
  });
}
*/