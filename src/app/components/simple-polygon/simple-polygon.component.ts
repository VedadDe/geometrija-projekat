import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-simple-polygon',
  templateUrl: './simple-polygon.component.html',
  styleUrls: ['./simple-polygon.component.scss']
})
export class SimplePolygonComponent implements AfterViewInit {

  @ViewChild('polygonCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  private points: { x: number; y: number }[] = [];
  n: number = 3;

  ngAfterViewInit(): void {
    const context = this.canvasRef.nativeElement.getContext('2d');
    if (!context) {
      throw new Error('Unable to get 2D rendering context for the canvas.');
    }
    this.context = context;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    this.canvasRef.nativeElement.width = window.innerWidth * 0.8;
    this.canvasRef.nativeElement.height = window.innerHeight * 0.8;
  }

  generatePolygon(): void {
    if (this.n >= 3) {
      this.points = this.generateRandomPoints(this.n);
      this.points = this.sortPointsByPolarAngle(this.points);
      this.context.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

      this.context.beginPath();
      this.context.moveTo(this.points[0].x, this.points[0].y);

      for (let i = 1; i < this.points.length; i++) {
        this.context.lineTo(this.points[i].x, this.points[i].y);
      }

      this.context.closePath();
      this.context.stroke();

      // Draw points
      for (const point of this.points) {
        this.drawPoint(point.x, point.y);
      }
    }
  }

  private generateRandomPoints(n: number): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const width = this.canvasRef.nativeElement.width;
    const height = this.canvasRef.nativeElement.height;

    for (let i = 0; i < n; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
      });
    }

    return points;
  }

  private sortPointsByPolarAngle(points: { x: number; y: number }[]): { x: number; y: number }[] {
    const centroid = this.calculateCentroid(points);

    points.sort((a, b) => {
      const angleA = Math.atan2(a.y - centroid.y, a.x - centroid.x);
      const angleB = Math.atan2(b.y - centroid.y, b.x - centroid.x);
      return angleA - angleB;
    });

    return points;
  }

  private calculateCentroid(points: { x: number; y: number }[]): { x: number; y: number } {
    const centroid = { x: 0, y: 0 };

    for (const point of points) {
      centroid.x += point.x;
      centroid.y += point.y;
    }

    centroid.x /= points.length;
    centroid.y /= points.length;

    return centroid;
  }

  private drawPoint(x: number, y: number): void {
    this.context.beginPath();
    this.context.arc(x, y, 3, 0, 2 * Math.PI);
    this.context.fillStyle = 'black';
    this.context.fill();
  }
}