import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.function';
import {setCursorToEnd} from '../../core/utils';
import {TableSelection} from './TableSelection';
import * as action from '../../redux/action';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
    	super($root, {
    		name: 'Table',
    		listeners: ['mousedown', 'keydown', 'input'],
    		...options,
    	});
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
    		this.selection.current.attr('data-value', input.text());
    		this.selection.current.text(parse(input.text()));
    		this.updateTextInStore(input.text());
    	});
    	this.$on('formula:done', ()=>{
    		// Перемещеаем курсор в конец содержимого ячейки
    		setCursorToEnd(this.selection.current);
    	});
    	this.$on('toolbar:applyStyle', (value) => {
    		this.selection.applyStyle(value);
    		this.$dispatch(action.applyStyle({
    			ids: this.selection.selectedIds,
    			value: value,
    		}));
    	});
    }

    toHTML() {
    	return createTable(20, this.store.getState());
    }

    selectCell($cell) {
    	this.selection.select($cell);
    	// Уведомляем слушателей о событии table:select
    	this.$emit('table:select', $cell);

    	const styles = $cell.getStyles(Object.keys(defaultStyles));
    	this.$dispatch(action.changeStyles(styles));
    }

    async resizeHandler(event) {
    	const data = await resizeHandler(event, this.$root);
    	this.$dispatch(action.tableResize(data));
    }

    updateTextInStore(text) {
    	this.$dispatch(action.changeText({
    		id: this.selection.current.data.id,
    		value: text,
    	}));
    }

    onMousedown(event) {
    	if (shouldResize(event)) {
    		this.resizeHandler(event);
    	} else if (isCell(event)) {
    		const $target = $(event.target);

    		if (event.shiftKey) {
    			const ids = matrix(this.selection.current, $target);

    			const cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
    			this.selection.selectGroup(cells);
    		} else {
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
    	this.updateTextInStore($(event.target).text());
    }
}

