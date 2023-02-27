import { Loopable } from "../engine/GameLoop.js";
import { Handler } from "../engine/Handler.js";
import { Entity, EntityID } from "../entities/Entity.js";
import { Ground } from "../entities/Ground.js";
import { Player } from "../entities/Player.js";
import { Graphics } from "../graphics/Graphics";
import { Dimension } from "../math/Dimension.js";
import { Vector2D } from "../math/Vector2D.js";
import { GameScreen } from "./GameScreen.js";

export class WorldInfo {
	
	public readonly groundHeight: number;
	public readonly gravity: Vector2D;
	public readonly spawnPoint: Vector2D;
	
}

export class World implements Loopable {
	
	private info: WorldInfo;
	private screenSize: Dimension;
	
	private ground: Ground;
	private player: Player;
	
	private handler: Handler<Entity>;
	
	constructor() {
		this.screenSize = GameScreen.size();
		
		this.info = {
			groundHeight: 100,
			gravity: new Vector2D(0, 0.68),
			spawnPoint: new Vector2D(25, this.screenSize.height - 64 * 3)
		};
		
		this.ground = new Ground(this.info.groundHeight, this.screenSize);
		this.player = new Player(this.info);
		
		this.handler = new Handler<Entity>();
		
		this.handler.add(this.ground);
		this.handler.add(this.player);
	}
	
	public update(): void {
		this.checkPlayerCollision();
		
		this.handler.update();
	}
	
	public render(gfx: Graphics): void {
		this.handler.render(gfx);
	}
	
	private checkPlayerCollision(): void {
		for (let i = 0; i < this.handler.length; i++) {
			const e = this.handler.get(i);
			if (!e.is(EntityID.Player))
				if (this.player.getBounds().intersects(e.getBounds()))
					this.player.hit(e);
		}
	}
	
}
