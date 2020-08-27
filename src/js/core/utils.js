// Pure function
export function capitailize(string) {
	if (typeof string !== 'string') {
		return '';
	}

	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
	if (start > end) {
		[end, start] = [start, end];
	}
	const length = end - start + 1;
	return new Array(length)
		.fill('')
		.map((_, index) => +start + index);
}

export function charRange(start, end) {
	if (start.charCodeAt(0) > end.charCodeAt(0)) {
		// Деструктуризация массива
		[end, start] = [start, end];
	}
	const length = end.charCodeAt(0) - start.charCodeAt(0) + 1;
	return new Array(length)
		.fill('')
		.map((_, index) => String.fromCharCode(start.charCodeAt(0) + index));
}

export function setCursorToEnd($node) {
	// Получаем объект Selection
	const sel = window.getSelection();
	// Выделяем все дочерние узлы данного узла $node.$el
	sel.selectAllChildren($node.$el);
	// Схлопываем дианазон к концу выделения
	sel.collapseToEnd();
}

export function storage(key, data = null) {
	if (data) {
		return localStorage.setItem(key, JSON.stringify(data));
	}
	return JSON.parse(localStorage.getItem(key));
}

export function isEqual(a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
	  return JSON.stringify(a) === JSON.stringify(b);
	}
	return a === b;
}

export function camelToDashCase(str) {
	return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function debounce(fn, wait) {
	let timeout;
	return function(...args) {
		const later = () => {
			clearTimeout(timeout);
			fn(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
export function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event) {
	event.preventDefault();
}

