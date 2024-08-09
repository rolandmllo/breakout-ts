import Position from "../domain/Position.ts";
import IPosition from "../interfaces/IPosition.ts";
import IUiElement from "../interfaces/IUiElement.ts";
import IGameElement from "../interfaces/IGameElement.ts";
import ITopLeftPosition from "../interfaces/ITopLeftPosition.ts";

export default abstract class AbstractGameElement implements IGameElement, IUiElement {
    protected active: boolean = true;
    protected position: IPosition;
    protected boundaries: IPosition;
    protected dirty: boolean = true;
    protected color: string = "";
    protected parentElement: HTMLDivElement | null;
    protected thisElement: HTMLDivElement;
    protected className: string = "";

    protected constructor(parentElement: HTMLDivElement | null) {
        this.boundaries = new Position();
        this.position = new Position();
        this.parentElement = parentElement;
        this.thisElement = document.createElement('div');
    }

    setThisElement(element: HTMLDivElement) {
        this.thisElement = element;
    }

    getThisElement(): HTMLDivElement {
        return this.thisElement;
    }

    isDirty(): boolean {
        return this.dirty;
    }

    setColor(color: string): void {
        this.color = color;
    }

    getParentElement(): HTMLDivElement {
        return this.parentElement!;
    }

    setParentElement(element: HTMLDivElement) {
        this.parentElement = element;
    }

    setClassName(className: string) {
        this.className = className;
    }

    addToClassName(className: string) {
        this.className += ' ' + className;
    }

    getPosition(): IPosition {
        return this.position;
    }

    isActive(): boolean {
        return this.active;
    }

    markAsDirty(): void {
        this.dirty = true;
    }

    getTotalOffset(): ITopLeftPosition {
        let element = this.getThisElement();
        let totalTop = 0, totalLeft = 0;
        while (element) {
            totalTop += element.offsetTop || 0;
            totalLeft += element.offsetLeft || 0;
            element = <HTMLDivElement>element.offsetParent!;
        }
        return {top: totalTop, left: totalLeft};
    }

    appendChild(element: HTMLDivElement): void {
        this.thisElement.appendChild(element);
    }

    draw(position: IPosition): void {

        this.thisElement = document.createElement('div');
        this.thisElement.className = this.className;

        this.thisElement.style.left = position.left + 'px';
        this.thisElement.style.top = position.top + 'px';
        this.thisElement.style.width = position.width + 'px';
        this.thisElement.style.height = position.height + 'px';

        this.thisElement.style.zIndex = '10';
        this.thisElement.style.position = 'fixed';
        this.thisElement.style.backgroundColor = this.color;

        this.parentElement?.appendChild(this.thisElement);
        this.dirty = false;
    }

    clear(): void {
        this.thisElement.innerHTML = "";
    }

    calculateBoundaries() {

        const boundaries = new Position(this.position.width, this.position.height, this.position.left,
            this.position.top, this.position.left + this.position.width,
            this.position.top + this.position.height);

        this.boundaries = boundaries;
        return boundaries.getPosition();
    }

    getBoundaries(): IPosition {
        return this.calculateBoundaries();
    }
}