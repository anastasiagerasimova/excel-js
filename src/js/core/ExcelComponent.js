import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.store = options.store;
		this.unsubscribers = [];
		// this.storeSub = null;
		this.subscribe = options.subscribe || [];

		this.prepare();
	}

	// Врзвращаем шаблон компанента
	toHTML() {
		return '';
	}

	// Настраивааем наш компонент до init
	prepare() {}

	// Уведомляем слушателя о событии event
	$emit(evnet, ...args) {
		this.emitter.emit(evnet, ...args);
	}

	// Подписывапемся на событие event
	$on(evnet, fn) {
		const unsubs = this.emitter.subscribe(evnet, fn);
		this.unsubscribers.push(unsubs);
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}

	storeChanged() {
	}

	isWatching(key) {
		return this.subscribe.includes(key);
	}

	// Инициализиоруем компонент
	// Добавляем DOM слушателей
	init() {
		this.initDOMListeners();
	}

	// Удаляем коспонент
	// Чистим слушателей
	// Удаляем подписки
	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach(unsub => unsub());
		// this.storeSub.unsubscribe();
	}
}
