/**

	用于在GM脚本中以模块形式组织文件。
	通常应当在第一个require 中引用此文件
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

	// 如果已经存在此模块，则不可重复定义
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
