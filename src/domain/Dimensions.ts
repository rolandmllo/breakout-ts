import IDimensions from "../interfaces/IDimensions.ts";

export default class Dimensions implements IDimensions {
    windowHeight = 0;
    windowWidth = 0;
    containerWidth = 0;
    headerHeight = 0;
    headerWidth = 0;
    gameAreaHeight = 0;
    gameAreaWidth = 0;
    scaleX = 0;
    scaleY = 0;
    gameAreaContainerOffset = {left: 0, top: 0}
}