import { App } from 'vue'
import {
	ElButton,
	ElTabs,
	ElTabPane,
	ElInput,
	ElForm,
	ElFormItem,
	ElSwitch,
	ElRow,
	ElCol,
	ElCheckbox,
	ElSelect,
	ElOption,
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

/**
 * 初始化 element ui 数据
 *
 * @param {App<Element>} app createApp 的返回
 * @returns {void}
 */
export default function initElementUi(app: App<Element>) {
	// app.config.globalProperties.$ELEMENT = {
	// 	size: 'small',
	// }
	app.component(ElButton.name, ElButton)
	app.component(ElTabs.name, ElTabs)
	app.component(ElTabPane.name, ElTabPane)
	app.component(ElInput.name, ElInput)
	app.component(ElRow.name, ElRow)
	app.component(ElCol.name, ElCol)
	app.component(ElForm.name, ElForm)
	app.component(ElFormItem.name, ElFormItem)
	app.component(ElSwitch.name, ElSwitch)
	app.component(ElCheckbox.name, ElCheckbox)
	app.component(ElSelect.name, ElSelect)
	app.component(ElOption.name, ElOption)
}
