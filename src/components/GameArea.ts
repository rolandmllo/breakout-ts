import Config from "./Config.ts";
import AbstractGameElement from "./AbstractGameElement.ts";
import {IWindowElement} from "../interfaces/IWindowElement.ts";
import IPosition from "../interfaces/IPosition.ts";

export default class GameArea extends AbstractGameElement implements IWindowElement {
    constructor(appContainer: HTMLDivElement) {
        super(appContainer);
        this.thisElement = appContainer.querySelector("#gameArea")!;

        this.setup()
    }

    setup() {
        this.thisElement.style.position = 'fixed';
        this.thisElement.style.left = '0px';
        this.thisElement.style.zIndex = '10';
        this.thisElement.className = "border";
        this.thisElement.style.border = Config.BORDER_THICKNESS + 'px solid deepskyblue';
    }

    updateSize(size: IPosition) {
        this.thisElement.style.left = `${size.left}px`;
        this.thisElement.style.top = `${size.top}px`;
        this.thisElement.style.width = `${size.width}px`;
        this.thisElement.style.height = `${size.height}px`;
    }
}