/**
 * 角色模块常量
 */
export const ROLE_CHANGE_STATUS = 'ROLE_CHANGE_STATUS';

export const PERMISSION_CONFIG = {
    manifest: {
        title: "货单",
        actions: [
            {
                title: '审核订单',
                code: 'ORDER_AUDIT'
            },
            {
                title: '派发货单',
                code: 'MANIFEST_BOOK'
            }
        ]
    },
    user: {
        title: "用户",
        actions: [
            {
                title: "添加用户",
                code: "USER_ADD"
            }
        ]
    }
}