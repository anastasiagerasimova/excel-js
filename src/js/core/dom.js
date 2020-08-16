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

	text(text) {
		// как сетттер
		if (typeof text === 'string') {
			this.$el.innerText = text;
			return this;
		}
		// как геттер
		return this.$el.innerText.trim();
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

	find(selector) {
		return $(this.$el.querySelector(selector));
	}

	addClass(classes) {
		this.$el.classList.add(classes);
		return this;
	}

	removeClass(classes) {
		this.$el.classList.remove(classes);
		return this;
	}

	css(styles = {}) {
		Object
			.keys(styles)
			.forEach(key =>this.$el.style[key]= styles[key]);
	}

	id(parse) {
		if (parse) {
			const ids = this.id().split(':');

			return {
				col: ids[0],
				row: ids[1],
			};
		}
		return this.$el.dataset.id;
	}

	focus() {
		this.$el.focus();
		return this;
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
