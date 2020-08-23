import {defaultStyles} from '../../constants';
import {camelToDashCase} from '../../core/utils';
import {parse} from '../../core/parse';

const CODES = {
	'A': 65,
	'Z': 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createRow(index, content, state) {
	const height = getHeight(index, state);
	const resize = index
		? '<div class="row-resize" data-resize="row"></div>'
		: '';
	return `<div class="row" 
			data-type="resizable" 
			data-row="${index}" 
			style="height:${height};">
				<div class="row-info">
					${index ? index : ''}
					${resize}
				</div>
                <div class="row-data">${content}</div>
            </div>`;
}

function createColumn({col, index, width}) {
	return `<div 
			class="column" 
			data-col="${col}" 
			data-type="resizable"
			style="width:${width};"
			>
				${col}
				<div class="col-resize" data-resize="col"></div>
			</div>`;
}

// Функция, которая преобразует число в символ в соответствии с unicode
function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

function getWidth(col, state) {
	return (state[col] || DEFAULT_WIDTH) + 'px';
}

function getHeight(index, state) {
	return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
	return function(col, index) {
		return {col, index, width: getWidth(col, state.colState)};
	};
}

function createCell(row, state) {
	return function(_, index) {
		const id = `${toChar(_, index)}:${row + 1}`;
		const width = getWidth(toChar(_, index), state.colState);
		const text = state.dataState[id];
		const styles = toInlineStyle({...defaultStyles, ...state.stylesState[id]});
		return `<div 
				class="cell" 
				contenteditable 
				data-type="cell"
				data-col="${toChar(_, index)}" 
				data-id ="${id}"
				style="width:${width};${styles};"
				data-value="${text || ''}"
				>${parse(text) || ''}
				</div>`;
	};
}

function toInlineStyle(state = {}) {
	return Object.keys(state)
		.map(key =>`${camelToDashCase(key)}:${state[key]}`)
		.join(';');
}

export function createTable(rowsCount = 20, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1;

	// Создвем массив длиннной равной colsCount
	const cols = new Array(colsCount)
		// Заполняем массив пустыми строками
		.fill('')
		// Преобразовываем строки в числа, числа в символы в соответствии с unicode
		.map(toChar)
		.map(withWidthFrom(state))
		.map(createColumn)
		.join('');

	const rows = [];
	// Создаем первую строчку таблицы
	rows.push(createRow(null, cols, {}));
	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell(row, state))
			.join('');

		rows.push(createRow(row + 1, cells, state.rowState));
	}

	return rows.join('');
}
