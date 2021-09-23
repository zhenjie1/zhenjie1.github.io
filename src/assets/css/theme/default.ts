const data: Data = {
	/* rgb 主背景颜色 */
	CR: '255',
	CG: '255',
	CB: '255',

	/* 与主背景颜色相反的颜色 */
	RR: '0',
	RG: '0',
	RB: '0',
	main: '#1890ff',
	AppLeftMenuColor: 'var(--R86)' /* 左侧菜单背景颜色 */,
	menuBgColor: 'transparent' /* 菜单颜色 */,
	bg: {
		/* 背景颜色 */
		color: 'var(--C97)' /* 背景颜色 */,
		hover: 'var(--R4)' /* 鼠标经过时的颜色 */,
		check: 'var(--R8)' /* 选中时的颜色 */,
		mask: 'var(--C96)' /* 遮罩层的背景颜色 dialog、select 等 */,
	},
	text: {
		/** 文字颜色 */
		color: 'var(--R80)',
		light: 'var(--R30)' /* 浅灰 */,
		gray: 'var(--R40)' /* 中等 */,
		grayDeep: 'var(--R60)' /* 深灰 */,
	},
	border: {
		color: 'var(--R10)',
		deep: 'var(--R20)',
	},
	shadow: '0 2px 10px var(--R10)',
}
export default data
