import { Loopable } from "../engine/GameLoop.js";
import { Ground } from "../entities/Ground.js";
import { Player } from "../entities/Player.js";
import { Graphics } from "../graphics/Graphics";
import { Vector2D } from "../math/Vector2D.js";

export class WorldInfo {
	
	public readonly groundHeight: number;
	public readonly gravity: Vector2D;
	
	constructor(groundHeight: number, gravity: Vector2D) {
		this.groundHeight = groundHeight;
		this.gravity = gravity;
	}
	
}

export class World implements Loopable {
	
	private info: WorldInfo;
	
	private ground: Ground;
	private player: Player;
	
	constructor(gfx: Graphics) {
		this.info = new WorldInfo(100, new Vector2D(0.68));
		
		this.ground = new Ground(this.info.groundHeight, gfx);
		this.player = new Player(this.ground, this.info);
	}
	
	public update(): void {
		
		this.ground.update();
		this.player.update();
		
	}
	
	public render(gfx: Graphics): void {
		
		this.ground.render(gfx);
		this.player.render(gfx);
		
	}
	
}
