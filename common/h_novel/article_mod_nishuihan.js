// 解码器
const base64 = {
    map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    decode: function(a) {
        var b = binary = '';
        for (var i = 0; i < a.length; i++) {
            if (a.substr(i, 1) == '=') {
                break
            };
            var c = this.map.indexOf(a.charAt(i)).toString(2);
            binary += {
                1: '00000',
                2: '0000',
                3: '000',
                4: '00',
                5: '0',
                6: ''
            }[c.length] + c
        };
        binary = binary.match(/[0-1]{8}/g);
        for (var i = 0; i < binary.length; i++) {
            b += String.fromCharCode(parseInt(binary[i], 2))
        };
        return b;
    }

};

// 索引重编
const UpWz = function(m, i) {
    var k = Math.ceil((i + 1) % codeurl);
    k = Math.ceil(m - k);
    return k;
};

// 显示正文内容
const show = function () {
    const sequence = base64.decode(document.querySelector('meta[name=client]').getAttribute('content')).split(/[A-Z]+%/);

    console.log(sequence);
    console.log(codeurl);
    
    const content = document.querySelector('#content');
    const correctList = [];
    
    for (let i = 0; i < sequence.length; i++) {
        let k = UpWz(sequence[i], i);
        correctList[k] = content.childNodes[i];
    }
    
    // 顺序还原
    for (let i = 0; i < correctList.length; i++) {
        content.appendChild(correctList[i]);
    }
	
};

window.xxx_check = show;