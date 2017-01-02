/**
 * 货单界面常量
 */

// action类型
export const SELECT_MANIFEST = 'SELECT_MANIFEST';

// 货单状态
export const MANIFEST_STATUS = {
	pending: {
		name: '待审核',
		color: 'rgb(255, 99, 132)'
	},
	pended: {
		name: '已审核',
		color: 'rgb(54, 162, 235)'
	},
	failed: {
		name: '未通过',
		color: 'rgb(255, 206, 86)'
	},
	processing: {
		name: '订货中',
		color: 'rgb(75, 192, 192)'
	},
	success: {
		name: '已到货',
		color: 'rgb(153, 102, 255)'
	},
	cancel: {
		name: '已取消',
		color: 'rgb(100, 100, 100)'
	}
};