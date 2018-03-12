/**
 * Creates canvas item
 * @param domElement: HTMLElement;
 * pathImgBg: string;
 * linesCoordinates: array;
 * coordsStart: object;
 * colors: object;
 * drawElemSizes: object;
 */
import {Line} from "./line";
import {Ball} from "./ball";

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
        this.queqe = [];
        // this.rendered = false;

        this.init();
    }
    init(){
        this.draw();
    }


    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    afterInitOther() {
        return new Promise(resolve => {
            let wait = setInterval(() => {
                if(this.rendered){
                    clearInterval(wait);
                    resolve();
                }
            }, 10)
        })
    }

    afterInitOther() {
        returngit  Promise.resolve();
    }


    // drawOther(callback) {
    //     this.canvas.width = +this.canvas.getAttribute('data-width');
    //     this.canvas.height = +this.canvas.getAttribute('data-height');
    //     this.drawBackground().then(() => {
    //         this.createLines().then(() => {
    //             this.rendered = true;
    //             // if(callback){
    //             //     callback();
    //             // }
    //         });
    //     });
    // }

    draw(){
        this.canvas.width = +this.canvas.getAttribute('data-width');
        this.canvas.height = +this.canvas.getAttribute('data-height');
        this.createLines();
        };

    drawBackground() {
        // const img = new Image();
        // img.src = this.pathes.bg;
        // return new Promise((resolve, reject)=>{
        //     img.onload = () => {
        //         this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        //         resolve();
        //     };
        // })

        return Promise.resolve();

    }

    addToQueue(action){
        this.queqe.push(action);
    }

    createLines() {
        this.stadiums.forEach((stadium, index) => {
            this.linesPath.push(new Line(stadium.coords, index, this.coordsStart, this.ctx, this.colors, this.sizes, this.pathes));
        });

    }

    // createLinesOther() {
    //     return new Promise((resolve, reject) => {
    //         this.stadiums.forEach((stadium, index) => {
    //             this.linesPath.push(new Line(stadium.coords, index, this.coordsStart, this.ctx, this.colors, this.sizes, this.pathes));
    //             if((this.stadiums.length - 1) === index) {
    //                 let waitResolve = setInterval(() => {
    //                    if(this.linesPath[this.linesPath.length - 1].done){
    //                        clearInterval(waitResolve);
    //                        resolve();
    //                    }
    //                 },10)
    //             }
    //         });
    //     });
    // }


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
