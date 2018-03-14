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
        this.lineCoords = lineData.lineCoords;
        this.lineCoordsDraw = lineData.lineCoordsDraw;

        this.init();
    }

    init(){
        this.draw(this.coords, this.coordsStart, this.pathes.marker);
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
        this.ctx.beginPath();
        this.ctx.moveTo(this.lineCoordsDraw[0].x, this.lineCoordsDraw[0].y);

        for (let i = 0; i < index; i++) {
            this.ctx.lineTo(this.lineCoordsDraw[i].x, this.lineCoordsDraw[i].y);
        }

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = this.sizes.lineBall;
        this.ctx.stroke();
    }
}
