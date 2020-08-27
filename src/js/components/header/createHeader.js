function toButton(button) {
	return `<button class="button">
				<i class="material-icons" data-action=${button.action}>
					${button.icon}
				</i>
            </button>`;
}

export function creatHeader(state) {
	const buttons = [
		{
			icon: 'delete',
			action: 'delete',
		},
		{
			icon: 'exit_to_app',
			action: 'exit',
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


