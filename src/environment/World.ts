import { Loopable } from "../engine/GameLoop.js";
import { Handler } from "../engine/Handler.js";
import { EnemyFactory } from "../entities/Enemy.js";
import { Entity, EntityID } from "../entities/Entity.js";
import { Ground } from "../entities/Ground.js";
import { Player } from "../entities/Player.js";
import { Color } from "../graphics/Color.js";
import { Graphics } from "../graphics/Graphics";
import { Counter } from "../math/Counter.js";
import { Dimension } from "../math/Dimension.js";
import { Vector2D } from "../math/Vector2D.js";
import { GameOver } from "../screens/GameOver.js";
import { Clouds } from "./Clouds.js";
import { GameScreen } from "./GameScreen.js";
import { HUD } from "./HUD.js";

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
	private clouds: Clouds;
	
	private enemyFactory: EnemyFactory;
	
	private handler: Handler<Entity>;
	
	private score: Counter;
	private difficulty: Counter;
	private hud: HUD;
	
	private timer: Counter;
	
	private gameOver: GameOver;
	
	constructor() {
		this.screenSize = GameScreen.size();
		
		this.info = {
			groundHeight: 100,
			gravity: new Vector2D(0, 0.68),
			spawnPoint: new Vector2D(25, this.screenSize.height - 64 * 3)
		};
		
		this.ground = new Ground(this.info.groundHeight, this.screenSize);
		this.player = new Player(this.info);
		this.clouds = new Clouds(0.1);
		
		this.enemyFactory = new EnemyFactory(this.info);
		
		this.handler = new Handler<Entity>();
		
		this.score = new Counter(0);
		this.difficulty = new Counter(1);
		this.hud = new HUD(this.score, this.difficulty);
		
		this.timer = new Counter(0);
		
		this.gameOver = new GameOver();
		
		this.reset();
	}
	
	public update(): void {
		this.checkPlayerCollision();
		
		if (this.player.isMoving()) {
			this.score.inc();
			if (this.score.value % 500 == 0)
				this.nextLevel();
			
			this.timer.inc();
			if (this.timer.value % 100 == 0)
				this.generateRandEnemy();
			
			this.clouds.update();
		}
		
		if (this.player.isAlive())
			this.handler.update();
		
		this.hud.update();
	}
	
	public render(gfx: Graphics): void {
		gfx.fillBackground(Color.LightBlue);
		this.handler.render(gfx);
		
		this.clouds.render(gfx);
		
		if (!this.player.isAlive())
			this.gameOver.render(gfx);
	}
	
	private checkPlayerCollision(): void {
		for (let i = 0; i < this.handler.length; i++) {
			const e = this.handler.get(i);
			if (!e.is(EntityID.Player))
				if (this.player.getBounds().intersects(e.getBounds()))
					this.player.hit(e);
		}
	}
	
	private generateSpeed(): number {
		return this.difficulty.value * 5;
	}
	
	private nextLevel(): void {
		this.difficulty.inc();
		this.clouds.setRelativeSpeedX(this.generateSpeed());
	}
	
	private generateRandEnemy(): void {
		const speed = this.generateSpeed();
		this.handler.add(this.enemyFactory.generateRandom(speed));
	}
	
	public reset(): void {
		this.difficulty.value = 1;
		this.score.value = 0;
		this.timer.value = 0;
		this.player.reset();
		
		this.handler.clear();
		this.handler.add(this.ground);
		this.handler.add(this.player);
		
		this.clouds.setRelativeSpeedX(this.generateSpeed());
	}
	
}
