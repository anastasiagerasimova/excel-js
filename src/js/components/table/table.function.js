import {range} from '../../core/utils';
import {charRange} from '../../core/utils';

export function shouldResize(event) {
	return event.target.dataset.resize;
}

export function isCell(event) {
	return event.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
	const current = $current.id(true);
	const target = $target.id(true);
	const rows = range(+current.row, +target.row);
	const cols = charRange(current.col, target.col);

	return cols.reduce((accumulator, col)=>{
		rows.forEach(row => accumulator.push(`${col}:${row}`));
		return accumulator;
	}, []);
}

export function nextSelector(event, {col, row}) {
	const {
		MIN__ROW,
		MIN__COL,
		MAX__ROW,
		MAX__COL,
	} = {
		MIN__ROW: 1,
		MIN__COL: 65,
		MAX__ROW: 20,
		MAX__COL: 90,
	};

	switch (event.key) {
	case 'Tab':
	case 'ArrowRight':
		col = col.charCodeAt(0) === MAX__COL
			? String.fromCharCode(MAX__COL)
			: String.fromCharCode(col.charCodeAt(0) + 1);
		break;
	case 'Enter':
	case 'ArrowDown':
		row = +row === MAX__ROW
			? MAX__ROW
			: +row + 1;
		break;
	case 'ArrowUp':
		row = +row === MIN__ROW
			? MIN__ROW
			: +row - 1;
		break;
	case 'ArrowLeft':
		col = col.charCodeAt(0) === MIN__COL
			? String.fromCharCode(MIN__COL)
			: String.fromCharCode(col.charCodeAt(0) - 1);
		break;
	}

	return `[data-id="${col}:${row}"]`;
}

export function setCursorToEnd($node) {
	// Получаем объект Selection
	const sel = window.getSelection();
	// Выделяем все дочерние узлы данного узла $node.$el
	sel.selectAllChildren($node.$el);
	// Схлопываем дианазон к концу выделения
	sel.collapseToEnd();
}
