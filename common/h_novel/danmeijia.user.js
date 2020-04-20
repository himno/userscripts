// ==UserScript==
// @name Danmeijia图片文字替换
// @namespace 替换正文中用图片显示的文字
// @match https://m.danmeijia3.com/novel/*/*.html
// @require http://localhost:10086/shared/common/h_novel/article_mod_nishuihan.js?r=1
// @grant none
// ==/UserScript==

'use strict';


// 替换表
const codeMapper = {
    '__ss__': 'xxxx',
    /////////////////////////
    'ai105': '爱',
    'an61': '按',
    'ba55': '巴',
    'ba56': '拔',
    'ban109': '瓣',
    'bang51': '棒',
    'bi16': '逼',
    'bi27': '屄',
    'bi50': '壁',
    'bo124': '勃',
    'bu107': '部',
    'ca131': '擦',
    'cao12': '肏',
    'cao23': '操',
    'cha169': '插',
    'chang140': '长',
    'chang161': '肠',
    'chao64': '潮',
    'chong152': '宠',
    'chou168': '抽',
    'chu111': '处',
    'chu212': '触',
    'chuan90': '喘',
    'chui77': '吹',
    'chun118': '春',
    'chun23': '唇',
    'cu139': '粗',
    '%EF%BB%BFcui0': '催',
    'dai111': '戴',
    'dan81': '蛋',
    'dang115': '荡',
    'dao22': '道',
    'di19': '蒂',
    'dian98': '点',
    'ding100': '顶',
    'dong49': '洞',
    'fei27': '肥',
    'feng48': '缝',
    'gan18': '干',
    'gan65': '感',
    'gang99': '肛',
    'gao52': '睾',
    'gao63': '高',
    'gen78': '根',
    'gong119': '宫',
    'gu34': '股',
    'guan160': '灌',
    'guan163': '管',
    'gui36': '龟',
    'gun145': '滚',
    'han143': '含',
    'hou18': '喉',
    'hu21': '户',
    'hua69': '花',
    'hua95': '滑',
    'huan47': '欢',
    'ji54': '鸡',
    'jian113': '坚',
    'jian60': '奸',
    'jiao44': '交',
    'jiao89': '娇',
    'jie177': '姐',
    'jin134': '筋',
    'jin82': '紧',
    'jing19': '精',
    'jing210': '茎',
    'ju137': '具',
    'ju68': '菊',
    'ju91': '巨',
    'ku92': '裤',
    'kua86': '胯',
    'liu121': '流',
    'lou117': '露',
    'luan141': '乱',
    'lu170': '撸',
    'lun142': '伦',
    'lun59': '轮',
    'luo57': '裸',
    'ma35': '马',
    'mao14': '毛',
    'mei30': '美',
    'mi136': '泌',
    'mi32': '蜜',
    'min97': '敏',
    'mo110': '膜',
    'mo62': '摩',
    'nai41': '奶',
    'nang16': '囊',
    'nei103': '内',
    'nen175': '嫩',
    'niao66': '尿',
    'nie76': '捏',
    'nong1180': '浓',
    'nong132': '弄',
    'nue85': '虐',
    'pei45': '配',
    'pen129': '喷',
    'pi33': '屁',
    'pi79': '皮',
    'qi46': '器',
    'qiang108': '强',
    'qing1': '情',
    're116': '热',
    'rong123': '融',
    'rou29': '肉',
    'rou75': '揉',
    'ru144': '入',
    'ru40': '乳',
    'ruan148': '软',
    'run96': '润',
    'sai83': '塞',
    'sao88': '骚',
    'se155': '色',
    'she14': '射',
    'she25': '舌',
    'shen106': '身',
    'shen17': '深',
    'shen73': '呻',
    'shi128': '食',
    'shi31': '湿',
    'shuang174': '爽',
    'shui164': '水',
    'tan135': '瘫',
    'tang146': '烫',
    'tao112': '套',
    'ti39': '体',
    'tian159': '舔',
    'tiao162': '跳',
    'ting114': '挺',
    'ting80': '庭',
    'tong149': '捅',
    'tou37': '头',
    'tui150': '腿',
    'tun28': '臀',
    'wan53': '丸',
    'wei102': '慰',
    'wu133': '物',
    'xi172': '吸',
    'xia156': '下',
    'xian127': '腺',
    'xie122': '泄',
    'xing43': '性',
    'xiong166': '胸',
    'xue20': '穴',
    'yan178': '眼',
    'yang171': '痒',
    'yang58': '阳',
    'ye26': '液',
    'yin15': '阴',
    'yin25': '淫',
    'yin74': '吟',
    'ying120': '硬',
    'yu130': '欲',
    'yun125': '孕',
    'yun173': '吮',
    'zhi101': '汁',
    'zhi126': '殖',
    'zhong153': '肿',
    'zhong93': '种',
    'zhu147': '柱',
    'zi42': '子',
    'zuo104': '做',
    //'__ss__': 'xxxx',
    //'__ss__': 'xxxx',
};

const replaceImg = function (code) {
    const letter = codeMapper[code];
    if (letter) {
        return letter;
    }
    else {
        return null;
    }
};


$('#Menu').remove();
$('#cload').remove();


const $content = $('#content');

//content.find('span').remove();

xxx_check();

let fixedCount = 0;
let unfixedCount = 0;
$content.find('img').each(function () {
    const m = /\/([a-z0-9]+)\.jpg$/.exec(this.getAttribute('src'));
    
    if (! m) {
	    unfixedCount++;
        return true;
    }
    
    const l = replaceImg(m[1]);
    if (l) {
        $(this).after(l).remove();
        fixedCount++;
    }
    else {
        $(this).after('👻');
        unfixedCount++;
    }
    
});

$('#foot').append(`<a id="Menu" href="javascript:;">☠KK修正${fixedCount}#${unfixedCount}</a>`);
