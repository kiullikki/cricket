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
        this.queqe = [];

        this.init();
    }
    setDelay(delay){
        this.delay = delay;
    }
    init(){
        this.draw();
    }
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.canvas.width = +this.canvas.getAttribute('data-width');
        this.canvas.height = +this.canvas.getAttribute('data-height');
        this.drawBackground().then(() => {
            this.createLines().then(()=>{
                this.createCenter();
                console.log(this.linesPath);
                this.createBalls(this.linesPath[3].linePoints[18]);
                this.queqe.forEach( action => {
                    action.data ? this[action.type](action.data) : this[action.type]();
                })
            });

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

    addToQueue(action){
        this.queqe.push(action);
    }
    createLines() {
        return new Promise((resolve, reject) => {
            this.stadiums.forEach((stadium, index) => {
                this.linesPath.push(new Line(stadium.coords, index, this.coordsStart, this.ctx, this.colors, this.sizes, this.pathes));
                if((this.stadiums.length - 1) === index) {
                    let waitResolve = setInterval(() => {
                       if(this.linesPath[this.linesPath.length - 1].done){
                           clearInterval(waitResolve);
                           resolve();
                       }
                    },10)
                }

            });
        });

    }


    createBalls(coords) {
      let ballCenter = new Ball(this.ctx, coords, this.sizes.ball, this.colors.ball);
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
