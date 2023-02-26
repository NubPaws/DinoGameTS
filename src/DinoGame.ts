import { GameLoop } from "./engine/GameLoop.js";
import { Color } from "./graphics/Color.js";
import { Graphics } from "./graphics/Graphics.js";

let gfx = new Graphics("gameCanvas");

gfx.fillBackground(Color.Cyan);

let i = 0;
const colors = [Color.Black, Color.Brown];

function update() {
	console.log("Something")
}

function render() {
	gfx.fillBackground(colors[i++ % 2]);
}

let looper = GameLoop.instance;
looper.updateFunction = update;
looper.renderFunction = render;
looper.start();
