import AbstractGameElement from "./AbstractGameElement.ts";
import Brain from "../Brain.ts";
import {IWindowElement} from "../interfaces/IWindowElement.ts";
import IPosition from "../interfaces/IPosition.ts";
import GameState from "../domain/GameState.ts";

export default class Header extends AbstractGameElement implements IWindowElement {
    currentScoreElement: HTMLDivElement;
    ballsCountElement: HTMLDivElement;
    maxScoreElement: HTMLDivElement;
    leftOffset: number = 0;


    brain: Brain;
    currentScore: number = 0;
    maxScore: number = 0;
    gameBall: number = 1;

    constructor(appContainer: HTMLDivElement, brain: Brain) {
        super(appContainer);
        this.thisElement = appContainer.querySelector("#header")!;
        this.brain = brain;
        this.currentScoreElement = this.getCurrentScoreElement();
        this.ballsCountElement = this.getBallsCountElement();
        this.maxScoreElement = this.getMaxScoreElement();

        this.setup()
    }

    setup() {
        this.thisElement.style.position = 'fixed';
        this.thisElement.style.top = '0';
        this.thisElement.style.zIndex = '20';
        this.thisElement.style.display = 'flex';
        this.thisElement.style.justifyContent = 'space-between';
        this.thisElement.style.alignItems = 'center';
    }

    updateSize(position: IPosition) {
        this.leftOffset = position.left;
        this.thisElement.style.left = `${position.left}px`;
        this.thisElement.style.width = `${position.width}px`;
        this.thisElement.style.height = `${position.height}px`;

        this.updateHeaderContentPositions();
    }

    updateHeaderContentPositions() {
        const scoreLeft = this.leftOffset + this.thisElement.offsetWidth * 0.02;
        const ballsLeft = this.leftOffset + this.thisElement.offsetWidth * 0.95;
        const maxScoreLeft = this.leftOffset + this.thisElement.offsetWidth * 0.45;

        const verticalPosition = (this.thisElement.offsetHeight - 30) / 2;

        if (this.currentScoreElement) {
            this.currentScoreElement.style.left = `${scoreLeft}px`;
            this.currentScoreElement.style.top = `${verticalPosition}px`;
        }

        if (this.ballsCountElement) {
            this.ballsCountElement.style.left = `${ballsLeft}px`;
            this.ballsCountElement.style.top = `${verticalPosition}px`;
        }

        if (this.maxScoreElement) {
            this.maxScoreElement.style.left = `${maxScoreLeft}px`;
            this.maxScoreElement.style.top = `${verticalPosition}px`;
        }
    }

    updateMaxScore(): void {
        if (this.brain.gameState?.newGame || this.brain.gameState?.gameOver) {
            const scores = this.brain.getScores();
            this.maxScore = scores.length > 0 ?
                scores.reduce((max, current) => Math.max(max, current.score), scores[0].score) : 0;
        }
    }

    updateHeaderContent(gameState: GameState) {
        if (this.currentScore === gameState.score &&
            this.gameBall === gameState.balls) return;

        this.currentScore = gameState.score;
        this.gameBall = gameState.balls;
        this.updateMaxScore()

        this.currentScoreElement.innerText = this.currentScore.toString().padStart(3, '0');
        this.ballsCountElement.innerText = this.gameBall.toString();
        this.maxScoreElement.innerText = this.maxScore.toString().padStart(3, '0');
    }

    getCurrentScoreElement(): HTMLDivElement {
        const currentScoreElement = document.createElement('div');
        currentScoreElement.style.position = 'fixed';
        currentScoreElement.className = 'header-text-score';
        currentScoreElement.innerText = this.currentScore.toString().padStart(3, '0');
        this.thisElement.appendChild(currentScoreElement);

        return currentScoreElement;
    }

    getBallsCountElement(): HTMLDivElement {
        const ballsCountElement = document.createElement('div');
        ballsCountElement.style.position = 'fixed';
        ballsCountElement.className = 'header-text-balls';
        ballsCountElement.innerText = this.gameBall.toString();
        this.thisElement.appendChild(ballsCountElement);
        return ballsCountElement;
    }

    getMaxScoreElement(): HTMLDivElement {
        const maxScoreElement = document.createElement('div');
        maxScoreElement.style.position = 'fixed';
        maxScoreElement.className = 'header-text-score';
        maxScoreElement.innerText = this.maxScore.toString().padStart(3, '0');
        this.thisElement.appendChild(maxScoreElement);
        return maxScoreElement;
    }
}