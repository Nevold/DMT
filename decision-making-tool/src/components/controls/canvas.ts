import { Constants } from '../../shared/constants';

export class TimedRotatingCircle {
  public ctx: CanvasRenderingContext2D | null;

  public readonly centerX = +Constants.SIZE / 2;

  public readonly centerY = +Constants.SIZE / 2;

  public readonly radius = Constants.RADIUS;

  public angle: number = 0;

  public angularVelocity: number = 0.02;

  public startTime: number = 0;

  public isAnimating: boolean = false;

  public animationId: number | undefined = undefined;

  constructor(
    public canvas: HTMLCanvasElement,
    public duration: number = Constants.DEFAULT_DURATION,
    public sectors: Array<number> = []
  ) {
    this.ctx = canvas.getContext('2d');
    this.handleResize();
  }

  public handleResize = (): void => {
    if (!this.isAnimating) this.draw();
  };

  public draw(): void {
    if (this.ctx) {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.rotate(this.angle);

      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#003434a3';
      this.ctx.fill();
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(0, 0, Constants.SMALL_RADIUS, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#fff';
      this.ctx.fill();
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      const angleStep = (Math.PI * 2) / 3;

      for (let index = 0; index < 3; index += 1) {
        const currentAngle = angleStep * index;

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.cos(currentAngle) * this.radius, Math.sin(currentAngle) * this.radius);

        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }

      this.ctx.font = '16px Arial';
      this.ctx.fillStyle = 'Black';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      this.ctx.fillText('not yet completed!'.toLocaleUpperCase(), 0, 0);

      this.ctx.restore();
    }
  }

  public update(): void {
    this.angle += this.angularVelocity;
    if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2;
  }

  public startAnimation(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.startTime = performance.now();

    const animate = (timestamp: number): void => {
      const elapsed = timestamp - this.startTime;

      if (elapsed < this.duration) {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.stopAnimation();
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  public stopAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
    this.isAnimating = false;
  }
}
