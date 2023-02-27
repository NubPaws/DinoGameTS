import { KeyCode, Keys } from "../engine/Keys.js";
import { WorldInfo } from "../environment/World.js";
import { Animation } from "../graphics/Animation.js";
import { Graphics } from "../graphics/Graphics.js";
import { Sprite, SpriteManager } from "../graphics/SpriteManager.js";
import { Vector2D } from "../math/Vector2D.js";
import { Entity, EntityID } from "./Entity.js";
import { Ground } from "./Ground.js";

export class Player extends Entity {
	
	private alive: boolean;
	private moving: boolean;
	private jumping: boolean;
	private jumpingTimer: number;
	
	private jumpingForce: Vector2D;
	
	private standingSprite: Sprite;
	private runningAnimation: Animation;
	
	private worldInfo: WorldInfo;
	
	private keyboard: Keys;
	
	constructor(ground: Ground, worldInfo: WorldInfo) {
		super(0, 0, 28, 64, EntityID.Player);
		
		this.jumpingForce = new Vector2D(0, -10);
		
		const sm = SpriteManager.instance;
		this.standingSprite = sm.get("playerStanding");
		this.runningAnimation = new Animation(8,
			"playerRunning_1", "playerRunning_2",
			"playerRunning_3", "playerRunning_4"
		);
		
		this.worldInfo = worldInfo;
		
		this.keyboard = Keys.instance;
		
		this.reset();
	}
	
	private reset(): void {
		this.bounds.pos = new Vector2D(25, this.worldInfo.groundHeight - 64 * 2);
		
		this.alive = true;
		this.moving = false;
		this.jumping = false;
		this.direction.set(Vector2D.ZERO);
	}
	
	public update(): void {
		if (this.keyboard.isClicked(KeyCode.Space)) {
			if (!this.moving)
				this.moving = true;
			if (!this.jumping) {
				this.jumping = true;
				this.direction.set(this.jumpingForce);
			}
		}
		
		if (this.moving)
			this.runningAnimation.update();
		
		this.jumpingLogic();
		
		this.bounds.pos.add(this.direction);
		
	}
	
	private jumpingLogic(): void {
		if (!this.jumping)
			return;
		
		this.direction.add(this.worldInfo.gravity);
	}
	
	public render(gfx: Graphics): void {
		if (!this.moving) {
			gfx.drawImageInBounds(this.standingSprite, this.bounds);
		}
	}
	
	public hit(e: Entity): void {
		if (e.is(EntityID.Ground)) {
			
		} else if (e.is(EntityID.Enemy)) {
			this.moving = false;
			this.alive = false;
			this.jumping = false;
			this.direction.set(Vector2D.ZERO);
		}
	}
	
}
