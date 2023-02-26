import { Color } from "../graphics/Color.js";
import { Graphics } from "../graphics/Graphics.js";
import { Rectangle } from "../math/Rectangle.js";
import { Entity } from "./Entity.js";

export class Ground extends Entity {
	
	private upperBounds: Rectangle;
	
	private upperColor: Color;
	private lowerColor: Color;
	
	constructor(height: number, gfx: Graphics) {
		super(0, gfx.height - height, gfx.width, height);
		
		this.upperBounds = new Rectangle(
			0, gfx.height - height, gfx.width, height * 0.125
		);
		
		this.upperColor = Color.Green;
		this.lowerColor = Color.Brown;
	}
	
	public update(): void {}
	
	public render(gfx: Graphics): void {
		gfx.draw(this.bounds, Color.Black, 3);
		gfx.fill(this.bounds, this.lowerColor);
		gfx.draw(this.upperBounds, Color.Black, 3);
		gfx.fill(this.upperBounds, this.upperColor);
	}
	
}
