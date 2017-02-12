/**
 * 金额转换
 */
export const currency = price => {
    return window.accounting.formatMoney(price / 100, '￥');
}