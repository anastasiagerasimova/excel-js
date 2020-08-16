export class TableSelection {
	static className = 'selected'
	constructor() {
		this.group = [];
		this.current = null;
	}
	// $el instanceof Dom === true
	select($el) {
		this.clear();
		// Сохранение выбранных ячеек в масссиве,
		// позволяет избежать лишнич запросов к DOM и сразу обращаться к массиву
		this.group.push($el);
		this.current = $el;
		$el.focus().addClass(TableSelection.className);
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className));
		this.group = [];
	}

	selectGroup($group) {
		this.clear();
		this.group = $group;
		this.group.forEach($el=> {
			$el.addClass(TableSelection.className);
		});
	}
}
