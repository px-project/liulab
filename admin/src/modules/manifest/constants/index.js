/**
 * 货单模块常量
 */

// action类型
export const SELECT_MANIFEST = 'SELECT_MANIFEST';

// 货单状态
export const MANIFEST_STATUS = {
    created: {
        name: '待审核',
        color: 'rgb(255, 99, 132)'
    },
    auditPassed: {
        name: '审核通过',
        color: 'rgb(54, 162, 235)'
    },
    booked: {
        name: '已订货',
        color: 'rgb(75, 192, 192)'
    },
    arrivaled: {
        name: '已到货',
        color: 'rgb(153, 102, 255)'
    },
    successed: {
        name: '订单完成',
        color: 'rgb(153, 102, 255)'
    },
    auditFailed: {
        name: '审核未通过',
        color: 'rgb(255, 206, 86)'
    },
    canceled: {
        name: '订单已取消',
        color: 'rgb(100, 100, 100)'
    }
};
