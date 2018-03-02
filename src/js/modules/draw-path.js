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
    constructor(coords, id, coordsStart, context, colors, sizes, pathes) {
        this.coords = coords;
        this.coordsStart = coordsStart;
        this.id = id;
        this.ctx = context;
        this.colors = colors;
        this.pathes = pathes;
        this.sizes = sizes;
        this.linePoints = [];
        this.done = false;
        this.drawLine(this.coords, this.coordsStart, this.pathes.marker);
        this.getSegments(this.coords, this.coordsStart, 19);
        this.drawMarker(this.coords, this.pathes.marker);
    }
    drawLine(coords, coordsStart, pathMarker) {
        this.ctx.beginPath();
        this.ctx.moveTo(coordsStart.x, coordsStart.y);
        this.ctx.bezierCurveTo(coords.xControlOne, coords.yControlOne, coords.xControlTwo, coords.yControlTwo, coords.xEnd, coords.yEnd);
        this.ctx.strokeStyle = this.colors.line;
        this.ctx.lineWidth = this.sizes.line;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawMarker(coords, pathImg) {
        const img = new Image(),
              x = coords.xEnd - (this.sizes.markerWidth / 2),
              y = coords.yEnd - this.sizes.markerHeight;
        img.src = pathImg;
        img.onload = () => {
            this.ctx.drawImage(img, x, y, this.sizes.markerWidth, this.sizes.markerHeight)
           this.done = true;
        };
    }
    getSegments(coords, coordsStart, qtSegments) {
        const curve = new Bezier(coordsStart.x, coordsStart.y, coords.xControlOne, coords.yControlOne, coords.xControlTwo, coords.yControlTwo, coords.xEnd, coords.yEnd);
        this.linePoints = curve.getLUT(qtSegments);
    }
}
