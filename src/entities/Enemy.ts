import { GameScreen } from "../environment/GameScreen.js";
import { WorldInfo } from "../environment/World.js";
import { Graphics } from "../graphics/Graphics.js";
import { Sprite, SpriteManager } from "../graphics/SpriteManager.js";
import { Dimension } from "../math/Dimension.js";
import { Vector2D } from "../math/Vector2D.js";
import { Entity, EntityID } from "./Entity.js";

export class Enemy extends Entity {
	
	private img: Sprite;
	
	constructor(x: number, y:number, width: number, height: number, img: Sprite, speed: Vector2D) {
		super(x, y, width, height, EntityID.Enemy);
		
		this.img = img;
		this.direction = speed.toFlipped();
	}
	
	public update(): void {
		this.bounds.pos.add(this.direction);
	}
	
	public render(gfx: Graphics): void {
		gfx.drawImageInBounds(this.img, this.bounds);
	}
	
	public hit(e: Entity): void {}
	
}

export enum EnemyType {
	Short, Tall, Flying
}

export class EnemyFactory {
	
	private shortImage: Sprite;
	private tallImage: Sprite;
	private flyingImage: Sprite;
	
	private screenSize: Dimension;
	private worldInfo: WorldInfo;
	
	constructor(worldInfo: WorldInfo) {
		const sm = SpriteManager.instance;
		
		this.shortImage = sm.get("shortEnemy");
		this.tallImage = sm.get("tallEnemy");
		this.flyingImage = sm.get("flyingEnemy");
		
		this.screenSize = GameScreen.size();
		this.worldInfo = worldInfo;
	}
	
	public generate(speed: number, type: EnemyType): Enemy {
		let width: number;
		let height: number;
		let image: Sprite;
		
		switch (type) {
		case EnemyType.Tall:
			width = 32;
			height = 64;
			image = this.tallImage;
		case EnemyType.Short:
			width = 48;
			height = 32;
			image = this.shortImage;
		case EnemyType.Flying:
			width = 32;
			height = 24;
			image = this.flyingImage;
		}
		
		let dir = new Vector2D(0, -speed);
		let x = this.screenSize.width;
		let y = this.screenSize.height - this.worldInfo.groundHeight;
		
		if (type === EnemyType.Flying)
			y -= (Math.random() * 120 + 70);
		
		return new Enemy(x, y, width, height, image, dir);
	}
	
	public generateRandom(speed: number): Enemy {
		return this.generate(speed, Math.round(Math.random() * 3));
	}
	
}
