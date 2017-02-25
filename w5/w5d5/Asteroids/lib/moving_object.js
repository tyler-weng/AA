class MovingObject {
  constructor (pos, game, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  }

  draw (ctx) {
    const centerX = this.pos[0];
    const centerY = this.pos[1];

    ctx.beginPath();
    ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;

    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    //
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, 50, 0 ,2*Math.PI);
    // ctx.stroke();
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.pos[0] >= 800) this.pos[0] -= 800;
    if (this.pos[1] >= 600) this.pos[1] -= 600;
    if (this.pos[0] <= 0) this.pos[0] += 800;
    if (this.pos[1] <= 0) this.pos[1] += 600;
  }

  isCollidedWith(otherObject) {
    let pos1 = this.pos;
    let pos2 = otherObject.pos;
    return MovingObject.distance(pos1, pos2) < this.radius + otherObject.radius;
  }

  static distance(pos1, pos2) {
    return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));
  }
}

module.exports = MovingObject;
