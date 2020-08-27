import {
	TABLE_RESIZE,
	CHANGE_TEXT,
	CHANGE_STYLES,
	APPLY_STYLE,
	CHANGE_TITLE,
	UPDATE_DATA,
} from './type';

// Pure function
export function rootReducer(state, action) {
	let prevState;
	let field;
	switch (action.type) {
	case TABLE_RESIZE:
		field = action.data.type === 'col' ? 'colState' : 'rowState';
		prevState = state[field] || {};
		prevState[action.data.id] = action.data.value;
		return {...state, [field]: prevState};
	case CHANGE_TEXT:
		field = 'dataState';
		prevState = state[field] || {};
		prevState[action.data.id] = action.data.value;
		return {...state, [field]: prevState, currentText: action.data.value};
	case CHANGE_STYLES:
		return {...state, currentStyles: action.data};
	case APPLY_STYLE:
		field = 'stylesState';
		prevState = state[field] || {};
		action.data.ids.forEach(id => {
			prevState[id] = {...prevState[id], ...action.data.value};
		});
		return {
		  ...state,
		  [field]: prevState,
		  currentStyles: {...state.currentStyles, ...action.data.value},
		};
	case CHANGE_TITLE:
		return {...state, title: action.data};
	case UPDATE_DATA:
		return {...state, openedDate: new Date().toJSON()};
	default:
		return state;
	}
}
