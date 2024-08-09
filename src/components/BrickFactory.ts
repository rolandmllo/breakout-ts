import Brick from "./Brick.js";
import Config from "./Config.ts";
import {IBrickConfig} from "../interfaces/IBrickConfig.ts";
import Position from "../domain/Position.ts";
import IPosition from "../interfaces/IPosition.ts";

export default class BrickFactory {

    bricksStructure: IBrickConfig[];
    bricks: Brick[][];

    constructor(brickStructure: IBrickConfig[]) {
        this.bricksStructure = brickStructure;
        this.constructBricks();
        this.bricks = this.constructBricks();
    }

    constructBricks() {
        return this.bricksStructure.map((brickConfig, rowIndex) => {
            const row = [];
            for (let colIndex = 0; colIndex < Config.BRICK_COLS; colIndex++) {
                const brick = this.getBrick(rowIndex, colIndex, brickConfig.points, brickConfig.color);
                row.push(brick);
            }
            return row;
        });
    }

    getBrick(row: number, col: number, points: number, color: string): Brick {
        const position = this.getBrickPosition(row, col);
        const brick = new Brick(position);
        brick.points = points;
        brick.setColor(color);
        return brick;
    }

    getBrickPosition(row: number, col: number): IPosition {
        let left = Config.BRICK_PADDING + (col * (Config.BRICK_WIDTH + Config.BRICK_PADDING)) | 0;
        let top = Config.BRICK_TOP_OFFSET + (row * (Config.BRICK_HEIGHT + Config.BRICK_PADDING)) | 0;

        return new Position(Config.BRICK_WIDTH, Config.BRICK_HEIGHT, left, top);
    }

    getBricks() {
        return this.bricks;
    }
}