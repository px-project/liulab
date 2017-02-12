/**
 * 转大驼峰
 */
export const toBigCamcelCase = (...strArr) => {
    return strArr.map((str = '') => str.charAt(0).toUpperCase() + str.slice(1)).join('');
}