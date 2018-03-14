/**
 * Creates ball item
 * @param context: canvas context;
 * coord: object;
 * size: number;
 * color: string;
 */

export class Ball {
    constructor(context, coords, size, color) {
        this.coords = coords;
        this.ctx = context;
        this.size = size;
        this.color = color;
        this.drawBall();
    }
    drawBall() {
      this.ctx.beginPath();
      this.ctx.arc(this.coords.x, this.coords.y, this.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.closePath();
      this.ctx.fill();
    }
}
