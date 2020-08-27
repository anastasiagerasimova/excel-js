export class ActiveRoute {
	static get path() {
		return window.location.hash.slice(1);
	}

	static setPath(str) {
		window.location.hash = str;
	}

	static get param() {
		return ActiveRoute.path.split('/')[1];
	}
}
