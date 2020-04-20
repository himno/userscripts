// ==UserScript==
// @name        惠惠网直接签到
// @namespace   www.himno.com
// @include     http://www.huihui.cn/
// @version     1
// @grant       none
// ==/UserScript==

// 请求： POST http://www.huihui.cn/checkin/gift
// 响应： {status: "succ", message: "", data: {message: "", num: "3"}}
// $('#banner [node-type="signInBtn"]').html('已抽奖').data('num', parseInt(s.data.num));
// 提示内容selectot      'lottery div.lottery-unit-' + data.num + ' textarea'
/* 模板
<script type="text/html" id="tmpl-lottery-dialog">
<div id="lottery" node-type="mod" data-url="/checkin/gift">

    <div class="lottery-wrap dialog" style="background-image:url(https://shared.ydstatic.com/fanxian/6.1.10/images/minisite/zhuanpan/bg.png)">
        <a href="javascript:;" class="close" style="background-image:url(https://shared.ydstatic.com/fanxian/6.1.10/images/minisite/zhuanpan/close.png)"></a>
          <div class="tips">
             <span class="msg" node-type="tips">
                 <span class="sign">*</span>
             动动小手积分就到手，快来试试今天的手气吧！
             </span>
          </div>
        <div class="lottery-ctn">
                        <div class="lottery-unit lottery-unit-0">
                <img src="http://oimagec5.ydstatic.com/image?id=-3790359752042621398&product=gouwu">
                <div class="mask"></div><div class="mask2"></div>
                <textarea node-type="tips-txt" style="display:none;">
                    恭喜您！获得网易严选99减10优惠券，请前往<a href="http://www.huihui.cn/account/coupons/all" target="_blank" data-log="lottery.juan">惠惠网用户中心</a>领取>>
                </textarea>
            </div>
                        <div class="lottery-unit lottery-unit-1">
                <img src="http://oimageb5.ydstatic.com/image?id=-7235548759552755232&product=gouwu">
                <div class="mask"></div><div class="mask2"></div>
                <textarea node-type="tips-txt" style="display:none;">
                    恭喜您！获得网易考拉45元礼包，请前往<a href="http://www.huihui.cn/account/coupons/all" target="_blank" data-log="lottery.juan">惠惠网用户中心</a>领取>>
                </textarea>
            </div>
                        <div class="lottery-unit lottery-unit-2">
                <img src="http://oimageb6.ydstatic.com/image?id=3629249232999085734&product=gouwu">
                <div class="mask"></div><div class="mask2"></div>
                <textarea node-type="tips-txt" style="display:none;">
                    恭喜您！获得惠惠2积分，请前往<a href="http://www.huihui.cn/account/jifen" target="_blank" data-log="lottery.juan">惠惠网用户中心</a>查看>>
                </textarea>
            </div>
                        <div class="lottery-unit lottery-unit-3">
                <img src="http://oimageb6.ydstatic.com/image?id=8363435593618001347&product=gouwu">
                <div class="mask"></div><div class="mask2"></div>
                <textarea node-type="tips-txt" style="display:none;">
                    恭喜您！获得惠惠15积分，请前往<a href="http://www.huihui.cn/account/jifen" target="_blank" data-log="lottery.juan">惠惠网用户中心</a>查看>>
                </textarea>
            </div>
                        <div class="lottery-unit lottery-unit-4">
                <img src="http://oimageb6.ydstatic.com/image?id=-3305120914896131306&product=gouwu">
                <div class="mask"></div><div class="mask2"></div>
                <textarea node-type="tips-txt" style="display:none;">
                    恭喜您！获得惠惠10积分，请前往<a href="http://www.huihui.cn/account/jifen" target="_blank" data-log="lottery.juan">惠惠网用户中心</a>查看>>
                </textarea>
            </div>
                        <div class="lottery-unit lottery-unit-5">
                <img src="http://oimagec6.ydstatic.com/image?id=8694596060289377241&product=gouwu">
                <div class="mask"></div><div class="mask2"></div>
                <textarea node-type="tips-txt" style="display:none;">
                    恭喜您！获得一键海淘运费5元券，请前往<a href="http://www.huihui.cn/account/discount_code/unused" target="_blank" data-log="lottery.juan">惠惠网用户中心</a>领取>>
                </textarea>
            </div>
                        <div class="lottery-unit lottery-unit-6">
                <img src="http://oimageb5.ydstatic.com/image?id=-4564022899002700138&product=gouwu">
                <div class="mask"></div><div class="mask2"></div>
                <textarea node-type="tips-txt" style="display:none;">
                    恭喜您！获得一键海淘服务费7折券，请前往<a href="http://www.huihui.cn/account/discount_code/unused" target="_blank" data-log="lottery.juan">惠惠网用户中心</a>领取>>
                </textarea>
            </div>
                        <div class="lottery-unit lottery-unit-7">
                <img src="http://oimageb5.ydstatic.com/image?id=3338120265427250238&product=gouwu">
                <div class="mask"></div><div class="mask2"></div>
                <textarea node-type="tips-txt" style="display:none;">
                    恭喜您！获得惠惠20积分，请前往<a href="http://www.huihui.cn/account/jifen" target="_blank" data-log="lottery.juan">惠惠网用户中心</a>查看>>
                </textarea>
            </div>
                        <div class="lottery-btn">
                 <a href="javascript:;" class="btn" style="background-image:url(https://shared.ydstatic.com/fanxian/6.1.10/images/minisite/zhuanpan/over.png)"></a>

            </div>
        </div>
    </div>
</div>
</script>
*/


if ($('#g-header .top-login').length > 0) {
    location.href = 'http://www.huihui.cn/login?url=http://www.huihui.cn';
    return;
    
}
const signInBtn = $('#banner [node-type="signInBtn"]');



// 检查是否已经签到
if(signInBtn.attr('data-num').length > 0) {
	return;
}

const dialogHTML = $('#tmpl-lottery-dialog').html();

console.log('Auto Checkin');
signInBtn.html('签到中...');

const doSign = function() {
	$.ajax({
		url: 'http://www.huihui.cn/checkin/gift',
		type: 'POST',
		dataType: 'json',
		success(s) {
			if(s.status === 'succ') {
				signInBtn.html('已抽奖').data('num', parseInt(s.data.num));
				//const regex = /<div class="lottery-unit lottery-unit-1"[\s\S]+?<textarea[\s\S]+?！(.+?)，请前往/m;
				const regexStr = `<div class="lottery-unit lottery-unit-${s.data.num}"[^]+?<textarea[^]+?！(.+?)，请前往`;
				const regex = new RegExp(regexStr, 'm');
				const matches = regex.exec(dialogHTML);
				alert(matches[1]);
				return false;
			}
		}
	});	
};

doSign();