/**
 * Creates canvas item
 * @param domElement: HTMLElement; imgPath: string;
 */
import {Line} from "./draw-path";

export class CanvasItem {
    constructor(domElement, imgPath, linesCoordinates) {
        this.canvas = domElement;
        this.ctx = this.canvas.getContext('2d');
        this.imgPath = imgPath;
        this.linesCoordinates = linesCoordinates;
        this.linesPath = [];


        this.init();

    }
    init(){
        this.canvas.width = +this.canvas.getAttribute('data-width');
        this.canvas.height = +this.canvas.getAttribute('data-height');
        this.drawBackground().then(() => {
            this.createLines();
        });

    }
    drawBackground(){
        const img = new Image();
        img.src = this.imgPath;
        return new Promise((resolve, reject)=>{
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                resolve();
            };
        })

    }
    createLines() {
        this.linesCoordinates.forEach( (coords, index) => {
            this.linesPath.push(new Line(coords, index, this.ctx))
        });
    }
}