/**
 * Creates line item
 * @param
 *
 */

export class AimationBalls {
    constructor(context) {
        this.context = context;
        this.balls = [];
    }

    add(ballsAnimationInfo){
        this.balls.push(ballsAnimationInfo);
    }

    start() {
        this.startAnimation();
    }



    startAnimation() {
        this.context.clear();
        this.context.draw();
        for(let i = 0; i < this.balls.length; i++) {
            if (this.balls[i] !== undefined) {
                if (this.balls[i].index >= this.balls[i].points.length - 1) {
                    this.finishAnimation(i);
                } else {
                    let currentTime = Date.now();
                    if (currentTime - this.balls[i].timeOut >= this.balls[i].time) {
                        this.balls[i].index++;
                        this.balls[i].time = Date.now();
                        this.context.createBall(this.balls[i].points[this.balls[i].index]);
                    }
                    else {
                        this.context.createBall(this.balls[i].points[this.balls[i].index]);
                    }
                }
            }
        }
        window.requestAnimationFrame(this.startAnimation.bind(this));
    }

    finishAnimation(num) {
        window.cancelAnimationFrame(this.startAnimation.bind(this));
    }


}