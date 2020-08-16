import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.function';
import {setCursorToEnd} from './table.function';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
    	super($root, {
    		name: 'Table',
    		listeners: ['mousedown', 'keydown', 'input'],
    		...options,
    	});

    	this.prepare();
    }

    // Метод prepare будет вызываться раньше чем init,
    // потому что он вызыывается в constructor
    prepare() {
    	// Готовим компонент и создаем вспомогательный класс
    	this.selection = new TableSelection();
    }

    init() {
    	super.init();

    	const $cell = this.$root.find('[data-id="A:1"]');
    	this.selectCell($cell);
    	// Перемещеаем курсор в конец содержимого ячейки
    	setCursorToEnd(this.selection.current);

    	this.$on('formula:input', (input)=>{
    		this.selection.current.text(input.text());
    	});
    	this.$on('formula:done', ()=>{
    		// Перемещеаем курсор в конец содержимого ячейки
    		setCursorToEnd(this.selection.current);
    	});
    }

    toHTML() {
    	return createTable();
    }

    selectCell($cell) {
    	this.selection.select($cell);
    	// Уведомляем слушателей о событии table:select
    	this.$emit('table:select', $cell);
    }

    onMousedown(event) {
    	if (shouldResize(event)) {
    		resizeHandler(event, this.$root);
    	} else if (isCell(event)) {
    		const $target = $(event.target);

    		if (event.shiftKey) {
    			const ids = matrix(this.selection.current, $target);

    			const cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
    			this.selection.selectGroup(cells);
    		} else {
    			// this.selection.select($target);
    			this.selectCell($target);
    		}
    	}
    }

    onKeydown(event) {
    	// Массив с обрабатываемыми кнопками
    	const keys = [
    		'Tab',
    		'ArrowRight',
    		'Enter',
    		'ArrowDown',
    		'ArrowUp',
    		'ArrowLeft',
    	];
 		// Деструктуризация объекта
    	const {key} = event;

    	// Если была нажата одна из клавиш массива keys
    	// Но не была зажата клавиша Shift
    	if (keys.includes(key) && !event.shiftKey) {
    		event.preventDefault();

    		const id = this.selection.current.id(true);
    		const selector = nextSelector(event, id);
    		const $nextCell = this.$root.find(selector);
    		this.selectCell($nextCell);
    		// Перемещеаем курсор в конец содержимого ячейки
    		setCursorToEnd(this.selection.current);
    	}
    }

    onInput(event) {
    	this.$emit('table:input', $(event.target));
    }
}

