/**
 * Creates canvas item
 * @param domElement: HTMLElement;
 * pathImgBg: string;
 * linesCoordinates: array;
 * coordsStart: object;
 * colors: object;
 * drawElemSizes: object;
 */
import {Line} from "./draw-lines";
import {Ball} from "./draw-ball";
import {animation} from "./animation-ball";

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

    createLines() {
        this.lineData.coordsStart = this.coordsStart;
        this.lineData.ctx = this.ctx;
        this.lineData.size = this.sizes.line;
        this.lineData.color = this.colors.line;
        this.lineData.pathesMarker = this.pathes;

        this.stadiums.forEach((stadium, index) => {
            this.lines.push(new Line(stadium.coords, index, this.lineData));
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

    animateBall(points, timeOut) {
        return new animateBall()

        // let animationBall = (() => {
        //     if (index >= points.length - 1) {
        //         cancelAnimationFrame(animationBall);
        //     } else {
        //         let currentTime = Date.now();
        //         this.clear();
        //         this.draw();
        //         if (currentTime - timeOut >= time) {
        //             index++;
        //             time = Date.now();
        //             this.createBall(points[index]);
        //         }
        //         else {
        //             this.createBall(points[index]);
        //         }
        //         window.requestAnimationFrame(animationBall);
        //     }
        // });

        // animationBall();
    }

}
