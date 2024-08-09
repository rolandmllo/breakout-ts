import IPosition from "../interfaces/IPosition.ts";

export default class Position implements IPosition {

    constructor(public width: number = 0, public height: number = 0, public left: number = 0, public top: number = 0,
                public right: number = 0, public bottom: number = 0) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    setPosition(position: IPosition) {
        this.width = position.width;
        this.height = position.height;
        this.left = position.left;
        this.top = position.top;
        this.right = position.right;
        this.bottom = position.bottom;
    }

    getPosition(): IPosition {
        return {
            width: this.width,
            height: this.height,
            left: this.left,
            top: this.top,
            right: this.right,
            bottom: this.bottom,
        }
    }
}