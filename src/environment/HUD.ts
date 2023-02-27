import { Updatable } from "../engine/GameLoop.js";
import { Counter } from "../math/Counter.js";
import { GameScreen } from "./GameScreen.js";

/**
 * Class to represent the heads up display (HUD).
 */
export class HUD implements Updatable {
	
	private score: Counter;
	private difficulty: Counter;
	private hudText: HTMLSpanElement;
	
	constructor(score: Counter, difficulty: Counter) {
		this.score = score;
		this.difficulty = difficulty;
		this.hudText = document.getElementById(GameScreen.HUD_ID) as HTMLSpanElement;
	}
	
	public update(): void {
		let text = "";
		text += `Score: ${this.score}`;
		text += `<br />`;
		text += `Difficulty: ${this.difficulty}`;
		this.hudText.innerHTML = text;
	}
	
}
