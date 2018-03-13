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
        // this.drawMarker(this.coords, this.pathes.marker);
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
        this.ctx.stroke();
    }

    drawMarker(coords, pathMarker) {
        const img = new Image(),
              x = coords.xEnd - (this.sizes.markerWidth / 2),
              y = coords.yEnd - this.sizes.markerHeight;
        img.src = pathMarker;
        img.onload = () => {
            this.ctx.drawImage(img, x, y, this.sizes.markerWidth, this.sizes.markerHeight)
        };
    }

    getSegments(coords, coordsStart) {
        const curve = new Bezier(coordsStart.x, coordsStart.y, coords.xControlOne, coords.yControlOne, coords.xControlTwo, coords.yControlTwo, coords.xEnd, coords.yEnd),
              lengthCurve = Math.sqrt((coords.yEnd - coordsStart.y) * (coords.yEnd - coordsStart.y) + (coords.xEnd - coordsStart.x) * (coords.xEnd - coordsStart.x)),
              coefCurve = 0.6,
              qtSegments = Math.round(lengthCurve / coefCurve);
        this.lineCoords = curve.getLUT(qtSegments);
    }
}
