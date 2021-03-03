import { App, Component } from 'vue'
import MyTabs from 'components/common/Tabs/Tabs.vue'
/**
 * 注册全局组件
 *
 * @param {App<Element>} app createApp的返回
 * @returns {void}
 */
export default function initGlobalComponent(app: App<Element>) {
	const modules = import.meta.glob('./../../components/common/**/*.vue')
	for (const path in modules) {
		modules[path]().then((mod) => {
			const component: Component = mod.default
			if (!component || !component.name) return
			console.log(component.name, component)
			app.component(component.name, component)
		})
	}
	app.component(MyTabs.name as string, MyTabs)
}
