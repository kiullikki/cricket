/**
 * Creates ball item
 * @param
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
      this.ctx.fill();
    }
}
