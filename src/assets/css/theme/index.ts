import defaultTheme from '@/assets/css/theme/default'
import blackTheme from '@/assets/css/theme/black'
import { firstToUpper } from '@/utils'

// 添加主题颜色
export function appentTheme() {
	const theme = blackTheme
	let styleColor = ''
	for (const i in theme) {
		if (['bg', 'text', 'border'].includes(i)) {
			for (const j in theme[i]) {
				const item = theme[i][j]
				const name = i + firstToUpper(j)
				styleColor += `--${name}: ${item};\n`
			}
		} else {
			styleColor += `--${i}: ${theme[i]};\n`
		}
	}
	styleColor = `body{\n${styleColor}\n}`

	const themeStyle = document.createElement('style')
	themeStyle.setAttribute('type', 'text/css')
	themeStyle.classList.add('theme')
	themeStyle.innerHTML = styleColor
	document.head.append(themeStyle)
}
