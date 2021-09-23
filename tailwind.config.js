function firstToUpper(str) {
	if (!str) return ''
	return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase())
}
const theme = {
	main: '',
	red: '',
	yellow: '',
	blue: '',
	gray: '',
	wechat: {
		color: '',
		bgColor: '',
		msgColor: '',
		logoColor: '',
	},
	bg: {
		color: '',
		hover: '',
		check: '',
		mask: '',
	},
	text: {
		color: '',
		light: '',
		gray: '',
		grayDeep: '',
	},
	border: {
		color: '',
		deep: '',
	},
}
for (const i in theme) {
	if (typeof theme[i] == 'object') {
		for (const j in theme[i]) {
			theme[i][j] = `var(--${i}${firstToUpper(j)})`
		}
	} else {
		theme[i] = `var(--${i})`
	}
}

module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: { ...theme },
			// backgroundColor: {
			// 	red: 'var(--red)',
			// 	yellow: 'var(--yellow)',
			// 	blue: 'var(--blue)',
			// 	gray: 'var(--gray)',
			// },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
