/**
 * 订购界面使用常量
 */

// 选择品类
export const BOOK_CATEGORY_TOGGLE = 'BOOK_CATEGORY_TOGGLE';

// 选择产品
export const BOOK_PRODUCT_ADD = 'BOOK_PRODUCT_ADD';

// 改变产品数量
export const BOOK_PRODUCT_CHANGE = 'BOOK_PRODUCT_CHANGE';

// 上传状态
export const BOOK_UPLOAD_STEP = 'BOOK_UPLOAD_STEP';

// 上传步骤
export const BOOK_UPLOAD_STEPS = [
    { status: 'select', name: '选择品类', description: '选择需要上传产品的全部品类' },
    { status: 'upload', name: '上传文件', description: '下载模板填写完成后上传' },
    { status: 'preview', name: '确认订单', description: '订单产品和数量确认' }
];

// 上传选择品类
export const BOOK_UPLOAD_CATEGORY_SELECT = 'BOOK_UPLOAD_CATEGORY_SELECT';