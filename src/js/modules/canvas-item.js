/**
 * Creates canvas item
 * @param domElement: HTMLElement;
 * pathImgBg: string;
 * linesCoordinates: array;
 * coordsStart: object;
 * colors: object;
 * drawElemSizes: object;
 */
import {Line} from "./draw-path";
import {Ball} from "./draw-ball";

export class CanvasItem {
    constructor(domElement, pathes, stadiums, coordsStart, colors, drawElemSizes) {
        this.canvas = domElement;
        this.ctx = this.canvas.getContext('2d');
        this.pathes = pathes;
        this.stadiums = stadiums;
        this.coordsStart = coordsStart;
        this.colors = colors;
        this.sizes = drawElemSizes;
        this.linesPath = [];

        this.init();
    }
    init(){
        this.draw();
    }


    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(){
        this.canvas.width = +this.canvas.getAttribute('data-width');
        this.canvas.height = +this.canvas.getAttribute('data-height');
        this.createLines();
        };

    createLines() {
        this.stadiums.forEach((stadium, index) => {
            this.linesPath.push(new Line(stadium.coords, index, this.coordsStart, this.ctx, this.colors, this.sizes, this.pathes));
        });

    }

    createBall(coords) {
        new Ball(this.ctx, coords, this.sizes.ball, this.colors.ball);
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
