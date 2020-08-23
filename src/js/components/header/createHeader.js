function toButton(button) {
	return `<button class="button">
                <i class="material-icons">${button.icon}</i>
            </button>`;
}

export function creatHeader(state) {
	const buttons = [
		{
			icon: 'delete',
		},
		{
			icon: 'exit_to_app',
		},
	];

	const btn = buttons
		.map(toButton)
		.join('');

	return `<input type="text" class="input" value="${state.title}">
                <div>
                    ${btn}
                </div>`;
}


