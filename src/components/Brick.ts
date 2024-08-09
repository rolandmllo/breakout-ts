import AbstractGameElement from "./AbstractGameElement.ts";
import IPosition from "../interfaces/IPosition.ts";

export default class Brick extends AbstractGameElement {
    points: number;

    constructor(position: IPosition) {
        super(null);
        this.className = 'brick ';
        this.position = position;
        this.points = 0;
    }

    setDestroyed() {
        this.active = false;
    }

    isDestroyed() {
        return !this.active;
    }

}