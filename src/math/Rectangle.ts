import { Dimension } from "./Dimension.js";
import { Vector2D } from "./Vector2D.js";

export class Rectangle {
	
	public pos: Vector2D;
	public size: Dimension;
	
	constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
		this.pos = new Vector2D(x, y);
		this.size = new Dimension(width, height);
	}
	
	public intersects(r: Rectangle): boolean {
		const xOverlap =
			this.pos.x + this.size.width >= r.pos.x &&
			r.pos.x + r.size.width >= this.pos.x;
		
		const yOverlap =
			this.pos.y + this.size.height >= r.pos.y &&
			r.pos.y + r.size.height >= this.pos.y;
		
		return xOverlap && yOverlap;
	}
	
}
