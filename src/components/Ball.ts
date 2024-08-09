import AbstractGameElement from "./AbstractGameElement.ts";
import Position from "../domain/Position.ts";
import IPosition from "../interfaces/IPosition.ts";
import {IVelocity} from "../interfaces/IVelocity.ts";
import {IBallPosition} from "../interfaces/IBallPosition.ts";
import Config from "./Config.ts";

export default class Ball extends AbstractGameElement {

    velocity: IVelocity;
    initialSpeed = 5;
    speed = 0;
    minVerticalSpeed = 2;

    constructor() {
        super(null);
        this.className = 'ball';
        this.velocity = this.getInitialVelocity();
        this.reset();
    }

    getInitialPosition(): IPosition {
        let left = (Config.WIDTH / 2) - 10 | 0;
        return new Position(20, 15, left, 200);
    }

    getInitialVelocity(): IVelocity {
        const angle = (Math.PI / 3) + (Math.random() * (Math.PI / 3));
        return {
            x: Math.cos(angle) * this.initialSpeed,
            y: Math.sin(angle) * this.initialSpeed
        };
    }

    setVelocity(angleRad: number): void {
        this.velocity.x = Math.cos(angleRad) * this.speed;
        this.velocity.y = -Math.abs(Math.sin(angleRad) * this.speed);
    }

    increaseSpeed(): void {
        this.speed += Config.BALL_SPEED_INCREMENT;
        if (this.speed > Config.BALL_MAX_SPEED) {
            this.speed = Config.BALL_MAX_SPEED;
        }
    }

    changeVelocityX(): void {
        this.velocity.x *= -1;
    }

    changeVelocityY(): void {
        this.velocity.y *= -1;
    }

    updatePosition(): void {
        if (!this.active) return;
        const minVerticalSpeed = this.minVerticalSpeed;

        if (Math.abs(this.velocity.y) < minVerticalSpeed) {
            this.velocity.y = this.velocity.y < 0 ? -minVerticalSpeed : minVerticalSpeed;
        }
        this.position.left += this.velocity.x;
        this.position.top += this.velocity.y;
    }

    moveBall(): void {
        if (!this.active) {
            return
        }

        this.updatePosition();
    }

    getBoundaries(): IBallPosition {
        const boundaries = <IBallPosition> super.getBoundaries();
        boundaries.velocityX = this.velocity.x;
        boundaries.velocityY = this.velocity.y;
        boundaries.centerX = boundaries.left + (boundaries.width / 2);

        return boundaries;
    }

    reset(): void {
        this.position = this.getInitialPosition();
        this.velocity = this.getInitialVelocity();
        this.speed = this.initialSpeed;
    }

    setInitialSpeed(level: number): void {
        this.initialSpeed = Config.BALL_BASE_SPEED + (level - 1) * 2;
        this.speed = this.initialSpeed;
    }
}