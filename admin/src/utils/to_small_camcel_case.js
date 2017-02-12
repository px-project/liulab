/**
 * 转小驼峰
 */
import { toBigCamcelCase } from './to_big_camcel_case';

export const toSmallCamcelCase = (...strs) => {
    return toBigCamcelCase(...strs).charAt(0).toLowerCase() + toBigCamcelCase.substr(1);
}