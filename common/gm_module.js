/**

	������GM�ű�����ģ����ʽ��֯�ļ���
	ͨ��Ӧ���ڵ�һ��require �����ô��ļ�
*/

const module_list = new Map();

class Module {
	constructor(name) {
		this.moduleName = name;
		this.exports = {};
	}
}


function require(moduleName) {
	if (! module_list.has(moduleName)) {
		throw('Undefined Module Required ::' + moduleName);
		return;
	}
	const mod = module_list.get(moduleName);
	return mod.exports;
}

window.GM_module = function(moduleName, callback) {

	// ����Ѿ����ڴ�ģ�飬�򲻿��ظ�����
	if (module_list.has(moduleName)) {
		throw('Module Conflicted ::' + moduleName);
		return;
	}

	const mod = new Module(moduleName);
	module_list.set(moduleName, mod);

	callback(require, mod.exports, mod);

	
};

window.GM_module.use = function (moduleName, callback) {
	callback(require(moduleName));
}
