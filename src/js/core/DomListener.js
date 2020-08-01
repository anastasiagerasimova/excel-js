import {capitailize} from './utils';

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error(`No $root provided for DomListener!`);
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			if (!this[method]) {
				throw new Error(
					`Method ${method} is not implimented in ${this.name} Component`
				);
			}

			// Задаем контекст для метода this[method]
			// Привязываем метод this[method] к текущему контексту
			// Метод забайден на свой собственный контекст
			this[method] = this[method].bind(this);

			// Тоже самое, что и addEventlistener
			this.$root.on(listener, this[method]);
		});
	}

	removeDOMListeners() {
		this.listeners.forEach( listener => {
			const method = getMethodName(listener);
			this.$root.off(listener, this[method]);
		});
	}
}

// input -> onInput
function getMethodName(eventName) {
	return 'on' + capitailize(eventName);
}
