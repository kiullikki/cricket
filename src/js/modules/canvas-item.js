/**
 * Creates canvas item
 * @param domElement: HTMLElement;
 * canvasData: object;
 */
import {Line} from "./line";
import {Ball} from "./ball";
import {indiaMap} from "./background-info";

export class CanvasItem {
    constructor(canvasNode, canvasData) {
        this.canvas = canvasNode;
        this.ctx = this.canvas.getContext('2d');
        this.pathes = canvasData.pathes;
        this.stadiums = canvasData.stadiums;
        this.coordsStart = canvasData.coordsStart;
        this.colors = canvasData.colors;
        this.sizes = canvasData.drawElemSizes;
        this.lines = [];
        this.lineData = {};
        this.rendered = false;
    }

    init() {
        return new Promise((resolve, reject) => {
            this.draw();
            this.createBall(this.coordsStart);
            resolve();
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.canvas.width = +this.canvas.getAttribute('data-width');
        this.canvas.height = +this.canvas.getAttribute('data-height');
        this.createLines();
        this.createCenter();
    }

    drawBackground() {
        let self = this;
        indiaMap.fills.forEach((fill) => {
            let bg = new Path2D(fill);
            self.ctx.fillStyle = indiaMap.fillColor;
            self.ctx.strokeStyle = indiaMap.strokeColor;
            self.ctx.fill(bg);
            self.ctx.stroke(bg);
        });
    }

    createLines() {
        this.lineData.coordsStart = this.coordsStart;
        this.lineData.ctx = this.ctx;
        this.lineData.size = this.sizes.line;
        this.lineData.color = this.colors.line;
        this.lineData.pathesMarker = this.pathes;

        if (this.lines.length < this.stadiums.length) {
            this.stadiums.forEach((stadium, index) => {
                this.lines.push(new Line(stadium.coords, stadium.name, index, this.lineData));
            });
        } else {
            this.lines.forEach((line) => {
                line.draw(line.coords, this.coordsStart );
            });
        }
    }

    createBall(coords) {
        new Ball(this.ctx, coords, this.sizes.ball, this.colors.ball);
    }

    createBallPath(ball) {
        this.lines[ball.numberStadium].redraw(ball.index, this.colors.ball);
    }

    createCenter() {
        this.ctx.beginPath();
        this.ctx.arc(this.coordsStart.x, this.coordsStart.y, this.sizes.center, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colors.center;
        this.ctx.strokeStyle = this.colors.centerCircuit;
        this.ctx.lineWidth = 1;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
