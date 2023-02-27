import { Dimension } from "../math/Dimension";

/**
 * Store all the information about the screen in one place
 * to make accessing to it easier and more concise.
 */
export namespace Screen {
	
	export const CANVAS_ID = "gameCanvas";
	
	let _size: Dimension;
	
	/**
	 * @returns the dimensions of the screen.
	 */
	export function size(): Dimension {
		if (_size === undefined) {
			const canv = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
			_size = new Dimension(canv.width, canv.height);
		}
		return _size;
	}
	
}
