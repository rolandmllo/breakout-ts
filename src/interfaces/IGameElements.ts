import Ball from "../components/Ball.ts";
import Paddle from "../components/Paddle.ts";
import Brick from "../components/Brick.ts";

export interface IGameElements {
    "ball": Ball,
    "paddle": Paddle,
    "bricks": Brick[][],
}