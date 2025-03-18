export class TimedRotatingCircle {
  public ctx: CanvasRenderingContext2D;

  public centerX: number;

  public centerY: number;

  public radius: number;

  public angle: number = 0;

  public angularVelocity: number = 0.02;

  public startTime: number = 0;

  public isAnimating: boolean = false;

  public animationId: number | undefined = undefined;

  constructor(
    public canvas: HTMLCanvasElement,
    public color: string = '#ff0000',
    public duration: number = 3000
  ) {
    this.ctx = canvas.getContext('2d')!;
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = Math.min(this.canvas.width, this.canvas.height) * 0.25;
  }

  public handleResize = (): void => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Перерисовываем при изменении размера, если анимация не активна
    if (!this.isAnimating) this.draw();
  };

  public draw(): void {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(this.angle);

    // Рисуем основной круг
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    // Маркер направления вращения
    this.ctx.beginPath();
    this.ctx.moveTo(this.radius * 0.8, 0);
    this.ctx.lineTo(this.radius, 0);
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    this.ctx.restore();
  }

  public update(): void {
    this.angle += this.angularVelocity;
    if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2;
  }

  public startAnimation(onComplete?: () => void): void {
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
        onComplete?.();
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
