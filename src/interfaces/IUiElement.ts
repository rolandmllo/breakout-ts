import ITopLeftPosition from "./ITopLeftPosition.ts";
import Position from "../domain/Position.ts";

export default interface IUiElement {

    markAsDirty(): void;
    getTotalOffset(): ITopLeftPosition;
    appendChild(element: HTMLDivElement) : void;
    getThisElement(): HTMLDivElement;
    setThisElement(element: HTMLDivElement) : void;
    getParentElement(): HTMLDivElement;
    setParentElement(element: HTMLDivElement): void;
    setClassName(className: string): void;
    addToClassName(className: string): void;
    isDirty(): boolean;
    draw(position: Position): void;
    clear(): void;
    setColor(color: string) : void;
}