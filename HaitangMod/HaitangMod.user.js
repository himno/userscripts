// ==UserScript==
// @name 海棠文学复制
// @namespace kk@libs.org
// @downloadURL http://localhost:10086/shared/HaitangMod/HaitangMod.user.js
// @match https://www.lovehtbooks.com/showpaperword*
// @grant GM_addStyle
// @grant GM_setClipboard
// @version 0.0.8
// ==/UserScript==

'use strict';

const css = `

    .floaty_container_fri {
        position: fixed;
        z-index: 99;
        top: 200px;
        right: 200px;
        z-index: 999999;
    }
}
`;

GM_addStyle(css);


// 复制正文内容
const copyContent = function () {
	$('#mypaper font').remove();

	let m = /\s-\s(.+)\s内容$/.exec($('#readpagewidth tr:first td:first').text());
	let title = '\t<h1>' + m[1] + '</h1>\n';
	let text = $('#mypaper').html().replace(/<br>/gm, '  ').trim().split(/\s+/).map(c => '\t<p>' + c + '</p>').join('\n');
	text = title + text + '\n';

	// 查找彩蛋
	const more = $('#mypaperp');
	if (more.children('font:first').text().length < 9) {
		let extra = $('#mypaperp').html().replace(/<br>/gm, '  ').trim().split(/\s+/).map(c => '\t<p>' + c + '</p>').join('\n');
		text = text + extra + '\n';
	}
    GM_setClipboard(text);
};

$(document.body).append('<button id="xxx_copy" class="floaty_container_fri data-tip-bottom" data-tip="将正文内容复制为适合制作epub的格式">复制正文</button>');
$('#xxx_copy').on('click', copyContent);
