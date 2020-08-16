export class Emitter {
	constructor() {
		this.listeners = {};
	}

	// dispatch, fire, trigger
  	// Уведомляем слушателей если они есть
  	// table.emit('table:select', {a: 1})
	emit(event, data) {
		// Проверка является ли this.listeners[event] массивом
		if (!Array.isArray(this.listeners[event])) {
			// Если this.listeners[event] массив, возвращаем false
			// Дальнейший код не выполняется
			return false;
		}
		this.listeners[event].forEach(listener => {
			listener(data);
		});
	}

	// on, listen
  	// Подписываемся на уведомление
  	// Добавляем нового слушателя
  	// formula.subscribe('table:select', () => {})
	subscribe(event, fn) {
		// this.listener[event] = this.listener[event] || [];
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(fn);
		return () => {
			this.listeners[event] = this.listeners[event].filter(listener => {
				return listener !== fn;
			});
		};
	}
}

