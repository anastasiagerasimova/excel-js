const CODES = {
	'A': 65,
	'Z': 90,
};

function createRow(index, content) {
	return `<div class="row">
                <div class="row-info">${index ? index : ''}</div>
                <div class="row-data">${content}</div>
            </div>`;
}

function createColumn(col) {
	return `<div class="column">${col}</div>`;
}

// Функция, которая преобразует число в символ в соответствии с unicode
function toChar(el, index) {
	return String.fromCharCode(CODES.A + index);
}

function createCell() {
	return `<div class="cell" contenteditable></div>`;
}

export function createTable(rowsCount = 20) {
	const colsCount = CODES.Z - CODES.A + 1;

	// Создвем массив длиннной равной colsCount
	const cols = new Array(colsCount)
		// Заполняем массив пустыми строками
		.fill('')
		// Преобразовываем строки в числа, числа в символы в соответствии с unicode
		.map((el, index) => toChar(el, index))
		.map(el => createColumn(el))
		.join('');

	const cells = new Array(colsCount)
		.fill('')
		.map((el) => createCell())
		.join('');

	const rows = [];
	// Создаем первую строчку таблицы
	rows.push(createRow(null, cols));
	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(i + 1, cells));
	}

	return rows.join('');
}
