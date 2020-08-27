import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {creatHeader} from './createHeader';
import * as action from '../../redux/action';
import {ActiveRoute} from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
    	super($root, {
    		name: 'Header',
    		listeners: ['input', 'click'],
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

    onClick(event) {
    	const $target = $(event.target);
    	if ($target.data.action === 'exit') {
    		ActiveRoute.setPath('#dashboard');
    	} else if ($target.data.action === 'delete') {
    		const result = confirm('Вы уверены, что хотите удалить эту таблицу?');
    		if (result) {
    			localStorage.removeItem(ActiveRoute.path.replace('/', ':'));
    			ActiveRoute.setPath('#dashboard');
    		}
    	}
    }
}
