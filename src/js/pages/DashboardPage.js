import {Page} from '../core/page/Page';
import {$} from '../core/dom';
import {createRecordsTable} from '../shared/dashboard.function';

export class DashboardPage extends Page {
	constructor(params) {
		super(params);
	}

	getRoot() {
		const now = Date.now();
		return $.create('div', 'db').html(`<div class="db__header">
                                        <h1>Excel without a framework</h1>
                                    </div>
                                    <div class="db__new">
                                        <div class="db__view">
                                            <a 
                                                href="#excel/${now}" 
                                                class="db__create"
                                            >
                                                Новая </br> таблица
                                            </a>
                                        </div>
                                    </div>
                                    <div class="db__table db__view">
                                        ${createRecordsTable()}
                                    </div>`);
	}
}
