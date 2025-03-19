import { StorageService } from '../../services/local-storage.service';
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
    StorageService.getData();
    const optionList = StorageService.data.list;
    const sumWeight = optionList
      .map(element => element.weight)
      .reduce((accumulator, current) => Number(accumulator) + Number(current), 0);

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

      let currentAngle = 0;
      for (let index = 0; index < optionList.length; index += 1) {
        const angleStep = (Math.PI * 2) / sumWeight;
        currentAngle += angleStep * Number(optionList[index].weight);

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.cos(currentAngle) * this.radius, Math.sin(currentAngle) * this.radius);

        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        //         let currentAngle = 0; // Начинаем с угла 0
        const radiusOffset = this.radius * 0.6;
        // const weight = Number(optionList[index].weight);
        // const angleIncrement = (Math.PI * 2) / sumWeight * weight; // Угол секции

        // // Средний угол секции
        // const midAngle = currentAngle + angleIncrement / 2;

        this.ctx.fillText(
          optionList[index].title,
          Math.cos(currentAngle / 2) * radiusOffset,
          Math.sin(currentAngle / 2) * radiusOffset
        );
        // // Координаты для текста
        // const x = Math.cos(midAngle) * radiusOffset;
        // const y = Math.sin(midAngle) * radiusOffset;

        // // Рисуем текст
        // this.ctx.fillText('TEXT', x, y);

        // // Обновляем текущий угол для следующей секции
        // currentAngle += angleIncrement;
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
