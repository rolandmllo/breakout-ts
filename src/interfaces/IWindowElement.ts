import IPosition from "./IPosition.ts";

export interface IWindowElement {
    setup(): void;
    updateSize(size: IPosition): void;
}