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
