import { rotatePoint } from './helpers';

export default class Bullet {
  constructor(args) {
    let posDelta = rotatePoint({x:args.rotate, y:-20}, {x:0,y:0}, args.ship.rotation * Math.PI / 180);
    
    this.position = {
      x: args.ship.position.x + posDelta.x,
      y: args.ship.position.y + posDelta.y
    };
    this.rotation = args.ship.rotation;
    this.velocity = {
      x:posDelta.x / 2,
      y:posDelta.y / 2
    };
    this.radius = 0 ;
    this.score = args.getScore();
    this.beginPosition = args.beginPosition;
  }

  destroy(){
    this.delete = true;
  }

  render(state){
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Delete if it goes out of bounds
    if ( this.position.x < 0
      || this.position.y < 0
      || this.position.x > state.screen.width
      || this.position.y > state.screen.height ) {
        this.destroy();
    }
    let color = 'red';
    if(this.score>100){
      color='red'
    }
    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.fillStyle = color;
    context.lineWidth = 0.5;
    context.beginPath();
    context.arc(0 + this.beginPosition, 0, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
