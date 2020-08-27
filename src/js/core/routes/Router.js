import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in router');
		}
		this.$placeholder = $(selector);
		this.routes = routes;
		this.changePageHandler = this.changePageHandler.bind(this);
		this.init();
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	changePageHandler() {
		const Page = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard;
		const page = new Page(ActiveRoute.param);
		this.$placeholder.html('');
		this.$placeholder.append(page.getRoot());
		page.afterRender();
	}

	destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
