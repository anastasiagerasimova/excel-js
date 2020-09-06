import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {setCursorToEnd} from '../../core/utils';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
    	super($root, {
    		name: 'Formula',
    		listeners: ['input', 'keydown'],
    		...options,
    		subscribe: ['currentText'],
    	});
    }

    init() {
    	super.init();
    	this.$formula = this.$root.find('.input');
    	this.$on('table:select', ($cell)=>{
    		this.$formula.text($cell.attr('data-value'));
    	});
    }

    toHTML() {
    	return `<div class="info">fx</div>
                <div 
                    id="formula" 
                    class="input" 
                    contenteditable 
                    spellcheck="false">
                </div>`;
    }

    storeChanged(changes) {
    	this.$formula.text(changes.currentText);
    }

    onInput(event) {
    	this.$emit('formula:input', $(event.target));
    	setCursorToEnd( $(event.target));
    }

    onKeydown(event) {
    	const keys = ['Enter', 'Tab'];
    	if (keys.includes(event.key)) {
    		event.preventDefault();
    		this.$emit('formula:done');
    	}
    }
}
