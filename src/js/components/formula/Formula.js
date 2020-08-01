import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
    	super($root, {
    		name: 'Formula',
    		listeners: ['input', 'click'],
    	});
    }

    toHTML() {
    	return `<div class="info">fx</div>
                <div class="input" contenteditable spellcheck="false"></div>`;
    }

    onInput(event) {
    	console.log('method omInput ready!');
    	console.log(this.$root);
    	console.log(event.target.textContent.trim());
    }

    onClick() {
    	console.log('method onClick!');
    }
}
