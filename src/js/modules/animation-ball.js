/**
 * Creates line item
 * @param
 *
 */

export class animation {
    constructor(points, context, timeOut) {
        this.points = points;
        this.index = 0;
        this.timeOut = timeOut;
        this.context = context;
        this.time = Date.now();

        this.init();
    }

    init() {
        this.startAnimation();
    }

    startAnimation() {
        if (this.index >= this.points.length - 1) {
            cancelAnimationFrame(this.startAnimation);
        } else {
            let currentTime = Date.now();
            this.context.clear();
            this.context.draw();
            if (currentTime - this.timeOut >= this.time) {
                this.index++;
                this.time = Date.now();
                this.context.createBall(this.points[this.index]);
            }
            else {
                this.context.createBall(this.points[this.index]);
            }

            window.requestAnimationFrame(this.startAnimation.bind(this));
        }

    }

    finishAnimation() {

    }


}