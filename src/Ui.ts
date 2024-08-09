import Brain from "./Brain.ts";
import Header from "./components/Header.ts";
import GameArea from "./components/GameArea.ts";
import ModalDialog from "./components/ModalWindow.ts";
import {IBrickConfig} from "./interfaces/IBrickConfig.ts";
import Config from "./components/Config.ts";
import Paddle from "./components/Paddle.ts";
import IPosition from "./interfaces/IPosition.ts";
import Position from "./domain/Position.ts";
import Brick from "./components/Brick.ts";
import IDimensions from "./interfaces/IDimensions.ts";
import Dimensions from "./domain/Dimensions.ts";
import Ball from "./components/Ball.ts";

export default class UI {
    brain: Brain;
    appContainer: HTMLDivElement;
    header: Header;
    gameArea: GameArea;
    modalDialog: ModalDialog;
    dimensions: IDimensions;

    constructor(brain: Brain, appContainer: HTMLDivElement) {
        this.dimensions = new Dimensions();
        this.appContainer = appContainer;
        this.brain = brain;
        this.header = new Header(appContainer, this.brain);
        this.gameArea = new GameArea(appContainer);
        this.modalDialog = new ModalDialog(appContainer, this.brain);

        this.elementsSetup(this.gameArea.getThisElement());

        window.addEventListener('resize', () => {
            this.modalDialog.remove();
            this.setScreenDimension();
            this.draw();
        });
    }

    elementsSetup(gameArea: HTMLDivElement) {
        this.setScreenDimension();
        this.brain.gameElements.paddle.setParentElement(gameArea);
        this.brain.gameElements.ball.setParentElement(gameArea);
        const bricks = this.brain.gameElements.bricks;
        const brickConfig: IBrickConfig[] = Config.BRICK_STRUCTURE;

        for (let row = 0; row < bricks.length; row++) {
            const rowConfig = brickConfig[row % brickConfig.length];
            for (let col = 0; col < bricks[row].length; col++) {
                const brick = bricks[row][col];
                brick.setParentElement(gameArea);
                brick.addToClassName(rowConfig.color);
                brick.points = rowConfig.points;
            }
        }
        this.brain.gameState.newGameBoard = false;
    }


    setScreenDimension() {

        this.dimensions.windowWidth = this.appContainer.offsetWidth;
        this.dimensions.windowHeight = window.innerHeight;

        this.dimensions.headerHeight = Math.max(Config.MIN_HEADER_HEIGHT, Math.min(Config.MAX_HEADER_HEIGHT, this.dimensions.windowHeight * Config.HEADER_HEIGHT_SCALE));

        const availableHeight = this.dimensions.windowHeight - this.dimensions.headerHeight - (Config.BORDER_THICKNESS * 2);
        const availableWidth = this.dimensions.windowWidth;

        let gameAreaWidth = availableWidth;
        let gameAreaHeight = availableWidth / Config.ASPECT_RATIO | 0;

        if (gameAreaHeight > availableHeight) {
            gameAreaHeight = availableHeight - (Config.BORDER_THICKNESS * 5);
            gameAreaWidth = availableHeight * Config.ASPECT_RATIO | 0;
        }

        const leftOffset = (this.dimensions.windowWidth - gameAreaWidth) / 2 | 0;

        this.dimensions.containerWidth = gameAreaWidth;

        this.dimensions.headerWidth = this.dimensions.containerWidth;
        this.header.updateSize(new Position(this.dimensions.containerWidth, this.dimensions.headerHeight, leftOffset));

        this.dimensions.gameAreaWidth = gameAreaWidth;
        this.dimensions.gameAreaHeight = gameAreaHeight;
        this.gameArea.updateSize(new Position(this.dimensions.gameAreaWidth, this.dimensions.gameAreaHeight, leftOffset, this.dimensions.headerHeight));

        this.dimensions.scaleX = this.dimensions.gameAreaWidth / Config.WIDTH;
        this.dimensions.scaleY = this.dimensions.gameAreaHeight / Config.HEIGHT;
        this.dimensions.gameAreaContainerOffset = this.gameArea.getTotalOffset();
    }


    getCalculatedScaledXY(x: number, y: number) {
        return {
            x: (x * this.dimensions.scaleX) | 0,
            y: (y * this.dimensions.scaleY) | 0
        }
    }

    getAdjustedSize(position: IPosition): IPosition {
        const scaledSize = this.getCalculatedScaledXY(position.width, position.height);
        const scaledPosition = this.getCalculatedScaledXY(position.left, position.top);

        const adjustedWidth = scaledSize.x;
        const adjustedHeight = scaledSize.y;
        const adjustedLeft = scaledPosition.x + this.dimensions.gameAreaContainerOffset.left + Config.BORDER_THICKNESS;
        const adjustedTop = scaledPosition.y + this.dimensions.gameAreaContainerOffset.top + Config.BORDER_THICKNESS;

        return new Position(adjustedWidth, adjustedHeight, adjustedLeft, adjustedTop);
    }

    drawPaddle(paddle: Paddle) {
        const adjustedPosition = this.getAdjustedSize(paddle.getPosition());
        paddle.draw(adjustedPosition);
    }

    drawBall(ball: Ball): void {
        const adjustedPosition = this.getAdjustedSize(ball.getPosition());
        adjustedPosition.width = adjustedPosition.height;
        ball.draw(adjustedPosition);
    }

    drawBricks(): void {
        const bricks: Brick[][] = this.brain.gameElements.bricks;

        for (let row = 0; row < bricks.length; row++) {
            for (let col = 0; col < bricks[row].length; col++) {
                const brick = bricks[row][col];
                if (!brick.isDestroyed()) {
                    const adjustedPosition = this.getAdjustedSize(brick.getPosition());
                    brick.draw(adjustedPosition);
                }
            }
        }
    }

    drawGameElements(): void {
        if (this.brain.gameState.isPaused || this.brain.gameState.newGameBoard) return
        this.gameArea.clear();
        this.header.updateHeaderContent(this.brain.gameState);
        this.drawPaddle(this.brain.gameElements.paddle);
        this.drawBall(this.brain.gameElements.ball);
        this.drawBricks();
    }

    draw(): void {
        if (this.brain.gameState.newGameBoard) {
            this.elementsSetup(this.gameArea.getThisElement());
            console.log("setup")
        }
        if (this.brain.gameState.isPaused || this.brain.gameState.gameOver || this.brain.gameState.showNewLevelScreen) {
            this.modalDialog.draw();
        } else {
            this.modalDialog.remove()
        }
        this.drawGameElements();
    }
}