import { GameLoop } from "./engine/GameLoop.js";
import { KeyCode, Keys } from "./engine/Keys.js";
import { Color } from "./graphics/Color.js";
import { Graphics } from "./graphics/Graphics.js";

let gfx = new Graphics("gameCanvas");
let keyboard = Keys.instance;

function update() {
	if (keyboard.isPressed(KeyCode.A))
		console.log("A");
}

function render() {
	gfx.fillBackground(Color.Grey);
}

let looper = GameLoop.instance;
looper.updateFunction = update;
looper.renderFunction = render;
looper.start();
