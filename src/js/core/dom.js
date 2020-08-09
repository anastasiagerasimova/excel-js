class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	// Работает как геттер и как сетттер
	html(html) {
		// как сетттер
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			// this указывает на создаваемый объект, экземпляр (inctence) класса Dom
			// return this позволет делять chain-ы из методов класса
			return this;
		}

		// как геттер
		return this.$el.outterHTML.trim();
	}

	clear() {
		this.html('');
		return this;
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	append(node) {
		// Преверка является ли переданный аргумент экземпляром класса Dom
		// Если метод append() в качестве входного параметра принимает объект,
		// то берем его свойство node.$el
		if (node instanceof Dom) {
			node = node.$el;
		}
		this.$el.append(node);

		return this;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	// getter
	get data() {
		return this.$el.dataset;
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	css(styles = {}) {
		Object
			.keys(styles)
			.forEach(key =>this.$el.style[key]= styles[key]);
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);

	if (classes) {
		el.classList.add(classes);
	}

	return $(el);
};
