import {IBrickConfig} from "../interfaces/IBrickConfig.ts";

export default class Config {

    // Game Area
    static readonly BORDER_THICKNESS = 10;
    static readonly WIDTH = 1024;
    static readonly HEIGHT = 768;
    static readonly BRICK_COLS = 14;
    static readonly BRICK_TOP_OFFSET = 50;
    static readonly BRICK_PADDING = 3;
    static readonly BRICK_HEIGHT = 15;
    static readonly BRICK_WIDTH = (this.WIDTH - this.BRICK_COLS * this.BRICK_PADDING) / this.BRICK_COLS | 0;

    static readonly BRICK_STRUCTURE: IBrickConfig[] = [
        {color: "red", points: 7},
        {color: "red", points: 7},
        {color: "orange", points: 5},
        {color: "orange", points: 5},
        {color: "green", points: 3},
        {color: "green", points: 3},
        {color: "yellow", points: 1},
        {color: "yellow", points: 1},
    ];

    // Gameplay
    static readonly BALLS_START_COUNT = 3;
    static readonly BALL_BASE_SPEED = 5;
    static readonly BALL_SPEED_INCREMENT = 0.02;
    static readonly BALL_MAX_SPEED = 20;

    static readonly PADDLE_STEP = 22;

    //UI settings
    static readonly ASPECT_RATIO = 4 / 3;
    static readonly MIN_HEADER_HEIGHT = 50;
    static readonly MAX_HEADER_HEIGHT = 100;
    static readonly HEADER_HEIGHT_SCALE = 0.05;
}