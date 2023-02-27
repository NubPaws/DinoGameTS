import { Loopable } from "../engine/GameLoop.js";
import { Graphics } from "../graphics/Graphics.js";
import { Rectangle } from "../math/Rectangle.js";
import { Vector2D } from "../math/Vector2D.js";

export enum EntityID {
	Player, Ground, Enemy
}

export abstract class Entity implements Loopable {
	
	protected id: EntityID;
	
	protected bounds: Rectangle;
	protected direction: Vector2D;
	
	constructor(x: number, y: number, width: number, height: number, id: EntityID) {
		this.bounds = new Rectangle(x, y, width, height);
		this.direction = new Vector2D;
		this.id = id;
	}
	
	public abstract update(): void;
	public abstract render(gfx: Graphics): void;
	
	public abstract hit(e: Entity): void;
	
	public getBounds(): Rectangle {
		return this.bounds;
	}
	
	public setDirection(dir: Vector2D): void {
		this.direction = dir;
	}
	
	public getDirection(): Vector2D {
		return this.direction;
	}
	
	public is(id: EntityID): boolean {
		return this.id == id;
	}
	
}
