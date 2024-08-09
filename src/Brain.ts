import Paddle from "./components/Paddle.js";
import Ball from "./components/Ball.js";
import CollisionDetector from "./components/CollisionDetector.ts";
import BrickFactory from "./components/BrickFactory.js";
import LocalStorageScorePersistence from "./components/LocalStorageScorePersistence.js";
import GameState from "./domain/GameState.ts";
import IPersistence from "./interfaces/IPersistence.ts";
import Config from "./components/Config.ts";
import {IGameElements} from "./interfaces/IGameElements.ts";
import IScore from "./interfaces/IScore.ts";


export default class Brain {

    gameElements: IGameElements;
    scorePersistence: IPersistence;
    collisionDetector: CollisionDetector;
    gameState: GameState = new GameState();
    bricksBuilder = new BrickFactory(Config.BRICK_STRUCTURE);

    constructor() {
        this.gameElements = this.newGameElements();
        this.scorePersistence = new LocalStorageScorePersistence();
        this.collisionDetector = new CollisionDetector(this.gameElements, this.gameState);
        this.newGame()
        console.log("Brain constructor...")
    }

    newGame() {
        this.gameState = new GameState();
        this.newGameBoard();
    }

    newGameElements(): IGameElements {
        return {
            "ball": new Ball(),
            "paddle": new Paddle(Config.BRICK_WIDTH, Config.BRICK_HEIGHT),
            "bricks": this.bricksBuilder.getBricks()
        }
    }

    newGameBoard() {
        this.gameElements = this.newGameElements();
        this.gameElements.ball.setInitialSpeed(this.gameState.level)

        this.gameState.newGameBoard = true;
        this.collisionDetector = new CollisionDetector(this.gameElements, this.gameState);
        this.togglePause();
    }

    playGame() {
        if (!this.gameState.isPaused && this.isNewLevel()) {
            this.prepareNewLevel();
            this.gameState.isPaused = true;
        }
        else if (this.isGameOver() || this.gameState.isPaused) {
            return;
        }

        if (!this.gameState.isPaused && this.gameState.showNewLevelScreen) {
            this.gameState.showNewLevelScreen = false;
            return;
        }
        if (this.gameState.newGame) {
            this.gameState.newGame = false;
        }

        this.collisionDetector.detect();
        this.moveBall();
    }

    isNewLevel() {
        if (this.gameState.balls > 0 && this.gameState.bricksLeft <= 0 && !this.gameState.newLevel) {
            this.gameState.newLevel = true;
            return true;
        }
        return false;
    }

    prepareNewLevel() {
        this.gameState.showNewLevelScreen = true;
        this.gameState.newLevel = false;
        this.gameState.level += 1;
        this.newGameBoard();
    }

    togglePause() {
        if (this.gameState.gameOver) {
            return;
        }
        return this.gameState.isPaused = !this.gameState.isPaused;
    }

    isGameOver() {
        if (this.gameState.balls > 0 && this.gameState.bricksLeft <= 0) {
            return false;
        }
        if (this.gameState.balls > 0 && !this.gameState.gameOver) {
            return false;
        }
        this.togglePause();
        return this.gameState.gameOver = true;
    }

    moveBall() {
        if (!this.gameElements.ball.isActive()) {
            return
        }
        this.gameElements.ball.moveBall();
    }

    startMovePaddle(step: number): void {
        this.gameElements.paddle.startMove(step);
    }

    stopMovePaddle(): void {
        this.gameElements.paddle.stopMove();
    }

    getScores(): IScore[] {
        return this.scorePersistence?.getAll();
    }

    saveScore(score: IScore): void {
        this.scorePersistence.save(score);
    }
}