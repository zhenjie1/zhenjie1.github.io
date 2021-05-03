import { App } from 'vue'
import directiveSize from './viewSize'
import keyword from './keyword'

const initGlobalDirective = function init(app: App<Element>): void {
	app.directive('size', directiveSize())
	app.directive('keyword', keyword())
}
export default initGlobalDirective
