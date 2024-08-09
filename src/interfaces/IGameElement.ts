import IPosition from "./IPosition.ts";

export default interface IGameElement {
    calculateBoundaries() : IPosition;
    getBoundaries() : IPosition;
    getPosition() : IPosition;
    isActive() : boolean;
}