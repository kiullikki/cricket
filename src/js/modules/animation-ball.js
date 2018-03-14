/**
 * Creates line item
 * @param: points: array;
 * numberLine: number;
 * timeOut: number;
 */

export class AimationBall {
    constructor(points, numberLine, timeOut) {
        this.timeOut = timeOut;
        this.points = points;
        this.numberStadium = numberLine;
        this.index = 0;
        this.time = Date.now();
        this.pointsCurrent = this.points[this.index];
        this.flag = true;

    }

    getNewCoords(){
        let currentTime = Date.now();
        if (currentTime - this.timeOut >= this.time) {
            this.index++;
            this.time = Date.now();
        }
        if (this.index === this.points.length - 1) {
            this.flag = false;
        }

        this.pointsCurrent = this.points[this.index];
        return this.pointsCurrent;
    }

}