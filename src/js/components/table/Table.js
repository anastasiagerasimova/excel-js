import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
    	super($root, {
    		name: 'Table',
    		listeners: ['mousedown'],
    	});
    }

    toHTML() {
    	return createTable();
    }

    onMousedown(event) {
    	if (event.target.dataset.resize) {
    		event.preventDefault();

    		const $resizer = $(event.target);
    		const $parent = $resizer.closest('[data-type="resizable"]');
    		const $parentRow = $resizer.closest('.row-info');
    		const char = $parent.data.col;
    		const coordsParent = $parent.getCoords();
    		// const coordsResizer = $resizer.getCoords();
    		// const shiftX = event.clientX - coordsResizer.left;
    		const type = $resizer.data.resize;

    		this.$root.append($resizer);

    		const scrollX = this.$root.$el.scrollLeft;
    		// let scrollX2;


    		if (type === 'col') {
    			xMotion(event.pageX, this.$root, $resizer, scrollX);
    		} else {
    			yMotion(event.clientY, this.$root, $resizer);
    		}

    		document.onmousemove = (e => {
    			// scrollX2 = this.$root.$el.scrollLeft;

    			if (type === 'col') {
    				xMotion(e.pageX, this.$root, $resizer, scrollX);
    			} else {
    				yMotion(e.clientY, this.$root, $resizer);
    			}
    		});

    		event.target.onmouseup = ((event) => {
    			document.onmousemove = null;
    			event.target.onmouseup = null;

    			if (type === 'col') {
    				$parent.append($resizer);

    			// 	// Реализация предусматривающая прокрутку таблицы
    			// 	// Если оставить действия по умолчанию у события mousedown мыши
    			// 	let widthCol;
    			// 	// если по событию mousedown и по событию mouseup скроллы НЕравны
    			// 	if (scrollX !== scrollX2) {
    			// 		// по событию mousedown скролл больше, чем по событию mouseup
    			// 		if (scrollX > scrollX2) {
    			// 			const delta = scrollX - scrollX2;
    			// 			widthCol = event.pageX - delta - coordsParent.left + 'px';
    			// 			// по событию mouseup скролл больше, чем по событию mousedown
    			// 		} else if (scrollX < scrollX2) {
    			// 			widthCol = event.pageX + scrollX2 - coordsParent.left + 'px';
    			// 		}
    			// 		// если по событию mousedown и по событию mouseup скроллы равны
    			// 	} else {
    			// 		widthCol = event.pageX - coordsParent.left + 'px';
    			// 	}
    			// 	$resizer.css({left: widthCol});


    				$resizer.css({left: event.pageX - coordsParent.left + 'px'});

    				// Изменение ширины колоноки
    				$parent.css({width: event.pageX - coordsParent.left + 'px'});

    				// Изменение ширины всех ячеек под колонкой, которую ресайзили
    				const cells = this.$root.findAll(`[data-col="${char}"]`);
    				cells.forEach(el => {
    					$(el).css({width: event.pageX - coordsParent.left + 'px'});
    				});
    			} else {
    				$parentRow.append($resizer);
    				$resizer.css({top: event.clientY - coordsParent.top + 'px'});

    				// изменение высоты строк
    				$parent.css({height: event.clientY - coordsParent.top + 'px'});
    			}
    		});
    	}
    }
}

function yMotion(clientY, table, resizer) {
	// Ширина полосы прокрутки таблицы
	const scrollWidth = table.$el.offsetHeight - table.$el.clientHeight;

	let newTop = clientY - table.getCoords().top;

	// Ограничиваем движение resizer-а размерами окна
	// resizer вышел за пределы Верхней границы таблицы
	// => оставить resizer в его границах.
	if (newTop < 0) {
		newTop = 0;
	} else if (table.getCoords().top < 0 && event.clientY <= 0) {
		newTop = - table.getCoords().top;
	}

	const windowInnerHeight = document.documentElement.clientHeight;
	const documentHeight = document.documentElement.scrollHeight;
	const documentScrollTop = document.documentElement.scrollTop;
	const resizerHeight = resizer.getCoords().height;

	// Проверка: прокручен вертикальный скрол до конца или нет
	const bottomEdge = documentHeight - documentScrollTop === windowInnerHeight
		? windowInnerHeight - table.getCoords().top - resizerHeight - scrollWidth
		: windowInnerHeight - table.getCoords().top - resizerHeight;

	// resizer вышел за пределы правой границы таблицы
	// => оставить resizer в его границах.
	if (newTop > bottomEdge) {
		newTop = bottomEdge;
	}

	resizer.css({top: newTop + 'px'});
}

function xMotion(pageX, table, resizer, scroll) {
	let newLeft = pageX - table.getCoords().left;

	// Ограничиваем движение resizer-а размерами окна
	// resizer вышел за пределы левой границы таблицы
	// => оставить resizer в его границах.
	if (newLeft < 0) {
	  newLeft = 0;
	}

	const windowInnerWidth = document.documentElement.clientWidth;
	const rightEdge = windowInnerWidth - resizer.getCoords().width;
	// resizer вышел за пределы правой границы таблицы
	// => оставить resizer в его границах.
	if (newLeft > rightEdge) {
	  newLeft = rightEdge;
	}

	resizer.css({left: newLeft + scroll + 'px'});
}
