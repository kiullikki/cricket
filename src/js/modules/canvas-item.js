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
        this.coordsTest = {
          x: "150",
          y: "150"
        };
        this.colors = colors;
        this.sizes = drawElemSizes;
        this.linesPath = [];


        this.init();

    }
    init(){
        this.canvas.width = +this.canvas.getAttribute('data-width');
        this.canvas.height = +this.canvas.getAttribute('data-height');
        this.drawBackground().then(() => {
            this.createLines();
            this.createCenter();
            this.createBalls();
        });

    }
    drawBackground() {
        const img = new Image();
        img.src = this.pathes.bg;
        return new Promise((resolve, reject)=>{
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                resolve();
            };
        })

    }
    createLines() {
        this.stadiums.forEach( (stadium, index) => {
            this.linesPath.push(new Line(stadium.coords, index, this.coordsStart, this.ctx, this.colors, this.sizes, this.pathes))
        });
    }
    createBalls() {
      let ballCenter = new Ball(this.ctx, this.coordsTest, this.sizes.ball, this.colors.ball);
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
