import { GameLoop } from "./engine/GameLoop.js";
import { KeyCode, Keys } from "./engine/Keys.js";
import { Ground } from "./entities/Ground.js";
import { Color } from "./graphics/Color.js";
import { Graphics } from "./graphics/Graphics.js";

let gfx = new Graphics("gameCanvas");
let keyboard = Keys.instance;

let ground = new Ground(100, gfx);

function update() {
	if (keyboard.isPressed(KeyCode.A))
		console.log("A");
	
	keyboard.update();
}

function render() {
	gfx.fillBackground(Color.Grey);
	
	ground.render(gfx);
}

let looper = GameLoop.instance;
looper.updateFunction = update;
looper.renderFunction = render;
looper.start();
