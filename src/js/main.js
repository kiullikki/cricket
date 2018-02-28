import {CanvasItem} from "./modules/canvas-item";


// const and variables
let pathImg = "img/india-map.svg";
const canvasNode = document.getElementById('game-field');
const linesCoordinates = [
    {
        xStart: "50",
        yStart: "50",
        xControlOne: "80",
        yControlOne: "120",
        xControlTwo: "90",
        yControlTwo: "30",
        xEnd: "230",
        yEnd: "230"
    },
    {
        xStart: "150",
        yStart: "150",
        xControlOne: "80",
        yControlOne: "120",
        xControlTwo: "90",
        yControlTwo: "30",
        xEnd: "130",
        yEnd: "230"
    }
];

let canvasItem = new CanvasItem(canvasNode, pathImg, linesCoordinates);
