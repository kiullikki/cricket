import {indiaMap} from "./background-info";

/**
 * Creates line item
 * @param coords: object;
 * name: string;
 * id: number;
 * LineData: object;
 */

export class Line {
    constructor(coords, name, id, lineData) {
        this.coords = coords;
        this.name = name;
        this.coordsStart = lineData.coordsStart;
        this.id = id;
        this.ctx = lineData.ctx;
        this.color = lineData.color;
        this.pathes = lineData.pathes;
        this.sizes = lineData.sizes;
        this.countBallsScore = 0;
        this.lineCoords = [];

        this.init();
    }

    init(){
        this.draw(this.coords, this.coordsStart, this.pathes.marker);
        this.getSegments(this.coords, this.coordsStart);
    }

    draw(coords, coordsStart) {
        this.ctx.beginPath();
        this.ctx.moveTo(coordsStart.x, coordsStart.y);
        this.ctx.bezierCurveTo(coords.xControlOne, coords.yControlOne, coords.xControlTwo, coords.yControlTwo, coords.xEnd, coords.yEnd);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.sizes.line;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    redraw(index, color) {
        let coordsStart = this.lineCoords[0],
            flag = true,
            radius = this.sizes.center / 2 + 3;

        for (let i = 1; i < index; i++) {
            let distance = Math.sqrt((coordsStart.x - this.lineCoords[i].x) *(coordsStart.x - this.lineCoords[i].x) + (coordsStart.y - this.lineCoords[i].y) * (coordsStart.y - this.lineCoords[i].y));

            if (distance >= radius) {
                if(flag) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.lineCoords[i].x, this.lineCoords[i].y);
                    flag = false;
                }
                this.ctx.lineTo(this.lineCoords[i].x, this.lineCoords[i].y);
            }
        }

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = this.sizes.lineBall;
        this.ctx.stroke();
    }

    getSegments(coords, coordsStart) {
        const curve = new Bezier(coordsStart.x, coordsStart.y, coords.xControlOne, coords.yControlOne, coords.xControlTwo, coords.yControlTwo, coords.xEnd, coords.yEnd),
              lengthCurve = Math.sqrt((coords.yEnd - coordsStart.y) * (coords.yEnd - coordsStart.y) + (coords.xEnd - coordsStart.x) * (coords.xEnd - coordsStart.x)),
              coefCurve = 0.6,
              qtSegments = Math.round(lengthCurve / coefCurve);
        this.lineCoords = curve.getLUT(qtSegments);
    }
}
