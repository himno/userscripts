// ==UserScript==
// @name         自动刷新页面
// @namespace    www.himno.com
// @version      1.0
// @description  每隔一段时间自动刷新页面，可自定义刷新间隔时间，适合挂机、PT 等需要保持心跳的网页
// @author       friday
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    var title, time, urlPairs;
    var urlIndex = -1;
    

    check();
    
    // 检查当前网址状态
    function check() {
        let list_str = GM_getValue('url_list', false);  // 格式 [[url1, interval1], [url2, interval2], ...]
        if (!! list_str) {
            urlPairs = JSON.parse(list_str);
            
        }
        else {
            urlPairs = [];
        }
        
        urlIndex = urlPairs.findIndex(p => p[0] === location.href);
        if (urlIndex < 0) {
            GM_registerMenuCommand('自动刷新当前网页', addUrl);
        }
        else {
            GM_registerMenuCommand('☠取消自动刷新当前网页', removeUrl);
            GM_registerMenuCommand('配置刷新间隔', config);
            
            time = urlPairs[urlIndex][1];
            ready();
        }
        
        if (urlPairs.length > 0) {
            GM_registerMenuCommand('取消所有自动刷新', removeAll);
        }
    }

    // 配置
    function config() {
        if (urlIndex < 0) {
        }
        else {
            const t = parseInt(prompt("请设置要自动刷新的间隔时间（秒）：", 60));
            if (isNaN(t)) return;
            
            urlPairs[urlIndex][1] = t;
            
            saveConfig();
        }
    }
    
    function saveConfig() {
        GM_setValue('url_list', JSON.stringify(urlPairs));
        location.reload();
    }
    
    function addUrl() {
        time = parseInt(prompt("请设置要自动刷新的间隔时间（秒）：", 60));
        if (isNaN(time)) return;

        urlIndex = urlPairs.length;
        urlPairs.push([location.href, time]);
        
        saveConfig();

        
    }
    
    function removeUrl() {
        urlPairs.splice(urlIndex, 1);
        saveConfig();
    }
    
    function removeAll() {
        alert('暂未实现此功能');
    }

    // Ready
    function ready() {
        title = document.title;
        loop();
    }

    // 循环时间
    function loop() {
        document.title = "[" + formatTime(time) + "] " + title;
        if (time <= 0) {
            location.reload();
            return;
        }
        time--;
        setTimeout(loop, 1000);
    }

    // 格式化时间
    function formatTime(t) {
        if (isNaN(t)) return "";
        var s = "";
        var h = parseInt(t / 3600);
        s += (pad(h) + ":");
        t -= (3600 * h);
        var m = parseInt(t / 60);
        s += (pad(m) + ":");
        t -= (60 * m);
        s += pad(t);
        return s;
    }

    // 补零
    function pad(n) {
        return ("00" + n).slice(-2);
    }

})();