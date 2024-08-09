import AbstractGameElement from "./AbstractGameElement.ts";
import Position from "../domain/Position.ts";
import Config from "./Config.ts";

export default class Paddle extends AbstractGameElement {

    private intervalId: number | undefined;

    constructor(width: number, height: number) {
        super(null)
        this.className = 'paddle';
        this.position = new Position(width, height, 0, 720);
    }

    validateAndFixPosition(): void {
        if (this.position.left <= 0) {
            this.position.left = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }

        if (this.position.left >= Config.WIDTH - this.position.width) {
            this.position.left = Config.WIDTH - this.position.width;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        this.markAsDirty();
    }


    startMove(step: number): void {
        if (this.intervalId !== undefined) return;

        this.intervalId = setInterval(() => {
            this.position.left += step * -(Config.PADDLE_STEP);
            this.validateAndFixPosition();
        }, 40)
    }

    stopMove(): void {
        if (!this.intervalId) return;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
        this.validateAndFixPosition();
    }
}