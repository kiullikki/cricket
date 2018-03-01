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
      const xCenter = this.coords.x,
            yCenter = this.coords.y,
            xRectStart = this.coords.x - this.size,
            yRectStart = this.coords.y -  this.size,
            xRectFinish = this.coords.x + this.size,
            yRectFinish = this.coords.y +  this.size;

      this.ctx.beginPath();
      this.ctx.arc(xCenter, yCenter, this.size, 0, Math.PI * 2);
      this.ctx.clip();
      this.ctx.fillRect(xRectStart, yRectStart, xRectFinish, yRectFinish);
      this.ctx.fillStyle = this.color;
      this.ctx.closePath();
    }
}
