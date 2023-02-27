import { GameLoop } from "./engine/GameLoop.js";
import { KeyCode, Keys } from "./engine/Keys.js";
import { Ground } from "./entities/Ground.js";
import { World } from "./environment/World.js";
import { Color } from "./graphics/Color.js";
import { Graphics } from "./graphics/Graphics.js";
import { SpriteManager } from "./graphics/SpriteManager.js";

// Setup the graphics class.
let gfx = new Graphics("gameCanvas");
// Setup the keyboard listener.
let keyboard = Keys.instance;

// Setup the sprites for the game.
let sprites = SpriteManager.instance;
sprites.addClass("clouds");
sprites.addId("playerStanding");
sprites.addClass("playerRunning");
sprites.addId("tallEnenmy");
sprites.addId("shortEnemy");
sprites.addId("flyingEnemy");
sprites.addId("gameOver");

let world = new World(gfx);

let looper = GameLoop.instance;

looper.updateFunction = () => {
	world.update();
	
	keyboard.update();
};

looper.renderFunction = () => {
	gfx.fillBackground(Color.LightBlue);
	
	world.render(gfx);
};

looper.start();
