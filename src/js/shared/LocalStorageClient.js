import {storage} from '../core/utils';

function storageName(param) {
	return 'excel:' + param;
}

export class LocalStorageClient {
	constructor(param) {
		this.name = storageName(param);
	}

	save(state) {
		storage(this.name, state);
		return Promise.resolve();
	}

	get() {
		// return storage(this.name);
		return new Promise(resolve => {
			const state = storage(this.name);

			setTimeout(() => {
			  resolve(state);
			}, 3000);
		});
	}
}
