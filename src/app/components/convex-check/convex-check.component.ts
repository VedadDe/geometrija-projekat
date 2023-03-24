import { Component, ViewChild, ElementRef } from '@angular/core';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-convex-check',
  templateUrl: './convex-check.component.html',
  styleUrls: ['./convex-check.component.scss']
})
export class ConvexCheckComponent {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private points: Point[] = [];
  isConvex: boolean | undefined = undefined;

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
  }

  onCanvasClick(event: MouseEvent): void {
    if (this.points.length >= 4) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point: Point = { x, y };

    this.points.push(point);
    this.drawPoint(point);

    if (this.points.length === 4) {
      this.isConvex = this.checkConvexity(this.points);
      this.drawQuadrilateral(this.points);
    }
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.points = [];
    this.isConvex = undefined;
  }

  private drawPoint(point: Point): void {
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    this.ctx.closePath();
  }

  private drawQuadrilateral(points: Point[]): void {
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }

    this.ctx.closePath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
private checkConvexity(points: Point[]): boolean {
  let angleSum = 0;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];

    const vec1 = { x: p2.x - p1.x, y: p2.y - p1.y };
    const vec2 = { x: p3.x - p2.x, y: p3.y - p2.y };

    const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
    const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);

    const angle = Math.acos(dotProduct / (mag1 * mag2));
    angleSum += angle;
  }

  return Math.abs(angleSum - 2 * Math.PI) < 1e-6;
}
  
}