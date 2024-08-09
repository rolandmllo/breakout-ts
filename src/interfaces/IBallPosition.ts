import IPosition from "./IPosition.ts";

export interface IBallPosition extends IPosition{
    velocityX: number;
    velocityY: number;
    centerX: number;
}