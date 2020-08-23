import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {creatHeader} from './createHeader';
import * as action from '../../redux/action';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
    	super($root, {
    		name: 'Header',
    		listeners: ['input'],
    		...options,
    	});
    }

    toHTML() {
    	return creatHeader(this.store.getState());
    }

    onInput(event) {
    	const $target = $(event.target);
    	const title = $target.text();
    	this.$dispatch(action.changeTitle(title));
    }
}
