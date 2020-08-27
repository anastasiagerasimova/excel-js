// import {Excel} from './components/excel/Excel';
// import {Header} from './components/header/Header';
// import {Toolbar} from './components/toolbar/Toolbar';
// import {Formula} from './components/formula/Formula';
// import {Table} from './components/table/Table';
// import {rootReducer} from './redux/rootReducer';
// import {createStore} from './core/createStore';
// import {storage} from './core/utils';
// import {initialState} from './redux/initialState';
// import {debounce} from './core/utils';
// import '../scss/index.scss';

// const store = createStore(rootReducer, initialState);

// const stateListener = debounce(state =>{
// 	storage('excel-state', state);
// }, 300);
// store.subscribe(stateListener);

// const excel = new Excel('#app', {
// 	components: [Header, Toolbar, Formula, Table],
// 	store,
// });

// excel.render();

import {Router} from './core/routes/Router';
import {DashboardPage} from './pages/DashboardPage';
import {ExcelPage} from './pages/ExcelPage';
import '../scss/index.scss';

new Router('#app', {
	dashboard: DashboardPage,
	excel: ExcelPage,
});
