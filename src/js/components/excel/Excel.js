import {$} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {StoreSubscribe} from '../../core/StoreSubscribe';
import * as action from '../../redux/action';
import {preventDefault} from '../../core/utils';

export class Excel {
	constructor(options) {
		this.components = options.components || [];
		this.store = options.store;
		this.emitter = new Emitter();
		this.subscriber = new StoreSubscribe(this.store);
	}

	getRoot() {
		const componentOptions = {
			emitter: this.emitter,
			store: this.store,
		};
		const $root = $.create('div', 'excel');
		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className);
			const component = new Component($el, componentOptions);

			if (process.env.NODE_ENV === 'development') {
				window[component.name] = component;
			}

			$el.html(component.toHTML());
			$root.append($el);
			return component;
		});

		return $root;
	}

	init() {
		if (process.env.NODE_ENV === 'production') {
			document.addEventListener('contextmenu', preventDefault);
		}
		this.store.dispatch(action.updateData());
		this.subscriber.subscribeComponents(this.components);
		this.components.forEach(component => component.init());
	}

	destroy() {
		this.components.forEach(component => component.destroy());
		this.subscriber.unsubscribeFromStore();
		document.removeEventListener('contextmenu', preventDefault);
	}
}
