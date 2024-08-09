import {IGameElements} from "../interfaces/IGameElements.ts";
import GameState from "../domain/GameState.ts";
import Config from "./Config.ts";
import IPosition from "../interfaces/IPosition.ts";
import {IBallPosition} from "../interfaces/IBallPosition.ts";

export default class CollisionDetector {
    gameElements: IGameElements;
    gameState: GameState;

    constructor(gameElements: IGameElements, gameState: GameState) {
        this.gameElements = gameElements;
        this.gameState = gameState;
    }


    detect() {
        let paddlePos = this.gameElements.paddle.getBoundaries();
        let ballPos = this.gameElements.ball.getBoundaries();

        this.detectPaddle(ballPos, paddlePos);
        this.detectBorders(ballPos);
        this.detectBottom(ballPos);
        this.detectBricks(ballPos);

    }

    detectPaddle(ballPos: IBallPosition, paddlePos: IPosition) {
        if (ballPos.bottom >= paddlePos.top &&
            ballPos.top < paddlePos.bottom &&
            ballPos.right >= paddlePos.left &&
            ballPos.left <= paddlePos.right) {

            ballPos.top = paddlePos.top - ballPos.height - 1;

            let collidePoint = (ballPos.centerX - (paddlePos.left + paddlePos.width / 2)) / (paddlePos.width / 2);

            let distance = collidePoint - paddlePos.left;
            let length = paddlePos.width;
            let angleRad = (distance / length - 0.5) / 2 * Math.PI;

            this.gameElements.ball.setVelocity(angleRad);
            this.gameElements.ball.increaseSpeed();
        }
    }

    detectBricks(ballPos: IBallPosition) {
        let collisionDetected = false;
        let bricksLeft = 0;
        for (let row = 0; row < this.gameElements.bricks.length; row++) {
            for (let col = 0; col < this.gameElements.bricks[row].length; col++) {
                let brick = this.gameElements.bricks[row][col];

                if (!brick || brick.isDestroyed()) {
                    continue;
                }
                bricksLeft += 1;
                let brickPos = brick.getBoundaries();
                if (!collisionDetected && ballPos.right > brickPos.left && ballPos.left < brickPos.right &&
                    ballPos.bottom > brickPos.top && ballPos.top < brickPos.bottom) {

                    let ballPreviousPosition = {
                        left: ballPos.left - ballPos.velocityX,
                        top: ballPos.top - ballPos.velocityY,
                        right: ballPos.left + ballPos.width - ballPos.velocityX,
                        bottom: ballPos.top + ballPos.height - ballPos.velocityY
                    };

                    if (ballPreviousPosition.bottom <= brickPos.top || ballPreviousPosition.top >= brickPos.bottom) {
                        this.gameElements.ball.changeVelocityY();
                    } else if (ballPreviousPosition.right <= brickPos.left || ballPreviousPosition.left >= brickPos.right) {
                        this.gameElements.ball.changeVelocityX();
                    }
                    this.gameElements.ball.increaseSpeed();
                    brick.setDestroyed();
                    brick.markAsDirty();
                    this.gameState.score += brick.points;

                    bricksLeft -= 1;
                    collisionDetected = true;
                }
            }
        }
        this.gameState.bricksLeft = bricksLeft;
    }

    detectBottom(ballPos: IPosition) {
        if (ballPos.bottom >= Config.HEIGHT) {
            this.gameState.balls -= 1;
            this.gameElements.ball.reset();
            console.log("Ball hit the bottom, turn", this.gameState.balls);
        }
    }

    detectBorders(position: IPosition) {
        if (position.left < 0 || position.left > Config.WIDTH - position.width) {
            this.gameElements.ball.changeVelocityX();
        }
        if (position.top < 0 || position.top > Config.HEIGHT - position.height) {
            this.gameElements.ball.changeVelocityY();
        }
    }
}