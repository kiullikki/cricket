/**
 * Creates game-manager
 * @param: gameData: object;
 * linesInfo: array;
 * animation: function;
 */

import {AimationBall} from "./animation-ball";
import {Helper} from "./helper";

export class GameManager {
    constructor(gameData, linesInfo, animation) {
        this.animation = animation;
        this.timeRemainingNodes = gameData.timeRemainingNodes;
        this.totalRunNodes = gameData.totalRunNodes;
        this.stadiumNameNode = gameData.stadiumNameNode;
        this.gameResultNode = gameData.gameResultNode;
        this.timeRedrawBall = gameData.timeRedrawBall;
        this.createBallInterval = gameData.createBallInterval;
        this.timeGame = gameData.timeGame;
        this.countBalls = gameData.allBalls;
        this.linesInfo = linesInfo;
        this.quantityLines = linesInfo.length - 1;
        this.timeGameStart = Date.now();
        this.ballsCounter = 0;
        this.score = 0;
        this.ballsInfoAnimation = [];
        this.timerSetBalls = null;
    }

    movie() {
        let timeSinceGame = Date.now() - this.timeGameStart;
        if (timeSinceGame <= this.timeGame) {
           this.setTimeRemaining(timeSinceGame);
            this.animation();
            window.requestAnimationFrame(this.movie.bind(this));
        }
        else {
            this.gameStop();
            this.ballsInfoAnimation = [];
            this.animation();
        }
    }


    setBall(){
        if (this.ballsCounter < this.countBalls) {
            let numberLine = Helper.numberRandom(0, this.quantityLines);
            let pointsBall = this.linesInfo[numberLine].lineCoords;
            this.ballsInfoAnimation.push( new AimationBall(pointsBall, numberLine, this.timeRedrawBall));
            this.ballsCounter++;
        } else {
            clearInterval(this.timerSetBalls);
        }
    }

    setTimeRemaining(timeSinceGame) {
        let nodesLenght = this.timeRemainingNodes.length,
            values = Helper.getFormated(parseInt(((this.timeGame - timeSinceGame) / 10), 10), nodesLenght);

        this.timeRemainingNodes
            .forEach(function (node, index) {
                node.innerText = values[index];
            });
    }

    setTotalRun(score) {
        let nodesLenght = this.totalRunNodes.length,
            values = Helper.getFormated(score, nodesLenght);

        this.totalRunNodes.forEach(function(node, index){
            node.innerText = values[index];
        });
    }

    showResultGame() {
        let scoreMax =  0;
        let nameStadium = '';
        this.linesInfo.forEach((line) => {
            if(scoreMax < line.countBallsScore){
                scoreMax = line.countBallsScore;
                nameStadium = line.name;
            }
        });
        scoreMax === 0 ? this.stadiumNameNode.innerText = "does not exist" : this.stadiumNameNode.innerText = nameStadium;
        this.gameResultNode.classList.toggle('hidden');

    }

    start(crateBallInterval){
        this.movie();
        this.timerSetBalls = setInterval(this.setBall.bind(this), crateBallInterval);
    }

    onClick(evt, coordsStart, ballSize){
        let mouseCoords = {
            x: evt.offsetX,
            y: evt.offsetY
            },
            ballRadius = ballSize,
            distanceX = Math.abs(mouseCoords.x - coordsStart.x),
            distanceY = Math.abs(mouseCoords.y - coordsStart.y),
            qtBallsAnimation = this.ballsInfoAnimation.length;

        if(distanceX <= ballRadius && distanceY <= ballRadius) {
            this.start(this.createBallInterval);
        }

        for(let i = 0; i < qtBallsAnimation; i++) {
            let distanceX = Math.abs(mouseCoords.x - this.ballsInfoAnimation[i].pointsCurrent.x),
                distanceY = Math.abs(mouseCoords.y - this.ballsInfoAnimation[i].pointsCurrent.y);

            if (distanceX <= ballRadius && distanceY <= ballRadius){
                let numberStadium = this.ballsInfoAnimation[i].numberStadium;

                this.linesInfo[numberStadium].countBallsScore++;

                this.ballsInfoAnimation.splice(i, 1);
                this.score++;
                this.setTotalRun(this.score);
                break;
            }
        }
    }

    gameStop() {
        window.cancelAnimationFrame(this.movie.bind(this));
        clearInterval(this.timerSetBalls);
        this.showResultGame();
    }

}