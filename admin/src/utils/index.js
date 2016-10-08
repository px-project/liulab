/**
 * 工具类
 */

// 转驼峰
export function toCamcel (big, ...strArr) {


	function handleCamcel (str, big = true) {
		return (big ? str.charAt(0).toUpperCase() : str.charAt(0).toLowerCase()) + str.slice(1);
	}

	let result = strArr.map((item) => handleCamcel(item)).join('');

	return big ? result : handleCamcel(result, false);

}

