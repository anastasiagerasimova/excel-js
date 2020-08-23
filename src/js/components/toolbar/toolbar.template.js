function toButton(button) {
	const value = JSON.stringify(button.value);
	return `<button
            data-value='${value}'
            data-type="button"
            class="button ${button.active ? 'active' : ''}">
                <i class="material-icons">${button.icon}</i>
            </button>`;
}

export function createToolbar(state = {}) {
	const buttons = [
		{
			icon: 'format_align_left',
			value: {textAlign: 'left'},
			active: state.textAlign === 'left',
		},
		{
			icon: 'format_align_center',
			value: {textAlign: 'center'},
			active: state.textAlign === 'center',
		},
		{
			icon: 'format_align_right',
			value: {textAlign: 'right'},
			active: state.textAlign === 'right',
		},
		{
			icon: 'format_bold',
			value: {fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold'},
			active: state.fontWeight === 'bold',
		},
		{
			icon: 'format_italic',
			value: {fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'},
			active: state.fontStyle === 'italic',
		},
		{
			icon: 'format_underlined',
			value: {
				textDecoration: state.textDecoration === 'underline'
					? 'none'
					: 'underline',
			},
			active: state.textDecoration === 'underline',
		},
	];
	const toolbar = buttons.map(toButton);
	return toolbar.join('');
}
