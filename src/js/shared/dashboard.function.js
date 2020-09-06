import {storage} from '../core/utils';

export function toHTML(key) {
	const model = storage(key);
	const date = new Date(model.openedDate);
	return `<li class="db__record">
                <a href="#${key.replace(':', '/')}">${model.title}</a>
                <strong>
                    ${date.toLocaleDateString()}
                    ${date.toLocaleTimeString()}
                </strong>
            </li>`;
}

export function createRecordsTable() {
	const keys = getAllKeys();

	if (!keys.length) {
		return `<p>Вы пока не создали ни одной таблицы</p>`;
	}

	return `<div class="db__list-header">
                <span>Нвзвание таблицы</span>
                <span>Дата открытия</span>
            </div>
            <ul class="db__list">
               ${keys.map(toHTML).join('')}
            </ul>`;
}

function getAllKeys() {
	const keys = [];
	for (let i=0; i<localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key.includes('excel')) {
			keys.push(key);
		}
	}
	return keys;
}
