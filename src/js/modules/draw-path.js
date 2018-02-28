/**
 * Creates line item
 * @param coords: object; id: number; context: canvas.context;
 */

export class Line {
    constructor(coords, id, context) {
        this.coords = coords;
        this.id = id;
        this.ctx = context;
        this.drawLine(this.coords);
    }
    drawLine(coords) {
        this.ctx.beginPath();
        this.ctx.moveTo(coords.xStart, coords.yStart);
        this.ctx.bezierCurveTo(coords.xControlOne, coords.yControlOne, coords.xControlTwo, coords.yControlTwo, coords.xEnd, coords.yEnd);
        this.ctx.strokeStyle = "orange";
        this.ctx.stroke();
    }
}


