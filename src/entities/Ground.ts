import { Color } from "../graphics/Color.js";
import { Graphics } from "../graphics/Graphics.js";
import { Rectangle } from "../math/Rectangle.js";
import { Entity } from "./Entity.js";

/**
 * Represents the ground of the game. The base from where nothing
 * can be below. This will help us indicate when the user hits the
 * ground to stop him from falling through. Also helps in centering
 * the player to the center of the screen.
 */
export class Ground extends Entity {
	
	private upperBounds: Rectangle;
	
	private upperColor: Color;
	private lowerColor: Color;
	
	/**
	 * @param height the height the ground should be.
	 * @param gfx the graphics instance of the game.
	 */
	constructor(height: number, gfx: Graphics) {
		super(0, gfx.height - height, gfx.width, height);
		
		// Set the upper portion of the ground relative to the height.
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