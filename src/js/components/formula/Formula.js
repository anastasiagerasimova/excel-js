import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
    	super($root, {
    		name: 'Formula',
    		listeners: ['input', 'keydown'],
    		...options,
    	});
    }

    init() {
    	super.init();
    	const input = this.$root.find('.input');
    	this.$on('table:input', (cell)=>{
    		input.text(cell.text());
    	});
    	this.$on('table:select', (cell)=>{
    		input.text(cell.text());
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

    onInput(event) {
    	this.$emit('formula:input', $(event.target));
    }

    onKeydown(event) {
    	const keys = ['Enter', 'Tab'];
    	if (keys.includes(event.key)) {
    		event.preventDefault();
    		this.$emit('formula:done');
    	}
    }
}
