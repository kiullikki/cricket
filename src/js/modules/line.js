import {indiaMap} from "./background-info";

/**
 * Creates line item
 * @param coords: object;
 * coordsStart: object;
 * id: number;
 * context: canvas.context;
 * colors: object;
 * lineSz: number;
 */

export class Line {
    constructor(coords, name, id, lineData) {
        this.coords = coords;
        this.name = name;
        this.coordsStart = lineData.coordsStart;
        this.id = id;
        this.ctx = lineData.ctx;
        this.color = lineData.color;
        this.pathes = lineData.pathesMarker;
        this.size = lineData.size;
        this.countBallsScore = 0;
        this.lineCoords = [];

        this.init();
    }

    init(){
        this.draw(this.coords, this.coordsStart, this.pathes.marker);
        this.getSegments(this.coords, this.coordsStart);
        //this.drawMarker(this.coords, 10);
    }

    draw(coords, coordsStart) {
        this.ctx.beginPath();
        this.ctx.moveTo(coordsStart.x, coordsStart.y);
        this.ctx.bezierCurveTo(coords.xControlOne, coords.yControlOne, coords.xControlTwo, coords.yControlTwo, coords.xEnd, coords.yEnd);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.size;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    redraw(index, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.coordsStart.x, this.coordsStart.y);
        for (let i = 0; i < index; i++) {
            this.ctx.lineTo(this.lineCoords[i].x, this.lineCoords[i].y);
        };
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    drawMarker(coords, scale) {
        this.ctx.beginPath();
        this.ctx.moveTo(+coords.xEnd, +coords.yEnd);
        this.ctx.lineTo(+coords.xEnd - scale, +coords.yEnd - scale);
        this.ctx.arcTo(+coords.xEnd - scale, +coords.yEnd - scale, +coords.xEnd + scale, +coords.yEnd - scale, scale / 2);
        this.ctx.lineTo(+coords.xEnd, +coords.yEnd);
        this.ctx.closePath();
        this.ctx.fillStyle = "#13AEF0";
        this.ctx.strokeStyle = "#0D6991";
        //this.ctx.fill();
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
