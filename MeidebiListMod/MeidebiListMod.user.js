// ==UserScript==
// @name		没得比商品列表修正
// @namespace	www.himno.com
// @match		https://www.meidebi.com/tagpy/baicaijia?*
// @downloadURL	http://localhost:10086/shared/MeidebiListMod/MeidebiListMod.user.js
// @version		1.0.0.15
// @grant		none
// ==/UserScript==


const autoLoadNext = function () {
	
};

const goodsList = document.querySelector('.share-list');

const foot = document.querySelector('.h-pages > div');

if (foot.children.length > 0) {

	const urlSearchParams = new URLSearchParams(location.search);

	const urlBase = location.origin + location.pathname;


	/*document.addEventListener('scroll', function () {
	    console.log('document滚动触发，document.scrollTop是：' + this.documentElement.scrollTop + ',窗口高度' + this.documentElement.scrollHeight);
	    if (this.documentElement.scrollTop + window.innerHeight > this.documentElement.scrollHeight - 400) {
		    console.log('到底部了');
	    }
	});
	*/



	const pages = foot.querySelectorAll('a.num');

	for (let i = 0; i < pages.length; i++) {
		const page = pages[i];
		urlSearchParams.set('p', page.textContent.trim());
		pages[i].setAttribute('href', location.pathname + '?' + urlSearchParams.toString());
	}

	// 获取当前页码
	const currentPageIndex = parseInt(foot.querySelector('.current').textContent.trim());

	// 下一页
	const nextPage = foot.querySelector('.next');
	if (nextPage) {
		urlSearchParams.set('p', currentPageIndex + 1);
		nextPage.setAttribute('href', location.pathname + '?' + urlSearchParams.toString());
	}

	// 上一页
	const prevPage = foot.querySelector('.prev');
	if (prevPage) {
		urlSearchParams.set('p', currentPageIndex - 1);
		prevPage.setAttribute('href', location.pathname + '?' + urlSearchParams.toString());
	}


	
}
