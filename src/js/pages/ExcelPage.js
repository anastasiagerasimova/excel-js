import {Page} from '../core/page/Page';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';
import {rootReducer} from '../redux/rootReducer';
import {createStore} from '.././core/createStore';
import {normalizeInitialState} from '../redux/initialState';
import {StateProcessor} from '../core/page/StateProcessor';
import {LocalStorageClient} from '../shared/LocalStorageClient';

export class ExcelPage extends Page {
	constructor(params) {
		super(params);
		this.storeSub = null;

		// new implementation, DIP
		this.processor = new StateProcessor(
			new LocalStorageClient(this.params)
		);
	}

	async getRoot() {
		// old implementation
		// const state = storage(storageName(this.params));
		// const initialState = normalizeInitialState(state);
		// const store = createStore(rootReducer, initialState);

		// const stateListener = debounce(state =>{
		// 	storage(storageName(this.params), state);
		// }, 300);
		// this.storeSub = store.subscribe(stateListener);

		// new implementation, DIP
		const state = await this.processor.get();
		const initialState = normalizeInitialState(state);
		const store = createStore(rootReducer, initialState);
		this.storeSub = store.subscribe(this.processor.listen);

		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table],
			store,
		});

		return this.excel.getRoot();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
		this.storeSub.unsubscribe();
	}
}
