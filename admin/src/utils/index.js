/**
 * 工具类
 */

// 转驼峰
export function toCamcel(big, ...strArr) {


	function handleCamcel(str = '', big = true) {
		return (big ? str.charAt(0).toUpperCase() : str.charAt(0).toLowerCase()) + str.slice(1);
	}

	let result = strArr.map((item) => handleCamcel(item)).join('');

	return big ? result : handleCamcel(result, false);

}

// 深拷贝
export function deepCopy(target) {

	if (Array.isArray(target)) {
		return target.map((item) => {
			if (item instanceof Object) return deepCopy(item);
			return item;
		});
	}

	if (target instanceof Object) {
		let result = {};
		for (let key in target) {
			result[key] = target[key] instanceof Object ? deepCopy(target[key]) : target[key];
		}
		return result;
	}

	return target;
}
