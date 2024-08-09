import Config from "../components/Config.ts";

export default class GameState {
    balls: number;
    score: number;
    bricksLeft: number = 112;
    level: number = 0;
    isPaused: boolean = false;
    gameOver: boolean = false;
    newGameBoard: boolean = true;
    newGame: boolean = true;
    newLevel: boolean = false;
    showNewLevelScreen: boolean = false;

    constructor() {
        this.balls = Config.BALLS_START_COUNT
        this.score = 0;
    }
}