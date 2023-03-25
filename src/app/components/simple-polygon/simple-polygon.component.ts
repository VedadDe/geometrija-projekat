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
  onCanvasClick(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    if (this.isPointInsidePolygon({ x, y })) {
      console.log('The point is inside the polygon.');
    } else {
      console.log('The point is outside the polygon.');
    }
  }
  
  isPointInsidePolygon(point: { x: number; y: number }): boolean {
    let intersections = 0;
    const testLine = { a: point, b: { x: this.canvasRef.nativeElement.width + 1, y: point.y } };
  
    for (let i = 0; i < this.points.length; i++) {
      const a = this.points[i];
      const b = this.points[(i + 1) % this.points.length];
  
      const isIntersecting = this.doLineSegmentsIntersect(a, b, testLine.a, testLine.b);
      if (isIntersecting) {
        intersections++;
      }
    }
  
    return intersections % 2 !== 0;
  }
  
  doLineSegmentsIntersect(a1: { x: number; y: number }, a2: { x: number; y: number }, b1: { x: number; y: number }, b2: { x: number; y: number }): boolean {
    const d = (a1.x - a2.x) * (b2.y - b1.y) - (a1.y - a2.y) * (b2.x - b1.x);
    if (d === 0) return false;
  
    const s = ((a1.x - b1.x) * (b2.y - b1.y) - (a1.y - b1.y) * (b2.x - b1.x)) / d;
    const t = ((a1.x - a2.x) * (a1.y - b1.y) - (a1.y - a2.y) * (a1.x - b1.x)) / d;
  
    return s >= 0 && s <= 1 && t >= 0 && t <= 1;
  }
  
}