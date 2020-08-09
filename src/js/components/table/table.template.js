const CODES = {
	'A': 65,
	'Z': 90,
};

function createRow(index, content) {
	const resize = index
		? '<div class="row-resize" data-resize="row"></div>'
		: '';
	return `<div class="row" data-type="resizable">
				<div class="row-info">
					${index ? index : ''}
					${resize}
				</div>
                <div class="row-data">${content}</div>
            </div>`;
}

function createColumn(col) {
	return `<div class="column" data-col="${col}" data-type="resizable">
				${col}
				<div class="col-resize" data-resize="col"></div>
			</div>`;
}

// Функция, которая преобразует число в символ в соответствии с unicode
function toChar(el, index) {
	return String.fromCharCode(CODES.A + index);
}

function createCell(el, index) {
	return `<div 
				class="cell" 
				contenteditable 
				data-col="${toChar(el, index)}">
			</div>`;
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
		.map((el, index) => createCell(el, index))
		.join('');

	const rows = [];
	// Создаем первую строчку таблицы
	rows.push(createRow(null, cols));
	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(i + 1, cells));
	}

	return rows.join('');
}
