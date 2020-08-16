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
function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

function createCell(row) {
	return function(_, index) {
		return `<div 
				class="cell" 
				contenteditable 
				data-type="cell"
				data-col="${toChar(_, index)}" 
				data-id ="${toChar(_, index)}:${row + 1}">
				</div>`;
	};
}

export function createTable(rowsCount = 20) {
	const colsCount = CODES.Z - CODES.A + 1;

	// Создвем массив длиннной равной colsCount
	const cols = new Array(colsCount)
		// Заполняем массив пустыми строками
		.fill('')
		// Преобразовываем строки в числа, числа в символы в соответствии с unicode
		.map(toChar)
		.map(createColumn)
		.join('');

	const rows = [];
	// Создаем первую строчку таблицы
	rows.push(createRow(null, cols));
	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell(row))
			.join('');

		rows.push(createRow(row + 1, cells));
	}

	return rows.join('');
}
