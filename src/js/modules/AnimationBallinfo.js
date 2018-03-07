export class BallsAnimationInfo {
    constructor(argPoints, argTimeOut, argIndex){
        this.timeOut = argTimeOut;
        this.points = argPoints;
        this.index = (argIndex == undefined) ? 0 : argIndex;
        this.time = Date.now();
    }


}