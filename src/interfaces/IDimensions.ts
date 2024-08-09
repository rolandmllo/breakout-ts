import ITopLeftPosition from "./ITopLeftPosition.ts";

export default interface IDimensions {
    windowHeight: number,
    windowWidth: number,
    containerWidth: number,
    headerHeight: number,
    headerWidth: number,
    gameAreaHeight: number,
    gameAreaWidth: number,
    scaleX: number,
    scaleY: number,
    gameAreaContainerOffset: ITopLeftPosition
}