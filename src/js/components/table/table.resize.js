import {$} from '../../core/dom';

export function resizeHandler(event, $root) {
	event.preventDefault();

	const $resizer = $(event.target);
	const $parent = $resizer.closest('[data-type="resizable"]');
	const char = $parent.data.col;
	const coordsParent = $parent.getCoords();
	const type = $resizer.data.resize;
	const sideProp = type === 'col' ? 'bottom' : 'right';
	let value;

	$resizer.css({
		opacity: 1,
		[sideProp]: '-1000px',
	});

	document.onmousemove = (e => {
		if (type === 'col') {
			const resizerwidth = $resizer.getCoords().width;
			const delta = e.pageX - coordsParent.right;
			value = coordsParent.width + delta;
			$resizer.css({right: -(delta + resizerwidth) + 'px'});
		} else {
			const resizerHeight = $resizer.getCoords().height;
			const delta = e.pageY - coordsParent.bottom;
			value = coordsParent.height + delta;
			$resizer.css({bottom: -(delta + resizerHeight) + 'px'});
		}
	});

	event.target.onmouseup = (() => {
		document.onmousemove = null;
		event.target.onmouseup = null;

		if (type === 'col') {
			// Изменение ширины колоноки
			$parent.css({width: value + 'px'});

			// Изменение ширины всех ячеек под колонкой, которую ресайзили
			const cells = $root.findAll(`[data-col="${char}"]`);
			cells.forEach(el => {
				$(el).css({width: value + 'px'});
			});
		} else {
			// Изменение высоты строк
			$parent.css({height: value + 'px'});
		}
		$resizer.css({
			opacity: 0,
			bottom: 0,
			right: 0,
		});
	});
}
