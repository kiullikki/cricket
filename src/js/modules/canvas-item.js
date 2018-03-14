/**
 * Creates canvas item
 * @param domElement: HTMLElement;
 * canvasData: object;
 */
import {Line} from "./line";
import {Ball} from "./ball";
import {Helper} from "./helper";
import {indiaMap} from "./background-info";

// export class Game {
//     constructor() {
//         this.lines =[];
//         //stads
//         //balls
//         // state
//         // center
//     }
// }
//
// export class Manager {
//     constructor(game) {
//         this.game = game;
//         this.renderer = new RenderManager(game);
//         this.gManager = new GameManager(game);
//     }
//
//     move() {
//         gManager.move();
//         renderer.render();
//         window.requestAnimationFrame(this.move.bind(this));
//     }
// }
//
// export class RenderManager {
//     constructor(game) {
//         this.game = game;
//     }
//
//     render() {
//         // render background
//         // render lines
//         // render center
//         // render balls
//     }
//
//     renderLine(line) {
//
//     }
// }
//
// export class GameManager {
//     constructor(game) {
//         this.game = game;
//     }
//
//     move() {
//         let timeSinceGame = Date.now() - this.timeGameStart;
//         if (timeSinceGame <= this.timeGame) {
//         this.game.state = 'Finished';
//         return;
//             }
//
//             //setBall
//         }
//     }
// }


export class CanvasItem {
    constructor(canvasData) {
        this.canvas = canvasData.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.pathes = canvasData.pathes;
        this.stadiums = canvasData.stadiums;
        this.coordsStart = canvasData.coordsStart;
        this.colors = canvasData.colors;
        this.sizes = canvasData.drawElemSizes;
        this.lines = [];
        this.lineData = {};

    }

    init() {
        return new Promise((resolve) => {
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
        this.lineData.sizes = this.sizes;
        this.lineData.color = this.colors.line;
        this.lineData.pathes = this.pathes;

        let qtStadiums = this.stadiums.length,
            qtLines = this.lines.length,
            radius = this.sizes.center / 2 + 3;

        if (qtLines < qtStadiums) {
            this.stadiums.forEach((stadium, index) => {
                this.lineData.lineCoords = Helper.getSegments(this.lineData.coordsStart, stadium.coords);
                this.lineData.lineCoordsDraw = Helper.getDrawSegments(this.lineData.lineCoords, radius);

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
        this.lines[ball.numberStadium].redraw(ball.index, this.colors.lineBall);
    }

    createCenter() {
        this.ctx.beginPath();
        this.ctx.arc(this.coordsStart.x, this.coordsStart.y, this.sizes.center, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colors.center;
        this.ctx.strokeStyle = this.colors.centerCircuit;
        this.ctx.lineWidth = this.sizes.centerStroke;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
