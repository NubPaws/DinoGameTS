import { Graphics } from "../graphics/Graphics.js";
import { Rectangle } from "../math/Rectangle.js";
import { Vector2D } from "../math/Vector2D.js";

export abstract class Entity {
	
	protected bounds: Rectangle;
	protected direction: Vector2D;
	
	constructor(x: number, y: number, width: number, height: number) {
		this.bounds = new Rectangle(x, y, width, height);
		this.direction = new Vector2D;
	}
	
	public abstract update(): void;
	public abstract render(gfx: Graphics): void;
	
	public getBounds(): Rectangle {
		return this.bounds;
	}
	
	public setDirection(dir: Vector2D): void {
		this.direction = dir;
	}
	
	public getDirection(): Vector2D {
		return this.direction;
	}
	
}
